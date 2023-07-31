import React, {useState, useEffect} from 'react';
import { Modal } from 'antd';
import CategoryForm from './CategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { allCategory, createCategory, deleteCategory, updateCategory } from '../../actions/categoryAction';
import AdminLayout from '../AdminLayout/AdminLayout';

const HandleCategory = () => {
  const {categories} = useSelector(state=>state.category);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [cid, setCid] = useState(null);
  const [updatedName, setUpdatedName] = useState("");


  //get all categories
  const getAllCategories = async()=>{
    await dispatch(allCategory());
  };
  
  useEffect( ()=>{
    getAllCategories();
  },[]);
  
  //handle form
  const handleSubmit = async(e) =>{
    e.preventDefault();
    await dispatch(createCategory(name));
    getAllCategories();
    setName("");
  };

  //handle form
  const handleUpdate = async() =>{
      await dispatch(updateCategory(cid,updatedName));
      getAllCategories();
      setVisible(false);
      setCid(null);
      setUpdatedName("");
  };
  //handle form
  const handleDelete = async(c_id) =>{
    await dispatch(deleteCategory(c_id));
    getAllCategories();
  };

  return (
    <AdminLayout title="Handle Caregory">
      <div className='container p-3'>
        <div className='w-75 mx-auto'>
              <h1>Manage Category</h1>
              <div className='w-100 py-3'>
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map(c => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>
                          <button className='btn btn-danger me-1 px-3' onClick={()=>handleDelete(c._id, c.slug)}>D</button>
                          <button className='btn btn-primary px-3' onClick={()=>{setVisible(true); setUpdatedName(c.name); setCid(c._id)}} >E</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal title="Update Category Name" onCancel={()=>setVisible(false)} onOk={handleUpdate} open={visible}>
                <input type="text" className='form-control my-1 w-100' value={updatedName} 
                onChange={(e)=>setUpdatedName(e.target.value)}/>
              </Modal>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HandleCategory;
