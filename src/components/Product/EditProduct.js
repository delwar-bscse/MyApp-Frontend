import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../AdminLayout/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import {Select} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../../actions/productAction';
const {Option} = Select;

const URL_PRODUCT = `${process.env.REACT_APP_URL}/api/v1/product`;

const EditProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {categories} = useSelector(state=>state.category);


    const [productImage,setProductImage] = useState();
    const [productImage2,setProductImage2] = useState("");
    const [category,setCategory] = useState("");
    const [newProduct, setNewProduct] = useState({
        name:"",
        description:"",
        price:"",
        stock:""
    });
    const {name,description,price,stock} = newProduct;

    const productDetails = async() =>{
        const product = await getProductDetails(id);
        setProductImage2(product?.image?.url)
        setCategory(product?.category)
        setNewProduct({
            name:product?.name,
            description:product?.description,
            price:product?.price,
            stock:product?.stock
        })
        // console.log(data);
    }


    const handleChange = (e) =>{
        if(e.target.name==="productImage"){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState===2){
                    setProductImage(reader.result);
                    setProductImage2(reader.result);
                };
            };
            reader.readAsDataURL(e.target.files[0]);
        }else{
            // console.log(e.target.name);
            setNewProduct({...newProduct,[e.target.name]:e.target.value});
        };
    };

    const handleUpdate = async(e) =>{
        e.preventDefault();

        try {
            const myForm = new FormData();
        
            myForm.set("category", category);
            myForm.set("name", name);
            myForm.set("description", description);
            myForm.set("price", price);
            myForm.set("stock", stock);
            productImage && myForm.set("image", productImage);

        const token = JSON.parse(localStorage.getItem('token'));
        const options = {
            headers:{Authorization:token}
        }
        await axios.put(`${URL_PRODUCT}/admin/product/${id}`, myForm, options);
        navigate(`/admin/product-details/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        productDetails();
    },[]);


  return (
    <AdminLayout>
      <div className='container card' style={{maxWidth:"500px"}}>
        <h2 className='my-3 text-center border-bottom pb-2 text-secondary-emphasis'>Update Product</h2>
        <form className='m-1' onSubmit={handleUpdate}>
                <p className='d-inline fw-semibold'>Select Category : </p>
                <Select placeholder={category} onChange={(value)=>setCategory(value)}>
                  {categories?.map((c)=>(
                    <Option key={c._id} value={c.name}>{c.name}</Option>
                  ))}
                </Select>
                <div>
                    {productImage2 && <img className='my-2' src={productImage2} alt="product" height={"200px"}/>}
                </div>
                
                <div className='mb-3'>
                    <label htmlFor="productImage" className="form-label fw-semibold">Select Product Photo:</label>
                    <input className="form-control" type='file' id="productImage" accept='image/*' name='productImage' onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="name" className="form-label fw-semibold">Product Name : </label>
                    <input className="form-control" type='text'  id="name" name="name" value={name} placeholder='Product Name' onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="description" className="form-label fw-semibold">Description : </label>
                    <input className="form-control" type='text' id="description" name="description" value={description} placeholder='Product Description' onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="price" className="form-label fw-semibold">Product Price : </label>
                    <input className="form-control" type='number' id="price" name="price" value={price} placeholder='Price' onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="stock" className="form-label fw-semibold">Product stock : </label>
                    <input className="form-control" type='number' id="stock" name="stock" value={stock} placeholder='Stock' onChange={handleChange}/>
                </div>
                
                <button type='submit' className='btn btn-primary mb-3'>UPDATE PRODUCT</button>
              </form>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;

