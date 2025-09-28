import { ReactNode } from 'react';

export interface LayoutProps {
    children : ReactNode;
}

export interface ButtonProps {
    backColor? : string;
    title : string;
    action? : ()=> void;
    icon? : ReactNode;
    type? : string;
}

/* ------------- product interface-------------*/

interface Price {
  amount: string;
  currency: string;
}

/* interface ProductImage {
  image: string;
  altText: string;
  isPrimary: boolean;
} */

export interface FilterState {
  selectedCategories: string[]
  priceRange: [number, number]
  sortOption: string
  searchQuery: string
  filteredAndSortedProducts: ProductProps[]
  loading: boolean
}

export interface ProductProps {
  id: string;
  name: string;
  slug?: string;
  price: Price;
  short_description? : string;
  average_rating? : string;
  discount_percentage?: number;
  category_name: string;
  stock_quantity? : number;
  //images?: ProductImage[];
}

export interface ProductState {
    items : ProductProps[];
    loading : boolean;
}

export interface GetAllProductsResponse {
  products: ProductProps[];
}

/* ------------- user interface-------------*/
export interface AuthFormProps {
    handleClose : ()=> void;
    mode: "login" | "register";
}

export interface User {
  id: number;
  username: string; // you can store username or firstName + lastName
  email: string;
  firstName?: string;
  lastName?: string;
  emailVerified?: boolean;
}

export interface UserState extends User {
  loading: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  acceptTerms: boolean;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface LoginResponse {
  ok: boolean;
  user?: User;
  access: string;
  refresh: string;
  errors: string[];
}

export interface RegisterResponse {
  ok: boolean;
  errors: string[];
  user?: User | null;
}

export interface RegisterUserResponse {
  registerUser: RegisterResponse;
}

export interface LoginUserResponse {
  login: LoginResponse;
}

/* ------------- cart interface-------------*/
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface CartState {
  items: CartItem[]
  total: number
  isOpen: boolean
}
