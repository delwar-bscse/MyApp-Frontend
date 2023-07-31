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

// Users Reducer - Admin
export const usersReducer = ( state = {}, action ) => {
    switch(action.type){
        case LOAD_USER_DETAILS_REQUEST:
        case LOAD_USERS_REQUEST:
        case SINGLE_USER_DELETE_REQUEST:
        case UPDATE_USER_ROLE_REQUEST:
            return {
                ...state,
                isPanding:true
            };
        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                isPanding: false,
                allUsers: action.payload
            };
        case LOAD_USER_DETAILS_SUCCESS:
        case UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                isPanding: false,
                singleUser: action.payload
            };
        case SINGLE_USER_DELETE_SUCCESS:
            return {
                ...state,
                isPanding: false,
                singleUser: null
            };
        case LOAD_USERS_FAIL:
            return {
                ...state,
                isPanding: false,
                allUsers: null,
                error: action.payload
            };
        case LOAD_USER_DETAILS_FAIL:
            return {
                ...state,
                isPanding: false,
                singleUser: null,
                error: action.payload
            };
        case SINGLE_USER_DELETE_FAIL:
        case UPDATE_USER_ROLE_FAIL:
            return {
                ...state,
                isPanding: false,
                error: action.payload
            };
        default:
            return {
                ...state
            };
    };
};