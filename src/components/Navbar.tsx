import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, Shield, Compass, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    settings,
    cartCount,
    setIsCartOpen,
    wishlist,
    setActiveCategory,
    setIsSearchOpen,
    setIsTrackingOpen,
    adminMode,
    setAdminMode,
    activePage,
    setActivePage,
    pages
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topBannerVisible, setTopBannerVisible] = useState(true);

  const handleNavClick = (slug: string) => {
    const isCustomPage = pages.some(p => p.slug === slug);
    if (isCustomPage) {
      setActivePage(slug);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActivePage('home');
      setActiveCategory(slug);
      setMobileMenuOpen(false);
      setTimeout(() => {
        const catalogEl = document.getElementById('catalog-section');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  // Combine enabled navLinks with any custom pages marked showInNav
  const navigationItems = React.useMemo(() => {
    const defaultLinks = settings.navLinks && settings.navLinks.length > 0
      ? settings.navLinks.filter(l => l.enabled)
      : [
          { id: '1', label: 'Collection', slug: 'all', enabled: true },
          { id: '2', label: 'Outerwear', slug: 'outerwear', enabled: true },
          { id: '3', label: 'Tailoring', slug: 'tailoring', enabled: true },
          { id: '4', label: 'Cashmere', slug: 'knitwear', enabled: true },
          { id: '5', label: 'Leather Goods', slug: 'leather-goods', enabled: true },
          { id: '6', label: 'Men', slug: 'men', enabled: true },
        ];

    // Append pages marked showInNav that aren't already in defaultLinks
    const navSlugs = new Set(defaultLinks.map(l => l.slug));
    const extraPages = pages
      .filter(p => p.showInNav && !navSlugs.has(p.slug))
      .map(p => ({ id: p.id, label: p.navLabel || p.title, slug: p.slug, enabled: true }));

    return [...defaultLinks, ...extraPages];
  }, [settings.navLinks, pages]);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E8E5DD] transition-all">
      {/* Top Privilege Announcement Bar */}
      {topBannerVisible && settings.showAnnouncement !== false && (
        <div className="bg-[#1C1B19] text-[#EFECE6] text-[11px] font-sans tracking-[0.16em] uppercase py-2 px-4 flex items-center justify-between text-center relative border-b border-[#2E2C29]">
          <div className="flex-1 text-center font-medium">
            {settings.announcementText || `COMPLIMENTARY WHITE-GLOVE WORLDWIDE DELIVERY ON ORDERS OVER ${settings.currencySymbol}${settings.freeShippingThreshold} • PRIVATE SALON APPOINTMENTS PARIS • NEW YORK`}
          </div>
          <button
            onClick={() => setTopBannerVisible(false)}
            aria-label="Dismiss banner"
            className="text-[#99948D] hover:text-white ml-2 text-xs transition-colors"
          >
            &times;
          </button>
        </div>
      )}

      {/* Strict One-Row Three-Zone Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2A2825] hover:text-black focus:outline-none"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Zone 1: Brand Wordmark or Uploaded Cloudinary Logo */}
        <div className="flex items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center hover:opacity-85 transition-opacity"
          >
            {settings.logoImage ? (
              <img
                src={settings.logoImage}
                alt={settings.storeName}
                className="h-9 sm:h-11 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.18em] uppercase text-[#141413]">
                {settings.logoText || settings.storeName}
              </span>
            )}
          </a>
        </div>

        {/* Zone 2: Dynamic Page / Category Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-[12px] font-medium tracking-[0.15em] uppercase text-[#4A4742]">
          {navigationItems.map((link) => {
            const isActive = activePage === link.slug || (activePage === 'home' && link.slug === 'all');
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.slug)}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-black font-semibold border-b-2 border-black'
                    : 'hover:text-[#111110] hover:border-b hover:border-[#111110]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Search, Tracking, Wishlist, Bag, Admin Mode) */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Order Tracking */}
          <button
            onClick={() => setIsTrackingOpen(true)}
            title="Track Order"
            className="hidden sm:flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase text-[#615D56] hover:text-[#141413] transition-colors px-2 py-1"
          >
            <Compass className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Track Order</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#4A4742] hover:text-[#141413] transition-colors"
            aria-label="Search items"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
          </button>

          {/* Wishlist count */}
          <button
            onClick={() => {
              const catalog = document.getElementById('catalog-section');
              catalog?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-2 text-[#4A4742] hover:text-[#141413] transition-colors relative"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 stroke-[1.5]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#8C3A27] text-white text-[9px] font-mono rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Bag button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 p-2 text-[#141413] hover:opacity-80 transition-opacity"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            <span className="text-[11px] font-mono tracking-wider font-semibold">
              BAG ({cartCount})
            </span>
          </button>

          {/* Admin Suite Toggle Button */}
          <button
            onClick={() => setAdminMode(!adminMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono tracking-wider transition-all border ${
              adminMode
                ? 'bg-[#1C1B19] text-[#FAF9F5] border-[#1C1B19]'
                : 'bg-white text-[#2C2B29] border-[#D6D2C9] hover:bg-[#F3F0EA]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">ADMIN PANEL</span>
            <span className="sm:hidden font-medium">ADMIN</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E5DD] bg-[#FAF9F5] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium tracking-[0.14em] uppercase text-[#2A2825]">
            {navigationItems.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.slug)}
                className={`text-left py-1 border-b border-[#ECE9E1] transition-colors ${
                  activePage === link.slug ? 'text-black font-bold' : 'hover:text-black'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsTrackingOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-[#8C3A27] font-semibold"
            >
              Track Existing Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
