import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, Scissors, ShieldCheck, PhoneCall } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, setActiveCategory } = useStore();

  const handleExplore = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleManifesto = () => {
    const el = document.getElementById('manifesto-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#181816] text-[#FAF9F5] overflow-hidden">
      {/* Hero Visual Container */}
      <div className="relative min-h-[580px] sm:min-h-[680px] lg:min-h-[760px] flex items-center">
        {/* Editorial Background Image with Fallback */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings.heroImage || "/src/assets/images/hero_luxury_coat_1790325188738.jpg"}
            alt="Vendôme Éditions Autumn Collection"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Measured Scrim for WCAG AA readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent sm:from-black/75 sm:via-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/25" />
        </div>

        {/* Content Block */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#E0DACE] border border-[#E0DACE]/30 px-3 py-1 bg-black/30 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E0DACE] animate-pulse" />
              <span>{settings.heroTagline}</span>
            </div>

            {/* Editorial Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light tracking-[0.03em] leading-[1.08] text-white">
              {settings.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-[#D6D0C4] text-sm sm:text-base leading-relaxed font-light max-w-xl">
              {settings.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleExplore}
                className="px-7 py-3.5 bg-white text-[#181816] text-xs font-medium tracking-[0.2em] uppercase hover:bg-[#EAE6DD] transition-all duration-200"
              >
                {settings.heroCtaText}
              </button>
              <button
                onClick={handleManifesto}
                className="px-6 py-3.5 border border-white/40 text-white text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white transition-all duration-200 flex items-center gap-2"
              >
                <span>Read The Monograph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Coordinates Strip */}
        <div className="absolute bottom-4 left-0 right-0 z-10 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between text-[11px] font-mono tracking-[0.16em] uppercase text-[#C4BEB2]/80">
            <div>N° 04 &bull; PLACE VENDÔME, SALON PRIVÉ, PARIS 1er</div>
            <div>AUTUMN / WINTER EDITION 2026</div>
          </div>
        </div>
      </div>

      {/* Feature Privileges Band */}
      <div className="bg-[#1C1B19] border-t border-[#312E2A] py-6 sm:py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-3">
            <div className="p-2 border border-[#3E3A34] text-[#E0DACE] shrink-0">
              <Sparkles className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-wider uppercase text-white">White-Glove Courier</h2>
              <p className="text-[11px] text-[#A6A095] mt-1 leading-snug">Worldwide carbon-neutral transit & insured bespoke delivery.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 border border-[#3E3A34] text-[#E0DACE] shrink-0">
              <Scissors className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-wider uppercase text-white">Atelier Alterations</h2>
              <p className="text-[11px] text-[#A6A095] mt-1 leading-snug">Complimentary tailoring in Paris, London & New York salons.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 border border-[#3E3A34] text-[#E0DACE] shrink-0">
              <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-wider uppercase text-white">Lifetime Preservation</h2>
              <p className="text-[11px] text-[#A6A095] mt-1 leading-snug">Annual cashmere de-pilling & leather conditioning guarantee.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 border border-[#3E3A34] text-[#E0DACE] shrink-0">
              <PhoneCall className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-wider uppercase text-white">Private Concierge</h2>
              <p className="text-[11px] text-[#A6A095] mt-1 leading-snug">Direct stylist consultation & salon fitting appointments.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
