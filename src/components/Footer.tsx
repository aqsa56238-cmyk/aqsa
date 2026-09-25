import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Instagram, MapPin, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveCategory, setIsTrackingOpen } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    const cat = document.getElementById('catalog-section');
    cat?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF9F5] text-[#222] border-t border-[#E8E5DD] pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#E8E4DA]">
          {/* Brand & Manifesto Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl font-normal tracking-[0.16em] uppercase text-[#141413]">
              {settings.storeName}
            </h3>
            <p className="text-xs text-[#5D5850] font-light leading-relaxed max-w-sm">
              Architectural silhouettes and artisanal savoir-faire crafted in our Parisian atelier. Silent luxury conceived for enduring aesthetic permanence.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[#4A4741]">
              <a
                href={`mailto:${settings.contactEmail}`}
                className="w-8 h-8 rounded-full border border-[#D5D0C4] flex items-center justify-center hover:border-black hover:text-black transition-colors"
                title="Email Atelier"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#D5D0C4] flex items-center justify-center hover:border-black hover:text-black transition-colors"
                title="Instagram Runway"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsTrackingOpen(true)}
                className="w-8 h-8 rounded-full border border-[#D5D0C4] flex items-center justify-center hover:border-black hover:text-black transition-colors"
                title="Track Consignment"
              >
                <MapPin className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Divisions (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#757067] block">
              DIVISIONS
            </span>
            <ul className="space-y-2 text-xs text-[#4F4B43]">
              <li>
                <button onClick={() => handleCategoryClick('all')} className="hover:text-black transition-colors">
                  Ready-To-Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('tailoring')} className="hover:text-black transition-colors">
                  Tailoring &amp; Coats
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('leather-goods')} className="hover:text-black transition-colors">
                  Leather Goods
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('knitwear')} className="hover:text-black transition-colors">
                  Fine Objects &amp; Knit
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('men')} className="hover:text-black transition-colors">
                  Monsieur Vendôme
                </button>
              </li>
            </ul>
          </div>

          {/* Maison & Care (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#757067] block">
              MAISON &amp; CARE
            </span>
            <ul className="space-y-2 text-xs text-[#4F4B43]">
              <li>
                <a href="#manifesto-section" className="hover:text-black transition-colors">
                  Atelier &amp; Bespoke
                </a>
              </li>
              <li>
                <span className="text-[#555]">Boutiques &amp; Salons Privés</span>
              </li>
              <li>
                <button onClick={() => setIsTrackingOpen(true)} className="hover:text-black transition-colors">
                  Track Consignment
                </button>
              </li>
              <li>
                <span className="text-[#555]">White-Glove Courier Transit</span>
              </li>
              <li>
                <span className="text-[#555]">Garment Lifetime Preservation</span>
              </li>
            </ul>
          </div>

          {/* Gazette Privée Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#757067] block">
              THE GAZETTE PRIVÉE
            </span>
            <p className="text-xs text-[#635F56] font-light leading-relaxed">
              Receive private preview invitations, seasonal folios, and numbered atelier releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex border-b border-[#1C1B19] pb-1">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full bg-transparent text-xs font-mono placeholder-[#8C867C] focus:outline-none uppercase"
                />
                <button
                  type="submit"
                  className="text-xs font-mono uppercase tracking-widest font-semibold hover:opacity-70 transition-opacity ml-2 shrink-0"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : 'JOIN'}
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-[#295438] font-mono">
                  Welcome to the Gazette Privée circle.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Legal & Cities Footnote */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-[#7E7970]">
          <div>
            &copy; 2026 {settings.storeName} &bull; ALL RIGHTS RESERVED
          </div>

          <div className="flex items-center gap-4 text-[#8A847A]">
            <span>PARIS</span>
            <span>&bull;</span>
            <span>NEW YORK</span>
            <span>&bull;</span>
            <span>TOKYO</span>
            <span>&bull;</span>
            <span>LONDON</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
