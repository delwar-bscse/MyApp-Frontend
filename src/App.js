import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import PageNotFound from './components/Others/PageNotFound';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import LogIn from './components/User/LogIn';
import NewAccount from './components/User/NewAccount';
import Profile from './components/User/Profile';
import UpdatePassword from './components/User/UpdatePassword';
import UpdateProfile from './components/User/UpdateProfile';
import ResetPassword from './components/User/ResetPassword';
import ProtectUser from './components/Others/ProtectUser';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProtectAdmin from './components/Others/ProtectAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import AllUsers from './components/AdminLayout/Users/AllUsers';
import UserDetails from './components/AdminLayout/Users/UserDetails';
import HandleCategory from './components/Admin/HandleCategory';
import Products from './components/Product/Products';
import CreateProduct from './components/Product/CreateProduct';
import ProductDetails from './components/Product/ProductDetails';
import HomeProductDetails from './components/Home/ProductDetails';
import EditProduct from './components/Product/EditProduct';
import UserOrders from './components/Product/UserOrders';
import AdminOrders from './components/AdminLayout/AdminOrders';
import SingleOrder from './components/AdminLayout/Users/SingleOrder';

const App = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const {user} = useSelector(state=>state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    token && !user && dispatch(loadUser());
  },[token,user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/new-account' element={<NewAccount/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/password/reset/:token' element={<ResetPassword/>}/>
        <Route path='product-details/:id' element={<HomeProductDetails/>}/>

        <Route path="/auth" element={<ProtectUser/>}>
          <Route path='profile' element={<Profile/>}/>
          <Route path='password/update' element={<UpdatePassword/>}/>
          <Route path='profile/update' element={<UpdateProfile/>}/>
          <Route path='orders' element={<UserOrders/>}/>
        </Route>

        <Route path="/admin" element={<ProtectAdmin/>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='create-product' element={<CreateProduct/>}/>
          <Route path='products' element={<Products/>}/>
          <Route path='product-details/:id' element={<ProductDetails/>}/>
          <Route path='edit-product/:id' element={<EditProduct/>}/>
          <Route path='all-users' element={<AllUsers/>}/>
          <Route path='user-details/:id' element={<UserDetails/>}/>
          <Route path='categories' element={<HandleCategory/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
          <Route path='single-order/:orderId' element={<SingleOrder/>}/>
        </Route>


        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
