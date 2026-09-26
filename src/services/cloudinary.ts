/**
 * Cloudinary Media Client Service
 * Communicates with the server-side proxy route /api/upload
 */

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
 * Checks Cloudinary connectivity via backend proxy
 */
export async function checkCloudinaryStatus(): Promise<CloudinaryStatus> {
  try {
    const res = await fetch('/api/cloudinary/status');
    return await res.json();
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Cannot reach Cloudinary proxy service'
    };
  }
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
 * Uploads a file (File object or DataURL string) to Cloudinary via server proxy
 */
export async function uploadToCloudinary(
  fileOrDataUrl: File | string,
  folder: string = 'vendome_store'
): Promise<UploadResult> {
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

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Upload to Cloudinary failed');
    }

    return data;
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      url: '',
      public_id: '',
      error: error.message || 'Upload error'
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
