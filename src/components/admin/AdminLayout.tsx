import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCategories } from './AdminCategories';
import { AdminCustomers } from './AdminCustomers';
import { AdminSettings } from './AdminSettings';
import { AdminPhpExport } from './AdminPhpExport';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Settings,
  Database,
  ExternalLink,
  LogOut,
  Bell,
  Menu,
  X,
  Lock,
  ArrowRight
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    setAdminMode,
    settings,
    orders,
    products
  } = useStore();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Pre-authenticated for instant demo
  const [email, setEmail] = useState('admin@vendome.com');
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const lowStockCount = products.filter(p => p.stock <= 4).length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Please enter admin credentials.');
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'products', label: 'Products', icon: Package, badge: lowStockCount > 0 ? `${lowStockCount} low` : null },
    { id: 'categories', label: 'Categories', icon: Layers, badge: null },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : null },
    { id: 'customers', label: 'Customers', icon: Users, badge: null },
    { id: 'settings', label: 'Website Settings', icon: Settings, badge: null },
    { id: 'phpexport', label: 'PHP / MySQL Stack', icon: Database, badge: 'PHP 8' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-4">
        <div className="bg-white border border-[#DDD6C8] max-w-md w-full p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#1C1B19] text-white flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-light text-[#141413]">
              {settings.storeName}
            </h2>
            <p className="text-xs text-[#736E66] font-mono mt-1">
              Atelier Management &bull; Admin Console Gate
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase text-[#666] block mb-1">
                Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#DDD8CD] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>

            {authError && (
              <p className="text-[#8C3A27] text-xs font-mono">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-widest hover:bg-black transition-colors"
            >
              Authenticate &bull; Enter Panel
            </button>

            <div className="pt-4 border-t border-[#ECE7DD] text-center">
              <button
                type="button"
                onClick={() => setAdminMode(false)}
                className="text-xs text-[#736E66] hover:text-black font-mono inline-flex items-center gap-1"
              >
                <span>&larr; Return to Customer Storefront</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EC] flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="bg-[#1C1B19] text-white border-b border-[#2C2A26] sticky top-0 z-30 px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1.5 text-white/80 hover:text-white"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <span className="font-serif text-lg tracking-[0.14em] uppercase font-light">
              {settings.storeName}
            </span>
            <span className="bg-[#2D2A26] text-[#D8D2C5] text-[10px] font-mono uppercase px-2 py-0.5 border border-[#423E37]">
              ADMIN SUITE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setAdminTab('orders')}
              title="Orders pending action"
              className="p-1.5 text-white/70 hover:text-white transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {pendingOrdersCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#8C3A27] text-white text-[9px] font-mono rounded-full flex items-center justify-center font-bold">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick storefront switch */}
          <button
            onClick={() => setAdminMode(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase bg-white/10 hover:bg-white hover:text-black transition-all border border-white/20"
          >
            <span>Customer Storefront</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setAdminMode(false);
            }}
            className="p-1.5 text-white/60 hover:text-[#E89C94] transition-colors"
            title="Log out of admin session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-[#E5E0D5] flex flex-col justify-between transform transition-transform duration-200 md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } pt-16 md:pt-0`}
        >
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono tracking-widest uppercase text-[#88837A]">
              ATELIER NAVIGATION
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setAdminTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono transition-colors text-left ${
                    isActive
                      ? 'bg-[#1C1B19] text-white font-medium'
                      : 'text-[#4A4741] hover:bg-[#FAF9F5] hover:text-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-xs uppercase ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#FBEBE7] text-[#8C3A27] font-semibold'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer info */}
          <div className="p-4 border-t border-[#ECE7DD] bg-[#FAF9F5] text-[11px] font-mono text-[#736E66] space-y-1">
            <div className="font-semibold text-[#141413]">Vendôme Commerce Engine</div>
            <div>PHP 8.2 &bull; MySQL Relational</div>
            <div className="text-[10px] text-[#999]">Status: Central Master Node Online</div>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-10 md:hidden"
          />
        )}

        {/* Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {adminTab === 'dashboard' && <AdminDashboard />}
          {adminTab === 'products' && <AdminProducts />}
          {adminTab === 'orders' && <AdminOrders />}
          {adminTab === 'categories' && <AdminCategories />}
          {adminTab === 'customers' && <AdminCustomers />}
          {adminTab === 'settings' && <AdminSettings />}
          {adminTab === 'phpexport' && <AdminPhpExport />}
        </main>
      </div>
    </div>
  );
};
