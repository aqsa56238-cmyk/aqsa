export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  salePrice?: number;
  description: string;
  material: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  status: 'active' | 'draft';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string; // e.g. "VDM-1024"
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'cash_on_delivery' | 'card' | 'bank_transfer' | 'whatsapp';
  paymentStatus: 'paid' | 'pending';
  trackingNumber?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpend: number;
  status: 'active' | 'blocked';
  joinedDate: string;
}

export interface NavLinkItem {
  id: string;
  label: string;
  slug: string;
  enabled: boolean;
}

export interface StorePage {
  id: string;
  title: string; // The Page Name written (e.g. "About the Maison", "White-Glove Shipping & Returns", "Bespoke Atelier")
  navLabel: string; // Displayed label in navigation
  slug: string; // Unique path key
  subtitle?: string;
  content: string; // Full narrative text or markdown
  bannerImage?: string; // Cloudinary uploaded banner picture
  showInNav: boolean;
  showInFooter: boolean;
  isSystem?: boolean;
  updatedAt: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  publicId?: string;
  name: string;
  folder: string;
  format?: string;
  size?: number;
  width?: number;
  height?: number;
  uploadedAt: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  location: string;
}

export interface WebsiteSettings {
  // Identity & Head
  storeName: string;
  pageTitle: string;
  tagline: string;
  logoText: string;
  logoImage?: string;
  currency: string;
  currencySymbol: string;
  freeShippingThreshold: number;

  // Announcement Bar
  announcementText: string;
  showAnnouncement: boolean;

  // Navigation Links / Page Names
  navLinks: NavLinkItem[];

  // Hero Section
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroSecondaryCtaText: string;
  heroImage: string;
  heroCoordinates: string;
  heroEdition: string;

  // Privileges (4 items)
  privilege1Title: string;
  privilege1Desc: string;
  privilege2Title: string;
  privilege2Desc: string;
  privilege3Title: string;
  privilege3Desc: string;
  privilege4Title: string;
  privilege4Desc: string;

  // Curated Archetypes
  archetypesKicker: string;
  archetypesTitle: string;
  archetypesButtonText: string;

  // Catalog Section
  catalogKicker: string;
  catalogTitle: string;

  // The Manifesto
  manifestoKicker: string;
  manifestoQuote: string;
  manifestoText: string;
  manifestoImage: string;
  manifestoSpecLabel: string;
  manifestoSpecText: string;
  manifestoFiberMetric: string;
  manifestoFiberDesc: string;
  manifestoOriginLabel: string;
  manifestoOriginValue: string;
  manifestoPedigreeLabel: string;
  manifestoPedigreeValue: string;
  manifestoButton1: string;
  manifestoButton2: string;

  // Atelier Icons
  iconsKicker: string;
  iconsTitle: string;
  iconsSubtitle: string;

  // Private Archives
  archivesKicker: string;
  archivesTitle: string;
  archivesText: string;
  archivesButtonText: string;
  archivesNote: string;

  // Runway Diary / Scènes de Vie
  scenesKicker: string;
  scenesTitle: string;
  scenesFollowText: string;
  scenesGallery: GalleryItem[];

  // Contacts & WhatsApp
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  instagramHandle: string;
  atelierAddress: string;

  // Policies & Footer
  aboutUs: string;
  shippingPolicy: string;
  returnPolicy: string;
  privacyPolicy: string;
  footerDescription: string;
  footerGazetteTitle: string;
  footerGazetteText: string;
  footerCopyright: string;
  footerCities: string;
}
