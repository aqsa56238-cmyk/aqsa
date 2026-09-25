import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShieldCheck, CreditCard, Banknote, Building2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { OrderItem } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    settings,
    createOrder,
    setLastCompletedOrder
  } = useStore();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
    paymentMethod: 'card' as 'card' | 'cash_on_delivery' | 'bank_transfer' | 'whatsapp',
    deliveryMethod: 'courier' as 'courier' | 'salon_pickup',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen || cart.length === 0) return null;

  const freeDeliveryThreshold = settings.freeShippingThreshold || 500;
  const shippingFee = cartTotal >= freeDeliveryThreshold ? 0 : 45;
  const finalTotal = cartTotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderItems: OrderItem[] = cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        image: item.product.images[0],
        size: item.selectedSize,
        color: item.selectedColor.name,
        price: item.product.salePrice ?? item.product.price,
        quantity: item.quantity
      }));

      const newOrder = createOrder({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        items: orderItems,
        subtotal: cartTotal,
        discount: 0,
        shippingFee,
        total: finalTotal,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      });

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setLastCompletedOrder(newOrder);

      // If user chose WhatsApp, open WhatsApp with order ref
      if (formData.paymentMethod === 'whatsapp') {
        const text = encodeURIComponent(
          `Bonjour Vendôme Éditions, I just submitted Order #${newOrder.id} for ${settings.currencySymbol}${newOrder.total.toLocaleString()}. Please confirm salon delivery.`
        );
        window.open(`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FAF9F5] border border-[#DDD6C8] w-full max-w-4xl overflow-hidden shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E4DA] bg-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#736E66]">
              BESPOKE TRANSACTION PROTOCOL
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-light text-[#141413]">
              Patron Checkout & White-Glove Dispatch
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#54504A] hover:text-black hover:bg-[#F4F1EA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-white border-b lg:border-b-0 lg:border-r border-[#E5E0D5]">
            {/* Patron Contact Details */}
            <div>
              <h3 className="font-serif text-base font-medium text-[#1A1918] mb-3">
                1. Patron Contact & Identification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#635F57] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Baroness Eléonore de Saint-Germain"
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#635F57] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="eleonore@luxurymail.fr"
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono uppercase text-[#635F57] block mb-1">
                    Phone / WhatsApp Contact (for Courier Concierge) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="pt-4 border-t border-[#EFECE5]">
              <h3 className="font-serif text-base font-medium text-[#1A1918] mb-3">
                2. Delivery Destination
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#635F57] block mb-1">
                    Street Address & Suite / Hotel *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    placeholder="14 Place Vendôme or Residence Suite"
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#635F57] block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Paris"
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#635F57] block mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="75001"
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#635F57] block mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="France"
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-4 border-t border-[#EFECE5]">
              <h3 className="font-serif text-base font-medium text-[#1A1918] mb-3">
                3. Settlement Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label
                  className={`flex items-center gap-2.5 p-3 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#1C1B19] bg-[#FAF9F5]'
                      : 'border-[#DDD8CD] bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="text-black focus:ring-0"
                  />
                  <CreditCard className="w-4 h-4 text-[#444]" />
                  <div className="text-xs">
                    <span className="font-medium text-[#1A1918] block">Credit / Debit Card</span>
                    <span className="text-[10px] text-[#736E66]">Visa, Mastercard, Amex</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-2.5 p-3 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'cash_on_delivery'
                      ? 'border-[#1C1B19] bg-[#FAF9F5]'
                      : 'border-[#DDD8CD] bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                    className="text-black focus:ring-0"
                  />
                  <Banknote className="w-4 h-4 text-[#444]" />
                  <div className="text-xs">
                    <span className="font-medium text-[#1A1918] block">Cash on Delivery</span>
                    <span className="text-[10px] text-[#736E66]">Pay courier upon arrival</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-2.5 p-3 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'whatsapp'
                      ? 'border-[#1C1B19] bg-[#FAF9F5]'
                      : 'border-[#DDD8CD] bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="whatsapp"
                    checked={formData.paymentMethod === 'whatsapp'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
                    className="text-black focus:ring-0"
                  />
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <div className="text-xs">
                    <span className="font-medium text-[#1A1918] block">WhatsApp Salon Order</span>
                    <span className="text-[10px] text-[#736E66]">Artisan concierge assistance</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-2.5 p-3 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'bank_transfer'
                      ? 'border-[#1C1B19] bg-[#FAF9F5]'
                      : 'border-[#DDD8CD] bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                    className="text-black focus:ring-0"
                  />
                  <Building2 className="w-4 h-4 text-[#444]" />
                  <div className="text-xs">
                    <span className="font-medium text-[#1A1918] block">Bank Wire Transfer</span>
                    <span className="text-[10px] text-[#736E66]">Direct IBAN invoice</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Bespoke instructions */}
            <div className="pt-2">
              <label className="text-[11px] font-mono uppercase text-[#635F57] block mb-1">
                Monogramming & Private Salon Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                placeholder="e.g., Embroider initials 'E.S.G' in tonal charcoal silk lining..."
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Right Summary (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FAF9F5] flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-medium text-[#1A1918] pb-2 border-b border-[#E2DDD1]">
                Order Summary
              </h3>

              {/* Items summary */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map((item, idx) => {
                  const price = item.product.salePrice ?? item.product.price;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-14 object-cover border border-[#DDD8CD]"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-[#1A1918] line-clamp-1">{item.product.name}</p>
                        <p className="text-[10px] font-mono text-[#736E66]">
                          {item.selectedSize} &bull; {item.selectedColor.name} &bull; Qty {item.quantity}
                        </p>
                      </div>
                      <div className="font-mono tabular-nums font-semibold">
                        {settings.currencySymbol}{(price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Line items */}
              <div className="space-y-2 pt-4 border-t border-[#E2DDD1] text-xs font-mono text-[#54504A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{settings.currencySymbol}{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Courier</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : `${settings.currencySymbol}${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#141413] pt-3 border-t border-[#DED8CB]">
                  <span className="font-serif text-lg">Total</span>
                  <span className="tabular-nums">{settings.currencySymbol}{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Security note */}
              <div className="bg-white border border-[#E0DACE] p-3 text-[11px] text-[#69645C] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#295438] shrink-0" />
                <span>Protected by 256-bit Maison archival encryption. Discreet packaging guaranteed.</span>
              </div>
            </div>

            {/* Confirm button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>TRANSACTING WITH ATELIER...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CONFIRM & PLACE ORDER</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
