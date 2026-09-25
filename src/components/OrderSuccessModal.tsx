import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, Printer, Compass, MessageSquare, ArrowRight, X } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const {
    lastCompletedOrder,
    setLastCompletedOrder,
    settings,
    setInvoiceOrder,
    setIsTrackingOpen
  } = useStore();

  if (!lastCompletedOrder) return null;

  const handlePrint = () => {
    setInvoiceOrder(lastCompletedOrder);
  };

  const handleTrack = () => {
    setIsTrackingOpen(true);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Bonjour Vendôme Éditions, I have completed order #${lastCompletedOrder.id} (${settings.currencySymbol}${lastCompletedOrder.total.toLocaleString()}). Patron: ${lastCompletedOrder.customerName}. Please confirm receipt.`
    );
    window.open(`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FAF9F5] border border-[#DDD6C8] w-full max-w-2xl overflow-hidden shadow-2xl p-6 sm:p-10 my-auto text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dismiss Button */}
        <button
          onClick={() => setLastCompletedOrder(null)}
          className="absolute top-4 right-4 text-[#757067] hover:text-black p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Checkmark icon */}
        <div className="w-16 h-16 rounded-full bg-[#EBF4EE] border border-[#B5DEC0] text-[#295438] flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 stroke-[1.5]" />
        </div>

        {/* Typography */}
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#736E66] block mb-1">
          COMMANDE CONFIRMÉE &bull; ATELIER DISPATCH
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#141413] font-light mb-3">
          Order #{lastCompletedOrder.id} Registered
        </h2>
        <p className="text-xs sm:text-sm text-[#524E47] max-w-lg mx-auto font-light leading-relaxed mb-6">
          Thank you, <span className="font-medium text-[#1A1918]">{lastCompletedOrder.customerName}</span>. Your garment request has been assigned to our master tailors. A confirmation docket has been dispatched to <span className="font-mono text-[#1A1918]">{lastCompletedOrder.customerEmail}</span>.
        </p>

        {/* Order Details Receipt Box */}
        <div className="bg-white border border-[#E3DED2] p-5 text-left mb-6 space-y-3">
          <div className="flex justify-between text-xs font-mono text-[#635F57] border-b border-[#F0ECE4] pb-2">
            <span>Reference Protocol: <strong className="text-black">{lastCompletedOrder.id}</strong></span>
            <span>Tracking: <strong className="text-black">{lastCompletedOrder.trackingNumber}</strong></span>
          </div>

          <div className="space-y-2 py-2">
            {lastCompletedOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-[#1A1918]">
                  {item.productName} <span className="text-[#736E66] font-mono">({item.size}, {item.color}) x{item.quantity}</span>
                </span>
                <span className="font-mono font-medium tabular-nums">
                  {settings.currencySymbol}{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm font-semibold text-[#141413] border-t border-[#F0ECE4] pt-2">
            <span className="font-serif">Settled Total</span>
            <span className="font-mono tabular-nums">{settings.currencySymbol}{lastCompletedOrder.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handlePrint}
            className="py-2.5 px-4 bg-white border border-[#1C1B19] text-[#1C1B19] text-xs font-mono uppercase tracking-wider hover:bg-[#F3EFE7] transition-colors flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Maison Invoice</span>
          </button>

          <button
            onClick={handleTrack}
            className="py-2.5 px-4 bg-white border border-[#1C1B19] text-[#1C1B19] text-xs font-mono uppercase tracking-wider hover:bg-[#F3EFE7] transition-colors flex items-center justify-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>

          <button
            onClick={handleWhatsAppSend}
            className="py-2.5 px-4 bg-[#25D366] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Salon</span>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-[#ECE7DD]">
          <button
            onClick={() => setLastCompletedOrder(null)}
            className="text-xs font-mono tracking-widest uppercase text-[#5C5850] hover:text-black inline-flex items-center gap-1"
          >
            <span>Continue Exploring Editions</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
