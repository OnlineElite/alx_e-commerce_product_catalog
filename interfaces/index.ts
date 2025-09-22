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

export interface ProductProps {
    id : number;
    title : string;
    description : string;
    categorie : string;
    price : string;
    variants : string[];
    image : string;
}

export interface AuthFormProps {
    handleClose : ()=> void;
    mode: "login" | "register";
}