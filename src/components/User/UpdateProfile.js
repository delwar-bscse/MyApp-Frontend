import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import './UpdateProfile.css';
import {  updateProfile } from '../../actions/userAction';


const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.user);

    const [avatar,setAvater]=useState();
    const [avatarPreview,setAvatarPreview]=useState("images/Profile.png");
    const [newUser, setNewUser] = useState({
        name:"",
        email:""
    });
    const {name, email} = newUser;

    useEffect(()=>{
        if(user){
            setNewUser({
                name:user.name,
                email:user.email
            });
            setAvatarPreview(user?.avatar?.url);
        };
    },[]);

    const updateDataChange = (e)=>{
        if(e.target.name==="avatar"){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState===2){
                    setAvater(reader.result);
                    setAvatarPreview(reader.result);
                };
            };
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setNewUser({...newUser,[e.target.name]:e.target.value});
        };
    };

    const updateSubmit = async(e)=>{
        e.preventDefault();
        
        const myForm = new FormData();
        
        myForm.set("name", name);
        myForm.set("email", email);
        avatar && myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm));
        navigate("/auth/profile");
    };

  return (
    <Layout title="Update Account ">
        <div className='updateFormContainer'>
            <h3>Update Account</h3>
            <form className='updateForm' onSubmit={updateSubmit} encType='multipart/form-data'>
                <div className='updateName'>
                    <AiOutlineUser/>
                    <input type='text' placeholder='Name' value={name} name="name" required onChange={updateDataChange}/>
                </div>
                <div className='updateEmail'>
                    <AiOutlineMail/>
                    <input type='email' placeholder='Email' value={email} name='email' required onChange={updateDataChange}/>
                </div>
                <div id='updateImage'>
                    <img src={avatarPreview} alt='Avatar Preview'/>
                    <input type='file' name='avatar' accept='image/*' onChange={updateDataChange}/>
                </div>

                <input type='submit' value='update' className='updateBtn' />
            </form>
        </div>
    </Layout>
  );
};

export default UpdateProfile;
