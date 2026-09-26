import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Filter, ArrowUpDown, Search, RotateCcw } from 'lucide-react';

export const CatalogSection: React.FC = () => {
  const { products, activeCategory, setActiveCategory, settings } = useStore();
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const categoriesList = [
    { label: 'ALL EDITIONS', slug: 'all' },
    { label: 'OUTERWEAR', slug: 'outerwear' },
    { label: 'TAILORING', slug: 'tailoring' },
    { label: 'CASHMERE & KNIT', slug: 'knitwear' },
    { label: 'LEATHER GOODS', slug: 'leather-goods' },
    { label: 'MEN', slug: 'men' },
    { label: 'PRIVILEGE SALE', slug: 'sale' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Visibility check
      if (p.status !== 'active') return false;

      // Category check
      if (activeCategory === 'sale') {
        if (!p.salePrice || p.salePrice >= p.price) return false;
      } else if (activeCategory !== 'all') {
        if (p.category !== activeCategory) return false;
      }

      // Stock check
      if (onlyInStock && p.stock <= 0) return false;

      // Search query
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesMaterial = p.material.toLowerCase().includes(query);
        const matchesSku = p.sku.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesMaterial && !matchesSku) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        return priceB - priceA;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategory, searchFilter, sortBy, onlyInStock]);

  return (
    <section id="catalog-section" className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#E8E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-[#E5E0D5] pb-6">
          <div>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#757067] block mb-2">
              {settings.catalogKicker || 'AUTUMN SELECTION 2026'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#141413] font-light">
              {settings.catalogTitle || 'New Arrivals & Permanent Atelier'}
            </h2>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center flex-wrap gap-2">
            {categoriesList.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-3.5 py-1.5 text-[11px] font-mono tracking-[0.16em] uppercase transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1C1B19] text-[#FAF9F5] shadow-xs'
                      : 'bg-white text-[#57534D] border border-[#DDD8CD] hover:border-[#1C1B19] hover:text-[#1C1B19]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-xs font-mono text-[#54504A]">
          {/* Live Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888379]" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search silhouette, fabric, SKU..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#DDD8CD] text-xs font-sans text-[#181816] placeholder-[#9C968B] focus:outline-none focus:border-[#1C1B19]"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#888379] hover:text-black"
              >
                &times;
              </button>
            )}
          </div>

          {/* Right Controls: In Stock & Sort */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <label className="flex items-center gap-2 cursor-pointer select-none text-[11px]">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded border-[#D4CFC4] text-[#1C1B19] focus:ring-0"
              />
              <span>In Atelier Stock Only</span>
            </label>

            <div className="flex items-center gap-1.5 bg-white border border-[#DDD8CD] px-2.5 py-1.5">
              <ArrowUpDown className="w-3 h-3 text-[#777269]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-transparent text-[11px] font-mono tracking-wider uppercase text-[#1C1B19] focus:outline-none cursor-pointer"
              >
                <option value="featured">Curated & Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E5E0D5] p-12 text-center my-8">
            <p className="font-serif text-2xl text-[#181816] mb-2 font-light">No Silhouettes Found</p>
            <p className="text-xs text-[#6B665E] max-w-md mx-auto mb-6">
              No garments correspond to your selected filters or search parameters. Please refine your selection or view our complete catalog index.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchFilter('');
                setOnlyInStock(false);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
