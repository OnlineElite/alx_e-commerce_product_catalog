import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState } from '@/interfaces'


const initialState: CartState = {
    items : [],
    total : 0,
    isOpen : false,
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const existingItem = state.items.find(item => item.id == action.payload.id);

            if(existingItem){
                existingItem.quantity += 1
            }else{
                state.items.push({...action.payload, quantity: 1})
            };

            state.total = state.items.reduce((total, item)=> total + (item.price * item.quantity), 0);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item => item.id !== action.payload));
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
})

export const { addToCart, removeFromCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
