import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { NavLinkItem, GalleryItem } from '../../types';
import {
  Save,
  RotateCcw,
  Check,
  Image as ImageIcon,
  Globe,
  Phone,
  Shield,
  Layers,
  Sparkles,
  Camera,
  Plus,
  Trash2,
  Sliders,
  Type,
  Eye,
  EyeOff,
  Radio,
  FileText,
  Compass,
  Megaphone
} from 'lucide-react';
import { CloudinaryUploader } from './CloudinaryUploader';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetToDefaults } = useStore();
  const [formData, setFormData] = useState({ ...settings });
  const [savedNotice, setSavedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'brand' | 'nav' | 'announcement' | 'hero' | 'privileges' | 'sections' | 'manifesto' | 'gallery' | 'contact' | 'policies'
  >('brand');

  const [newNavLabel, setNewNavLabel] = useState('');
  const [newNavSlug, setNewNavSlug] = useState('');

  const heroImagePresets = [
    { label: 'Paris Haussmann Trench (Default)', url: '/src/assets/images/hero_luxury_coat_1790325188738.jpg' },
    { label: 'Cashmere Cloak & Salon Interior', url: '/src/assets/images/cat_outerwear_cape_1790325209241.jpg' },
    { label: 'Hourglass Tailoring Portrait', url: '/src/assets/images/cat_tailored_suit_1790325225628.jpg' },
    { label: 'Tactile Cashmere Rib', url: '/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg' },
    { label: 'The Opéra Box Calfskin Tote', url: '/src/assets/images/cat_leather_bag_1790325239933.jpg' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Restore all store settings, page names, and sample catalog to pristine factory defaults?')) {
      resetToDefaults();
      setFormData(settings);
    }
  };

  // Nav link operations
  const handleUpdateNavLink = (id: string, updates: Partial<NavLinkItem>) => {
    setFormData(prev => ({
      ...prev,
      navLinks: prev.navLinks.map(l => (l.id === id ? { ...l, ...updates } : l))
    }));
  };

  const handleAddNavLink = () => {
    if (!newNavLabel.trim()) return;
    const slug = newNavSlug.trim() || newNavLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newItem: NavLinkItem = {
      id: `nav-${Date.now()}`,
      label: newNavLabel.trim(),
      slug,
      enabled: true
    };
    setFormData(prev => ({
      ...prev,
      navLinks: [...(prev.navLinks || []), newItem]
    }));
    setNewNavLabel('');
    setNewNavSlug('');
  };

  const handleDeleteNavLink = (id: string) => {
    setFormData(prev => ({
      ...prev,
      navLinks: prev.navLinks.filter(l => l.id !== id)
    }));
  };

  // Gallery photo update
  const handleUpdateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setFormData(prev => ({
      ...prev,
      scenesGallery: prev.scenesGallery.map(g => (g.id === id ? { ...g, ...updates } : g))
    }));
  };

  const tabs = [
    { id: 'brand', label: '1. Brand, Page Title & Logo', icon: Globe },
    { id: 'nav', label: '2. Page Names & Navigation', icon: Type },
    { id: 'announcement', label: '3. Top Announcement', icon: Megaphone },
    { id: 'hero', label: '4. Hero Banner & Texts', icon: ImageIcon },
    { id: 'privileges', label: '5. Maison Privileges', icon: Sparkles },
    { id: 'sections', label: '6. Section Headings', icon: Sliders },
    { id: 'manifesto', label: '7. Manifesto & Savoir-Faire', icon: FileText },
    { id: 'gallery', label: '8. Scènes de Vie Gallery', icon: Camera },
    { id: 'contact', label: '9. WhatsApp & Contacts', icon: Phone },
    { id: 'policies', label: '10. Policies & Footer', icon: Shield },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#141413]">
            Website Details, Page Names &amp; Cloudinary Media Controller
          </h2>
          <p className="text-xs text-[#6B665E] mt-1 font-mono">
            Every text, page name, heading, and image on the customer website can be customized here in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-[#8C3A27] text-[#8C3A27] text-xs font-mono uppercase tracking-wider hover:bg-[#FBEBE7] flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Factory Reset</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black flex items-center gap-1.5 transition-colors"
          >
            {savedNotice ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
            <span>{savedNotice ? 'Storefront Updated!' : 'Save & Publish All'}</span>
          </button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#E5E0D5] overflow-x-auto pb-1 text-xs font-mono">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 flex items-center gap-1.5 border-b-2 font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-[#1C1B19] text-black bg-white shadow-xs'
                  : 'border-transparent text-[#777] hover:text-black'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs font-sans">
        {/* ========================================================
            TAB 1: Brand, Page Title & Logo
        ======================================================== */}
        {activeTab === 'brand' && (
          <div className="bg-white border border-[#E5E0D5] p-6 space-y-5">
            <div className="border-b border-[#EFECE5] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                1. Store Identity, Page Title &amp; Brand Logo
              </h3>
              <p className="text-xs text-[#736E66] font-mono mt-0.5">
                Controls the browser window title, header wordmark/logo, and base store currency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Browser Tab Page Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.pageTitle}
                  onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                  placeholder="Vendôme Éditions | Haute Couture & Architectural Silhouettes"
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-sans"
                />
                <span className="text-[10px] text-[#888] font-mono block mt-1">
                  Displays in the browser tab bar and search engine previews.
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Store Name (Header Wordmark) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-serif uppercase tracking-widest font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Maison Philosophy / Subtitle Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Haute Couture & Architectural Silhouettes Born in Paris"
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-serif italic"
              />
            </div>

            {/* Cloudinary Brand Logo Uploader */}
            <div className="pt-2">
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Store Logo Image (Upload to Cloudinary or leave blank to use text wordmark)
              </label>
              <CloudinaryUploader
                folder="vendome_store/brand"
                label="Upload Brand Logo to Cloudinary (kkroq7e1)"
                currentImageUrl={formData.logoImage}
                onUploadSuccess={(url) => {
                  setFormData(prev => ({ ...prev, logoImage: url }));
                }}
              />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={formData.logoImage || ''}
                  onChange={(e) => setFormData({ ...formData, logoImage: e.target.value })}
                  placeholder="Or paste direct image URL (PNG with transparent background recommended)"
                  className="flex-1 px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
                />
                {formData.logoImage && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logoImage: '' })}
                    className="px-3 py-1.5 border border-[#8C3A27] text-[#8C3A27] text-xs font-mono uppercase hover:bg-[#FBEBE7]"
                  >
                    Remove Logo Image
                  </button>
                )}
              </div>
            </div>

            {/* Currency settings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#EFECE5]">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  required
                  value={formData.currencySymbol}
                  onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Currency Code
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="PKR">PKR (Rs.)</option>
                  <option value="AED">AED (AED)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Free Shipping Threshold ({formData.currencySymbol})
                </label>
                <input
                  type="number"
                  min={0}
                  value={formData.freeShippingThreshold}
                  onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: Page Names & Navigation Links Editor
        ======================================================== */}
        {activeTab === 'nav' && (
          <div className="bg-white border border-[#E5E0D5] p-6 space-y-5">
            <div className="border-b border-[#EFECE5] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                2. Navigation Page Names &amp; Menu Links Editor
              </h3>
              <p className="text-xs text-[#736E66] font-mono mt-0.5">
                Rename the pages shown in the top navigation bar and mobile menu. When you change a name here, it changes immediately on the website.
              </p>
            </div>

            {/* List of Navigation Links */}
            <div className="space-y-3">
              {(formData.navLinks || []).map((link, idx) => (
                <div
                  key={link.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-[#FAF9F5] border border-[#E5E0D5]"
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="font-mono text-xs text-[#888] w-6">#{idx + 1}</span>
                    <div className="flex-1 sm:w-64">
                      <label className="text-[10px] font-mono uppercase text-[#777] block mb-0.5">
                        Page Name / Nav Label
                      </label>
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleUpdateNavLink(link.id, { label: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-[#DDD8CD] text-xs font-medium text-[#141413] focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#777] block mb-0.5">
                        Category Slug Target
                      </label>
                      <input
                        type="text"
                        value={link.slug}
                        onChange={(e) => handleUpdateNavLink(link.id, { slug: e.target.value })}
                        className="w-32 px-2.5 py-1.5 bg-white border border-[#DDD8CD] text-xs font-mono text-[#555] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => handleUpdateNavLink(link.id, { enabled: !link.enabled })}
                        className={`px-3 py-1.5 border text-xs font-mono uppercase flex items-center gap-1 transition-colors ${
                          link.enabled
                            ? 'bg-[#EAF3EC] border-[#295438] text-[#295438]'
                            : 'bg-white border-[#999] text-[#777]'
                        }`}
                        title={link.enabled ? "Page link is active" : "Page link is hidden"}
                      >
                        {link.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{link.enabled ? 'Visible' : 'Hidden'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteNavLink(link.id)}
                        className="p-1.5 text-[#8C3A27] hover:bg-[#FBEBE7] border border-transparent hover:border-[#F5B7B1]"
                        title="Delete page link"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Page Link */}
            <div className="pt-4 border-t border-[#ECE7DD]">
              <span className="text-[11px] font-mono uppercase text-[#666] block mb-2 font-semibold">
                Add Custom Page / Navigation Link
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newNavLabel}
                  onChange={(e) => setNewNavLabel(e.target.value)}
                  placeholder="New Page Name (e.g. Bespoke Tailoring)"
                  className="flex-1 px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
                />
                <input
                  type="text"
                  value={newNavSlug}
                  onChange={(e) => setNewNavSlug(e.target.value)}
                  placeholder="Category Slug (e.g. bespoke)"
                  className="w-full sm:w-48 px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono focus:outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={handleAddNavLink}
                  className="px-5 py-2 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Page</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: Top Announcement Bar
        ======================================================== */}
        {activeTab === 'announcement' && (
          <div className="bg-white border border-[#E5E0D5] p-6 space-y-4">
            <div className="border-b border-[#EFECE5] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                3. Top Announcement &amp; Privilege Notification Strip
              </h3>
              <p className="text-xs text-[#736E66] font-mono mt-0.5">
                Displays the pinned top bar announcement at the very summit of every customer page.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showAnnouncement"
                checked={formData.showAnnouncement !== false}
                onChange={(e) => setFormData({ ...formData, showAnnouncement: e.target.checked })}
                className="w-4 h-4 text-black focus:ring-0 cursor-pointer"
              />
              <label htmlFor="showAnnouncement" className="text-xs font-mono font-medium text-[#1A1918] cursor-pointer">
                Display Announcement Banner on Storefront
              </label>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Announcement Message Text *
              </label>
              <textarea
                rows={2}
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                placeholder="COMPLIMENTARY WHITE-GLOVE WORLDWIDE DELIVERY ON ORDERS OVER $500 • PRIVATE SALON APPOINTMENTS PARIS • NEW YORK"
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono uppercase focus:outline-none focus:border-black"
              />
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: Hero Campaign Section & Cloudinary Banner
        ======================================================== */}
        {activeTab === 'hero' && (
          <div className="bg-white border border-[#E5E0D5] p-6 space-y-5">
            <div className="border-b border-[#EFECE5] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                4. Homepage Hero Campaign Banner &amp; Editorial Headlines
              </h3>
              <p className="text-xs text-[#736E66] font-mono mt-0.5">
                Upload your high-resolution hero banner to Cloudinary and customize the editorial headline narrative.
              </p>
            </div>

            {/* Cloudinary Banner Upload */}
            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-2 font-semibold">
                Upload Hero Banner Picture to Cloudinary (kkroq7e1)
              </label>
              <CloudinaryUploader
                folder="vendome_store/banners"
                label="Upload Hero Picture via Cloudinary CDN (kkroq7e1)"
                currentImageUrl={formData.heroImage}
                onUploadSuccess={(url) => {
                  setFormData(prev => ({ ...prev, heroImage: url }));
                }}
              />
            </div>

            {/* Presets or custom URL */}
            <div>
              <span className="text-[10px] font-mono uppercase text-[#777] block mb-1.5">
                Or Select from Preset Atelier Banners:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-2">
                {heroImagePresets.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => setFormData({ ...formData, heroImage: preset.url })}
                    className={`cursor-pointer border p-1 transition-all ${
                      formData.heroImage === preset.url
                        ? 'border-[#1C1B19] ring-2 ring-[#1C1B19]/20'
                        : 'border-[#DDD8CD] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-[#EEE]">
                      <img src={preset.url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-mono text-[#555] block mt-1 line-clamp-1">
                      {preset.label}
                    </span>
                  </div>
                ))}
              </div>

              <input
                type="text"
                value={formData.heroImage}
                onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                placeholder="Or paste external banner image URL"
                className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Hero Tagline Badge *
                </label>
                <input
                  type="text"
                  required
                  value={formData.heroTagline}
                  onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Primary Button Call to Action *
                </label>
                <input
                  type="text"
                  required
                  value={formData.heroCtaText}
                  onChange={(e) => setFormData({ ...formData, heroCtaText: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Hero Headline (Large Display Font) *
              </label>
              <input
                type="text"
                required
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-sm font-serif"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Hero Subtitle Narrative Prose *
              </label>
              <textarea
                rows={2}
                required
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Secondary Button Label
                </label>
                <input
                  type="text"
                  value={formData.heroSecondaryCtaText || ''}
                  onChange={(e) => setFormData({ ...formData, heroSecondaryCtaText: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Bottom Geographic Coordinates
                </label>
                <input
                  type="text"
                  value={formData.heroCoordinates || ''}
                  onChange={(e) => setFormData({ ...formData, heroCoordinates: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Bottom Edition Tag
                </label>
                <input
                  type="text"
                  value={formData.heroEdition || ''}
                  onChange={(e) => setFormData({ ...formData, heroEdition: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: Maison Feature Privileges (4 Cards)
        ======================================================== */}
        {activeTab === 'privileges' && (
          <div className="bg-white border border-[#E5E0D5] p-6 space-y-5">
            <div className="border-b border-[#EFECE5] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                5. Atelier Feature Privileges (4 Cards under Hero)
              </h3>
              <p className="text-xs text-[#736E66] font-mono mt-0.5">
                Customize the 4 service privilege guarantees displayed directly beneath the hero banner.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF9F5] p-4 border border-[#E5E0D5] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#888] font-bold">Privilege Card 1</span>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.privilege1Title || ''}
                    onChange={(e) => setFormData({ ...formData, privilege1Title: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Description</label>
                  <input
                    type="text"
                    value={formData.privilege1Desc || ''}
                    onChange={(e) => setFormData({ ...formData, privilege1Desc: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs"
                  />
                </div>
              </div>

              <div className="bg-[#FAF9F5] p-4 border border-[#E5E0D5] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#888] font-bold">Privilege Card 2</span>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.privilege2Title || ''}
                    onChange={(e) => setFormData({ ...formData, privilege2Title: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Description</label>
                  <input
                    type="text"
                    value={formData.privilege2Desc || ''}
                    onChange={(e) => setFormData({ ...formData, privilege2Desc: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs"
                  />
                </div>
              </div>

              <div className="bg-[#FAF9F5] p-4 border border-[#E5E0D5] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#888] font-bold">Privilege Card 3</span>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.privilege3Title || ''}
                    onChange={(e) => setFormData({ ...formData, privilege3Title: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Description</label>
                  <input
                    type="text"
                    value={formData.privilege3Desc || ''}
                    onChange={(e) => setFormData({ ...formData, privilege3Desc: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs"
                  />
                </div>
              </div>

              <div className="bg-[#FAF9F5] p-4 border border-[#E5E0D5] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#888] font-bold">Privilege Card 4</span>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.privilege4Title || ''}
                    onChange={(e) => setFormData({ ...formData, privilege4Title: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Description</label>
                  <input
                    type="text"
                    value={formData.privilege4Desc || ''}
                    onChange={(e) => setFormData({ ...formData, privilege4Desc: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: Section Headings
        ======================================================== */}
        {activeTab === 'sections' && (
          <div className="bg-white border border-[#E5E0D5] p-6 space-y-5">
            <div className="border-b border-[#EFECE5] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                6. Section Headings &amp; Kicker Labels
              </h3>
              <p className="text-xs text-[#736E66] font-mono mt-0.5">
                Customize titles and kicker subtitles for the storefront sections.
              </p>
            </div>

            {/* Archetypes */}
            <div className="bg-[#FAF9F5] p-4 border border-[#E5E0D5] space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#888] font-bold">Section: Curated Archetypes</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Kicker Label</label>
                  <input
                    type="text"
                    value={formData.archetypesKicker || ''}
                    onChange={(e) => setFormData({ ...formData, archetypesKicker: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Section Title</label>
                  <input
                    type="text"
                    value={formData.archetypesTitle || ''}
                    onChange={(e) => setFormData({ ...formData, archetypesTitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-serif"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Index Link Label</label>
                  <input
                    type="text"
                    value={formData.archetypesButtonText || ''}
                    onChange={(e) => setFormData({ ...formData, archetypesButtonText: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Catalog */}
            <div className="bg-[#FAF9F5] p-4 border border-[#E5E0D5] space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#888] font-bold">Section: Autumn Selection &amp; Catalog</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Kicker Label</label>
                  <input
                    type="text"
                    value={formData.catalogKicker || ''}
                    onChange={(e) => setFormData({ ...formData, catalogKicker: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Section Title</label>
                  <input
                    type="text"
                    value={formData.catalogTitle || ''}
                    onChange={(e) => setFormData({ ...formData, catalogTitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-serif"
                  />
                </div>
              </div>
            </div>

            {/* Atelier Icons */}
            <div className="bg-[#FAF9F5] p-4 border border-[#E5E0D5] space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#888] font-bold">Section: Permanent Atelier Icons</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Kicker Label</label>
                  <input
                    type="text"
                    value={formData.iconsKicker || ''}
                    onChange={(e) => setFormData({ ...formData, iconsKicker: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Section Title</label>
                  <input
                    type="text"
                    value={formData.iconsTitle || ''}
                    onChange={(e) => setFormData({ ...formData, iconsTitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-serif"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Subtitle Prose</label>
                  <input
                    type="text"
                    value={formData.iconsSubtitle || ''}
                    onChange={(e) => setFormData({ ...formData, iconsSubtitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Private Archives */}
            <div className="bg-[#FAF9F5] p-4 border border-[#E5E0D5] space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#888] font-bold">Section: The Private Archives Banner</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Kicker Label</label>
                  <input
                    type="text"
                    value={formData.archivesKicker || ''}
                    onChange={(e) => setFormData({ ...formData, archivesKicker: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Headline</label>
                  <input
                    type="text"
                    value={formData.archivesTitle || ''}
                    onChange={(e) => setFormData({ ...formData, archivesTitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-serif"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Description Prose</label>
                <textarea
                  rows={2}
                  value={formData.archivesText || ''}
                  onChange={(e) => setFormData({ ...formData, archivesText: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Button Label</label>
                  <input
                    type="text"
                    value={formData.archivesButtonText || ''}
                    onChange={(e) => setFormData({ ...formData, archivesButtonText: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Access Disclaimer Note</label>
                  <input
                    type="text"
                    value={formData.archivesNote || ''}
                    onChange={(e) => setFormData({ ...formData, archivesNote: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-mono uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 7: The Manifesto & Savoir-Faire (with Cloudinary Craft Photo)
        ======================================================== */}
        {activeTab === 'manifesto' && (
          <div className="bg-white border border-[#E5E0D5] p-6 space-y-5">
            <div className="border-b border-[#EFECE5] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                7. The Manifesto &amp; Craftsmanship Specifications
              </h3>
              <p className="text-xs text-[#736E66] font-mono mt-0.5">
                Upload your craftsmanship photo to Cloudinary and edit philosophy quotes, yarn purity metrics, and atelier fitting buttons.
              </p>
            </div>

            {/* Cloudinary Craftsmanship Picture Upload */}
            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1 font-semibold">
                Upload Craftsmanship Picture via Cloudinary CDN (kkroq7e1)
              </label>
              <CloudinaryUploader
                folder="vendome_store/brand"
                label="Upload Craftsmanship Picture (kkroq7e1)"
                currentImageUrl={formData.manifestoImage}
                onUploadSuccess={(url) => {
                  setFormData(prev => ({ ...prev, manifestoImage: url }));
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Manifesto Kicker</label>
                <input
                  type="text"
                  value={formData.manifestoKicker || ''}
                  onChange={(e) => setFormData({ ...formData, manifestoKicker: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono uppercase"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Philosophical Headline Quote</label>
                <input
                  type="text"
                  value={formData.manifestoQuote || ''}
                  onChange={(e) => setFormData({ ...formData, manifestoQuote: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-serif"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Manifesto Narrative Body</label>
              <textarea
                rows={3}
                value={formData.manifestoText || ''}
                onChange={(e) => setFormData({ ...formData, manifestoText: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#FAF9F5] p-3 border border-[#E5E0D5] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#888] font-bold">Savoir-Faire Card</span>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#666] block">Card Title</label>
                  <input
                    type="text"
                    value={formData.manifestoSpecLabel || ''}
                    onChange={(e) => setFormData({ ...formData, manifestoSpecLabel: e.target.value })}
                    className="w-full px-2 py-1 bg-white border text-xs font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#666] block">Card Text</label>
                  <input
                    type="text"
                    value={formData.manifestoSpecText || ''}
                    onChange={(e) => setFormData({ ...formData, manifestoSpecText: e.target.value })}
                    className="w-full px-2 py-1 bg-white border text-xs"
                  />
                </div>
              </div>

              <div className="bg-[#FAF9F5] p-3 border border-[#E5E0D5] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#888] font-bold">Purity Metric Box</span>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#666] block">Metric (e.g. 0.0%)</label>
                  <input
                    type="text"
                    value={formData.manifestoFiberMetric || ''}
                    onChange={(e) => setFormData({ ...formData, manifestoFiberMetric: e.target.value })}
                    className="w-full px-2 py-1 bg-white border text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#666] block">Metric Description</label>
                  <input
                    type="text"
                    value={formData.manifestoFiberDesc || ''}
                    onChange={(e) => setFormData({ ...formData, manifestoFiberDesc: e.target.value })}
                    className="w-full px-2 py-1 bg-white border text-xs font-mono uppercase"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Origin Label &amp; Value</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.manifestoOriginLabel || ''}
                    onChange={(e) => setFormData({ ...formData, manifestoOriginLabel: e.target.value })}
                    className="w-1/3 px-2 py-1 bg-[#FAF9F5] border text-xs font-mono uppercase"
                  />
                  <input
                    type="text"
                    value={formData.manifestoOriginValue || ''}
                    onChange={(e) => setFormData({ ...formData, manifestoOriginValue: e.target.value })}
                    className="flex-1 px-2 py-1 bg-[#FAF9F5] border text-xs font-serif"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Pedigree Label &amp; Value</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.manifestoPedigreeLabel || ''}
                    onChange={(e) => setFormData({ ...formData, manifestoPedigreeLabel: e.target.value })}
                    className="w-1/3 px-2 py-1 bg-[#FAF9F5] border text-xs font-mono uppercase"
                  />
                  <input
                    type="text"
                    value={formData.manifestoPedigreeValue || ''}
                    onChange={(e) => setFormData({ ...formData, manifestoPedigreeValue: e.target.value })}
                    className="flex-1 px-2 py-1 bg-[#FAF9F5] border text-xs font-serif"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Button 1 Label</label>
                <input
                  type="text"
                  value={formData.manifestoButton1 || ''}
                  onChange={(e) => setFormData({ ...formData, manifestoButton1: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono uppercase"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Button 2 Label (Salon Fitting)</label>
                <input
                  type="text"
                  value={formData.manifestoButton2 || ''}
                  onChange={(e) => setFormData({ ...formData, manifestoButton2: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono uppercase"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 8: Scènes de Vie Gallery (Cloudinary Picture Uploader for all 5)
        ======================================================== */}
        {activeTab === 'gallery' && (
          <div className="bg-white border border-[#E5E0D5] p-6 space-y-5">
            <div className="border-b border-[#EFECE5] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                8. Scènes de Vie Runway Diary Gallery Photos
              </h3>
              <p className="text-xs text-[#736E66] font-mono mt-0.5">
                Upload and replace any of the 5 editorial diary photos via Cloudinary, and update location tags.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Section Kicker</label>
                <input
                  type="text"
                  value={formData.scenesKicker || ''}
                  onChange={(e) => setFormData({ ...formData, scenesKicker: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-[#FAF9F5] border border-[#DDD] text-xs font-mono uppercase"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Section Title</label>
                <input
                  type="text"
                  value={formData.scenesTitle || ''}
                  onChange={(e) => setFormData({ ...formData, scenesTitle: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-[#FAF9F5] border border-[#DDD] text-xs font-serif"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">Instagram Link Text</label>
                <input
                  type="text"
                  value={formData.scenesFollowText || ''}
                  onChange={(e) => setFormData({ ...formData, scenesFollowText: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-[#FAF9F5] border border-[#DDD] text-xs font-mono uppercase"
                />
              </div>
            </div>

            {/* 5 Gallery Photos */}
            <div className="space-y-4 pt-2">
              <span className="text-[11px] font-mono uppercase text-[#666] font-bold block">
                Editorial Photo Entries (Upload via Cloudinary)
              </span>

              {(formData.scenesGallery || []).map((item, idx) => (
                <div key={item.id || idx} className="p-4 bg-[#FAF9F5] border border-[#E5E0D5] space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="font-mono text-xs font-bold text-[#141413]">
                      Editorial Shot #{idx + 1}: {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#777] uppercase bg-white px-2 py-0.5 border">
                      Location: {item.location}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#666] block mb-1">Photo Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateGalleryItem(item.id, { title: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-serif"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-[#666] block mb-1">Location Subtitle</label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => handleUpdateGalleryItem(item.id, { location: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-white border border-[#DDD] text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#666] block mb-1">
                      Upload Picture to Cloudinary (kkroq7e1)
                    </label>
                    <CloudinaryUploader
                      folder="vendome_store/gallery"
                      label={`Upload Shot #${idx + 1} to Cloudinary (kkroq7e1)`}
                      currentImageUrl={item.image}
                      onUploadSuccess={(url) => {
                        handleUpdateGalleryItem(item.id, { image: url });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 9: WhatsApp & Contacts
        ======================================================== */}
        {activeTab === 'contact' && (
          <div className="bg-white border border-[#E5E0D5] p-6 space-y-5">
            <div className="border-b border-[#EFECE5] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                9. WhatsApp Order Integration &amp; Salon Concierge Contacts
              </h3>
              <p className="text-xs text-[#736E66] font-mono mt-0.5">
                Customers can order directly via WhatsApp or contact your Paris atelier concierge.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  WhatsApp Order Number (with Country Code) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="+33142680020"
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#25D366] text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-[#1E7E34] font-mono block mt-1">
                  Directly receives 1-click orders from catalog and checkout with itemized line items.
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Official Atelier Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Salon Telephony Hotline
                </label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Instagram Runway Handle
                </label>
                <input
                  type="text"
                  value={formData.instagramHandle}
                  onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                  placeholder="@vendome_editions"
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Atelier &amp; Salon Address
                </label>
                <input
                  type="text"
                  value={formData.atelierAddress}
                  onChange={(e) => setFormData({ ...formData, atelierAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-serif"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 10: Policies & Footer
        ======================================================== */}
        {activeTab === 'policies' && (
          <div className="bg-white border border-[#E5E0D5] p-6 space-y-5">
            <div className="border-b border-[#EFECE5] pb-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">
                10. Maison Policies, Gazette Newsletter &amp; Footer
              </h3>
              <p className="text-xs text-[#736E66] font-mono mt-0.5">
                Manage legal transparency, white-glove shipping policies, Gazette newsletter prompts, and copyright lines.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  About The Maison Statement
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutUs}
                  onChange={(e) => setFormData({ ...formData, aboutUs: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Shipping &amp; Courier Transit Policy
                </label>
                <textarea
                  rows={3}
                  value={formData.shippingPolicy}
                  onChange={(e) => setFormData({ ...formData, shippingPolicy: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Return &amp; Alteration Policy
                </label>
                <textarea
                  rows={3}
                  value={formData.returnPolicy}
                  onChange={(e) => setFormData({ ...formData, returnPolicy: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Privacy &amp; Discretion Protocol
                </label>
                <textarea
                  rows={3}
                  value={formData.privacyPolicy}
                  onChange={(e) => setFormData({ ...formData, privacyPolicy: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#EFECE5] space-y-3">
              <span className="text-[11px] font-mono uppercase text-[#666] font-bold block">
                Footer Copy &amp; Cities
              </span>

              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Footer Brand Description Prose
                </label>
                <textarea
                  rows={2}
                  value={formData.footerDescription || ''}
                  onChange={(e) => setFormData({ ...formData, footerDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Gazette Privée Title
                  </label>
                  <input
                    type="text"
                    value={formData.footerGazetteTitle || ''}
                    onChange={(e) => setFormData({ ...formData, footerGazetteTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Gazette Privée Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.footerGazetteText || ''}
                    onChange={(e) => setFormData({ ...formData, footerGazetteText: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Footer Copyright Notice
                  </label>
                  <input
                    type="text"
                    value={formData.footerCopyright || ''}
                    onChange={(e) => setFormData({ ...formData, footerCopyright: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                    Footer Atelier Cities Listing
                  </label>
                  <input
                    type="text"
                    value={formData.footerCities || ''}
                    onChange={(e) => setFormData({ ...formData, footerCities: e.target.value })}
                    placeholder="PARIS • NEW YORK • TOKYO • LONDON"
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Floating Save Bar */}
        <div className="sticky bottom-4 z-20 flex items-center justify-between p-4 bg-[#1C1B19] text-white border border-[#3A3834] shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready to publish changes to live storefront</span>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-[#EAE5D8] flex items-center gap-2 font-semibold"
          >
            {savedNotice ? <Check className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}
            <span>{savedNotice ? 'Storefront Updated Successfully!' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
