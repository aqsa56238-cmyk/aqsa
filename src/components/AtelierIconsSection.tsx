import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag } from 'lucide-react';

export const AtelierIconsSection: React.FC = () => {
  const { products, settings, addToCart, setSelectedProduct } = useStore();

  // Find 3 iconic items
  const iconProducts = products.filter(p => p.isFeatured).slice(0, 3);

  const handleQuickAdd = (p: typeof iconProducts[0]) => {
    const size = p.sizes[0] || 'Standard';
    const color = p.colors[0] || { name: 'Default', hex: '#000' };
    addToCart(p, size, color, 1);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#E8E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#736E66] block mb-2">
              PERMANENT COLLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#141413] font-light">
              Atelier Icons
            </h2>
          </div>
          <p className="text-xs text-[#706B62] max-w-sm font-light leading-relaxed self-start md:self-end">
            Pieces that transcend seasonal cadences. Reissued annually in strictly numbered editions.
          </p>
        </div>

        {/* 3 Icons Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {iconProducts.map((p, idx) => (
            <div
              key={p.id}
              className="group bg-white border border-[#E8E4DA] p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
            >
              <div>
                {/* Visual Area */}
                <div
                  onClick={() => setSelectedProduct(p)}
                  className="aspect-[4/5] bg-[#F3EFE7] overflow-hidden mb-4 relative cursor-pointer"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#1C1B19]/85 text-white text-[10px] font-mono tracking-widest px-2.5 py-1 uppercase backdrop-blur-xs">
                    ICON N° 0{idx + 1}
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-baseline justify-between mb-1">
                  <h3
                    onClick={() => setSelectedProduct(p)}
                    className="font-serif text-lg text-[#161615] font-medium hover:text-black cursor-pointer"
                  >
                    {p.name}
                  </h3>
                  <span className="font-mono text-sm font-semibold text-[#161615] tabular-nums">
                    {settings.currencySymbol}{p.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-[#757067] font-light line-clamp-1 italic mb-4">
                  {p.material}
                </p>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={() => handleQuickAdd(p)}
                className="w-full py-3 border border-[#1C1B19] text-[#1C1B19] text-xs font-mono uppercase tracking-[0.18em] hover:bg-[#1C1B19] hover:text-white transition-all flex items-center justify-center gap-2 group-hover:bg-[#1C1B19] group-hover:text-white"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO BAG</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
