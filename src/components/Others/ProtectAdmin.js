import React from 'react';
import { Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageNotFound from './PageNotFound';

const ProtectAdmin = () => {
  const {isLoading, user} = useSelector(state=>state.user);
  return !isLoading && user?.role === "admin" ? <Outlet/> : <PageNotFound/>
};

export default ProtectAdmin;
