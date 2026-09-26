import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, MessageSquare, Compass, PhoneCall, ShieldCheck, Mail } from 'lucide-react';

export const PageView: React.FC = () => {
  const { activePage, setActivePage, pages, settings } = useStore();

  const page = pages.find(p => p.slug === activePage);

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-light text-[#141413] mb-4">
          Page Not Found
        </h2>
        <p className="text-xs font-mono text-[#777] mb-8">
          The requested atelier page could not be located in the archives.
        </p>
        <button
          onClick={() => setActivePage('home')}
          className="px-6 py-3 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-widest hover:bg-black"
        >
          Return to Storefront
        </button>
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    const phone = (settings.whatsappNumber || '+33142680020').replace(/[^0-9+]/g, '');
    const text = encodeURIComponent(`Bonjour Vendôme Concierge, I am inquiring regarding the "${page.title}" page.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141413]">
      {/* Editorial Page Banner */}
      <div className="relative bg-[#1C1B19] text-white overflow-hidden min-h-[360px] sm:min-h-[440px] flex items-end">
        {page.bannerImage ? (
          <div className="absolute inset-0 z-0">
            <img
              src={page.bannerImage}
              alt={page.title}
              className="w-full h-full object-cover opacity-45"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-[#141413]/60 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C1B19] to-[#2E2B27]" />
        )}

        {/* Banner Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
          {/* Breadcrumb & Return */}
          <div className="mb-6 flex items-center gap-2 text-xs font-mono text-white/70">
            <button
              onClick={() => setActivePage('home')}
              className="hover:text-white flex items-center gap-1.5 uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Maison Index</span>
            </button>
            <span>/</span>
            <span className="text-amber-200 uppercase tracking-wider">{page.navLabel}</span>
          </div>

          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/80 block mb-2">
            MAISON ATELIER ARCHIVE &bull; EDITORIAL FOLIO
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide max-w-3xl leading-[1.15]">
            {page.title}
          </h1>

          {page.subtitle && (
            <p className="font-serif italic text-base sm:text-xl text-white/85 mt-3 max-w-2xl font-light">
              {page.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Main Page Narrative Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white border border-[#E5E0D5] p-6 sm:p-12 shadow-xs space-y-8">
          {/* Savoir-faire Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#EFECE5] text-xs font-mono text-[#736E66]">
            <div>
              <span>Official Protocol: </span>
              <strong className="text-black uppercase">Place Vendôme, Paris 1er</strong>
            </div>
            <div>
              <span>Edition: </span>
              <strong className="text-black uppercase">{settings.heroEdition || 'Autumn / Winter 2026'}</strong>
            </div>
            <div>
              <span>Last Revised: </span>
              <strong className="text-black">{new Date(page.updatedAt).toLocaleDateString()}</strong>
            </div>
          </div>

          {/* Body Prose */}
          <div className="prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed text-[#2C2A28] font-light space-y-5">
            {page.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Concierge Contact Card */}
          <div className="pt-8 border-t border-[#EFECE5] bg-[#FAF9F5] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#888] font-bold block">
                ATELIER CONCIERGE ASSISTANCE
              </span>
              <h4 className="font-serif text-lg font-normal text-[#141413]">
                Inquire with our Paris salon or arrange an appointment
              </h4>
              <p className="text-xs text-[#666] font-mono">
                {settings.contactEmail} &bull; {settings.contactPhone}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleWhatsAppContact}
                className="px-4 py-2.5 bg-[#25D366] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#1EBE5D] flex items-center gap-2 font-medium transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Salon</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePage('home')}
                className="px-4 py-2.5 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
              >
                <span>Back to Store</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
