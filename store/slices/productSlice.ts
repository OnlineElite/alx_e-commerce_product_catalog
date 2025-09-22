import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductProps, ProductState } from '@/interfaces';


const initialState: ProductState = {
    items : [],
    loading : false,
}

const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        setProducts : (state, action: PayloadAction<ProductProps[]>) => {
            state.items = action.payload;
        },
        setLoading : (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
})

export const { setProducts, setLoading } = productSlice.actions;
export default productSlice.reducer;
