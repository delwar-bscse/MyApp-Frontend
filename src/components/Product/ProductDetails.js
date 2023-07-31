import React, { useEffect, useState } from 'react';
import { Rate, Button, Modal, Input } from 'antd';
import axios from 'axios';
import AdminLayout from '../AdminLayout/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { allCategory } from '../../actions/categoryAction';


const URL_PRODUCT = `${process.env.REACT_APP_URL}/api/v1/product`;


const ProductDetails = () => {
  const [product,setProduct] = useState({});
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = async()=>{
    const details = await getProductDetails(id);
    setProduct(details);
  }

  const deleteReview = async(reviewId) =>{
    const token = JSON.parse(localStorage.getItem("token"));
    const options = {
        headers: {"Authorization" : token}
    };
        
    await axios.delete(`${URL_PRODUCT}/delete-review?productId=${id}&reviewId=${reviewId}`, options);
    await productDetails(id); 
  }

  useEffect(()=>{
    productDetails(id);
  },[]);

  const handleDelete = async(id)=>{
    const token = JSON.parse(localStorage.getItem("token"));
    const options = {
        headers: {"Authorization" : token}
    };
    await axios.delete(`${URL_PRODUCT}/admin/product/${id}`,options);
    navigate("/admin/products");
  };

  
  const handleEdit = async(id) =>{
    await dispatch(allCategory());
    navigate(`/admin/edit-product/${id}`)
  }


  return (
    <AdminLayout>
      <div className='container mb-3'>
        <h2 className='text-center mt-3'>Product Details</h2>

        <div className='card p-3 mx-auto' style={{"width":"100%","maxWidth":"400px"}}>
          <img className='card-img-tom' src={product?.image?.url}/>
          <h3 className='card-title'>{product?.name}</h3>
          <h4 className='card-title'>{product?.category}</h4>
          <p className='card-text'>{product?.description}</p>
          <p className='card-text'>{product?.price}</p>
          <div>
            <Rate 
              allowHalf
              value={product?.ratings}
              disabled={true}
            />
          </div>
          <div className='d-flex justify-content-evenly border-top mt-3 pt-2'>
          <button className='btn btn-info py-1 text-white' style={{width:"100px"}} onClick={()=>handleEdit(product._id)}>Edit</button>
          <button className='btn btn-danger py-1' style={{width:"100px"}} onClick={()=>handleDelete(product?._id)}>delete</button>
          </div>
        </div>

        <div className='my-5'>
          {!product?.reviews?.length ? <p>No review abailable</p> : <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Rating</th>
                <th scope="col">Comment</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {product?.reviews?.map((review,i)=>(
                <tr key={i}>
                  <th scope="row">{review.name}</th>
                  <td>
                    <Rate 
                      allowHalf
                      defaultValue={review?.rating}
                      disabled={true}
                    />
                  </td>
                  <td>{review.comment.substring(0,20)}...</td>
                  <td>
                    <button className='btn btn-secondary py-1' onClick={()=>deleteReview(review._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductDetails;
