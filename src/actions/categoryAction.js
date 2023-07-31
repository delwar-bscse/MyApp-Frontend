import axios from 'axios';
import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,

    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL
} from '../constants/categoryConstant';

const URL_CATEGORY = `${process.env.REACT_APP_URL}/api/v1/category`;

const token = JSON.parse(localStorage.getItem("token"));
const options = {
    headers: {"Authorization" : token}
};

// Create Category
export const createCategory = (name) => async(dispatch) =>{
    try {
        dispatch({type:CREATE_CATEGORY_REQUEST});
        
        await axios.post(`${URL_CATEGORY}/create-category`, {name}, options);

        dispatch({type:CREATE_CATEGORY_SUCCESS});
        
    } catch (error) {
        dispatch({type:CREATE_CATEGORY_FAIL, payload:error.response.data.message});
    };
};

// Update Category
export const updateCategory = (id,name) => async(dispatch) =>{
    console.log(id,name);
    try {
        dispatch({type:UPDATE_CATEGORY_REQUEST});
        
        await axios.put(`${URL_CATEGORY}/update-category/${id}`, {name}, options);

        dispatch({type:UPDATE_CATEGORY_SUCCESS});
        
    } catch (error) {
        dispatch({type:UPDATE_CATEGORY_FAIL, payload:error.response.data.message});
    };
};

// Delete Category
export const deleteCategory = (id,name) => async(dispatch) =>{
    try {
        dispatch({type:DELETE_CATEGORY_REQUEST});
        
        await axios.delete(`${URL_CATEGORY}/delete-category/${id}`, options);

        dispatch({type:DELETE_CATEGORY_SUCCESS});
        
    } catch (error) {
        dispatch({type:DELETE_CATEGORY_FAIL, payload:error.response.data.message});
    };
};

// All Category
export const allCategory = () => async(dispatch) =>{
    try {
        dispatch({type:ALL_CATEGORY_REQUEST});
        
        const {data} = await axios.get(`${URL_CATEGORY}/all-category`, options);

        dispatch({type:ALL_CATEGORY_SUCCESS, payload:data.categories});
        
    } catch (error) {
        dispatch({type:ALL_CATEGORY_FAIL, payload:error.response.data.message});
    };
};