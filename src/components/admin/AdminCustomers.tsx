import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Customer, Order } from '../../types';
import { Search, Ban, CheckCircle, ShieldAlert, History, Mail, Phone, MapPin } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const {
    customers,
    toggleCustomerStatus,
    orders,
    settings,
    setInvoiceOrder
  } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCustomerHistory, setSelectedCustomerHistory] = useState<{ customer: Customer; orders: Order[] } | null>(null);

  const filteredCustomers = customers.filter(c => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q) || c.city.toLowerCase().includes(q);
    }
    return true;
  });

  const handleViewHistory = (customer: Customer) => {
    const customerOrders = orders.filter(
      o => o.customerEmail.toLowerCase() === customer.email.toLowerCase()
    );
    setSelectedCustomerHistory({ customer, orders: customerOrders });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#141413]">
            Haute Patron &amp; Client Concierge Directory
          </h2>
          <p className="text-xs text-[#6B665E] mt-1 font-mono">
            {customers.length} registered private patrons and salon collectors
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 border border-[#E5E0D5]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patron name, email or city..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#E5E0D5] overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-[#FAF9F5] text-[#555] font-mono text-[10px] uppercase tracking-wider border-b border-[#E5E0D5]">
            <tr>
              <th className="py-3 px-4">Patron Name &amp; Contact</th>
              <th className="py-3 px-4">Residence City</th>
              <th className="py-3 px-4 text-center">Consignments</th>
              <th className="py-3 px-4 text-right">Lifetime Spend</th>
              <th className="py-3 px-4 text-center">Privilege Status</th>
              <th className="py-3 px-4 text-center">Registered</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFECE5]">
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-[#FAF9F5] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-serif font-medium text-sm text-[#1A1918]">{cust.name}</div>
                  <div className="text-[11px] text-[#666] font-mono flex items-center gap-1.5 mt-0.5">
                    <span>{cust.email}</span>
                    <span>&bull;</span>
                    <span>{cust.phone}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-xs text-[#555]">
                  {cust.city}
                </td>

                <td className="py-3.5 px-4 text-center font-mono font-medium">
                  {cust.totalOrders} order{cust.totalOrders > 1 ? 's' : ''}
                </td>

                <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-sm text-[#141413]">
                  {settings.currencySymbol}{cust.totalSpend.toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase font-semibold ${
                      cust.status === 'active'
                        ? 'bg-[#EAF3EC] text-[#295438]'
                        : 'bg-[#FBEBE7] text-[#8C3A27]'
                    }`}
                  >
                    {cust.status}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-center font-mono text-[11px] text-[#777]">
                  {cust.joinedDate}
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleViewHistory(cust)}
                      className="px-2.5 py-1 bg-white border border-[#DDD] hover:border-black text-[11px] font-mono uppercase flex items-center gap-1"
                    >
                      <History className="w-3 h-3" />
                      <span>History</span>
                    </button>

                    <button
                      onClick={() => toggleCustomerStatus(cust.id)}
                      className={`p-1.5 border transition-colors ${
                        cust.status === 'active'
                          ? 'border-[#8C3A27]/30 text-[#8C3A27] hover:bg-[#FBEBE7]'
                          : 'border-[#295438]/30 text-[#295438] hover:bg-[#EAF3EC]'
                      }`}
                      title={cust.status === 'active' ? "Block Patron Account" : "Unblock Patron Account"}
                    >
                      {cust.status === 'active' ? <Ban className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patron Order History Modal */}
      {selectedCustomerHistory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative bg-[#FAF9F5] border border-[#DDD6C8] w-full max-w-2xl overflow-hidden shadow-2xl p-6 sm:p-8 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA] mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#736E66]">
                  PATRON DOSSIER &bull; ORDER ARCHIVES
                </span>
                <h3 className="font-serif text-2xl font-light text-[#141413]">
                  {selectedCustomerHistory.customer.name}
                </h3>
                <p className="text-xs text-[#666] font-mono">
                  {selectedCustomerHistory.customer.email} &bull; {selectedCustomerHistory.customer.phone}
                </p>
              </div>
              <button onClick={() => setSelectedCustomerHistory(null)} className="text-[#666] hover:text-black p-1">
                &times;
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {selectedCustomerHistory.orders.length > 0 ? (
                selectedCustomerHistory.orders.map((order) => (
                  <div key={order.id} className="bg-white border border-[#E3DED2] p-4 text-xs space-y-2">
                    <div className="flex justify-between items-center border-b border-[#F2EEE6] pb-2 font-mono">
                      <div>
                        <span className="font-bold text-sm text-[#141413]">#{order.id}</span>
                        <span className="text-[11px] text-[#777] ml-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="uppercase text-[10px] font-semibold px-2 py-0.5 bg-[#1C1B19] text-white">
                          {order.status}
                        </span>
                        <button
                          onClick={() => {
                            setInvoiceOrder(order);
                            setSelectedCustomerHistory(null);
                          }}
                          className="text-[#8C3A27] underline text-[11px]"
                        >
                          Invoice
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <span>{item.productName} ({item.size}, {item.color}) x{item.quantity}</span>
                          <span className="font-mono">{settings.currencySymbol}{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-[#F2EEE6] font-semibold">
                      <span>Consignment Total:</span>
                      <span className="font-mono">{settings.currencySymbol}{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white border border-[#E3DED2] p-8 text-center text-xs text-[#777]">
                  No consignment orders registered yet under this patron account.
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-[#E8E4DA] flex justify-end">
              <button
                onClick={() => setSelectedCustomerHistory(null)}
                className="px-5 py-2 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
