import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    settings,
    setSelectedProduct
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.status === 'active' &&
          (p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.material.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const suggestions = ['Cashmere Trench', 'Hourglass Blazer', 'Calf Tote', 'Silk Column Gown', 'Overcoat'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fadeIn">
      <div
        className="relative bg-[#FAF9F5] border border-[#DDD6C8] w-full max-w-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top search bar */}
        <div className="flex items-center gap-3 border-b-2 border-[#1C1B19] pb-3 mb-6">
          <Search className="w-5 h-5 text-[#1C1B19] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search archival pieces, fabrics, silhouettes..."
            className="w-full bg-transparent text-lg sm:text-xl font-serif text-[#141413] placeholder-[#8C867C] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-sm font-mono text-[#8C867C] hover:text-black">
              &times;
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-[#524E47] hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags (Buttons) */}
        {!query && (
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#736E66] block">
              SUGGESTED SILHOUETTES
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  onClick={() => setQuery(sug)}
                  className="px-3 py-1.5 bg-white border border-[#DDD8CD] text-xs font-mono text-[#4A4742] hover:border-black hover:text-black transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#736E66] block">
              FOUND {results.length} MATCHING ARCHIVAL PIECES
            </span>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((p) => {
                  const price = p.salePrice ?? p.price;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProduct(p);
                        setIsSearchOpen(false);
                      }}
                      className="group flex gap-3 p-3 bg-white border border-[#E5E1D7] cursor-pointer hover:border-[#1C1B19] transition-all"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-16 h-20 object-cover bg-[#F2EEE6] shrink-0"
                      />
                      <div className="flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-sm font-medium text-[#1A1918] group-hover:text-black line-clamp-1">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-[#736E66] font-light line-clamp-1 italic">
                            {p.material}
                          </p>
                        </div>
                        <div className="font-mono text-xs font-semibold tabular-nums text-[#1A1918]">
                          {settings.currencySymbol}{price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[#736E66]">
                No silhouettes match &ldquo;{query}&rdquo;. Try another fabric, cut, or keyword.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
