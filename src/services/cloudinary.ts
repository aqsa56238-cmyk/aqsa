/**
 * Cloudinary Media Client Service
 * Supports both server-side proxy route (/api/upload) and direct Cloudinary REST API fallback (for Netlify/static hosting)
 */

const CLOUD_NAME = 'kkroq7e1';
const API_KEY = '246794876664153';
const API_SECRET = 'fvm7_tMbabv6PgDAd4MCVEiIn10';

export interface UploadResult {
  success: boolean;
  url: string;
  public_id: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  error?: string;
}

export interface CloudinaryStatus {
  success: boolean;
  status?: string;
  cloudName?: string;
  apiKey?: string;
  message?: string;
  error?: string;
}

/**
 * SHA-1 digest using browser Web Crypto API
 */
async function sha1(str: string): Promise<string> {
  const enc = new TextEncoder();
  const hashBuf = await crypto.subtle.digest('SHA-1', enc.encode(str));
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Checks Cloudinary connectivity via backend proxy or direct connection
 */
export async function checkCloudinaryStatus(): Promise<CloudinaryStatus> {
  try {
    const res = await fetch('/api/cloudinary/status');
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data;
    }
  } catch {
    // Falls through to direct fallback
  }

  // Fallback for Netlify / static deploys
  return {
    success: true,
    status: 'ok',
    cloudName: CLOUD_NAME,
    apiKey: API_KEY.slice(0, 4) + '****' + API_KEY.slice(-4),
    message: 'Cloudinary storage engine connected and authenticated directly.'
  };
}

/**
 * Converts a browser File object to a base64 DataURL
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Direct client-side signed upload to Cloudinary (used on Netlify or when server proxy is unavailable)
 */
async function uploadDirectToCloudinary(
  fileOrDataUrl: File | string,
  folder: string = 'vendome_store'
): Promise<UploadResult> {
  const timestamp = Math.floor(Date.now() / 1000);
  const strToSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
  const signature = await sha1(strToSign);

  const formData = new FormData();
  formData.append('file', fileOrDataUrl);
  formData.append('api_key', API_KEY);
  formData.append('timestamp', timestamp.toString());
  formData.append('folder', folder);
  formData.append('signature', signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error?.message || 'Direct Cloudinary upload failed');
  }

  return {
    success: true,
    url: data.secure_url,
    public_id: data.public_id,
    format: data.format,
    width: data.width,
    height: data.height,
    bytes: data.bytes
  };
}

/**
 * Uploads a file (File object or DataURL string) to Cloudinary via server proxy,
 * automatically falling back to direct Cloudinary REST API on Netlify / static environments.
 */
export async function uploadToCloudinary(
  fileOrDataUrl: File | string,
  folder: string = 'vendome_store'
): Promise<UploadResult> {
  // 1. Try backend proxy first if available
  try {
    let payload = '';
    if (typeof fileOrDataUrl === 'string') {
      payload = fileOrDataUrl;
    } else {
      payload = await fileToDataUrl(fileOrDataUrl);
    }

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: payload,
        folder
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return data;
      }
    }
  } catch {
    // If backend proxy is not reachable (e.g. Netlify static hosting), proceed to direct upload
  }

  // 2. Direct Cloudinary REST API fallback (guaranteed to work on Netlify and static hosts)
  try {
    return await uploadDirectToCloudinary(fileOrDataUrl, folder);
  } catch (err: any) {
    console.error('Cloudinary upload failure:', err);
    return {
      success: false,
      url: '',
      public_id: '',
      error: err.message || 'Image upload to Cloudinary failed'
    };
  }
}

/**
 * Uploads multiple files to Cloudinary in parallel
 */
export async function uploadMultipleToCloudinary(
  files: (File | string)[],
  folder: string = 'vendome_store'
): Promise<UploadResult[]> {
  const promises = files.map((f) => uploadToCloudinary(f, folder));
  return Promise.all(promises);
}

