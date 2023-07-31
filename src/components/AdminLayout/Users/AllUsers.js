import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../../actions/usersAction';

const AllUsers = () => {
  const dispatch = useDispatch();
  const {allUsers} = useSelector(state=>state.users);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(()=>{
    token && !allUsers && dispatch(loadUsers());
  },[token,allUsers]);


  return (
    <AdminLayout>
      <div className='container-fluid'>
        <h2 className='text-center'>All Users</h2>
        <table className='table mx-auto'>
          <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
          <tbody>
            {allUsers?.map((user,i)=>(
              <tr key={i}>
                <td className='align-middle text-center py-1'><img style={{width:40}} src={user?.avatar?.url} alt='User'/></td>
                <td className='align-middle'>{user.name}</td>
                <td className='align-middle'>{user.email}</td>
                <td className='align-middle'>{user.role}</td>
                <td className='align-middle'><Link className='text-decoration-none' to={`/admin/user-details/${user._id}`}>Details</Link></td>
            </tr>
            ))}
            </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AllUsers;
