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

// Register User;
export const userReducer = (state = {}, action) => {
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        case LOGOUT_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading:true
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case LOAD_USER_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: null,
                isAuthenticated: false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case LOAD_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                user: null,
                isAuthenticated:false,
                error: action.payload
            };
        default:
            return {
                ...state
            };
    };
};