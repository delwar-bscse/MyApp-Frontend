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

// Users Reducer - Admin
export const categoryReducer = ( state = {}, action ) => {
    switch(action.type){
        case CREATE_CATEGORY_REQUEST:
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
        case ALL_CATEGORY_REQUEST:
            return {
                ...state,
                isPanding:true
            };
        case CREATE_CATEGORY_SUCCESS:
        case UPDATE_CATEGORY_SUCCESS:
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                isPanding: false
            };
        case ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                isPanding: false,
                categories:action.payload
            };
        case CREATE_CATEGORY_FAIL:
        case UPDATE_CATEGORY_FAIL:
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                isPanding: false,
                error: action.payload
            };
        case ALL_CATEGORY_FAIL:
            return {
                ...state,
                isPanding: false,
                categories: null,
                error: action.payload
            };
        default:
            return {
                ...state
            };
    };
};