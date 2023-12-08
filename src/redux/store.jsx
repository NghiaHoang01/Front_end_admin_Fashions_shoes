import { configureStore } from "@reduxjs/toolkit"
import headerReducer from 'components/Header/HeaderSlice'
import loginReducer from 'page/Login/LoginSlice'
import productsReducer from 'page/Products/ProductsSlice'

const store = configureStore({
    reducer: {
        header: headerReducer,
        login: loginReducer,
        products: productsReducer
    }
})

export default store