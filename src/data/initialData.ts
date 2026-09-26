import { Product, Category, Order, Customer, WebsiteSettings, StorePage } from '../types';

export const initialPages: StorePage[] = [
  {
    id: "page-1",
    title: "About The Maison & Atelier Savoir-Faire",
    navLabel: "The Maison",
    slug: "about",
    subtitle: "Founded upon architectural minimalism and uncompromising tactile materiality.",
    content: "Founded in the heart of Paris at 14 Place Vendôme, Vendôme Éditions eliminates all superficial ornament in pursuit of pure drape, generational craftsmanship, and noble natural fibers.\n\nEvery silhouette begins not with decorative sketches, but with structural balance against the human form. Our tailors construct garments using internal horsehair canvas and hand-set sleeves that allow natural fluidity and comfort. We partner exclusively with heritage mills across Biella, Como, and the Scottish Highlands, maintaining a strict 0.0% synthetic fiber tolerance across all core collections.\n\nWe invite patrons to experience the quiet permanence of clothing conceived as lasting architectural monuments.",
    bannerImage: "/src/assets/images/hero_luxury_coat_1790325188738.jpg",
    showInNav: true,
    showInFooter: true,
    isSystem: true,
    updatedAt: "2026-09-25T12:00:00Z"
  },
  {
    id: "page-2",
    title: "White-Glove Worldwide Delivery & Packaging",
    navLabel: "Shipping & Delivery",
    slug: "shipping",
    subtitle: "Insured carbon-neutral transit delivered in bespoke wooden archival casings.",
    content: "Vendôme Éditions provides complimentary white-glove courier delivery worldwide on all orders exceeding $500.\n\nEach garment is steam-pressed and packed in breathable archival linen dust bags, suspended upon hand-carved cedar hangers, and enclosed in heavy-gauge custom presentation boxes sealed with wax. International deliveries are handled via temperature-regulated carbon-neutral express courier services with real-time tracking.\n\nEstimated delivery times:\n• France & European Union: 24 to 48 hours\n• United Kingdom & Switzerland: 2 to 3 business days\n• North America: 3 to 4 business days\n• Asia & Middle East: 3 to 5 business days",
    bannerImage: "/src/assets/images/cat_outerwear_cape_1790325209241.jpg",
    showInNav: false,
    showInFooter: true,
    isSystem: true,
    updatedAt: "2026-09-25T12:00:00Z"
  },
  {
    id: "page-3",
    title: "Returns & Lifetime Atelier Alteration Guarantee",
    navLabel: "Returns & Alterations",
    slug: "returns",
    subtitle: "Complimentary adjustments and 30-day effortless return privilege.",
    content: "We believe true luxury encompasses perpetual care. Every patron is entitled to our complimentary salon alteration service across our Paris, New York, and London ateliers to achieve a tailored fit.\n\nShould you wish to return a purchase, we accept unworn garments in their pristine original condition with unbroken security tags within 30 days of delivery. Prepaid return courier labels are included in every order dispatch.\n\nIn addition, all outerwear and tailoring include our Lifetime Preservation Guarantee, providing annual cashmere de-pilling, organic steam restoration, and leather nourishment.",
    bannerImage: "/src/assets/images/cat_tailored_suit_1790325225628.jpg",
    showInNav: false,
    showInFooter: true,
    isSystem: true,
    updatedAt: "2026-09-25T12:00:00Z"
  },
  {
    id: "page-4",
    title: "Patron Discretion & Privacy Protocol",
    navLabel: "Privacy Protocol",
    slug: "privacy",
    subtitle: "Strict confidentiality and sovereign protection of patron records.",
    content: "Discretion is the foundation of haute couture. Vendôme Éditions maintains rigorous safeguards over all client information, fitting measurements, and archival purchase histories.\n\nWe never sell, rent, disclose, or monetize patron data to third-party advertisers. All transactional communications are protected with end-to-end encryption. Patrons wishing to maintain an anonymous salon profile or request complete deletion of personal records may contact our Chief Concierge directly.",
    bannerImage: "/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg",
    showInNav: false,
    showInFooter: true,
    isSystem: true,
    updatedAt: "2026-09-25T12:00:00Z"
  },
  {
    id: "page-5",
    title: "Salon Privé & Concierge Appointments",
    navLabel: "Salon Concierge",
    slug: "contact",
    subtitle: "Private appointments at 14 Place Vendôme or bespoke hotel visits.",
    content: "Our private salon welcomes patrons by appointment for bespoke measurements, seasonal preview viewings, and one-on-one wardrobe consultations.\n\nLocation: 14 Place Vendôme, Salon Privé, 75001 Paris, France\nTelephony: +33 1 42 68 00 20\nDirect WhatsApp Orders: +33 1 42 68 00 20\nEmail: atelier@vendome-editions.com\n\nSalon Hours:\nMonday to Saturday: 10:00 — 19:30 CET (By Appointment)\nPrivate In-Suite Hotel Fitting: Available across Paris, London, and Geneva upon 48-hour notice.",
    bannerImage: "/src/assets/images/cat_leather_bag_1790325239933.jpg",
    showInNav: true,
    showInFooter: true,
    isSystem: true,
    updatedAt: "2026-09-25T12:00:00Z"
  },
  {
    id: "page-6",
    title: "Bespoke Monogramming & Custom Atelier Cuts",
    navLabel: "Bespoke Fitting",
    slug: "bespoke",
    subtitle: "Individual cut-to-measure patterns drafted by master tailors.",
    content: "For patrons seeking individual pattern creation, our master tailors draft unique wooden pattern templates for individual body proportions.\n\nPatrons may select from over 400 archival bolts of vintage Loro Piana cashmere, Escorial wool, and Dormeuil double-face blends. All bespoke pieces include complimentary tone-on-tone silk monogramming embroidered by hand inside the breast pocket or collar melton.",
    bannerImage: "/src/assets/images/hero_luxury_coat_1790325188738.jpg",
    showInNav: true,
    showInFooter: false,
    isSystem: false,
    updatedAt: "2026-09-25T12:00:00Z"
  }
];

