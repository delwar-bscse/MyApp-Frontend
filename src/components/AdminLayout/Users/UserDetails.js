import React, { useEffect } from 'react';
import AdminLayout from '../AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Others/Loading';
import { loadUserDetails, singleUserDelete, updateUserRole } from '../../../actions/usersAction';

const UserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const {isPanding,singleUser} = useSelector(state=>state.users);
  
    useEffect(()=>{
      dispatch(loadUserDetails(id));
    },[dispatch,id]);

    const handleDelete = (id) =>{
      dispatch(singleUserDelete(id));
      navigate("/admin/all-users")
    };
    const handleSelect = (e,id) =>{
      dispatch(updateUserRole(id,e.target.value));
    };


  return (
    <AdminLayout>
      <h2 className='text-center my-3'>User Infomation</h2>
      {isPanding ? <Loading/> : <div className='mx-auto w-75'>
      <div className='row  border p-3'>
        <div className='col-6 p-0'>
          <img className='w-100' src={singleUser?.avatar?.url} alt='Profile'/>
        </div>
        <div className='col-6 p-0 ps-3 position-relative'>
          <h3 className='fs-4'>Name: {singleUser?.name}</h3>
          <p>Email: {singleUser?.email}</p>
          <div className='d-flex align-items-center'>
            <p className='m-0 p-1'>Role : </p>
            <select onChange={(e)=>{handleSelect(e,singleUser?._id)}} value={singleUser?.role} className="form-select ms-1 rounded" style={{width:100}}>
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <button className='position-absolute start-50 translate-middle-x p-1 rounded btn btn-danger' style={{bottom:20,width:100}} onClick={()=>handleDelete(singleUser._id)}>Delete</button>
        </div>
      </div>
      </div>
      }
    </AdminLayout>
  );
};

export default UserDetails;
