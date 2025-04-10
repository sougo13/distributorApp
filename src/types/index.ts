

import { Ionicons } from "@expo/vector-icons";
import { ImageSourcePropType } from "react-native";

export interface Category {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

export interface Supplier {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  tags: string[];
  image: ImageSourcePropType;
  isFavorite: boolean;
}

export type ActiveTab = "Categories" | "Suppliers";

export interface ProductInfo {
  id: string;
  name: string;
  imageUrl: string | ImageSourcePropType;
  pricePerUnit: number;
  unit: string;
  supplierId: string;
  unavailable?: boolean;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  pricePerUnit: number;
  unit: string;
  supplierId?: string;
  description?: string;
  category?: string;
  unavailable?: boolean;
}

export interface CartItem {
  id: string;
  product: ProductInfo;
  quantity: number;
}

export interface Address {
  id: string;
  fullAddress: string;
  street?: string;
  building?: string;
  apartment?: string;
  city?: string;
  postalCode?: string;
  notes?: string;
  isPrimary?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "card";
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isPrimary?: boolean;
  cardHolderName?: string;
  cardType?: keyof typeof Ionicons.glyphMap;
}

export type OrderStatus =
  | "Delivered"
  | "Negotiating"
  | "Pending"
  | "InProgress"
  | "Accepted"
  | "Canceled"
  | "Declined";

export interface Order {
  id: string;
  supplier: {
    name: string;
    logoUrl: ImageSourcePropType;
  };
  status: OrderStatus;
  itemsSummary: string;
  requiresResponse?: boolean;
  isCurrent: boolean;
}

export type OrderDetailStatusType =
  | "Delivered"
  | "AcceptedAndRated"
  | "DeclinedRefund"
  | "UnsatisfiedSupport"
  | "InProgress"
  | "Pending"
  | "Canceled";

export interface OrderDetailItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderDetail {
  id: string;
  supplier: {
    name: string;
    logoUrl: ImageSourcePropType;
  };
  orderNumber: string;
  status: OrderStatus;
  detailedStatusType: OrderDetailStatusType;
  statusTextKey: string;
  statusBannerKey?: string;
  orderDate: string;
  taxInvoiceNumber: string;
  items: OrderDetailItem[];
  discount?: number;
  specialDiscount?: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethodSummary: string;
  currencySymbol: string;
  headerImageUrl?: ImageSourcePropType;
}

export interface SupplierCategoryTag {
  id: string;
  name: string;
}

export interface ProductListItemData {
  id: string;
  name: string;
  description: string;
  unit: string;
  pricePerUnit: number;
  oldPricePerUnit?: number;
  currencySymbol?: string;
  imageUrl?: ImageSourcePropType;
  supplierId: string;
  categoryId?: string;
}

export interface SupplierDetail {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  isFavorite: boolean;
  headerImageUrl: ImageSourcePropType;
  logoUrl: ImageSourcePropType;
  infoBannerTextKey?: string;
  categories: SupplierCategoryTag[];
  products: ProductListItemData[];
}