export const initialSettings: WebsiteSettings = {
  // Identity & Head
  storeName: "VENDÔME ÉDITIONS",
  pageTitle: "Vendôme Éditions | Haute Couture & Architectural Tailoring Paris",
  tagline: "Haute Couture & Architectural Silhouettes Born in Paris",
  logoText: "VENDÔME ÉDITIONS",
  logoImage: "",
  currency: "USD",
  currencySymbol: "$",
  freeShippingThreshold: 500,

  // Announcement Bar
  announcementText: "COMPLIMENTARY WHITE-GLOVE WORLDWIDE DELIVERY ON ORDERS OVER $500 • PRIVATE SALON APPOINTMENTS PARIS • NEW YORK",
  showAnnouncement: true,

  // Navigation Links / Page Names
  navLinks: [
    { id: 'nav-1', label: 'Full Collection', slug: 'all', enabled: true },
    { id: 'nav-2', label: 'Outerwear & Capes', slug: 'outerwear', enabled: true },
    { id: 'nav-3', label: 'Ready-to-Wear Tailoring', slug: 'tailoring', enabled: true },
    { id: 'nav-4', label: 'Cashmere & Knitwear', slug: 'knitwear', enabled: true },
    { id: 'nav-5', label: 'Leather Goods & Objet', slug: 'leather-goods', enabled: true },
    { id: 'nav-6', label: "Monsieur (Men's)", slug: 'men', enabled: true }
  ],

  // Hero Section
  heroTagline: "COLLECTION N° IX • L'AUTOMNE INTEMPOREL",
  heroTitle: "The Poetry of Tailored Restraint",
  heroSubtitle: "Handcrafted double-faced cashmere, sculptural wools, and architectural silhouettes born in our Place Vendôme atelier. Conceived for generational permanence.",
  heroCtaText: "EXPLORE COLLECTION",
  heroSecondaryCtaText: "Read The Monograph",
  heroImage: "/src/assets/images/hero_luxury_coat_1790325188738.jpg",
  heroCoordinates: "N° 04 • PLACE VENDÔME, SALON PRIVÉ, PARIS 1er",
  heroEdition: "AUTUMN / WINTER EDITION 2026",

  // Privileges (4 items)
  privilege1Title: "White-Glove Courier",
  privilege1Desc: "Worldwide carbon-neutral transit & insured bespoke delivery.",
  privilege2Title: "Atelier Alterations",
  privilege2Desc: "Complimentary tailoring in Paris, London & New York salons.",
  privilege3Title: "Lifetime Preservation",
  privilege3Desc: "Annual cashmere de-pilling & leather conditioning guarantee.",
  privilege4Title: "Private Concierge",
  privilege4Desc: "Direct stylist consultation & salon fitting appointments.",

  // Curated Archetypes
  archetypesKicker: "ARCHITECTURAL TAXONOMY",
  archetypesTitle: "Curated Archetypes",
  archetypesButtonText: "View Complete Index",

  // Catalog Section
  catalogKicker: "AUTUMN SELECTION 2026",
  catalogTitle: "New Arrivals & Permanent Atelier",

  // The Manifesto
  manifestoKicker: "THE VENDÔME MANIFESTO",
  manifestoQuote: "“Luxury is not excess, but the rigorous elimination of everything superfluous.”",
  manifestoText: "In an era of disposable velocity, we engineer garments governed by architectural proportion and absolute materiality. Every silhouette is conceived as a sculpture in motion—balanced against the human form and cut exclusively from regenerative fibers sourced directly from small heritage mills across Biella, Como, and the Scottish Highlands.",
  manifestoImage: "/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg",
  manifestoSpecLabel: "SAVOIR-FAIRE SPECIFICATION",
  manifestoSpecText: "36 hours of hand-guided stitchwork per garment by master tailors in our Place Vendôme workshop.",
  manifestoFiberMetric: "0.0%",
  manifestoFiberDesc: "SYNTHETIC FIBERS TOLERANCE IN ALL CORE GARMENTS",
  manifestoOriginLabel: "ORIGIN PROTOCOL",
  manifestoOriginValue: "14 Place Vendôme, Salon Privé, 75001 Paris, France",
  manifestoPedigreeLabel: "TEXTILE PEDIGREE",
  manifestoPedigreeValue: "Certified Loro Piana & Dormeuil Mills",
  manifestoButton1: "EXPLORE THE ATELIER",
  manifestoButton2: "RESERVE A PRIVATE SALON FITTING",

  // Atelier Icons
  iconsKicker: "PERMANENT COLLECTION",
  iconsTitle: "Atelier Icons",
  iconsSubtitle: "Pieces that transcend seasonal cadences. Reissued annually in strictly numbered editions.",

  // Private Archives
  archivesKicker: "EXCLUSIVE PATRON PRIVILEGE",
  archivesTitle: "The Private Archives • Bespoke Monogramming",
  archivesText: "Through the season, patrons ordering any piece from our Cashmeres & Tailoring collections receive complimentary hand-embroidered silk monogramming in our Paris atelier.",
  archivesButtonText: "REQUEST ARCHIVE ACCESS",
  archivesNote: "BY PRIVATE INVITATION OR PATRON REFERENCE",

  // Runway Diary / Scènes de Vie
  scenesKicker: "RUNWAY & DIARY",
  scenesTitle: "Scènes de Vie",
  scenesFollowText: "Follow The Maison",
  scenesGallery: [
    {
      id: "scene-1",
      image: "/src/assets/images/hero_luxury_coat_1790325188738.jpg",
      title: "Place Vendôme Colonnes",
      location: "Paris 1er"
    },
    {
      id: "scene-2",
      image: "/src/assets/images/cat_outerwear_cape_1790325209241.jpg",
      title: "Salon Privé Fitting",
      location: "Rue Saint-Honoré"
    },
    {
      id: "scene-3",
      image: "/src/assets/images/cat_tailored_suit_1790325225628.jpg",
      title: "Hourglass Precision",
      location: "Atelier Central"
    },
    {
      id: "scene-4",
      image: "/src/assets/images/cat_leather_bag_1790325239933.jpg",
      title: "The Opéra Box Calfskin",
      location: "Faubourg"
    },
    {
      id: "scene-5",
      image: "/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg",
      title: "Tactile Cashmere Rib",
      location: "Biella Mills"
    }
  ],

  // Contacts & WhatsApp
  contactEmail: "atelier@vendome-editions.com",
  contactPhone: "+33 1 42 68 00 20",
  whatsappNumber: "+33142680020",
  instagramHandle: "@vendome_editions",
  atelierAddress: "14 Place Vendôme, Salon Privé, 75001 Paris, France",

  // Policies & Footer
  aboutUs: "Founded upon the philosophy of architectural minimalism, Vendôme Éditions eliminates all superficial ornament in pursuit of pure drape, generational craftsmanship, and noble natural fibers.",
  shippingPolicy: "Complimentary white-glove carbon-neutral delivery on orders exceeding $500 worldwide. Hand-delivered in archival dust bags and custom wooden garment casings.",
  returnPolicy: "We accept returns and bespoke alterations within 30 days of receipt in pristine original condition.",
  privacyPolicy: "We treat patron information with utmost discretion and confidentiality. We never sell, rent, or disclose personal order history.",
  footerDescription: "Architectural silhouettes and artisanal savoir-faire crafted in our Parisian atelier. Silent luxury conceived for enduring aesthetic permanence.",
  footerGazetteTitle: "THE GAZETTE PRIVÉE",
  footerGazetteText: "Receive private preview invitations, seasonal folios, and numbered atelier releases.",
  footerCopyright: "© 2026 VENDÔME ÉDITIONS • ALL RIGHTS RESERVED",
  footerCities: "PARIS • NEW YORK • TOKYO • LONDON"
};

