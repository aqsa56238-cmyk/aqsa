import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShieldCheck, Truck, RefreshCw, MessageSquare, Plus, Minus, Check } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    settings,
    addToCart,
    wishlist,
    toggleWishlist
  } = useStore();

  if (!selectedProduct) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0] || { name: 'Noir', hex: '#111' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');
  const [addedNotice, setAddedNotice] = useState(false);

  const displayPrice = selectedProduct.salePrice ?? selectedProduct.price;
  const isSale = selectedProduct.salePrice && selectedProduct.salePrice < selectedProduct.price;
  const isWishlisted = wishlist.includes(selectedProduct.id);
  const isOutOfStock = selectedProduct.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Bonjour Vendôme Éditions, I would like to order:
Silhouette: ${selectedProduct.name} (SKU: ${selectedProduct.sku})
Size: ${selectedSize}
Color: ${selectedColor.name}
Quantity: ${quantity}
Price: ${settings.currencySymbol}${(displayPrice * quantity).toLocaleString()}
Please confirm salon availability & payment details.`
    );
    window.open(`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FAF9F5] border border-[#DDD6C8] w-full max-w-5xl overflow-hidden shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dismiss Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/90 border border-[#DDD6C8] flex items-center justify-center text-[#2A2825] hover:text-black hover:bg-white transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* Gallery Column (7 cols) */}
          <div className="md:col-span-7 bg-[#F4F1EA] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E2DDCF]">
            {/* Main Featured Photo */}
            <div className="relative aspect-[3/4] bg-white border border-[#DDD6C8] overflow-hidden mb-4">
              <img
                src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {selectedProduct.isNewArrival && (
                <div className="absolute top-3 left-3 bg-[#1C1B19] text-white text-[9px] font-mono tracking-widest px-2.5 py-1 uppercase">
                  NEW EDITION
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-3">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-20 border overflow-hidden transition-all ${
                      activeImageIdx === idx ? 'border-[#1C1B19] ring-1 ring-[#1C1B19]' : 'border-[#DDD6C8] opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contiguous Purchase Module Column (5 cols) */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div className="space-y-5">
              {/* Category & SKU Header */}
              <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#736E66]">
                <span>{selectedProduct.category}</span>
                <span>{selectedProduct.sku}</span>
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl text-[#141413] font-light leading-snug">
                  {selectedProduct.name}
                </h1>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-mono text-xl text-[#161615] font-semibold tabular-nums">
                    {settings.currencySymbol}{displayPrice.toLocaleString()}
                  </span>
                  {isSale && (
                    <span className="font-mono text-sm text-[#878278] line-through tabular-nums">
                      {settings.currencySymbol}{selectedProduct.price.toLocaleString()}
                    </span>
                  )}
                  {isOutOfStock ? (
                    <span className="text-[10px] font-mono uppercase bg-[#524E48] text-white px-2 py-0.5">
                      Archived Out of Stock
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase text-[#295438] bg-[#E9F3EC] px-2 py-0.5">
                      {selectedProduct.stock} Available in Atelier
                    </span>
                  )}
                </div>
              </div>

              {/* Fabric Footnote */}
              <p className="text-xs text-[#5C574F] font-light leading-relaxed border-t border-b border-[#ECE7DD] py-3">
                {selectedProduct.description}
              </p>

              {/* Color Selector */}
              <div>
                <label className="text-[11px] font-mono tracking-wider uppercase text-[#54504A] block mb-2">
                  Selected Color: <span className="text-black font-semibold">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {selectedProduct.colors.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(col)}
                      title={col.name}
                      className={`relative w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                        selectedColor.name === col.name
                          ? 'border-[#1C1B19] ring-2 ring-[#1C1B19]/30 scale-110'
                          : 'border-[#CCC7BD]'
                      }`}
                      style={{ backgroundColor: col.hex }}
                    >
                      {selectedColor.name === col.name && (
                        <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-mono tracking-wider uppercase text-[#54504A]">
                    Select Cut / Size
                  </label>
                  <span className="text-[10px] font-mono text-[#8C877D] underline cursor-pointer">
                    Haussmann Fit Guide
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {selectedProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-mono tracking-wider transition-colors border ${
                        selectedSize === sz
                          ? 'bg-[#1C1B19] text-white border-[#1C1B19]'
                          : 'bg-[#FAF9F5] text-[#33312D] border-[#DDD8CD] hover:border-[#1C1B19]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-mono tracking-wider uppercase text-[#54504A]">
                  Quantity
                </span>
                <div className="flex items-center border border-[#DDD8CD] bg-[#FAF9F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-[#EFECE5] text-[#333]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-xs font-mono tabular-nums font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                    className="p-1.5 hover:bg-[#EFECE5] text-[#333]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full py-3.5 text-xs font-mono uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                    isOutOfStock
                      ? 'bg-[#D1CCC2] text-[#7D786F] cursor-not-allowed'
                      : addedNotice
                      ? 'bg-[#295438] text-white'
                      : 'bg-[#1C1B19] text-white hover:bg-black'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO ARCHIVAL BAG</span>
                    </>
                  ) : (
                    <span>ADD TO SHOPPING BAG</span>
                  )}
                </button>

                {/* WhatsApp Direct Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 bg-[#FAF9F5] border border-[#25D366] text-[#1E7E34] text-xs font-mono uppercase tracking-[0.16em] hover:bg-[#EBF9EE] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>ORDER VIA WHATSAPP SALON</span>
                </button>
              </div>

              {/* Accordion Info Tabs */}
              <div className="border-t border-[#ECE7DD] pt-4 text-xs">
                <div className="flex items-center gap-4 border-b border-[#ECE7DD] pb-2 text-[10px] font-mono tracking-widest uppercase">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1 ${activeTab === 'details' ? 'border-b-2 border-black text-black font-semibold' : 'text-[#878278]'}`}
                  >
                    Material Spec
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-1 ${activeTab === 'care' ? 'border-b-2 border-black text-black font-semibold' : 'text-[#878278]'}`}
                  >
                    Preservation
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-1 ${activeTab === 'shipping' ? 'border-b-2 border-black text-black font-semibold' : 'text-[#878278]'}`}
                  >
                    White-Glove Delivery
                  </button>
                </div>

                <div className="pt-3 text-[11px] text-[#635F57] leading-relaxed">
                  {activeTab === 'details' && (
                    <p>{selectedProduct.material}. Tailored and inspected in Place Vendôme atelier.</p>
                  )}
                  {activeTab === 'care' && (
                    <p>Dry clean only at certified couture specialists. Complimentary annual restoration included for patrons.</p>
                  )}
                  {activeTab === 'shipping' && (
                    <p>Hand-delivered in signature wooden garment casing with archival cedar hanger.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
