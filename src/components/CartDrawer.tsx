import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, Plus, Minus, Tag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartTotal,
    cartCount,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    settings,
    setIsCheckoutOpen
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = settings.freeShippingThreshold || 500;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeDeliveryThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeDeliveryThreshold - cartTotal);

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const shippingFee = cartTotal >= freeDeliveryThreshold || cartTotal === 0 ? 0 : 45;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VENDOME10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'ATELIER20') {
      setDiscountPercent(20);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid privilege token. Try "VENDOME10"');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppCartOrder = () => {
    const itemsList = cart.map(i => {
      const price = i.product.salePrice ?? i.product.price;
      return `• ${i.product.name} [${i.selectedSize}, ${i.selectedColor.name}] x${i.quantity} = ${settings.currencySymbol}${(price * i.quantity).toLocaleString()}`;
    }).join('\n');

    const message = encodeURIComponent(
      `Bonjour Vendôme Éditions, I would like to finalize an order for my shopping bag:

${itemsList}

Subtotal: ${settings.currencySymbol}${cartTotal.toLocaleString()}
Delivery: ${shippingFee === 0 ? 'COMPLIMENTARY' : `${settings.currencySymbol}${shippingFee}`}
Final Total: ${settings.currencySymbol}${finalTotal.toLocaleString()}

Please provide checkout instructions and salon reservation details.`
    );

    window.open(`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div
        className="w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#DDD6C8] animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#E8E4DA] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#1C1B19]" />
            <h2 className="font-serif text-lg font-medium text-[#1A1918] tracking-wide">
              Archival Bag ({cartCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#54504A] hover:text-black hover:bg-[#F4F1EA] transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F3EFE7] px-5 py-3 border-b border-[#E5E0D5] text-xs">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#635F57] mb-1.5">
            {remainingForFreeShipping === 0 ? (
              <span className="text-[#2B5738] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                White-Glove Worldwide Delivery Unlocked
              </span>
            ) : (
              <span>Add {settings.currencySymbol}{remainingForFreeShipping.toLocaleString()} for Complimentary Courier</span>
            )}
            <span className="font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1 bg-[#DDD7C9] overflow-hidden">
            <div
              className="h-full bg-[#1C1B19] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Bag Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#ECE8DF] flex items-center justify-center text-[#8C867B]">
                <ShoppingBag className="w-6 h-6 stroke-[1.2]" />
              </div>
              <h3 className="font-serif text-xl text-[#141413] font-light">
                Your Archival Bag is Empty
              </h3>
              <p className="text-xs text-[#736E66] max-w-xs font-light">
                Explore our curated permanent atelier or new autumn editions to select your silhouette.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-widest hover:bg-black"
              >
                Browse Editions
              </button>
            </div>
          ) : (
            cart.map((item, index) => {
              const unitPrice = item.product.salePrice ?? item.product.price;
              return (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`}
                  className="flex gap-4 bg-white border border-[#E8E4DA] p-3 transition-shadow hover:shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-24 bg-[#F2EFE9] shrink-0 overflow-hidden border border-[#ECE8DE]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-medium text-[#1A1918] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-[#9C968B] hover:text-[#8C3A27] p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant metadata (No pills: clean unboxed metadata) */}
                      <div className="flex items-center gap-2 text-[11px] text-[#69655D] mt-1 font-mono">
                        <span>{item.selectedSize}</span>
                        <span aria-hidden="true">&bull;</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#F2EEE6]">
                      <div className="flex items-center border border-[#DDD8CD] bg-[#FAF9F5]">
                        <button
                          onClick={() => updateCartQuantity(index, item.quantity - 1)}
                          className="p-1 hover:bg-[#ECE8DF]"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-xs font-mono tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(index, item.quantity + 1)}
                          className="p-1 hover:bg-[#ECE8DF]"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="font-mono text-xs font-semibold text-[#181816] tabular-nums">
                        {settings.currencySymbol}{(unitPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Calculation & CTAs */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-[#E8E4DA] p-5 space-y-4">
            {/* Promo code */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#878278]" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Privilege Code (VENDOME10)"
                  className="w-full pl-8 pr-2 py-1.5 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-mono uppercase focus:outline-none focus:border-black"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#2E2C29] text-white text-xs font-mono uppercase tracking-wider hover:bg-black"
              >
                Apply
              </button>
            </form>
            {promoApplied && (
              <p className="text-[11px] text-[#295438] font-mono">Privilege Token applied: -{discountPercent}%</p>
            )}
            {promoError && (
              <p className="text-[11px] text-[#8C3A27] font-mono">{promoError}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs font-mono text-[#524E48] pt-2 border-t border-[#F2EEE6]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium">{settings.currencySymbol}{cartTotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#295438]">
                  <span>Privilege Discount ({discountPercent}%)</span>
                  <span className="tabular-nums">-{settings.currencySymbol}{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove Transit</span>
                <span className="tabular-nums">
                  {shippingFee === 0 ? 'COMPLIMENTARY' : `${settings.currencySymbol}${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#141413] pt-2 border-t border-[#EAE6DE]">
                <span className="font-serif text-base">Total Order Value</span>
                <span className="font-mono tabular-nums">{settings.currencySymbol}{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleWhatsAppCartOrder}
                className="w-full py-2.5 bg-white border border-[#25D366] text-[#1E7E34] text-xs font-mono uppercase tracking-[0.15em] hover:bg-[#F0FAF2] transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>QUICK ORDER VIA WHATSAPP</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