export const initialCategories: Category[] = [
  {
    id: "cat-1",
    name: "Outerwear & Capes",
    slug: "outerwear",
    description: "Double-faced cashmere cloaks and storm-proof architectural coats.",
    image: "/src/assets/images/cat_outerwear_cape_1790325209241.jpg",
    itemCount: 8
  },
  {
    id: "cat-2",
    name: "Ready to Wear Tailoring",
    slug: "tailoring",
    description: "Precision shoulder constructions and fluid evening wool trousers.",
    image: "/src/assets/images/cat_tailored_suit_1790325225628.jpg",
    itemCount: 12
  },
  {
    id: "cat-3",
    name: "Leather Goods & Objet",
    slug: "leather-goods",
    description: "Saddle-stitched bridle leathers and hand-forged geometric hardware.",
    image: "/src/assets/images/cat_leather_bag_1790325239933.jpg",
    itemCount: 6
  },
  {
    id: "cat-4",
    name: "Knitwear & Cashmere",
    slug: "knitwear",
    description: "Organic Scottish Highlands cashmere and tactile sculptural ribs.",
    image: "/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg",
    itemCount: 9
  },
  {
    id: "cat-5",
    name: "Men's Collection",
    slug: "men",
    description: "Bespoke overcoats, worsted wool flannel suiting, and fine silk ties.",
    image: "/src/assets/images/hero_luxury_coat_1790325188738.jpg",
    itemCount: 7
  },
  {
    id: "cat-6",
    name: "Petits Héritiers (Kids)",
    slug: "kids",
    description: "Micro-tailored merino jackets and heirloom cashmere blankets.",
    image: "/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg",
    itemCount: 4
  }
];

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "The Grand Haussmann Cashmere Trench",
    sku: "VDM-TR-801",
    category: "outerwear",
    price: 3450,
    description: "Sculptural double-breasted trench crafted from double-faced 100% Sorignac Loro Piana Storm System wool and cashmere. Features storm-flap yoke, hand-stitched horn buttons, and a removable waist belt.",
    material: "100% Sorignac Loro Piana Storm System Wool & Mongolian Cashmere",
    images: [
      "/src/assets/images/hero_luxury_coat_1790325188738.jpg",
      "/src/assets/images/cat_outerwear_cape_1790325209241.jpg"
    ],
    sizes: ["FR 34", "FR 36", "FR 38", "FR 40", "FR 42"],
    colors: [
      { name: "Camel", hex: "#C49A6C" },
      { name: "Charcoal", hex: "#3A3935" },
      { name: "Noir", hex: "#161616" }
    ],
    stock: 7,
    isFeatured: true,
    isNewArrival: true,
    status: "active",
    createdAt: "2026-09-15"
  },
  {
    id: "prod-2",
    name: "Sculpted Hourglass Wool Blazer",
    sku: "VDM-BL-204",
    category: "tailoring",
    price: 2190,
    salePrice: 1950,
    description: "Architectural jacket with structured floating canvas chest piece, dramatic nipped waist, and high-cut armholes. Finished with custom brushed horn button closures.",
    material: "Super 150s Biella Merino Wool • Pure Silk Twill Lining",
    images: [
      "/src/assets/images/cat_tailored_suit_1790325225628.jpg",
      "/src/assets/images/hero_luxury_coat_1790325188738.jpg"
    ],
    sizes: ["FR 34", "FR 36", "FR 38", "FR 40"],
    colors: [
      { name: "Anthracite", hex: "#2C2D30" },
      { name: "Ecru", hex: "#EBE7DF" },
      { name: "Midnight", hex: "#1B202E" }
    ],
    stock: 5,
    isFeatured: true,
    isNewArrival: true,
    status: "active",
    createdAt: "2026-09-18"
  },
  {
    id: "prod-3",
    name: "The Opéra Box: Hand-Polished Calf Tote",
    sku: "VDM-LG-412",
    category: "leather-goods",
    price: 2420,
    description: "Geometric structured tote bag crafted from vegetable-tanned French calfskin with hand-burnished raw edges. Accented with 18k pale gold satin hardware and an interior suede compartment.",
    material: "Hand-Furnished French Box Calf • Lambskin Nappa Lining",
    images: [
      "/src/assets/images/cat_leather_bag_1790325239933.jpg",
      "/src/assets/images/cat_outerwear_cape_1790325209241.jpg"
    ],
    sizes: ["One Size (36 x 28 x 14 cm)"],
    colors: [
      { name: "Onyx Black", hex: "#141414" },
      { name: "Cognac", hex: "#7E4B28" },
      { name: "Forest Vert", hex: "#22382B" }
    ],
    stock: 3,
    isFeatured: true,
    isNewArrival: false,
    status: "active",
    createdAt: "2026-09-10"
  },
  {
    id: "prod-4",
    name: "The Vendôme Ribbed Cashmere Knit",
    sku: "VDM-KN-109",
    category: "knitwear",
    price: 1450,
    description: "Relaxed high-collar knit spun from 8-ply Scottish cashmere. Features drop shoulders, elongated cuffs with subtle thumbhole slit, and generous side splits.",
    material: "100% 8-Ply Organic Scottish Highlands Cashmere",
    images: [
      "/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg",
      "/src/assets/images/cat_tailored_suit_1790325225628.jpg"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Alabaster Cream", hex: "#F3EDE2" },
      { name: "Heather Gray", hex: "#9E9E9C" },
      { name: "Espresso", hex: "#3B2B20" }
    ],
    stock: 12,
    isFeatured: true,
    isNewArrival: true,
    status: "active",
    createdAt: "2026-09-20"
  },
  {
    id: "prod-5",
    name: "The Colmar Collarless Cashmere Coat",
    sku: "VDM-CT-905",
    category: "outerwear",
    price: 3900,
    description: "An homage to modern minimalism. Monolithic silhouette with concealed magnetic placket closure, deep welt pockets, and hand-finished double-faced cashmere borders.",
    material: "100% Loro Piana Storm System Cashmere",
    images: [
      "/src/assets/images/cat_outerwear_cape_1790325209241.jpg",
      "/src/assets/images/hero_luxury_coat_1790325188738.jpg"
    ],
    sizes: ["FR 36", "FR 38", "FR 40", "FR 42"],
    colors: [
      { name: "Bespoke Taupe", hex: "#5C5248" },
      { name: "Noir", hex: "#161616" }
    ],
    stock: 2,
    isFeatured: true,
    isNewArrival: false,
    status: "active",
    createdAt: "2026-09-02"
  },
  {
    id: "prod-6",
    name: "Pleated Wide-Leg Architectural Pant",
    sku: "VDM-TR-502",
    category: "tailoring",
    price: 990,
    description: "High-waisted trouser with double forward pleats, extended tab waistband, and a sculptural pooling hem. Cut from fluid British tropical wool.",
    material: "Virgin Wool Gabardine • Hidden Coin Pouch",
    images: [
      "/src/assets/images/cat_tailored_suit_1790325225628.jpg",
      "/src/assets/images/hero_luxury_coat_1790325188738.jpg"
    ],
    sizes: ["FR 34", "FR 36", "FR 38", "FR 40", "FR 42", "FR 44"],
    colors: [
      { name: "Sandstone", hex: "#D6CEBF" },
      { name: "Charcoal", hex: "#323336" },
      { name: "Black", hex: "#1A1A1A" }
    ],
    stock: 14,
    isFeatured: true,
    isNewArrival: true,
    status: "active",
    createdAt: "2026-09-12"
  },
  {
    id: "prod-7",
    name: "Draped Mulberry Silk Column Gown",
    sku: "VDM-DR-303",
    category: "tailoring",
    price: 1890,
    description: "Bias-cut evening column gown in heavy sand-washed silk. Features an asymmetrical back cowl and hand-rolled delicate hems.",
    material: "Heavyweight 32mm Crepe de Chine Silk • Hand-Rolled Hem",
    images: [
      "/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg",
      "/src/assets/images/cat_tailored_suit_1790325225628.jpg"
    ],
    sizes: ["FR 36", "FR 38", "FR 40"],
    colors: [
      { name: "Ivory Pearl", hex: "#FAF6ED" },
      { name: "Obsidian", hex: "#18181A" }
    ],
    stock: 3,
    isFeatured: true,
    isNewArrival: true,
    status: "active",
    createdAt: "2026-09-22"
  },
  {
    id: "prod-8",
    name: "Monsieur Vendôme Double-Breasted Overcoat",
    sku: "VDM-MN-701",
    category: "men",
    price: 3650,
    salePrice: 3200,
    description: "Peak-lapel masculine overcoat in heavy Italian melton wool. Structured roped shoulders and bespoke silk lining with internal cigar pocket.",
    material: "100% Melton Wool • Bemberg Cupro Lining",
    images: [
      "/src/assets/images/hero_luxury_coat_1790325188738.jpg",
      "/src/assets/images/cat_tailored_suit_1790325225628.jpg"
    ],
    sizes: ["IT 48", "IT 50", "IT 52", "IT 54"],
    colors: [
      { name: "Navy Serge", hex: "#1B2232" },
      { name: "Camel", hex: "#B88E5E" }
    ],
    stock: 6,
    isFeatured: false,
    isNewArrival: true,
    status: "active",
    createdAt: "2026-09-16"
  }
];

