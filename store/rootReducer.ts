import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';
import authReducer from '@/store/slices/authSlice'

const rootReducer = combineReducers({
    user : userReducer,
    auth : authReducer,
})

export default rootReducer;
