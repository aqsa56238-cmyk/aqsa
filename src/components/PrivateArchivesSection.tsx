import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { KeyRound, Check } from 'lucide-react';

export const PrivateArchivesSection: React.FC = () => {
  const { settings } = useStore();
  const [requested, setRequested] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [patronRef, setPatronRef] = useState('');

  const handleRequestAccess = () => {
    setInviteModalOpen(true);
  };

  const handleConfirmAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setRequested(true);
    setInviteModalOpen(false);
  };

  return (
    <section className="py-12 bg-[#FAF9F5] border-b border-[#E8E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#141413] text-white p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Subtle concentric architectural geometry */}
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -right-12 -top-12 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute right-8 top-8 w-44 h-44 rounded-full border border-white/5 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C9C3B6] uppercase block mb-3">
              {settings.archivesKicker || 'EXCLUSIVE PATRON PRIVILEGE'}
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl font-light text-white mb-4 leading-tight">
              {settings.archivesTitle || 'The Private Archives • Bespoke Monogramming'}
            </h2>

            <p className="text-xs sm:text-sm text-[#BDB7AA] font-light leading-relaxed mb-8">
              {settings.archivesText || 'Through the season, patrons ordering any piece from our Cashmeres & Tailoring collections receive complimentary hand-embroidered silk monogramming in our Paris atelier.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {requested ? (
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#243324] border border-[#3E5B3E] text-white text-xs font-mono uppercase tracking-wider">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Archive Invitation Active &bull; Code: VDM-VIP-2026</span>
                </div>
              ) : (
                <button
                  onClick={handleRequestAccess}
                  className="px-6 py-3.5 bg-[#FAF9F5] text-[#141413] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#EAE5D8] transition-colors"
                >
                  {settings.archivesButtonText || 'REQUEST ARCHIVE ACCESS'}
                </button>
              )}

              <span className="text-[11px] font-mono tracking-widest uppercase text-[#968F83]">
                {settings.archivesNote || 'BY PRIVATE INVITATION OR PATRON REFERENCE'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Access Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#FAF9F5] border border-[#DDD6C8] max-w-md w-full p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#736E66]">
                ARCHIVE VERIFICATION
              </span>
              <button onClick={() => setInviteModalOpen(false)} className="text-sm font-mono">&times;</button>
            </div>
            <h3 className="font-serif text-2xl text-[#141413] mb-2 font-light">
              Enter Patron Reference Code
            </h3>
            <p className="text-xs text-[#5D5850] mb-6 font-light">
              Kindly input your private invite or previous order reference number to unlock private archival capsules.
            </p>
            <form onSubmit={handleConfirmAccess} className="space-y-4">
              <input
                type="text"
                value={patronRef}
                onChange={(e) => setPatronRef(e.target.value)}
                placeholder="e.g. VDM-1024 or VIP-PARIS"
                required
                className="w-full px-3 py-2.5 bg-white border border-[#D5CFBF] text-xs font-mono focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#141413] text-white text-xs font-mono uppercase tracking-wider hover:bg-black"
              >
                UNLOCK PRIVILEGE ACCESS
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
