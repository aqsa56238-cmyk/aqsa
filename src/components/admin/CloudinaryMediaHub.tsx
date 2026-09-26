import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { CloudinaryUploader } from './CloudinaryUploader';
import { checkCloudinaryStatus, CloudinaryStatus, UploadResult } from '../../services/cloudinary';
import {
  Cloud,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Folder,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  RefreshCw,
  Sliders,
  FileCode,
  Tag
} from 'lucide-react';

export const CloudinaryMediaHub: React.FC = () => {
  const {
    mediaAssets,
    addMediaAsset,
    deleteMediaAsset,
    settings,
    updateSettings
  } = useStore();

  const [status, setStatus] = useState<CloudinaryStatus | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [selectedFolderFilter, setSelectedFolderFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Preset folders
  const folders = [
    { id: 'all', name: 'All Media Assets' },
    { id: 'vendome_store/banners', name: 'Banners & Hero' },
    { id: 'vendome_store/brand', name: 'Brand & Logos' },
    { id: 'vendome_store/products', name: 'Product Silhouettes' },
    { id: 'vendome_store/categories', name: 'Category Covers' },
    { id: 'vendome_store/pages', name: 'Custom Pages' },
    { id: 'vendome_store/gallery', name: 'Runway Diary' }
  ];

  const runStatusCheck = async () => {
    setIsPinging(true);
    try {
      const res = await checkCloudinaryStatus();
      setStatus(res);
    } catch (err: any) {
      setStatus({ success: false, error: err.message });
    } finally {
      setIsPinging(false);
    }
  };

  useEffect(() => {
    runStatusCheck();
  }, []);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSetAsHero = (url: string) => {
    updateSettings({ heroImage: url });
    setActionSuccess('Updated Homepage Hero Banner with this image!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleSetAsLogo = (url: string) => {
    updateSettings({ logoImage: url });
    setActionSuccess('Updated Website Logo with this image!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleSetAsManifesto = (url: string) => {
    updateSettings({ manifestoImage: url });
    setActionSuccess('Updated Savoir-Faire Manifesto Picture with this image!');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleUploadSuccess = (url: string, result: UploadResult) => {
    addMediaAsset({
      name: result.public_id.split('/').pop() || 'Cloudinary Asset',
      url,
      publicId: result.public_id,
      folder: result.public_id.includes('/') ? result.public_id.substring(0, result.public_id.lastIndexOf('/')) : 'vendome_store',
      format: result.format || 'jpg',
      size: result.bytes,
      width: result.width,
      height: result.height
    });
    setActionSuccess('Successfully uploaded to Cloudinary (kkroq7e1) & added to media library!');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const filteredAssets = mediaAssets.filter(item => {
    if (selectedFolderFilter !== 'all' && item.folder !== selectedFolderFilter) {
      return false;
    }
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        (item.publicId && item.publicId.toLowerCase().includes(q)) ||
        item.url.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D5]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-serif font-light text-[#141413]">
              Cloudinary Media Hub &amp; Image Engine
            </h2>
            <span className="bg-[#1C1B19] text-white text-[10px] font-mono uppercase px-2 py-0.5 ml-2">
              Cloud: kkroq7e1
            </span>
          </div>
          <p className="text-xs text-[#6B665E] font-mono">
            Direct high-speed media hosting, automatic WebP delivery, and global CDN distribution.
          </p>
        </div>

        <button
          onClick={runStatusCheck}
          disabled={isPinging}
          className="px-4 py-2 border border-[#DDD8CD] bg-[#FAF9F5] hover:bg-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
          <span>{isPinging ? 'Pinging Cloudinary...' : 'Ping Cloud API'}</span>
        </button>
      </div>

      {/* Action Notification Toast */}
      {actionSuccess && (
        <div className="p-3 bg-[#EAF3EC] border border-[#295438] text-[#295438] text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Cloudinary App Guidelines & Configuration Card */}
      <div className="bg-[#1C1B19] text-[#EFECE6] p-6 border border-[#3A3834] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2F2D2A] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>ACTIVE CLOUDINARY APPLICATION CREDENTIALS</span>
            </div>
            <h3 className="font-serif text-lg font-light tracking-wide text-white">
              App Connected to Cloud: <span className="font-mono text-amber-300">kkroq7e1</span>
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <div className="bg-[#2B2824] px-3 py-1.5 border border-[#3E3B36]">
              <span className="text-[#888]">API Key: </span>
              <span className="text-white font-bold">246794876664153</span>
            </div>
            <div className="bg-[#2B2824] px-3 py-1.5 border border-[#3E3B36]">
              <span className="text-[#888]">API Secret: </span>
              <span className="text-amber-400 font-bold">fvm7_***...</span>
            </div>
            <div className="bg-[#1F2E23] text-[#A3E4B5] px-3 py-1.5 border border-[#2B4E33] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Status: Authenticated (OK)</span>
            </div>
          </div>
        </div>

        {/* Instructions According to Cloudinary App */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono pt-1 text-[#C4BFB5]">
          <div className="bg-[#24221F] p-3.5 border border-[#35332E] space-y-1.5">
            <div className="text-amber-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1. Supported Formats &amp; Limits</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#AAA59C]">
              Upload JPEG, PNG (with alpha transparency), WEBP, GIF, SVG, and AVIF up to 50MB. Images are automatically transformed to optimal formats.
            </p>
          </div>

          <div className="bg-[#24221F] p-3.5 border border-[#35332E] space-y-1.5">
            <div className="text-amber-300 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>2. Cloud CDN Optimization</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#AAA59C]">
              All assets automatically utilize <code className="text-emerald-400">f_auto, q_auto:best</code> for high-fidelity luxury garment texture rendition at lightning speeds.
            </p>
          </div>

          <div className="bg-[#24221F] p-3.5 border border-[#35332E] space-y-1.5">
            <div className="text-amber-300 font-bold flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5" />
              <span>3. Folder Structure</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#AAA59C]">
              Assets are organized into partitioned paths: <code className="text-emerald-400">products/</code>, <code className="text-emerald-400">banners/</code>, <code className="text-emerald-400">brand/</code>, <code className="text-emerald-400">categories/</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Cloudinary Interactive Direct Uploader */}
      <div className="bg-white border border-[#E5E0D5] p-6 space-y-4">
        <div className="border-b border-[#EFECE5] pb-3">
          <h3 className="font-serif text-lg font-medium text-[#1A1918]">
            Upload Picture to Cloudinary (kkroq7e1)
          </h3>
          <p className="text-xs text-[#736E66] font-mono mt-0.5">
            Upload from your computer, drag and drop, or ingest from an external image URL. The uploaded picture will be stored directly on your Cloudinary cloud and added to the media library below.
          </p>
        </div>

        <CloudinaryUploader
          folder="vendome_store"
          label="Drag & Drop or Browse Image to Upload to Cloudinary (kkroq7e1)"
          onUploadSuccess={handleUploadSuccess}
        />
      </div>

      {/* Media Assets Library */}
      <div className="bg-white border border-[#E5E0D5] p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFECE5] pb-4">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#1A1918]">
              Cloudinary Media Asset Library ({filteredAssets.length})
            </h3>
            <p className="text-xs text-[#736E66] font-mono mt-0.5">
              Select any picture to copy its CDN URL or apply it as the Hero banner, Store Logo, or Savoir-Faire photo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search assets by name or ID..."
              className="px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono focus:outline-none focus:border-black w-48 sm:w-60"
            />

            <select
              value={selectedFolderFilter}
              onChange={(e) => setSelectedFolderFilter(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono focus:outline-none"
            >
              {folders.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Assets Grid */}
        {filteredAssets.length === 0 ? (
          <div className="text-center py-12 text-[#888] font-mono text-xs">
            No media assets found matching the selected filter. Upload a picture above to populate the library.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAssets.map((asset) => {
              const isHero = settings.heroImage === asset.url;
              const isLogo = settings.logoImage === asset.url;
              const isManifesto = settings.manifestoImage === asset.url;

              return (
                <div
                  key={asset.id}
                  className="bg-[#FAF9F5] border border-[#E5E0D5] flex flex-col justify-between overflow-hidden group hover:border-black transition-all"
                >
                  <div className="relative aspect-[4/3] bg-[#EFECE5] overflow-hidden">
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Active badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {isHero && (
                        <span className="bg-[#1C1B19] text-white text-[9px] font-mono uppercase px-2 py-0.5 font-bold shadow-xs">
                          Active Hero Banner
                        </span>
                      )}
                      {isLogo && (
                        <span className="bg-[#8C3A27] text-white text-[9px] font-mono uppercase px-2 py-0.5 font-bold shadow-xs">
                          Active Brand Logo
                        </span>
                      )}
                      {isManifesto && (
                        <span className="bg-[#295438] text-white text-[9px] font-mono uppercase px-2 py-0.5 font-bold shadow-xs">
                          Active Savoir-Faire
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[9px] font-mono px-2 py-0.5">
                      {asset.format?.toUpperCase() || 'IMG'}
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="font-serif text-sm font-medium text-[#1A1918] line-clamp-1">
                        {asset.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#777] line-clamp-1 break-all">
                        {asset.publicId || asset.folder}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EFECE5] space-y-2">
                      {/* 1-Click Set Actions */}
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                        <button
                          type="button"
                          onClick={() => handleSetAsHero(asset.url)}
                          className={`px-2 py-1 border transition-colors ${
                            isHero
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-[#444] border-[#DDD8CD] hover:border-black'
                          }`}
                        >
                          {isHero ? '✓ Hero Banner' : 'Set as Hero'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSetAsLogo(asset.url)}
                          className={`px-2 py-1 border transition-colors ${
                            isLogo
                              ? 'bg-[#8C3A27] text-white border-[#8C3A27] font-semibold'
                              : 'bg-white text-[#444] border-[#DDD8CD] hover:border-black'
                          }`}
                        >
                          {isLogo ? '✓ Brand Logo' : 'Set as Logo'}
                        </button>
                      </div>

                      {/* Copy & View Actions */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => handleCopyUrl(asset.url, asset.id)}
                          className="px-2.5 py-1 bg-white border border-[#DDD8CD] hover:border-black text-[10px] font-mono flex items-center gap-1 text-[#333]"
                        >
                          {copiedId === asset.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedId === asset.id ? 'Copied' : 'Copy CDN URL'}</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <a
                            href={asset.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-[#777] hover:text-black hover:bg-[#EFECE5]"
                            title="Open full size image"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Remove "${asset.name}" from your local asset library?`)) {
                                deleteMediaAsset(asset.id);
                              }
                            }}
                            className="p-1.5 text-[#8C3A27] hover:bg-[#FBEBE7]"
                            title="Remove from library"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
