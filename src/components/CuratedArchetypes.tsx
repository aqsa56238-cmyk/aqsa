import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const CuratedArchetypes: React.FC = () => {
  const { categories, setActiveCategory, settings } = useStore();

  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#E8E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#736E66] block mb-2">
              {settings.archetypesKicker || 'ARCHITECTURAL TAXONOMY'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#141413] font-light">
              {settings.archetypesTitle || 'Curated Archetypes'}
            </h2>
          </div>
          <button
            onClick={() => handleSelectCategory('all')}
            className="text-xs font-mono tracking-[0.15em] uppercase text-[#3A3834] hover:text-black flex items-center gap-1 group self-start sm:self-end"
          >
            <span>{settings.archetypesButtonText || 'View Complete Index'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 4 Architectural Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.slice(0, 4).map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.slug)}
              className="group cursor-pointer flex flex-col justify-between bg-white border border-[#E8E4DA] p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Visual Asset Container */}
                <div className="aspect-[3/4] overflow-hidden bg-[#F2EFE9] mb-4 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#1A1A18]/85 text-white text-[10px] font-mono tracking-widest px-2 py-0.5 uppercase backdrop-blur-sm">
                    EDITION {['I', 'II', 'III', 'IV'][idx] || 'V'}
                  </div>
                </div>

                {/* Text Metadata */}
                <h3 className="font-serif text-lg sm:text-xl text-[#1A1918] group-hover:text-black transition-colors font-medium">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#6E6960] mt-1.5 leading-relaxed font-light line-clamp-2">
                  {cat.description}
                </p>
              </div>

              {/* Action Link Footer */}
              <div className="mt-5 pt-3 border-t border-[#ECE8DF] flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#54504A] group-hover:text-[#141413]">
                <span>EXPLORE {cat.itemCount || 12} PIECES</span>
                <span className="text-sm font-sans">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
