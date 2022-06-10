import { configureStore } from '@reduxjs/toolkit'
import sellersReducer from './features/sellers/sellersSlice'
import authReducer from './features/authSlice'
import orderReducer from './features/sellers/ordersSlice'
import categoriesReducer from './features/products/categoriesSlice'
import productsReducer from './features/products/productsSlice'
import bannersReducer from './features/bannersSlice'
export default configureStore({
    reducer: {
        sellers: sellersReducer,
        auth: authReducer,
        orders: orderReducer,
        categories: categoriesReducer,
        products: productsReducer,
        banners: bannersReducer
    },
    devTools: false
})