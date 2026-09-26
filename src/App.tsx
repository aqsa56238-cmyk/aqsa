/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CuratedArchetypes } from './components/CuratedArchetypes';
import { CatalogSection } from './components/CatalogSection';
import { ManifestoSection } from './components/ManifestoSection';
import { AtelierIconsSection } from './components/AtelierIconsSection';
import { PrivateArchivesSection } from './components/PrivateArchivesSection';
import { ScenesDeVieSection } from './components/ScenesDeVieSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SearchModal } from './components/SearchModal';
import { InvoiceModal } from './components/InvoiceModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { PageView } from './components/PageView';

const MainApp: React.FC = () => {
  const { adminMode, settings, activePage } = useStore();

  React.useEffect(() => {
    if (settings.pageTitle) {
      document.title = settings.pageTitle;
    } else if (settings.storeName) {
      document.title = `${settings.storeName} | Haute Couture & Architectural Silhouettes`;
    }
  }, [settings.pageTitle, settings.storeName]);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#2A2825] selection:text-[#FAF9F5]">
      {adminMode ? (
        <AdminLayout />
      ) : (
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1">
            {activePage === 'home' ? (
              <>
                <Hero />
                <CuratedArchetypes />
                <CatalogSection />
                <ManifestoSection />
                <AtelierIconsSection />
                <PrivateArchivesSection />
                <ScenesDeVieSection />
              </>
            ) : (
              <PageView />
            )}
          </main>
          <Footer />
        </div>
      )}

      {/* Global Interactive Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTrackingModal />
      <SearchModal />
      <InvoiceModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
