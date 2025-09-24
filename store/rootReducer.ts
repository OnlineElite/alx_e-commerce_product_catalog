import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '@/store/slices/userSlice'
import authReducer from '@/store/slices/authSlice'
import productsReducer from '@/store/slices/productSlice'
import cartReducer from '@/store/slices/cartSlice'

const rootReducer = combineReducers({
    user : userReducer,
    auth : authReducer,
    products : productsReducer,
    cart : cartReducer,
})

export default rootReducer;
