import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/userAction';
import { useDispatch } from 'react-redux';
import EmailModel from './EmailModel';
import { toast } from 'react-toastify';

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = async(e) =>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword));
        toast.success("Log In Successfully")
        setTimeout(()=>navigate("/"),1000);
    };

  return (
    <Layout title={"Login User"}>
    <div className='container'>
        <div className='border border-2 p-3 mx-auto mt-5' style={{width:300}} >
            <h3 className='opacity-75'>LogIn Account</h3>
            <form onSubmit={loginSubmit}>
                <div className="input-group mb-3">
                    <input type='email' className="form-control" placeholder='Email' name='loginEmail' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <input type='password' className="form-control" placeholder='Password' name='loginPasssword' required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                </div>
                <div className='mb-2'><EmailModel/></div>
                <input type='submit' value='login' className='btn btn-sm px-3 fw-semibold text-white btn-info bg-gradient'/>
            </form>
        </div>
    </div>
    </Layout>
  );
};


export default LogIn;
