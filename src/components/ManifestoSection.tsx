import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Compass } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  const { settings } = useStore();

  const handleSalonBooking = () => {
    const text = encodeURIComponent(`Bonjour Vendôme Éditions, I would like to inquire about reserving a private salon fitting session in Paris or New York.`);
    window.open(`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <section id="manifesto-section" className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#E8E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Tactile Visual Asset & Craftsmanship Metrics */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] bg-[#EFECE4] overflow-hidden border border-[#E0DBD0]">
              <img
                src="/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg"
                alt="Artisanal Cashmere Tactile Craft"
                className="w-full h-full object-cover object-center filter contrast-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Inset Savoir-Faire Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 border border-[#DDD6C8] shadow-sm">
                <span className="text-[10px] font-mono tracking-widest text-[#7C766C] uppercase block mb-1">
                  SAVOIR-FAIRE SPECIFICATION
                </span>
                <p className="text-xs text-[#2A2926] leading-relaxed">
                  36 hours of hand-guided stitchwork per garment by master tailors in our Place Vendôme workshop.
                </p>
              </div>
            </div>

            {/* Floating Black Accent Stat */}
            <div className="absolute -bottom-6 -right-4 bg-[#141413] text-white p-5 border border-[#33312E] max-w-[210px] hidden sm:block shadow-xl">
              <div className="font-serif text-3xl font-light text-[#E8E3D8]">0.0%</div>
              <div className="text-[10px] font-mono tracking-wider uppercase text-[#B5AFA4] mt-1">
                SYNTHETIC FIBERS TOLERANCE IN ALL CORE GARMENTS
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Manifesto & Values */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#7D786E] block">
              THE VENDÔME MANIFESTO
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#141413] leading-[1.15]">
              &ldquo;Luxury is not excess, but the rigorous elimination of everything superfluous.&rdquo;
            </h2>

            <p className="text-[#4F4B44] text-sm sm:text-base leading-relaxed font-light">
              In an era of disposable velocity, we engineer garments governed by architectural proportion and absolute materiality. Every silhouette is conceived as a sculpture in motion—balanced against the human form and cut exclusively from regenerative fibers sourced directly from small heritage mills across Biella, Como, and the Scottish Highlands.
            </p>

            {/* Provenance Protocol Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EAE6DE]">
              <div className="bg-white border border-[#E3DED4] p-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#736E66] block mb-1">
                  ORIGIN PROTOCOL
                </span>
                <p className="text-sm font-serif font-medium text-[#1A1918]">
                  {settings.atelierAddress}
                </p>
              </div>

              <div className="bg-white border border-[#E3DED4] p-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#736E66] block mb-1">
                  TEXTILE PEDIGREE
                </span>
                <p className="text-sm font-serif font-medium text-[#1A1918]">
                  Certified Loro Piana & Dormeuil Mills
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const cat = document.getElementById('catalog-section');
                  cat?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors"
              >
                EXPLORE THE ATELIER
              </button>

              <button
                onClick={handleSalonBooking}
                className="px-6 py-3 border border-[#C5BFB3] text-[#1C1B19] text-xs font-mono uppercase tracking-[0.2em] hover:border-black transition-colors"
              >
                RESERVE A PRIVATE SALON FITTING
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
