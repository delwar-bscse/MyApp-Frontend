import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants';

export const allProductsReducer = (state={},action)=>{
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loadingProducts:true,
                products:[]
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loadingProducts: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filterProductsCount: action.payload.filterProductsCount
            };
        case ALL_PRODUCT_FAIL:
            return {
                loadingProducts:false,
                error:action.payload
            };
        default:
            return state;
    }
};