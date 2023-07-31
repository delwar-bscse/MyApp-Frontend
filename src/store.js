import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { userReducer } from './reducers/userReducer.js';
import { usersReducer } from './reducers/usersReducer.js';
import { categoryReducer } from './reducers/categoryReducer.js';
import { allProductsReducer } from './reducers/productReducer.js';


const reducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    category: categoryReducer,
    products: allProductsReducer
});

let initialState = {
    user:{},
    users:{},
    category:{}
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;