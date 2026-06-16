export interface Product {
  id: string;
  brand: Brand;
  name: string;
  description: string;
  price: number;
  priceUSD: number;
  image: string;
  images: string[];
  stock: number;
  condition: 'New' | 'Pre-owned';
  category: string;
  featured?: boolean;
}

export type Brand =
  | 'Gucci'
  | 'Louis Vuitton'
  | 'Prada'
  | 'Hermès'
  | 'Chanel'
  | 'Dior'
  | 'Balenciaga'
  | 'Bottega Veneta';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface WalletState {
  connected: boolean;
  publicKey: string | null;
  balance: number | null;
  connecting: boolean;
  error: string | null;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface TransactionResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export type SortOption = 'default' | 'price-low' | 'price-high' | 'name';

export interface FilterState {
  brand: Brand | 'All';
  minPrice: number;
  maxPrice: number;
  condition: 'All' | 'New' | 'Pre-owned';
}
