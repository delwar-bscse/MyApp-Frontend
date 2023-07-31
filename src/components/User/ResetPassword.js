import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { resetPassword } from '../../actions/userAction';
import { useDispatch } from 'react-redux';

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useParams();
    const [userPassword, setUserPassword] = useState({
        newPassword:"",
        confirmPassword:""
    });
    const {newPassword,confirmPassword} = userPassword;

    const handleChangeData = async(e) =>{
        setUserPassword({...userPassword,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const myForm = new FormData();
        
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token,myForm));
        navigate('/login');
    };

  return (
    <Layout title={"Reset Password"}>
    <div className='container'>
        <div className='border border-2 mt-5 mx-auto p-3' style={{width:300}}>
            <h3 className='opacity-75'>Reset Password</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input type='password' className="form-control" placeholder='New Password' name='newPassword' required value={newPassword} onChange={(e)=>handleChangeData(e)}/>
                </div>
                <div className="input-group mb-3">
                    <input type='password' className="form-control" placeholder='Confirm Password' name='confirmPassword' required value={confirmPassword} onChange={(e)=>handleChangeData(e)}/>
                </div>
                <input type='submit' value='Submit' className='btn btn-info px-3'/>
            </form>
        </div>
    </div>
    </Layout>
  );
};

export default ResetPassword;
