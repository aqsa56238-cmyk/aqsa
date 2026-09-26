import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { StorePage } from '../../types';
import { CloudinaryUploader } from './CloudinaryUploader';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  Globe,
  Sliders,
  Type
} from 'lucide-react';

export const AdminPages: React.FC = () => {
  const {
    pages,
    addPage,
    updatePage,
    deletePage,
    setActivePage,
    setAdminMode
  } = useStore();

  const [editingPage, setEditingPage] = useState<StorePage | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const initialFormState = {
    title: '',
    navLabel: '',
    slug: '',
    subtitle: '',
    content: '',
    bannerImage: '/src/assets/images/hero_luxury_coat_1790325188738.jpg',
    showInNav: true,
    showInFooter: true,
    isSystem: false
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleStartCreate = () => {
    setFormData(initialFormState);
    setEditingPage(null);
    setIsCreating(true);
  };

  const handleStartEdit = (page: StorePage) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      navLabel: page.navLabel,
      slug: page.slug,
      subtitle: page.subtitle || '',
      content: page.content,
      bannerImage: page.bannerImage || '',
      showInNav: page.showInNav,
      showInFooter: page.showInFooter,
      isSystem: page.isSystem || false
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const slug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const navLabel = formData.navLabel.trim() || formData.title.trim();

    if (editingPage) {
      updatePage(editingPage.id, {
        ...formData,
        title: formData.title.trim(),
        navLabel,
        slug
      });
    } else {
      addPage({
        ...formData,
        title: formData.title.trim(),
        navLabel,
        slug
      });
    }

    setIsCreating(false);
    setEditingPage(null);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handlePreviewPage = (slug: string) => {
    setActivePage(slug);
    setAdminMode(false);
  };

  const filteredPages = pages.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.navLabel.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#141413]">
            Website Page Names &amp; Editorial Content Controller
          </h2>
          <p className="text-xs text-[#6B665E] mt-1 font-mono">
            Edit the page names written across the site, manage custom pages, and upload editorial banners.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-5 py-2.5 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {savedToast && (
        <div className="p-3 bg-[#EAF3EC] border border-[#295438] text-[#295438] text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Page names &amp; website details updated successfully!</span>
        </div>
      )}

      {/* Pages List Table */}
      <div className="bg-white border border-[#E5E0D5] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFECE5] pb-4">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#1A1918]">
              All Published Pages ({pages.length})
            </h3>
            <p className="text-xs text-[#736E66] font-mono mt-0.5">
              Click &quot;Edit Page Details&quot; to change the written page name, body text, or Cloudinary banner.
            </p>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pages by name or slug..."
            className="px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono focus:outline-none focus:border-black w-64"
          />
        </div>

        <div className="space-y-3">
          {filteredPages.map((page) => (
            <div
              key={page.id}
              className="p-4 bg-[#FAF9F5] border border-[#E5E0D5] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:border-black transition-colors"
            >
              <div className="flex items-start gap-4">
                {page.bannerImage && (
                  <div className="w-20 h-16 bg-[#EFECE5] border border-[#DDD] overflow-hidden shrink-0 hidden sm:block">
                    <img
                      src={page.bannerImage}
                      alt={page.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif text-base font-medium text-[#1A1918]">
                      {page.title}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-white border border-[#DDD] px-2 py-0.5 text-[#555]">
                      Slug: /{page.slug}
                    </span>
                    {page.isSystem && (
                      <span className="text-[10px] font-mono uppercase bg-[#EAF3EC] text-[#295438] border border-[#BDE0C7] px-2 py-0.5">
                        Core Page
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#666] line-clamp-1">
                    {page.subtitle || page.content.slice(0, 100) + '...'}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#888] pt-1">
                    <span className="flex items-center gap-1">
                      <span className="text-[#555]">Menu Label:</span>
                      <strong className="text-black">&quot;{page.navLabel}&quot;</strong>
                    </span>
                    <span>&bull;</span>
                    <span className={page.showInNav ? 'text-emerald-700 font-semibold' : 'text-gray-400'}>
                      {page.showInNav ? '✓ In Top Nav' : '✗ Hidden in Nav'}
                    </span>
                    <span>&bull;</span>
                    <span className={page.showInFooter ? 'text-emerald-700 font-semibold' : 'text-gray-400'}>
                      {page.showInFooter ? '✓ In Footer' : '✗ Hidden in Footer'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => handlePreviewPage(page.slug)}
                  className="px-3 py-1.5 bg-white border border-[#DDD8CD] hover:border-black text-xs font-mono uppercase flex items-center gap-1 text-[#333]"
                  title="View on live storefront"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Page</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStartEdit(page)}
                  className="px-3 py-1.5 bg-[#1C1B19] text-white hover:bg-black text-xs font-mono uppercase flex items-center gap-1"
                  title="Edit page name written and details"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                {!page.isSystem && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete custom page "${page.title}"?`)) {
                        deletePage(page.id);
                      }
                    }}
                    className="p-1.5 text-[#8C3A27] hover:bg-[#FBEBE7] border border-transparent hover:border-[#F5B7B1]"
                    title="Delete page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Edit / Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative bg-[#FAF9F5] border border-[#DDD6C8] w-full max-w-2xl overflow-hidden shadow-2xl p-6 sm:p-8 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA] mb-6">
              <div>
                <h3 className="font-serif text-2xl font-light text-[#141413]">
                  {editingPage ? 'Edit Page Details & Change Page Name' : 'Create New Website Page'}
                </h3>
                <p className="text-xs text-[#736E66] font-mono mt-0.5">
                  Change the page name written, banner picture, and narrative copy.
                </p>
              </div>
              <button onClick={() => setIsCreating(false)} className="text-[#666] hover:text-black p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1 font-semibold">
                    Page Name Written (Headline) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setFormData(prev => ({
                        ...prev,
                        title,
                        slug: prev.slug ? prev.slug : slug,
                        navLabel: prev.navLabel ? prev.navLabel : title
                      }));
                    }}
                    placeholder="e.g. About The Maison & Atelier"
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-medium"
                  />
                  <span className="text-[10px] text-[#888] font-mono block mt-1">
                    The primary title displayed at the summit of this page.
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1 font-semibold">
                    Navigation Menu Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.navLabel}
                    onChange={(e) => setFormData({ ...formData, navLabel: e.target.value })}
                    placeholder="e.g. The Maison"
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-medium"
                  />
                  <span className="text-[10px] text-[#888] font-mono block mt-1">
                    Short name displayed in top header navbar and mobile menu.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    URL Path Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                    placeholder="e.g. about or heritage"
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Page Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Architectural purity born in Paris"
                    className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-serif italic"
                  />
                </div>
              </div>

              {/* Cloudinary Page Banner Picture Upload */}
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1 font-semibold">
                  Upload Page Banner Picture via Cloudinary (kkroq7e1)
                </label>
                <CloudinaryUploader
                  folder="vendome_store/pages"
                  label="Upload Page Banner to Cloudinary (kkroq7e1)"
                  currentImageUrl={formData.bannerImage}
                  onUploadSuccess={(url) => {
                    setFormData(prev => ({ ...prev, bannerImage: url }));
                  }}
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1 font-semibold">
                  Page Content / Editorial Prose *
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter detailed editorial narrative, policy descriptions, or atelier history..."
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CD] focus:outline-none focus:border-black text-xs leading-relaxed"
                />
              </div>

              {/* Visibility Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-[#E8E4DA]">
                <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                  <input
                    type="checkbox"
                    checked={formData.showInNav}
                    onChange={(e) => setFormData({ ...formData, showInNav: e.target.checked })}
                    className="w-4 h-4 text-black focus:ring-0 cursor-pointer"
                  />
                  <span>Show in Top Header Navigation Bar</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                  <input
                    type="checkbox"
                    checked={formData.showInFooter}
                    onChange={(e) => setFormData({ ...formData, showInFooter: e.target.checked })}
                    className="w-4 h-4 text-black focus:ring-0 cursor-pointer"
                  />
                  <span>Show in Footer Navigation Links</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E8E4DA]">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-5 py-2 border border-[#888] text-xs font-mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black font-semibold"
                >
                  {editingPage ? 'Save Changes to Page' : 'Create Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
