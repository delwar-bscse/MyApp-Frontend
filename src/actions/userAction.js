import axios from 'axios';
import { 
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
} from '../constants/userConstant';

const URL_USER = `${process.env.REACT_APP_URL}/api/v1/user`;



// Register
export const register = (userData) => async(dispatch) =>{
    try {
        dispatch({type:REGISTER_REQUEST});

        await axios.post(`${URL_USER}/register`, userData);

        dispatch({type:REGISTER_SUCCESS});
        
    } catch (error) {
        dispatch({type:REGISTER_FAIL, payload:error.response.data.message});
    };
};

// Login
export const login = (email, password) => async(dispatch) =>{
    const token = JSON.parse(localStorage.getItem("token"));
    const options = {
        headers: {"Authorization" : token}
    };
    try {
        dispatch({type:LOGIN_REQUEST});

        const {data} = await axios.post(`${URL_USER}/login`, {email,password});
        
        localStorage.setItem('token', JSON.stringify(data.token));

        dispatch({type:LOGIN_SUCCESS});
        
    } catch (error) {
        dispatch({type:LOGIN_FAIL, payload:error.response.data.message});
    };
};

// Load User
export const loadUser = () => async(dispatch) =>{
    const token = JSON.parse(localStorage.getItem("token"));
    const options = {
        headers: {"Authorization" : token}
    };
    try {
        dispatch({type:LOAD_USER_REQUEST});
        
        const {data} = await axios.get(`${URL_USER}/profile`, options);

        localStorage.setItem('user', JSON.stringify(data.user));

        dispatch({type:LOAD_USER_SUCCESS, payload:data.user});
        
    } catch (error) {
        dispatch({type:LOAD_USER_FAIL, payload:error.response.data.message});
    };
};

// Logout
export const logout = () => async(dispatch) =>{
    const token = JSON.parse(localStorage.getItem("token"));
    const options = {
        headers: {"Authorization" : token}
    };
    try {
        dispatch({type:LOGOUT_REQUEST});

        await axios.get(`${URL_USER}/logout`,options);

        const keysToRemove = ["token","user","cart"];
        keysToRemove.forEach(k=>localStorage.removeItem(k));

        dispatch({type:LOGOUT_SUCCESS});

    } catch (error) {
        dispatch({type:LOGOUT_FAIL, payload:error.response.data.message});
    };
};

// Update Password
export const updatePassword = (passwords) => async(dispatch) =>{
    const token = JSON.parse(localStorage.getItem("token"));
    const options = {
        headers: {"Authorization" : token}
    };
    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST});

        await axios.put(`${URL_USER}/password/update`, passwords, options);
        
        dispatch({type:UPDATE_PASSWORD_SUCCESS});

    } catch (error) {
        dispatch({type:UPDATE_PASSWORD_FAIL, payload:error.response.data.message});
    };
};

// Update Profile
export const updateProfile = (userData) => async(dispatch) =>{
    const token = JSON.parse(localStorage.getItem("token"));
    const options = {
        headers: {"Authorization" : token}
    };
    try {
        dispatch({type:UPDATE_PROFILE_REQUEST});

        const {data} = await axios.put(`${URL_USER}/me/update`, userData, options);
        
        localStorage.setItem('user', JSON.stringify(data.user));

        dispatch({type:UPDATE_PROFILE_SUCCESS, payload:data.user});
        
    } catch (error) {
        dispatch({type:UPDATE_PROFILE_FAIL, payload:error.response.data.message});
    };
};

// Fotgot Password
export const forgotPassword = (email) => async(dispatch) =>{
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        
        await axios.post(`${URL_USER}/password/forgot`, {email});
        
        dispatch({type:FORGOT_PASSWORD_SUCCESS});

    } catch (error) {
        dispatch({type:FORGOT_PASSWORD_FAIL, payload:error.response.data.message});
    };
};

// Reset Password
export const resetPassword = (token,passwords) => async(dispatch) =>{
    try {
        dispatch({type:RESET_PASSWORD_REQUEST});

        await axios.put(`${URL_USER}/password/reset/${token}`, passwords);

        dispatch({type:RESET_PASSWORD_SUCCESS});

    } catch (error) {
        dispatch({type:RESET_PASSWORD_FAIL, payload:error.response.data.message});
    };
};