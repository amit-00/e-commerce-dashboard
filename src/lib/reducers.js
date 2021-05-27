import { GET_PRODUCTS, GET_PRODUCT, SET_LOADING } from './types';

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

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}