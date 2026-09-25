import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Plus, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    settings,
    wishlist,
    toggleWishlist,
    setSelectedProduct,
    addToCart
  } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const displayPrice = product.salePrice ?? product.price;
  const isSale = product.salePrice && product.salePrice < product.price;
  const isLowStock = product.stock > 0 && product.stock <= 4;
  const isOutOfStock = product.stock === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    const defaultSize = product.sizes[0] || 'Standard';
    const defaultColor = product.colors[0] || { name: 'Default', hex: '#111' };
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group cursor-pointer flex flex-col bg-white border border-[#E8E4DA] p-3 sm:p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-[3/4] bg-[#F4F1EA] overflow-hidden mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Status badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isNewArrival && (
            <span className="bg-[#1C1B19]/85 text-[#FAF9F5] text-[9px] font-mono tracking-[0.16em] uppercase px-2 py-0.5 backdrop-blur-sm">
              NEW EDITION
            </span>
          )}
          {isLowStock && (
            <span className="bg-[#8A3724]/90 text-white text-[9px] font-mono tracking-[0.14em] uppercase px-2 py-0.5">
              ONLY {product.stock} REMAINING
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-[#524E48] text-white text-[9px] font-mono tracking-[0.14em] uppercase px-2 py-0.5">
              ARCHIVED
            </span>
          )}
          {isSale && (
            <span className="bg-[#1F3A2B] text-white text-[9px] font-mono tracking-[0.14em] uppercase px-2 py-0.5">
              PRIVILEGE SALE
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#2A2825] hover:text-[#8C3A27] transition-colors shadow-sm"
        >
          <Heart
            className={`w-4 h-4 stroke-[1.5] ${
              isWishlisted ? 'fill-[#8C3A27] text-[#8C3A27]' : ''
            }`}
          />
        </button>

        {/* Quick Add Overlay on Hover */}
        {!isOutOfStock && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-0 inset-x-0 bg-[#1C1B19]/90 text-white py-2 text-[11px] font-mono tracking-[0.18em] uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 backdrop-blur-sm hover:bg-black"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>QUICK ADD &bull; {product.sizes[0]}</span>
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-serif text-[15px] sm:text-[16px] text-[#161615] font-medium leading-snug line-clamp-1 group-hover:text-black">
              {product.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-mono text-xs sm:text-[13px] font-semibold text-[#181816] tabular-nums">
                {settings.currencySymbol}{displayPrice.toLocaleString()}
              </span>
              {isSale && (
                <span className="font-mono text-[11px] text-[#8E887E] line-through ml-1 tabular-nums block">
                  {settings.currencySymbol}{product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Textile / Material footnote */}
          <p className="text-[11px] text-[#6A665E] font-light line-clamp-1 italic mb-2">
            {product.material}
          </p>
        </div>

        {/* Footnote bar: Color Swatches & Sizes */}
        <div className="pt-2 border-t border-[#EFECE6] flex items-center justify-between text-[11px]">
          {/* Swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 3).map((col, idx) => (
              <span
                key={idx}
                title={col.name}
                className="w-2.5 h-2.5 rounded-full border border-black/20"
                style={{ backgroundColor: col.hex }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[9px] text-[#807B73] font-mono">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          {/* Sizes */}
          <div className="text-[10px] font-mono text-[#736E66] uppercase">
            {product.sizes[0]} &mdash; {product.sizes[product.sizes.length - 1]}
          </div>
        </div>
      </div>
    </div>
  );
};
