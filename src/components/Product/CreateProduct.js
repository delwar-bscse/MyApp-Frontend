import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../AdminLayout/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import {Select} from 'antd';
import { allCategory } from '../../actions/categoryAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const {Option} = Select;

const URL_PRODUCT = `${process.env.REACT_APP_URL}/api/v1/product`;

const CreateProduct = () => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state=>state.category);

    const [productImage,setProductImage] = useState();
    const [category,setCategory] = useState("");
    const [newProduct, setNewProduct] = useState({
        name:"",
        description:"",
        price:"",
        stock:""
    });
    const {name,description,price,stock} = newProduct;

    useEffect(()=>{
        dispatch(allCategory());
    },[]);

    const handleChange = (e) =>{
        if(e.target.name==="productImage"){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState===2){
                    setProductImage(reader.result);
                };
            };
            reader.readAsDataURL(e.target.files[0]);
        }else{
            // console.log(e.target.name);
            setNewProduct({...newProduct,[e.target.name]:e.target.value});
        };
    };

    const handleCreate = async(e) =>{
        e.preventDefault();

        try {
            const myForm = new FormData();
        
            myForm.set("category", category);
            productImage && myForm.set("image", productImage);
            myForm.set("name", name);
            myForm.set("description", description);
            myForm.set("price", price);
            myForm.set("stock", stock);

        const token = JSON.parse(localStorage.getItem('token'));
        const options = {
            headers:{Authorization:token}
        }
        await axios.post(`${URL_PRODUCT}/create-product`, myForm, options);
        toast.success("Product is created successfully");
        setProductImage()
        setCategory("")
        setNewProduct({
            name:"",
            description:"",
            price:"",
            stock:""
        })
        } catch (error) {
            console.log(error);
        }
    };


  return (
    <AdminLayout>
      <div className='container-fluid' style={{maxWidth:"500px"}}>
        <h2 className='my-3 text-center border-bottom pb-2 text-secondary-emphasis'>Create Product</h2>
        <form className='m-1' onSubmit={handleCreate}>
                <div className='mb-3'>
                    <p className='d-inline fw-semibold'>Select Category : </p>
                    <Select style={{minWidth:"100px"}} placeholder="Select a category" onChange={(value)=>setCategory(value)}>
                    {categories?.map((c)=>(
                        <Option key={c._id} value={c.name}>{c.name}</Option>
                    ))}
                    </Select>
                </div>
                <div>
                    {productImage && <img className='my-2' src={productImage} alt="product" height={"200px"}/>}
                </div>
                
                <div className='mb-3'>
                    <label htmlFor="productImage" className="form-label fw-semibold">Select Product Photo:</label>
                    <input  className="form-control" type='file' id="productImage" accept='image/*' name='productImage' onChange={handleChange}/>
                </div>
                
                <div className='mb-3'>
                    <label htmlFor="name" className="form-label fw-semibold">Product Name : </label>
                    <input  className="form-control" type='text' id="name" name="name" value={name} placeholder='Product Name' onChange={handleChange}/>
                </div>
                
                <div className='mb-3'>
                    <label htmlFor="description" className="form-label fw-semibold">Description : </label>
                    <input  className="form-control" type='text' id="description" name="description" value={description} placeholder='Product Description' onChange={handleChange}/>
                </div>
                
                <div className='mb-3'>
                    <label htmlFor="price" className="form-label fw-semibold">Product Price : </label>
                    <input  className="form-control" type='number' id="price" name="price" value={price} placeholder='Price' onChange={handleChange}/>
                </div>
                
                <div className='mb-3'>
                    <label htmlFor="stock" className="form-label fw-semibold">Product stock : </label>
                    <input  className="form-control" type='number' id="stock" name="stock" value={stock} placeholder='Stock' onChange={handleChange}/><br/>
                </div>
                
                <button type='submit' className='btn btn-primary mb-3'>CREATE PRODUCT</button>
              </form>
      </div>
    </AdminLayout>
  );
};

export default CreateProduct;
