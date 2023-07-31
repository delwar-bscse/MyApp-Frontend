import React, {useEffect,useState} from 'react';
import { Outlet} from 'react-router-dom';
import Spinner from './Spinner';
import { useSelector } from 'react-redux';

const ProtectUser = () => {
  const {isLoading, user} = useSelector(state=>state.user);
  
  // const [checker, setChecker] = useState(false);
  // useEffect(()=>{
  //   localStorage.getItem('token') && setChecker(true);
  // },[localStorage.getItem('token')]);

  return localStorage.getItem('token') ? <Outlet/> : <Spinner path="login"/>
};

export default ProtectUser;
