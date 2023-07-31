import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout/Layout';
import { loadUser } from '../../actions/userAction';
import { Link } from 'react-router-dom';
import Loading from '../Others/Loading';

const Profile = () => {
  const dispatch = useDispatch();
  const {isLoading,user} = useSelector(state=>state.user);

  useEffect(()=>{
    dispatch(loadUser());
  },[]);

  return (
    <Layout title={'Profile'}>
      {isLoading ? <Loading/> : <div className='container mt-5' style={{maxWidth:"600px"}}>
        <div className='d-flex userProfile w-75 mx-auto border'>
          <div className='p-2'>
            <img src={user?.avatar?.url} alt='Profile'/>
          </div>
          <div className='p-2'>
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
            <button className='btn btn-sm btn-success bg-gradient d-block mb-2'><Link className='text-decoration-none text-white' to="/auth/password/update">Update Password</Link></button>
            <button className='btn btn-sm btn-info bg-gradient d-block mb-2'><Link className='text-decoration-none text-white' to="/auth/profile/update">Update Profile</Link></button>
          </div>
        </div>
      </div>
      }
    </Layout>
  );
};

export default Profile;
