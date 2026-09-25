import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const ScenesDeVieSection: React.FC = () => {
  const { settings } = useStore();

  const scenes = [
    {
      image: "/src/assets/images/hero_luxury_coat_1790325188738.jpg",
      title: "Place Vendôme Colonnes",
      location: "Paris 1er"
    },
    {
      image: "/src/assets/images/cat_outerwear_cape_1790325209241.jpg",
      title: "Salon Privé Fitting",
      location: "Rue Saint-Honoré"
    },
    {
      image: "/src/assets/images/cat_tailored_suit_1790325225628.jpg",
      title: "Hourglass Precision",
      location: "Atelier Central"
    },
    {
      image: "/src/assets/images/cat_leather_bag_1790325239933.jpg",
      title: "The Opéra Box Calfskin",
      location: "Faubourg"
    },
    {
      image: "/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg",
      title: "Tactile Cashmere Rib",
      location: "Biella Mills"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#E8E5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#736E66] block mb-2">
              RUNWAY & DIARY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#141413] font-light">
              Scènes de Vie &bull; {settings.instagramHandle}
            </h2>
          </div>
          <a
            href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono tracking-[0.16em] uppercase text-[#47433C] hover:text-black flex items-center gap-1 group self-start sm:self-end"
          >
            <span>Follow The Maison</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* 5 Images Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {scenes.map((scene, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/5] bg-[#EFECE4] overflow-hidden border border-[#E3DED2]"
            >
              <img
                src={scene.image}
                alt={scene.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="text-white text-xs font-serif">{scene.title}</span>
                <span className="text-[10px] font-mono uppercase text-[#D8D2C5]">{scene.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
