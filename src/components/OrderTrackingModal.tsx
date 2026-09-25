import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Search, CheckCircle2, Clock, Truck, Home, AlertCircle, Printer, MessageSquare } from 'lucide-react';
import { Order } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingOpen,
    setIsTrackingOpen,
    orders,
    settings,
    setInvoiceOrder
  } = useStore();

  const [query, setQuery] = useState('VDM-1024');
  const [foundOrder, setFoundOrder] = useState<Order | null>(() => {
    return orders.find(o => o.id === 'VDM-1024') || orders[0] || null;
  });
  const [searched, setSearched] = useState(true);

  if (!isTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleanQuery = query.trim().toUpperCase();
    const match = orders.find(o =>
      o.id.toUpperCase() === cleanQuery ||
      o.customerEmail.toLowerCase() === query.trim().toLowerCase() ||
      o.customerPhone.includes(query.trim())
    );
    setFoundOrder(match || null);
  };

  const steps = [
    { key: 'pending', label: 'Order Registered', desc: 'Atelier master dockets assigned', icon: Clock },
    { key: 'confirmed', label: 'Bespoke Tailoring', desc: 'Hand cut & inspected in Paris', icon: CheckCircle2 },
    { key: 'shipped', label: 'In Transit', desc: 'White-glove insured courier dispatched', icon: Truck },
    { key: 'delivered', label: 'Delivered', desc: 'Arrived at patron residence', icon: Home },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    if (currentStatus === 'cancelled') return 'cancelled';
    const orderMap: Record<string, number> = {
      pending: 1,
      confirmed: 2,
      shipped: 3,
      delivered: 4
    };
    const currentLevel = orderMap[currentStatus] || 1;
    const stepLevel = orderMap[stepKey] || 1;

    if (currentLevel > stepLevel) return 'completed';
    if (currentLevel === stepLevel) return 'current';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[#FAF9F5] border border-[#DDD6C8] w-full max-w-2xl overflow-hidden shadow-2xl p-6 sm:p-8 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA] mb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#736E66]">
              EXPÉDITION &amp; COURIER TRACKING
            </span>
            <h2 className="font-serif text-2xl text-[#141413] font-light">
              Patron Consignment Tracker
            </h2>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1 text-[#666] hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7F796F]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Order ID (e.g. VDM-1024) or email..."
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD8CD] text-xs font-mono uppercase focus:outline-none focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black"
          >
            Track Order
          </button>
        </form>

        {/* Search Result */}
        {foundOrder ? (
          <div className="space-y-6">
            {/* Top overview bar */}
            <div className="bg-white border border-[#E3DED2] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#736E66] block">Order Identifier</span>
                <span className="font-mono font-bold text-sm text-[#141413]">#{foundOrder.id}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#736E66] block">Consignment Tracking</span>
                <span className="font-mono font-medium text-xs text-[#2A2926]">{foundOrder.trackingNumber || 'PENDING DISPATCH'}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#736E66] block">Current Status</span>
                <span className="font-mono uppercase font-bold text-xs px-2 py-0.5 bg-[#1C1B19] text-white">
                  {foundOrder.status}
                </span>
              </div>
            </div>

            {/* Timeline Stepper */}
            <div className="py-2">
              <div className="grid grid-cols-4 gap-2">
                {steps.map((st, idx) => {
                  const state = getStepStatus(st.key, foundOrder.status);
                  const Icon = st.icon;
                  return (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 border transition-all ${
                          state === 'completed'
                            ? 'bg-[#1C1B19] text-white border-[#1C1B19]'
                            : state === 'current'
                            ? 'bg-white text-[#1C1B19] border-[#1C1B19] ring-2 ring-[#1C1B19]/20'
                            : 'bg-[#ECE8DE] text-[#9E988D] border-[#DDD8CD]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-medium text-[#1A1918] leading-tight block">
                        {st.label}
                      </span>
                      <span className="text-[9px] text-[#736E66] hidden sm:block mt-0.5">
                        {st.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consignment Items & Address */}
            <div className="bg-white border border-[#E3DED2] p-4 text-xs space-y-3">
              <div className="flex justify-between border-b border-[#F0ECE4] pb-2 text-[11px] font-mono text-[#666]">
                <span>Recipient: <strong className="text-black">{foundOrder.customerName}</strong></span>
                <span>Destination: <strong className="text-black">{foundOrder.city}, {foundOrder.country}</strong></span>
              </div>

              <div className="space-y-1.5 py-1">
                {foundOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span>
                      {item.productName} <span className="text-[#777] font-mono">[{item.size}, {item.color}] x{item.quantity}</span>
                    </span>
                    <span className="font-mono tabular-nums">
                      {settings.currencySymbol}{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#F0ECE4] font-semibold text-sm">
                <span>Total Consignment Amount</span>
                <span className="font-mono">{settings.currencySymbol}{foundOrder.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setInvoiceOrder(foundOrder)}
                className="px-4 py-2 border border-[#1C1B19] text-[#1C1B19] text-xs font-mono uppercase tracking-wider hover:bg-[#1C1B19] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Invoice</span>
              </button>

              <button
                onClick={() => {
                  const text = encodeURIComponent(`Bonjour Vendôme Éditions, I have a question regarding tracking for Order #${foundOrder.id}.`);
                  window.open(`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                }}
                className="px-4 py-2 bg-[#25D366] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#20BA5A] flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Dispatch via WhatsApp</span>
              </button>
            </div>
          </div>
        ) : searched ? (
          <div className="bg-white border border-[#E3DED2] p-8 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-[#8C3A27] mx-auto" />
            <h3 className="font-serif text-lg text-[#1A1918]">Consignment Not Found</h3>
            <p className="text-xs text-[#6B665D] max-w-sm mx-auto font-light">
              We could not find an order matching &ldquo;{query}&rdquo;. Please verify your order identifier in your confirmation email or contact our salon concierge.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
