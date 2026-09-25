import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import { Search, Printer, Edit3, Trash2, CheckCircle, Truck, Package, XCircle, Clock } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    deleteOrder,
    settings,
    setInvoiceOrder
  } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editTrackingId, setEditTrackingId] = useState('');

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleUpdateTracking = (orderId: string) => {
    if (editTrackingId.trim()) {
      updateOrderStatus(orderId, selectedOrder?.status || 'shipped', editTrackingId.trim());
      if (selectedOrder) {
        setSelectedOrder({ ...selectedOrder, trackingNumber: editTrackingId.trim() });
      }
      setEditTrackingId('');
    }
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-[#FFF8E6] text-[#8C6D1F] border-[#E8D6A4]';
      case 'confirmed':
        return 'bg-[#EBF5FB] text-[#2471A3] border-[#AED6F1]';
      case 'shipped':
        return 'bg-[#E8F8F5] text-[#117A65] border-[#A3E4D7]';
      case 'delivered':
        return 'bg-[#EAF3EC] text-[#295438] border-[#A9DFBF]';
      case 'cancelled':
        return 'bg-[#FBEBE7] text-[#8C3A27] border-[#F5B7B1]';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#141413]">
            Consignment &amp; Order Fulfillment Management
          </h2>
          <p className="text-xs text-[#6B665E] mt-1 font-mono">
            Full status lifecycle: Pending &rarr; Confirmed &rarr; Shipped &rarr; Delivered &bull; {orders.length} total dockets
          </p>
        </div>
      </div>

      {/* Search and Status Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#E5E0D5]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order #, Patron Name, Email..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] text-xs font-sans focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
          {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-mono uppercase transition-colors ${
                statusFilter === st
                  ? 'bg-[#1C1B19] text-white'
                  : 'bg-[#FAF9F5] text-[#555] border border-[#DDD8CD] hover:border-black'
              }`}
            >
              {st} {st !== 'all' ? `(${orders.filter(o => o.status === st).length})` : `(${orders.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#E5E0D5] overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-[#FAF9F5] text-[#555] font-mono text-[10px] uppercase tracking-wider border-b border-[#E5E0D5]">
            <tr>
              <th className="py-3 px-4">Order ID &amp; Date</th>
              <th className="py-3 px-4">Patron Recipient</th>
              <th className="py-3 px-4">Items / Silhouettes</th>
              <th className="py-3 px-4 text-right">Settled Amount</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4">Courier Tracking</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFECE5]">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-[#FAF9F5] transition-colors">
                <td className="py-3.5 px-4 font-mono">
                  <span className="font-bold text-[#141413] text-sm">#{order.id}</span>
                  <div className="text-[10px] text-[#777]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="font-medium text-[#1A1918]">{order.customerName}</div>
                  <div className="text-[11px] text-[#666] font-mono">{order.customerEmail}</div>
                  <div className="text-[10px] text-[#888]">{order.city}, {order.country}</div>
                </td>

                <td className="py-3.5 px-4 text-xs">
                  <div className="font-medium text-[#141413]">{order.items.length} piece{order.items.length > 1 ? 's' : ''}</div>
                  <div className="text-[11px] text-[#666] line-clamp-1 italic">
                    {order.items.map(i => `${i.productName} (${i.size})`).join(', ')}
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                  <span className="font-bold text-sm text-[#141413]">
                    {settings.currencySymbol}{order.total.toLocaleString()}
                  </span>
                  <div className="text-[10px] uppercase text-[#777]">
                    {order.paymentMethod.replace('_', ' ')}
                  </div>
                </td>

                {/* Status Dropdown */}
                <td className="py-3.5 px-4 text-center font-mono">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    className={`px-2.5 py-1 text-[11px] font-mono uppercase border rounded-xs font-semibold focus:outline-none cursor-pointer ${getStatusBadgeClass(order.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="py-3.5 px-4 font-mono text-[11px] text-[#555]">
                  {order.trackingNumber || <span className="text-[#999] italic">Unassigned</span>}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-2.5 py-1 bg-white border border-[#DDD] hover:border-black text-[11px] font-mono uppercase"
                    >
                      Dossier
                    </button>
                    <button
                      onClick={() => setInvoiceOrder(order)}
                      className="p-1.5 text-[#555] hover:text-black hover:bg-[#EFECE5]"
                      title="Print Invoice"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete order docket #${order.id}?`)) {
                          deleteOrder(order.id);
                        }
                      }}
                      className="p-1.5 text-[#8C3A27] hover:bg-[#FBEBE7]"
                      title="Delete Order"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative bg-[#FAF9F5] border border-[#DDD6C8] w-full max-w-2xl overflow-hidden shadow-2xl p-6 sm:p-8 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA] mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#736E66]">
                  CONSIGNMENT DOSSIER
                </span>
                <h3 className="font-serif text-2xl font-light text-[#141413]">
                  Order #{selectedOrder.id}
                </h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#666] hover:text-black p-1">
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              {/* Status and Action bar */}
              <div className="bg-white border border-[#E3DED2] p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#777] block">Status Pipeline</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                    className="font-mono text-xs font-bold uppercase mt-1 px-2 py-1 border"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="confirmed">Confirmed &amp; Tailoring</option>
                    <option value="shipped">Shipped &bull; Courier Dispatch</option>
                    <option value="delivered">Delivered to Patron</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#777] block">Tracking Code</span>
                  <div className="flex items-center gap-1 mt-1">
                    <input
                      type="text"
                      placeholder={selectedOrder.trackingNumber || 'Enter courier code...'}
                      value={editTrackingId}
                      onChange={(e) => setEditTrackingId(e.target.value)}
                      className="px-2 py-1 bg-white border text-xs font-mono"
                    />
                    <button
                      onClick={() => handleUpdateTracking(selectedOrder.id)}
                      className="px-2.5 py-1 bg-[#1C1B19] text-white text-xs font-mono"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>

              {/* Patron and Address info */}
              <div className="grid grid-cols-2 gap-4 bg-white border border-[#E3DED2] p-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#777] block mb-1">Patron Info</span>
                  <p className="font-medium text-[#1A1918]">{selectedOrder.customerName}</p>
                  <p className="text-[#666]">{selectedOrder.customerEmail}</p>
                  <p className="text-[#666]">{selectedOrder.customerPhone}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#777] block mb-1">Shipment Address</span>
                  <p className="text-[#1A1918]">{selectedOrder.shippingAddress}</p>
                  <p className="text-[#1A1918]">{selectedOrder.city}, {selectedOrder.postalCode}</p>
                  <p className="text-[#1A1918] font-medium">{selectedOrder.country}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white border border-[#E3DED2] p-4 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#777] block mb-1">Garment Specifications</span>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-[#F5F2EB] last:border-none">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-10 h-12 object-cover border" />
                      <div>
                        <p className="font-medium text-[#1A1918]">{item.productName}</p>
                        <p className="text-[10px] font-mono text-[#777]">Cut: {item.size} &bull; Color: {item.color} &bull; Qty {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums font-semibold">
                      {settings.currencySymbol}{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="bg-[#FAF9F5] border border-[#DDD6C8] p-3 text-xs italic">
                  <span className="font-mono text-[10px] uppercase text-[#777] block not-italic">Patron Request Notes:</span>
                  &ldquo;{selectedOrder.notes}&rdquo;
                </div>
              )}

              {/* Footer actions */}
              <div className="pt-4 flex justify-between items-center border-t border-[#E8E4DA]">
                <div className="font-mono text-sm font-bold">
                  Total Value: {settings.currencySymbol}{selectedOrder.total.toLocaleString()}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setInvoiceOrder(selectedOrder);
                      setSelectedOrder(null);
                    }}
                    className="px-4 py-2 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black"
                  >
                    Print Official Invoice
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2 border border-[#888] text-xs font-mono uppercase"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
