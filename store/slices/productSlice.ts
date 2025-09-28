import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductProps, ProductState } from '@/interfaces';

const initialState: ProductState = {
    items: [],
    loading: false,
}

const API_BASE_URL = 'https://project-nexus-backend-q5ai.onrender.com/api/v1/products';

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts", 
    async () => {
        const response = await fetch(`${API_BASE_URL}/public/products/`, {
            method: 'GET',
            headers: {
                'accept': '*/*',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("fetched products", data)
        return data.results as ProductProps[]
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductProps[]>) => {
            state.items = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductProps[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setProducts, setLoading } = productSlice.actions;
export default productSlice.reducer;


/* import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductProps, ProductState, GetAllProductsResponse } from '@/interfaces';
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://project-nexus-backend-q5ai.onrender.com/graphql/");

const initialState: ProductState = {
    items : [],
    loading : false,
}

const GET_PRODUCTS = `
    query GetAllProducts {
        products {
            id
            name
            slug
            price
            compareAtPrice
            discountPercentage
            featuredImage
            category {
                id
                name
            }
            images {
                image
                altText
                isPrimary
            }
        }
    }
`

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const data = await client.request<GetAllProductsResponse>(GET_PRODUCTS);
    return data.products as ProductProps[]
})

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductProps[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
            });
    },
})

export const { setProducts, setLoading } = productSlice.actions;
export default productSlice.reducer;
 */