export const initialOrders: Order[] = [
  {
    id: "VDM-1024",
    createdAt: "2026-09-24T14:32:00Z",
    customerName: "Baroness Eléonore de Saint-Germain",
    customerEmail: "eleonore.stgermain@luxurymail.fr",
    customerPhone: "+33 6 12 34 56 78",
    shippingAddress: "27 Rue du Faubourg Saint-Honoré",
    city: "Paris",
    postalCode: "75008",
    country: "France",
    items: [
      {
        productId: "prod-1",
        productName: "The Grand Haussmann Cashmere Trench",
        sku: "VDM-TR-801",
        image: "/src/assets/images/hero_luxury_coat_1790325188738.jpg",
        size: "FR 38",
        color: "Camel",
        price: 3450,
        quantity: 1
      },
      {
        productId: "prod-3",
        productName: "The Opéra Box: Hand-Polished Calf Tote",
        sku: "VDM-LG-412",
        image: "/src/assets/images/cat_leather_bag_1790325239933.jpg",
        size: "One Size",
        color: "Onyx Black",
        price: 2420,
        quantity: 1
      }
    ],
    subtotal: 5870,
    discount: 0,
    shippingFee: 0,
    total: 5870,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    trackingNumber: "DHL-PAR-904128",
    notes: "Please deliver to concierge with white-glove packaging."
  },
  {
    id: "VDM-1023",
    createdAt: "2026-09-24T09:15:00Z",
    customerName: "Camilla Vanderbilt",
    customerEmail: "c.vanderbilt@manhattanholdings.com",
    customerPhone: "+1 212 555 0198",
    shippingAddress: "740 Park Avenue, Apt 14B",
    city: "New York",
    postalCode: "10021",
    country: "United States",
    items: [
      {
        productId: "prod-2",
        productName: "Sculpted Hourglass Wool Blazer",
        sku: "VDM-BL-204",
        image: "/src/assets/images/cat_tailored_suit_1790325225628.jpg",
        size: "FR 36",
        color: "Anthracite",
        price: 1950,
        quantity: 1
      },
      {
        productId: "prod-6",
        productName: "Pleated Wide-Leg Architectural Pant",
        sku: "VDM-TR-502",
        image: "/src/assets/images/cat_tailored_suit_1790325225628.jpg",
        size: "FR 36",
        color: "Charcoal",
        price: 990,
        quantity: 1
      }
    ],
    subtotal: 2940,
    discount: 0,
    shippingFee: 0,
    total: 2940,
    status: "shipped",
    paymentMethod: "card",
    paymentStatus: "paid",
    trackingNumber: "FEDEX-INTL-774012",
    notes: "Requires signature upon delivery."
  },
  {
    id: "VDM-1022",
    createdAt: "2026-09-23T18:40:00Z",
    customerName: "Jean-Philippe Moreau",
    customerEmail: "jp.moreau@geneve-private.ch",
    customerPhone: "+41 22 730 45 90",
    shippingAddress: "Quai du Mont-Blanc 19",
    city: "Geneva",
    postalCode: "1201",
    country: "Switzerland",
    items: [
      {
        productId: "prod-4",
        productName: "The Vendôme Ribbed Cashmere Knit",
        sku: "VDM-KN-109",
        image: "/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg",
        size: "M",
        color: "Alabaster Cream",
        price: 1450,
        quantity: 2
      }
    ],
    subtotal: 2900,
    discount: 290,
    shippingFee: 0,
    total: 2610,
    status: "confirmed",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    trackingNumber: "SWISS-EXP-88910"
  },
  {
    id: "VDM-1021",
    createdAt: "2026-09-23T11:20:00Z",
    customerName: "Amina Al-Mansoor",
    customerEmail: "amina.mansoor@almansoor.ae",
    customerPhone: "+971 50 892 4110",
    shippingAddress: "Villa 42, Jumeirah Beach Road",
    city: "Dubai",
    postalCode: "00000",
    country: "United Arab Emirates",
    items: [
      {
        productId: "prod-5",
        productName: "The Colmar Collarless Cashmere Coat",
        sku: "VDM-CT-905",
        image: "/src/assets/images/cat_outerwear_cape_1790325209241.jpg",
        size: "FR 38",
        color: "Bespoke Taupe",
        price: 3900,
        quantity: 1
      }
    ],
    subtotal: 3900,
    discount: 0,
    shippingFee: 0,
    total: 3900,
    status: "pending",
    paymentMethod: "whatsapp",
    paymentStatus: "pending",
    notes: "Ordered via WhatsApp salon fitting service."
  }
];

