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

export interface WebsiteSettings {
  storeName: string;
  tagline: string;
  logoText: string;
  currency: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroImage: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  instagramHandle: string;
  atelierAddress: string;
  aboutUs: string;
  shippingPolicy: string;
  returnPolicy: string;
  privacyPolicy: string;
}
