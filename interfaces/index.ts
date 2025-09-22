import { ReactNode } from 'react';

export interface LayoutProps {
    children : ReactNode;
}

export interface ButtonProps {
    backColor? : string;
    title : string;
    action : ()=> void;
    icon? : ReactNode;
}

/* ------------- priduct interface-------------*/
export interface ProductProps {
    id : number;
    title : string;
    description : string;
    categorie : string;
    price : string;
    variants : string[];
    image : string;
}

export interface ProductState {
    items : ProductProps[];
    loading : boolean;
}

/* ------------- user interface-------------*/
export interface AuthFormProps {
    handleClose : ()=> void;
    mode: "login" | "register";
}

export interface UserState {
    id : number;
    name : string;
    email :  string;
}

export interface AuthState {
    user : UserState | null;
    isAuthenticated : boolean;
    loading : boolean;
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