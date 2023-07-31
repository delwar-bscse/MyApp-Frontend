import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { updatePassword } from '../../actions/userAction';
import { useDispatch } from 'react-redux';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userPassword, setUserPassword] = useState({
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
    });
    const {oldPassword,newPassword,confirmPassword} = userPassword;

    const handleChangeData = async(e) =>{
        setUserPassword({...userPassword,[e.target.name]:e.target.value})
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const myForm = new FormData();
        
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
        navigate('/auth/profile');
    };

  return (
    <Layout title={"Update Password"}>
    <div className='container'>
        <div className='border border-2 mt-5 p-3 mx-auto' style={{width:300}}>
            <h3 className='opacity-75'>Update Password</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input type='password' className="form-control" placeholder='Old Password' name='oldPassword' required value={oldPassword} onChange={(e)=>handleChangeData(e)}/>
                </div>
                <div className="input-group mb-3">
                    <input type='password' className="form-control" placeholder='New Password' name='newPassword' required value={newPassword} onChange={(e)=>handleChangeData(e)}/>
                </div>
                <div className="input-group mb-3">
                    <input type='password' className="form-control" placeholder='Confirm Password' name='confirmPassword' required value={confirmPassword} onChange={(e)=>handleChangeData(e)}/>
                </div>
                <input type='submit' value='Submit' className='btn btn-info px-3 text-white'/>
            </form>
        </div>
    </div>
    </Layout>
  );
};


export default UpdatePassword;