export const initialCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Baroness Eléonore de Saint-Germain",
    email: "eleonore.stgermain@luxurymail.fr",
    phone: "+33 6 12 34 56 78",
    city: "Paris, France",
    totalOrders: 4,
    totalSpend: 14850,
    status: "active",
    joinedDate: "2025-11-14"
  },
  {
    id: "cust-2",
    name: "Camilla Vanderbilt",
    email: "c.vanderbilt@manhattanholdings.com",
    phone: "+1 212 555 0198",
    city: "New York, USA",
    totalOrders: 3,
    totalSpend: 8940,
    status: "active",
    joinedDate: "2026-01-20"
  },
  {
    id: "cust-3",
    name: "Jean-Philippe Moreau",
    email: "jp.moreau@geneve-private.ch",
    phone: "+41 22 730 45 90",
    city: "Geneva, Switzerland",
    totalOrders: 2,
    totalSpend: 4890,
    status: "active",
    joinedDate: "2026-03-05"
  },
  {
    id: "cust-4",
    name: "Amina Al-Mansoor",
    email: "amina.mansoor@almansoor.ae",
    phone: "+971 50 892 4110",
    city: "Dubai, UAE",
    totalOrders: 1,
    totalSpend: 3900,
    status: "active",
    joinedDate: "2026-08-11"
  }
];
