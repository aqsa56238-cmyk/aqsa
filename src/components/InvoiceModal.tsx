import React from 'react';
import { useStore } from '../context/StoreContext';
import { Printer, X, Download } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const { invoiceOrder, setInvoiceOrder, settings } = useStore();

  if (!invoiceOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white animate-fadeIn">
      <div
        className="relative bg-white border border-[#DDD6C8] w-full max-w-3xl overflow-hidden shadow-2xl p-8 sm:p-12 my-auto print:border-none print:shadow-none print:max-w-none print:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Screen Controls */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#EAE6DE] print:hidden">
          <div className="text-xs font-mono uppercase text-[#736E66]">
            Official Maison Invoice Dossier &bull; #{invoiceOrder.id}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={() => setInvoiceOrder(null)}
              className="p-1.5 text-[#555] hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document Body */}
        <div className="space-y-8 font-sans text-[#1A1A1A]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-[#1C1B19] pb-6">
            <div>
              <h1 className="font-serif text-3xl font-normal tracking-[0.16em] uppercase text-[#141413]">
                {settings.storeName}
              </h1>
              <p className="text-xs text-[#524E48] mt-1 font-serif italic">
                {settings.tagline}
              </p>
              <p className="text-[11px] text-[#736E66] mt-2 font-mono">
                {settings.atelierAddress}<br />
                {settings.contactEmail} &bull; {settings.contactPhone}
              </p>
            </div>

            <div className="text-right sm:self-start">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#736E66] block">
                FACTURE D'ATELIER
              </span>
              <div className="font-mono text-xl font-bold text-[#141413] mt-1">
                INV-{invoiceOrder.id}
              </div>
              <div className="text-xs text-[#555] font-mono mt-1">
                Date: {new Date(invoiceOrder.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="text-xs text-[#555] font-mono">
                Payment: <strong className="uppercase">{invoiceOrder.paymentMethod.replace('_', ' ')}</strong>
              </div>
            </div>
          </div>

          {/* Patron and Consignment Info */}
          <div className="grid grid-cols-2 gap-8 text-xs font-sans">
            <div className="bg-[#FAF9F5] p-4 border border-[#ECE7DC]">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#736E66] block mb-2">
                PATRON (BILL TO)
              </span>
              <p className="font-medium text-sm text-[#1A1918]">{invoiceOrder.customerName}</p>
              <p className="text-[#555] mt-1">{invoiceOrder.customerEmail}</p>
              <p className="text-[#555]">{invoiceOrder.customerPhone}</p>
            </div>

            <div className="bg-[#FAF9F5] p-4 border border-[#ECE7DC]">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#736E66] block mb-2">
                CONSIGNMENT DESTINATION (SHIP TO)
              </span>
              <p className="text-[#1A1918]">{invoiceOrder.shippingAddress}</p>
              <p className="text-[#1A1918]">{invoiceOrder.city}, {invoiceOrder.postalCode}</p>
              <p className="text-[#1A1918] font-medium">{invoiceOrder.country}</p>
              <p className="text-[#666] font-mono text-[10px] mt-1">
                Tracking: {invoiceOrder.trackingNumber || 'Pending Dispatch'}
              </p>
            </div>
          </div>

          {/* Items Table with Tabular Numerals */}
          <div className="border border-[#E5E0D4] overflow-hidden">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#1C1B19] text-white font-mono text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">Silhouette &amp; Specifications</th>
                  <th className="py-2.5 px-4">SKU</th>
                  <th className="py-2.5 px-4 text-center">Qty</th>
                  <th className="py-2.5 px-4 text-right">Unit Price</th>
                  <th className="py-2.5 px-4 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE5]">
                {invoiceOrder.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF9F5]">
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#1A1918]">{item.productName}</div>
                      <div className="text-[10px] font-mono text-[#736E66]">
                        Cut: {item.size} &bull; Tonal Color: {item.color}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#666]">{item.sku}</td>
                    <td className="py-3 px-4 font-mono text-center tabular-nums">{item.quantity}</td>
                    <td className="py-3 px-4 font-mono text-right tabular-nums">
                      {settings.currencySymbol}{item.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-right tabular-nums">
                      {settings.currencySymbol}{(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Atelier Seal */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-2">
            <div className="text-[11px] text-[#736E66] max-w-xs">
              <p className="font-serif italic text-xs text-[#2A2825] mb-1">
                Authenticité Garantie &bull; Place Vendôme Atelier
              </p>
              <p>
                Each garment conforms to strict French haute-artisan standards. Inquiries regarding alteration or restoration may reference this invoice identifier.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs font-mono text-[#4A4742]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium">{settings.currencySymbol}{invoiceOrder.subtotal.toLocaleString()}</span>
              </div>
              {invoiceOrder.discount > 0 && (
                <div className="flex justify-between text-[#295438]">
                  <span>Privilege Allowance</span>
                  <span className="tabular-nums">-{settings.currencySymbol}{invoiceOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove Delivery</span>
                <span className="tabular-nums">
                  {invoiceOrder.shippingFee === 0 ? 'COMPLIMENTARY' : `${settings.currencySymbol}${invoiceOrder.shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#141413] border-t-2 border-[#1C1B19] pt-2">
                <span className="font-serif">Total Settled</span>
                <span className="tabular-nums">{settings.currencySymbol}{invoiceOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
