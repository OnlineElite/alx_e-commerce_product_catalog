import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '@/store/slices/userSlice'
import authReducer from '@/store/slices/authSlice'
import productsReducer from '@/store/slices/productSlice'
import cartReducer from '@/store/slices/cartSlice'
import filterReducer from "@/store/slices/filterSlice"

const rootReducer = combineReducers({
    user : userReducer,
    auth : authReducer,
    products : productsReducer,
    cart : cartReducer,
    filters: filterReducer,
})

export default rootReducer;
