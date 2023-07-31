import axios from 'axios';
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    
    CLEAR_ERRORS
} from '../constants/productConstants';

const URL_PRODUCT = `${process.env.REACT_APP_URL}/api/v1/product`;

export const getProducts = (keyword="",currentPage=1,category="",price=[0,5000],rating=[0,5]) =>async(dispatch) =>{
    try {
        dispatch({type: ALL_PRODUCT_REQUEST});
        let link;
        if(category!==""){
            link = `${URL_PRODUCT}/all-products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&&price[lte]=${price[1]}&ratings[gte]=${rating[0]}&ratings[lte]=${rating[1]}&category=${category}`;
        }else{
            link = `${URL_PRODUCT}/all-products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating[0]}&ratings[lte]=${rating[1]}`;
        }
        const {data} = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
};

export const getProductDetails = async(id) =>{
    try {

        const {data} = await axios.get(`${URL_PRODUCT}/product-details/${id}`);
        return data.product
        
    } catch (error) {
        console.log(error);
    }
};