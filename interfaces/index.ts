import { ReactNode } from 'react';

export interface LayoutProps {
    children : ReactNode;
}

export interface ButtonProps {
    title : string;
    action : ()=> void
}