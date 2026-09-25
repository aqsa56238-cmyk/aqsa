import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Save, RotateCcw, Check, Sparkles, Image, Globe, Phone, Mail, Shield } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetToDefaults } = useStore();
  const [formData, setFormData] = useState({ ...settings });
  const [savedNotice, setSavedNotice] = useState(false);

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
    if (confirm('Restore all store settings and sample catalog to pristine factory defaults?')) {
      resetToDefaults();
      setFormData(settings);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#141413]">
            Database-Driven Website Settings &amp; Brand Styling
          </h2>
          <p className="text-xs text-[#6B665E] mt-1 font-mono">
            Modifications applied here dynamically and instantly reflect across the entire customer storefront
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
            onClick={handleSave}
            className="px-5 py-2 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black flex items-center gap-1.5 transition-colors"
          >
            {savedNotice ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
            <span>{savedNotice ? 'Storefront Updated!' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs font-sans">
        {/* Section 1: Brand & Identity */}
        <div className="bg-white border border-[#E5E0D5] p-6 space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#1A1918] flex items-center gap-2 pb-2 border-b border-[#EFECE5]">
            <Globe className="w-4 h-4 text-[#8C877E]" />
            <span>1. Store Identity &amp; Currencies</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Maison Philosophy / Subtitle *
              </label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] focus:outline-none focus:border-black text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                  Currency Code
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-2 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
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
                  Currency Symbol
                </label>
                <input
                  type="text"
                  required
                  value={formData.currencySymbol}
                  onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                  className="w-full px-2 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
              Complimentary White-Glove Shipping Threshold ({formData.currencySymbol})
            </label>
            <input
              type="number"
              min={0}
              value={formData.freeShippingThreshold}
              onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
              className="w-48 px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
            />
            <span className="text-[11px] text-[#777] ml-2 font-mono">
              Orders equal to or exceeding this qualify for free courier shipping.
            </span>
          </div>
        </div>

        {/* Section 2: Hero Banner & Editorial Headlines */}
        <div className="bg-white border border-[#E5E0D5] p-6 space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#1A1918] flex items-center gap-2 pb-2 border-b border-[#EFECE5]">
            <Image className="w-4 h-4 text-[#8C877E]" />
            <span>2. Homepage Hero Banner &amp; Editorial Typography</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Seasonal Tagline Badge *
              </label>
              <input
                type="text"
                required
                value={formData.heroTagline}
                onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Primary Button Call-to-Action
              </label>
              <input
                type="text"
                required
                value={formData.heroCtaText}
                onChange={(e) => setFormData({ ...formData, heroCtaText: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] focus:outline-none focus:border-black text-xs font-mono uppercase"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
              Hero Editorial Headline *
            </label>
            <input
              type="text"
              required
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] focus:outline-none focus:border-black text-sm font-serif"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
              Hero Subtitle Narrative *
            </label>
            <textarea
              rows={2}
              required
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] focus:outline-none focus:border-black text-xs"
            />
          </div>

          {/* Hero Image Selector & Presets */}
          <div>
            <label className="text-[11px] font-mono uppercase text-[#666] block mb-2">
              Hero Editorial Image (Presets or Custom URL)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-3">
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
              placeholder="Or enter custom image URL"
              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
            />
          </div>
        </div>

        {/* Section 3: WhatsApp, Salon Contacts & Socials */}
        <div className="bg-white border border-[#E5E0D5] p-6 space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#1A1918] flex items-center gap-2 pb-2 border-b border-[#EFECE5]">
            <Phone className="w-4 h-4 text-[#8C877E]" />
            <span>3. WhatsApp Order Integration &amp; Salon Concierge</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#25D366] text-xs font-mono"
              />
              <span className="text-[10px] text-[#25D366] font-mono block mt-1">
                Directly receives WhatsApp 1-click orders from catalog &amp; checkout!
              </span>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Official Contact Email *
              </label>
              <input
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
              />
            </div>

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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Salon &amp; Atelier Physical Address
              </label>
              <input
                type="text"
                value={formData.atelierAddress}
                onChange={(e) => setFormData({ ...formData, atelierAddress: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-serif"
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
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Policies & Savoir-Faire */}
        <div className="bg-white border border-[#E5E0D5] p-6 space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#1A1918] flex items-center gap-2 pb-2 border-b border-[#EFECE5]">
            <Shield className="w-4 h-4 text-[#8C877E]" />
            <span>4. Policies, Savoir-Faire &amp; Transparency</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                About The Maison
              </label>
              <textarea
                rows={3}
                value={formData.aboutUs}
                onChange={(e) => setFormData({ ...formData, aboutUs: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Shipping &amp; Delivery Policy
              </label>
              <textarea
                rows={3}
                value={formData.shippingPolicy}
                onChange={(e) => setFormData({ ...formData, shippingPolicy: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 p-4 bg-white border border-[#E5E0D5]">
          <button
            type="submit"
            className="px-7 py-3 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save All Website Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
