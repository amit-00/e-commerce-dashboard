import { 
    GET_PRODUCTS,
    GET_PRODUCT,
    SET_PROD_LOADING,
    GET_CATEGORIES,
    SET_CAT_LOADING, 
    GET_ACCOUNT, 
    GET_ACCOUNTS, 
    SET_ACC_LOADING,
    GET_ORDERS,
    GET_ORDER,
    SET_ORD_LOADING } from './types';

export const ProductsReducer = (state, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        
        case GET_PRODUCT:
        return {
            ...state,
            product: state.products.filter(prod => prod.id === action.payload)[0],
            loading: false
        }

        case SET_PROD_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}

export const CategoriesReducer = (state, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false
            }

        case SET_CAT_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}

export const AccountsReducer = (state, action) => {
    switch (action.type) {
        case GET_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload,
                loading: false
            }

        case GET_ACCOUNT:
            return {
                ...state,
                account: state.accounts.filter(acc => acc.uid === action.payload)[0],
                loading: false
            }

        case SET_ACC_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}

export const OrdersReducer = (state, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }
        
        case GET_ORDER:
        return {
            ...state,
            order: state.orders.filter(ord => ord.id === action.payload)[0],
            loading: false
        }

        case SET_ORD_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}