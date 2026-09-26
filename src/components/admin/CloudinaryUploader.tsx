import React, { useState, useRef, useEffect } from 'react';
import { uploadToCloudinary, UploadResult, checkCloudinaryStatus, CloudinaryStatus } from '../../services/cloudinary';
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Copy,
  Check,
  ExternalLink,
  Folder,
  Layers,
  Sparkles,
  Link2,
  FileCheck
} from 'lucide-react';

interface CloudinaryUploaderProps {
  onUploadSuccess: (url: string, result: UploadResult) => void;
  folder?: string;
  label?: string;
  currentImageUrl?: string;
  className?: string;
}

export const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({
  onUploadSuccess,
  folder = 'vendome_store',
  label = 'Upload Image via Cloudinary CDN (kkroq7e1)',
  currentImageUrl,
  className = ''
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [pastedUrl, setPastedUrl] = useState('');
  const [targetFolder, setTargetFolder] = useState(folder);
  const [cloudinaryStatus, setCloudinaryStatus] = useState<CloudinaryStatus | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Check connection status on mount
  useEffect(() => {
    checkCloudinaryStatus().then((status) => {
      setCloudinaryStatus(status);
    });
  }, []);

  // Listen to paste events (Ctrl+V) when user pastes an image
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          uploadFile(file);
        }
      }
    };

    const dropEl = dropzoneRef.current;
    if (dropEl) {
      dropEl.addEventListener('paste', handlePaste as any);
      return () => dropEl.removeEventListener('paste', handlePaste as any);
    }
  }, [targetFolder]);

  const uploadFile = async (file: File) => {
    // Validate image format per Cloudinary guidelines
    const validExtensions = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    if (!validExtensions.includes(file.type) && !file.type.startsWith('image/')) {
      setUploadError('Invalid format. Cloudinary supports JPG, PNG, WEBP, GIF, SVG, and AVIF.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setUploadError('File exceeds Cloudinary max limit of 50MB.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadToCloudinary(file, targetFolder);
      if (result.success && result.url) {
        setUploadResult(result);
        onUploadSuccess(result.url, result);
      } else {
        setUploadError(result.error || 'Cloudinary upload failed. Check network or credentials.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Error communicating with Cloudinary service');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    uploadFile(files[0]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedUrl.trim()) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadToCloudinary(pastedUrl.trim(), targetFolder);
      if (result.success && result.url) {
        setUploadResult(result);
        onUploadSuccess(result.url, result);
        setPastedUrl('');
      } else {
        setUploadError(result.error || 'Failed to ingest URL into Cloudinary.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Error ingesting image URL');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (urlToCopy: string) => {
    navigator.clipboard.writeText(urlToCopy);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className={`space-y-3 bg-[#FAF9F5] border border-[#DDD8CD] p-3.5 ${className}`}>
      {/* Cloudinary Header & Status Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ECE7DD] pb-2.5 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-[#1C1B19]">Cloudinary Media Engine</span>
          <span className="text-[#666]">&bull; Cloud: <strong className="text-black">kkroq7e1</strong></span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-[#295438] bg-[#EAF3EC] px-2 py-0.5 border border-[#BDE0C7]">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Auto CDN (f_auto, q_auto:best)</span>
        </div>
      </div>

      {/* Target Folder Selector */}
      <div className="flex items-center gap-2 text-[10px] font-mono">
        <span className="text-[#666] flex items-center gap-1">
          <Folder className="w-3 h-3 text-[#888]" />
          <span>Folder:</span>
        </span>
        <select
          value={targetFolder}
          onChange={(e) => setTargetFolder(e.target.value)}
          className="bg-white border border-[#DDD8CD] px-2 py-1 text-[11px] font-mono focus:outline-none focus:border-black cursor-pointer"
        >
          <option value="vendome_store">vendome_store (root)</option>
          <option value="vendome_store/products">vendome_store/products</option>
          <option value="vendome_store/banners">vendome_store/banners</option>
          <option value="vendome_store/brand">vendome_store/brand</option>
          <option value="vendome_store/categories">vendome_store/categories</option>
          <option value="vendome_store/gallery">vendome_store/gallery</option>
        </select>
      </div>

      {/* Upload Modes Tabs */}
      <div className="flex items-center gap-1 text-[11px] font-mono border-b border-[#ECE7DD]">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`px-3 py-1.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'upload'
              ? 'border-black text-black font-semibold bg-white'
              : 'border-transparent text-[#777] hover:text-black'
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>File Upload / Dropzone</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`px-3 py-1.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'url'
              ? 'border-black text-black font-semibold bg-white'
              : 'border-transparent text-[#777] hover:text-black'
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Cloud Ingest from URL</span>
        </button>
      </div>

      {/* Tab 1: Dropzone */}
      {activeTab === 'upload' && (
        <div
          ref={dropzoneRef}
          tabIndex={0}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed p-4 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-[#1C1B19] bg-[#EFECE5]'
              : 'border-[#DDD8CD] bg-white hover:border-[#1C1B19] hover:bg-[#FAF9F5]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={isUploading}
          />

          <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-xs font-mono text-[#1C1B19]">
                <Loader2 className="w-5 h-5 animate-spin text-[#8C3A27]" />
                <span className="font-semibold">Uploading to Cloudinary (kkroq7e1)...</span>
                <span className="text-[10px] text-[#777]">Applying auto-optimization and generating CDN delivery URL</span>
              </div>
            ) : (
              <>
                <div className="w-9 h-9 rounded-full bg-[#FAF9F5] border border-[#DDD8CD] flex items-center justify-center text-[#4A4742]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono">
                  <span className="font-semibold text-[#141413] block">{label}</span>
                  <span className="text-[#736E66] text-[10px] mt-0.5 block">
                    Drag &amp; drop an image, browse your computer, or press <kbd className="px-1 py-0.5 bg-gray-100 border text-[9px]">Ctrl+V</kbd>
                  </span>
                  <span className="text-[#999] text-[9px] mt-1 block">
                    Supported: JPG, PNG, WEBP, GIF, SVG, AVIF &bull; Up to 50MB
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Ingest from URL */}
      {activeTab === 'url' && (
        <form onSubmit={handleUrlSubmit} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={pastedUrl}
              onChange={(e) => setPastedUrl(e.target.value)}
              placeholder="https://example.com/editorial-high-res.jpg"
              className="flex-1 px-3 py-2 bg-white border border-[#DDD8CD] text-xs font-mono focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              disabled={isUploading || !pastedUrl.trim()}
              className="px-4 py-2 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black disabled:opacity-50"
            >
              {isUploading ? 'Ingesting...' : 'Ingest to Cloud'}
            </button>
          </div>
          <span className="text-[10px] font-mono text-[#777] block">
            Cloudinary will download this asset, optimize it, and host it permanently in your <code>{targetFolder}</code> folder.
          </span>
        </form>
      )}

      {/* Error Notice */}
      {uploadError && (
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8C3A27] bg-[#FBEBE7] p-2.5 border border-[#F5B7B1]">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Uploaded / Current Image Preview & Cloudinary Metadata */}
      {(uploadResult?.url || currentImageUrl) && (
        <div className="bg-white border border-[#E3DED2] p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 bg-[#F2EEE6] border border-[#DDD] overflow-hidden shrink-0">
              <img
                src={uploadResult?.url || currentImageUrl}
                alt="Cloudinary Asset"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/75 text-white text-[8px] text-center uppercase">
                {uploadResult?.format || 'IMG'}
              </span>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-[#141413]">
                  {uploadResult ? 'Uploaded to Cloudinary!' : 'Active Asset Preview'}
                </span>
              </div>
              <div className="text-[10px] text-[#666] line-clamp-1 max-w-xs break-all">
                {uploadResult?.public_id || (currentImageUrl?.includes('cloudinary') ? 'Cloudinary Hosted' : 'External Asset')}
              </div>
              {uploadResult?.width && uploadResult?.height && (
                <div className="text-[9px] text-[#888]">
                  Dimensions: {uploadResult.width} &times; {uploadResult.height}px &bull; {uploadResult.bytes ? Math.round(uploadResult.bytes / 1024) + ' KB' : ''}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center">
            <button
              type="button"
              onClick={() => handleCopyUrl(uploadResult?.url || currentImageUrl || '')}
              className="px-2.5 py-1 bg-[#FAF9F5] border border-[#DDD8CD] hover:border-black text-[10px] flex items-center gap-1 text-[#333]"
              title="Copy image link"
            >
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedUrl ? 'Copied' : 'Copy CDN URL'}</span>
            </button>

            <a
              href={uploadResult?.url || currentImageUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1 text-[#777] hover:text-black hover:bg-[#F2EEE6]"
              title="Open full size image in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
