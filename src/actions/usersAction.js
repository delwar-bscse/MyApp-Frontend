import axios from 'axios';
import {
    LOAD_USERS_REQUEST,
    LOAD_USERS_SUCCESS,
    LOAD_USERS_FAIL,

    LOAD_USER_DETAILS_REQUEST,
    LOAD_USER_DETAILS_SUCCESS,
    LOAD_USER_DETAILS_FAIL,

    SINGLE_USER_DELETE_REQUEST,
    SINGLE_USER_DELETE_SUCCESS,
    SINGLE_USER_DELETE_FAIL,

    UPDATE_USER_ROLE_REQUEST,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAIL
} from '../constants/usersConstant';

const URL_USER = `${process.env.REACT_APP_URL}/api/v1/user`;

const token = JSON.parse(localStorage.getItem("token"));
const options = {
    headers: {"Authorization" : token}
};

// Load Users
export const loadUsers = () => async(dispatch) =>{
    try {
        dispatch({type:LOAD_USERS_REQUEST});
        
        const {data} = await axios.get(`${URL_USER}/admin/users`, options);

        dispatch({type:LOAD_USERS_SUCCESS, payload:data.users});
        
    } catch (error) {
        dispatch({type:LOAD_USERS_FAIL, payload:error.response.data.message});
    };
};

// Load User Details
export const loadUserDetails = (id) => async(dispatch) =>{
    try {
        dispatch({type:LOAD_USER_DETAILS_REQUEST});
        
        const {data} = await axios.get(`${URL_USER}/admin/user/${id}`, options);

        dispatch({type:LOAD_USER_DETAILS_SUCCESS, payload:data?.user});
        
    } catch (error) {
        dispatch({type:LOAD_USER_DETAILS_FAIL, payload:error.response.data.message});
    };
};

// Load User Details
export const singleUserDelete = (id) => async(dispatch) =>{
    try {
        dispatch({type:SINGLE_USER_DELETE_REQUEST});
        
        await axios.delete(`${URL_USER}/admin/user/${id}`, options);

        dispatch({type:SINGLE_USER_DELETE_SUCCESS});
        
    } catch (error) {
        dispatch({type:SINGLE_USER_DELETE_FAIL, payload:error.response.data.message});
    };
};

// Load User Details
export const updateUserRole = (id,role) => async(dispatch) =>{
    console.log(id,role);
    try {
        dispatch({type:UPDATE_USER_ROLE_REQUEST});
        
        const {data} = await axios.put(`${URL_USER}/admin/user/${id}`, {role}, options);

        dispatch({type:UPDATE_USER_ROLE_SUCCESS, payload:data?.user});
        
    } catch (error) {
        dispatch({type:UPDATE_USER_ROLE_FAIL, payload:error.response.data.message});
    };
};