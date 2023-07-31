import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiLockOpen } from "react-icons/bi";
import { toast } from 'react-toastify';

import './NewAccount.css';
import Layout from '../Layout/Layout.js';
import { register } from '../../actions/userAction.js';
import { useNavigate } from 'react-router-dom';


const NewAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [avatar,setAvater]=useState();
    const [avatarPreview,setAvaterPreview]=useState("images/Profile.png");
    const [newUser, setNewUser] = useState({
        name:"",
        email:"",
        password:""
    });
    const {name, email, password} = newUser;

    const registerDataChange = (e)=>{
        if(e.target.name==="avatar"){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState===2){
                    setAvater(reader.result);
                    setAvaterPreview(reader.result);
                };
            };
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setNewUser({...newUser,[e.target.name]:e.target.value});
        };
    };
    
    const registerSubmit = async(e)=>{
        e.preventDefault();
        
        const myForm = new FormData();
        
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);


        await dispatch(register(myForm));
        toast.info("Account is created successfully");
        setNewUser({
            name:"",
            email:"",
            password:""
        });
    };

  return (
    <Layout title="New Account ">
        <div className='signUpFormContainer'>
            <h3>Create Account</h3>
            <form className='signUpForm' onSubmit={registerSubmit} encType='multipart/form-data'>
                <div className='signUpName'>
                    <AiOutlineUser/>
                    <input type='text' placeholder='Name' value={name} name="name" required onChange={registerDataChange}/>
                </div>
                <div className='signUpEmail'>
                    <AiOutlineMail/>
                    <input type='email' placeholder='Email' value={email} name='email' required onChange={registerDataChange}/>
                </div>
                <div className='signUpPassword'>
                    <BiLockOpen/>
                    <input type='password' placeholder='Password' required value={password} name='password' onChange={registerDataChange}/>
                </div>
                <div id='registerImage'>
                    <img src={avatarPreview} alt='Avatar Preview'/>
                    <input type='file' name='avatar' accept='image/*' onChange={registerDataChange}/>
                </div>

                <input type='submit' value='register' className='signUpBtn' />
            </form>
        </div>
    </Layout>
  );
};

export default NewAccount;
