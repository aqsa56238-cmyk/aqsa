import { Product, Category, Order, Customer, WebsiteSettings } from '../types';

export const initialSettings: WebsiteSettings = {
  storeName: "VENDÔME ÉDITIONS",
  tagline: "Haute Couture & Architectural Silhouettes Born in Paris",
  logoText: "VENDÔME ÉDITIONS",
  currency: "USD",
  currencySymbol: "$",
  freeShippingThreshold: 500,
  heroTagline: "COLLECTION N° IX • L'AUTOMNE INTEMPOREL",
  heroTitle: "The Poetry of Tailored Restraint",
  heroSubtitle: "Handcrafted double-faced cashmere, sculptural wools, and architectural silhouettes born in our Place Vendôme atelier. Conceived for generational permanence.",
  heroCtaText: "EXPLORE COLLECTION",
  heroImage: "/src/assets/images/hero_luxury_coat_1790325188738.jpg",
  contactEmail: "atelier@vendome-editions.com",
  contactPhone: "+33 1 42 68 00 20",
  whatsappNumber: "+33142680020",
  instagramHandle: "@vendome_editions",
  atelierAddress: "14 Place Vendôme, Salon Privé, 75001 Paris, France",
  aboutUs: "Founded upon the philosophy of architectural minimalism, Vendôme Éditions eliminates all superficial ornament in pursuit of pure drape, generational craftsmanship, and noble natural fibers.",
  shippingPolicy: "Complimentary white-glove carbon-neutral delivery on orders exceeding $500 worldwide. Hand-delivered in archival dust bags and custom wooden garment casings.",
  returnPolicy: "We accept returns and bespoke alterations within 30 days of receipt in pristine original condition.",
  privacyPolicy: "We treat patron information with utmost discretion and confidentiality. We never sell, rent, or disclose personal order history."
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
