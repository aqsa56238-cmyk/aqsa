import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    customers,
    settings,
    setAdminTab,
    updateProduct,
    setInvoiceOrder
  } = useStore();

  const [timeRange, setTimeRange] = useState<'today' | 'weekly' | 'monthly' | 'all'>('monthly');

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const activeProductsCount = products.filter(p => p.status === 'active').length;
  const totalCustomersCount = customers.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // Low stock products (stock <= 4)
  const lowStockProducts = products.filter(p => p.stock <= 4);

  // Best selling products calculation
  const productSalesMap: Record<string, { product: typeof products[0]; count: number; revenue: number }> = {};
  orders.forEach(order => {
    if (order.status === 'cancelled') return;
    order.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (!productSalesMap[item.productId]) {
        productSalesMap[item.productId] = {
          product: prod || {
            id: item.productId,
            name: item.productName,
            sku: item.sku,
            category: 'general',
            price: item.price,
            description: '',
            material: '',
            images: [item.image],
            sizes: [item.size],
            colors: [{ name: item.color, hex: '#000' }],
            stock: 0,
            isFeatured: false,
            isNewArrival: false,
            status: 'active',
            createdAt: ''
          },
          count: 0,
          revenue: 0
        };
      }
      productSalesMap[item.productId].count += item.quantity;
      productSalesMap[item.productId].revenue += item.price * item.quantity;
    });
  });

  const bestSelling = Object.values(productSalesMap).sort((a, b) => b.revenue - a.revenue).slice(0, 4);

  // Quick Restock Handler
  const handleQuickRestock = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      updateProduct(productId, { stock: prod.stock + 10 });
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Welcome & Time Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#141413]">
            Welcome back, Salon Director &bull; Executive Atelier Console
          </h2>
          <p className="text-xs text-[#635F56] mt-1 font-mono">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} &bull; Place Vendôme Central Node
          </p>
        </div>

        {/* Time Selector */}
        <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 border border-[#DDD8CD] self-start sm:self-auto text-xs font-mono">
          <button
            onClick={() => setTimeRange('today')}
            className={`px-3 py-1.5 transition-colors ${timeRange === 'today' ? 'bg-[#1C1B19] text-white' : 'text-[#666] hover:text-black'}`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1.5 transition-colors ${timeRange === 'weekly' ? 'bg-[#1C1B19] text-white' : 'text-[#666] hover:text-black'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1.5 transition-colors ${timeRange === 'monthly' ? 'bg-[#1C1B19] text-white' : 'text-[#666] hover:text-black'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeRange('all')}
            className={`px-3 py-1.5 transition-colors ${timeRange === 'all' ? 'bg-[#1C1B19] text-white' : 'text-[#666] hover:text-black'}`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (4 boxes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-white border border-[#E5E0D5] p-5">
          <div className="flex items-center justify-between text-[#736E66] text-xs font-mono mb-2">
            <span>TOTAL GROSS REVENUE</span>
            <span className="text-[#295438] flex items-center font-bold">+18.4%</span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-semibold text-[#141413] tabular-nums">
            {settings.currencySymbol}{totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#787369] mt-2 font-mono">
            Avg Order: {settings.currencySymbol}{avgOrderValue.toLocaleString()}
          </div>
        </div>

        {/* Orders Count */}
        <div className="bg-white border border-[#E5E0D5] p-5">
          <div className="flex items-center justify-between text-[#736E66] text-xs font-mono mb-2">
            <span>DISPATCH ORDERS</span>
            <ShoppingCart className="w-4 h-4 text-[#8C877E]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-semibold text-[#141413] tabular-nums">
            {totalOrdersCount}
          </div>
          <div className="text-[11px] text-[#787369] mt-2 font-mono">
            {orders.filter(o => o.status === 'pending').length} requiring atelier action
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white border border-[#E5E0D5] p-5">
          <div className="flex items-center justify-between text-[#736E66] text-xs font-mono mb-2">
            <span>ACTIVE SILHOUETTES</span>
            <Package className="w-4 h-4 text-[#8C877E]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-semibold text-[#141413] tabular-nums">
            {activeProductsCount}
          </div>
          <div className="text-[11px] text-[#787369] mt-2 font-mono">
            {products.length} registered total catalog
          </div>
        </div>

        {/* Patrons Registered */}
        <div className="bg-white border border-[#E5E0D5] p-5">
          <div className="flex items-center justify-between text-[#736E66] text-xs font-mono mb-2">
            <span>VIP PATRONS</span>
            <Users className="w-4 h-4 text-[#8C877E]" />
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-semibold text-[#141413] tabular-nums">
            {totalCustomersCount}
          </div>
          <div className="text-[11px] text-[#787369] mt-2 font-mono">
            100% Verified Haute Patrons
          </div>
        </div>
      </div>

      {/* Analytics Chart & Category Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Trend Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E5E0D5] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-lg text-[#161615] font-medium">Sales &amp; Consignment Revenue Analytics</h3>
              <p className="text-xs text-[#736E66] font-mono">Simulated volume across Q3 / Q4 2026 fiscal cycle</p>
            </div>
            <span className="text-xs font-mono text-[#295438] bg-[#EAF4EE] px-2.5 py-1 font-semibold">
              +24% vs Prev Month
            </span>
          </div>

          {/* SVG Line / Bar Visualization */}
          <div className="h-64 w-full flex items-end gap-3 pt-6 pb-2 border-b border-[#ECE7DD]">
            {[
              { label: 'Week 1', val: 42, rev: 14200 },
              { label: 'Week 2', val: 68, rev: 22800 },
              { label: 'Week 3', val: 55, rev: 18500 },
              { label: 'Week 4', val: 82, rev: 27900 },
              { label: 'Week 5', val: 95, rev: 33400 },
              { label: 'Week 6', val: 78, rev: 26200 },
              { label: 'Current', val: 100, rev: 38500 },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-mono text-[#736E66] opacity-0 group-hover:opacity-100 transition-opacity mb-1 tabular-nums">
                  ${(bar.rev / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full bg-[#1C1B19] group-hover:bg-[#8C3A27] transition-all duration-300"
                  style={{ height: `${bar.val}%` }}
                />
                <span className="text-[10px] font-mono text-[#736E66] mt-2 whitespace-nowrap">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#777] mt-3">
            <span>Minimum Baseline: $10,000</span>
            <span>Peak Velocity: $38,500</span>
          </div>
        </div>

        {/* Low Stock Watchlist (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E5E0D5] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-[#161615] font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#8C3A27]" />
                <span>Atelier Low-Stock Alerts</span>
              </h3>
              <span className="text-xs font-mono font-bold text-[#8C3A27]">{lowStockProducts.length} items</span>
            </div>

            <div className="space-y-3">
              {lowStockProducts.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-2.5 bg-[#FAF9F5] border border-[#ECE7DC] text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={p.images[0]} alt={p.name} className="w-9 h-11 object-cover border border-[#DDD]" />
                    <div>
                      <h4 className="font-medium text-[#1A1918] line-clamp-1">{p.name}</h4>
                      <p className="text-[10px] font-mono text-[#8C3A27] font-semibold">
                        {p.stock === 0 ? 'DEPLETED (0)' : `Only ${p.stock} units left`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleQuickRestock(p.id)}
                    className="px-2.5 py-1 bg-[#1C1B19] text-white text-[10px] font-mono uppercase tracking-wider hover:bg-black"
                  >
                    +10
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setAdminTab('products')}
            className="w-full mt-4 py-2 border border-[#1C1B19] text-xs font-mono uppercase tracking-wider text-[#1C1B19] hover:bg-[#1C1B19] hover:text-white transition-colors"
          >
            Manage All Product Inventory &rarr;
          </button>
        </div>
      </div>

      {/* Best-Selling Silhouettes & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best-Selling Products */}
        <div className="bg-white border border-[#E5E0D5] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-[#161615] font-medium">Best-Selling Haute Silhouettes</h3>
            <button
              onClick={() => setAdminTab('products')}
              className="text-xs font-mono text-[#736E66] hover:text-black uppercase tracking-wider"
            >
              Full Inventory &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {bestSelling.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-[#EFECE5] hover:bg-[#FAF9F5] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#8C877E] w-4">{idx + 1}</span>
                  <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-12 object-cover border" />
                  <div>
                    <h4 className="font-medium text-xs text-[#1A1918]">{item.product.name}</h4>
                    <p className="text-[10px] font-mono text-[#777]">{item.product.sku}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-xs font-semibold text-[#181816] tabular-nums">
                    {settings.currencySymbol}{item.revenue.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-[#736E66]">
                    {item.count} units dispatched
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="bg-white border border-[#E5E0D5] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-[#161615] font-medium">Recent Consignment Orders</h3>
            <button
              onClick={() => setAdminTab('orders')}
              className="text-xs font-mono text-[#736E66] hover:text-black uppercase tracking-wider"
            >
              All Orders ({orders.length}) &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border border-[#EFECE5] hover:bg-[#FAF9F5] transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#141413]">#{order.id}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#EAE6DD] text-[#333]">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#4F4B43] mt-1">{order.customerName}</p>
                </div>

                <div className="text-right">
                  <div className="font-mono text-xs font-semibold text-[#181816] tabular-nums">
                    {settings.currencySymbol}{order.total.toLocaleString()}
                  </div>
                  <button
                    onClick={() => setInvoiceOrder(order)}
                    className="text-[10px] font-mono text-[#8C3A27] underline hover:text-black mt-1"
                  >
                    View Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
