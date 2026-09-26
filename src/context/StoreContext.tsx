import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Order, Customer, WebsiteSettings, CartItem, OrderStatus, StorePage, MediaAsset } from '../types';
import { initialProducts, initialCategories, initialOrders, initialCustomers, initialSettings, initialPages } from '../data/initialData';

interface StoreContextType {
  // Store Settings
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  resetToDefaults: () => void;

  // Pages & Navigation Controller
  pages: StorePage[];
  activePage: string; // 'home' or page slug
  setActivePage: (slug: string) => void;
  addPage: (page: Omit<StorePage, 'id' | 'updatedAt'>) => void;
  updatePage: (id: string, updates: Partial<StorePage>) => void;
  deletePage: (id: string) => void;

  // Cloudinary Media Library Assets
  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => void;
  deleteMediaAsset: (id: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => Order;
  updateOrderStatus: (id: string, status: OrderStatus, trackingNumber?: string) => void;
  deleteOrder: (id: string) => void;

  // Customers
  customers: Customer[];
  toggleCustomerStatus: (id: string) => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity?: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // UI Modals & Navigation
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;
  invoiceOrder: Order | null;
  setInvoiceOrder: (order: Order | null) => void;

  // Admin View
  adminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  adminTab: 'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'pages' | 'settings' | 'media' | 'phpexport';
  setAdminTab: (tab: 'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'pages' | 'settings' | 'media' | 'phpexport') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistent Settings
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    try {
      const saved = localStorage.getItem('vendome_settings');
      return saved ? { ...initialSettings, ...JSON.parse(saved) } : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  // Persistent Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('vendome_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Persistent Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('vendome_categories');
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  // Persistent Custom Pages
  const [pages, setPages] = useState<StorePage[]>(() => {
    try {
      const saved = localStorage.getItem('vendome_pages');
      return saved ? JSON.parse(saved) : initialPages;
    } catch {
      return initialPages;
    }
  });

  const initialMedia: MediaAsset[] = [
    {
      id: 'media-1',
      name: 'Paris Place Vendôme Trench Coat',
      url: '/src/assets/images/hero_luxury_coat_1790325188738.jpg',
      folder: 'vendome_store/banners',
      format: 'jpg',
      uploadedAt: '2026-09-25T10:00:00Z'
    },
    {
      id: 'media-2',
      name: 'Double-Faced Cashmere Cloak',
      url: '/src/assets/images/cat_outerwear_cape_1790325209241.jpg',
      folder: 'vendome_store/categories',
      format: 'jpg',
      uploadedAt: '2026-09-25T10:05:00Z'
    },
    {
      id: 'media-3',
      name: 'Architectural Hourglass Tailoring',
      url: '/src/assets/images/cat_tailored_suit_1790325225628.jpg',
      folder: 'vendome_store/categories',
      format: 'jpg',
      uploadedAt: '2026-09-25T10:10:00Z'
    },
    {
      id: 'media-4',
      name: 'The Opéra Structured Calfskin Box Tote',
      url: '/src/assets/images/cat_leather_bag_1790325239933.jpg',
      folder: 'vendome_store/products',
      format: 'jpg',
      uploadedAt: '2026-09-25T10:15:00Z'
    },
    {
      id: 'media-5',
      name: 'Tactile Ribbed Cashmere Knit',
      url: '/src/assets/images/cat_knitwear_cashmere_1790325254062.jpg',
      folder: 'vendome_store/brand',
      format: 'jpg',
      uploadedAt: '2026-09-25T10:20:00Z'
    }
  ];

  // Persistent Cloudinary Media Assets Library
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem('vendome_media_assets');
      return saved ? JSON.parse(saved) : initialMedia;
    } catch {
      return initialMedia;
    }
  });

  // Persistent Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('vendome_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // Persistent Customers
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem('vendome_customers');
      return saved ? JSON.parse(saved) : initialCustomers;
    } catch {
      return initialCustomers;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vendome_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vendome_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [activePage, setActivePage] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  // Admin state
  const [adminMode, setAdminMode] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'pages' | 'settings' | 'media' | 'phpexport'>('dashboard');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vendome_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not save settings', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('vendome_pages', JSON.stringify(pages));
    } catch (e) {
      console.warn('Could not save pages', e);
    }
  }, [pages]);

  useEffect(() => {
    try {
      localStorage.setItem('vendome_media_assets', JSON.stringify(mediaAssets));
    } catch (e) {
      console.warn('Could not save mediaAssets', e);
    }
  }, [mediaAssets]);

  useEffect(() => {
    try {
      localStorage.setItem('vendome_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('vendome_categories', JSON.stringify(categories));
    } catch (e) {
      console.warn('Could not save categories', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('vendome_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('vendome_customers', JSON.stringify(customers));
    } catch (e) {
      console.warn('Could not save customers', e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('vendome_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('vendome_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist', e);
    }
  }, [wishlist]);

  // Actions
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setSettings(initialSettings);
    setProducts(initialProducts);
    setCategories(initialCategories);
    setOrders(initialOrders);
    setCustomers(initialCustomers);
    setPages(initialPages);
    setMediaAssets(initialMedia);
    localStorage.clear();
  };

  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = {
      ...newProd,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const duplicateProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    if (!target) return;
    const clone: Product = {
      ...target,
      id: `prod-${Date.now()}`,
      name: `${target.name} (Copy)`,
      sku: `${target.sku}-CP`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [clone, ...prev]);
  };

  const addCategory = (newCat: Omit<Category, 'id'>) => {
    const category: Category = {
      ...newCat,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Custom Pages & Navigation Controller
  const addPage = (newPage: Omit<StorePage, 'id' | 'updatedAt'>) => {
    const id = `page-${Date.now()}`;
    const page: StorePage = {
      ...newPage,
      id,
      updatedAt: new Date().toISOString()
    };
    setPages(prev => [...prev, page]);
  };

  const updatePage = (id: string, updates: Partial<StorePage>) => {
    setPages(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
  };

  const deletePage = (id: string) => {
    setPages(prev => prev.filter(p => p.id !== id));
  };

  // Cloudinary Media Asset Registry
  const addMediaAsset = (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => {
    const item: MediaAsset = {
      ...asset,
      id: `media-${Date.now()}`,
      uploadedAt: new Date().toISOString()
    };
    setMediaAssets(prev => [item, ...prev]);
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets(prev => prev.filter(m => m.id !== id));
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => {
    const nextNum = 1000 + orders.length + 1;
    const newOrder: Order = {
      ...orderData,
      id: `VDM-${nextNum}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      paymentStatus: orderData.paymentMethod === 'card' ? 'paid' : 'pending',
      trackingNumber: `TRK-VDM-${nextNum}`
    };

    setOrders(prev => [newOrder, ...prev]);

    // Also update product stock
    setProducts(prev =>
      prev.map(p => {
        const matchingItem = orderData.items.find(item => item.productId === p.id);
        if (matchingItem) {
          return { ...p, stock: Math.max(0, p.stock - matchingItem.quantity) };
        }
        return p;
      })
    );

    // Also register or update customer
    setCustomers(prev => {
      const existing = prev.find(c => c.email.toLowerCase() === orderData.customerEmail.toLowerCase());
      if (existing) {
        return prev.map(c =>
          c.id === existing.id
            ? { ...c, totalOrders: c.totalOrders + 1, totalSpend: c.totalSpend + orderData.total }
            : c
        );
      } else {
        const newCust: Customer = {
          id: `cust-${Date.now()}`,
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
          city: `${orderData.city}, ${orderData.country}`,
          totalOrders: 1,
          totalSpend: orderData.total,
          status: 'active',
          joinedDate: new Date().toISOString().split('T')[0]
        };
        return [newCust, ...prev];
      }
    });

    clearCart();
    setLastCompletedOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === id) {
          return {
            ...o,
            status,
            trackingNumber: trackingNumber || o.trackingNumber,
            paymentStatus: status === 'delivered' ? 'paid' : o.paymentStatus
          };
        }
        return o;
      })
    );
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const toggleCustomerStatus = (id: string) => {
    setCustomers(prev =>
      prev.map(c => (c.id === id ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' } : c))
    );
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: { name: string; hex: string }, quantity = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor.name === color.name
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        updateSettings,
        resetToDefaults,
        pages,
        activePage,
        setActivePage,
        addPage,
        updatePage,
        deletePage,
        mediaAssets,
        addMediaAsset,
        deleteMediaAsset,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        customers,
        toggleCustomerStatus,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        selectedProduct,
        setSelectedProduct,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        lastCompletedOrder,
        setLastCompletedOrder,
        invoiceOrder,
        setInvoiceOrder,
        adminMode,
        setAdminMode,
        adminTab,
        setAdminTab,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
