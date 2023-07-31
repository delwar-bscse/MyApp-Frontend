import React, { useEffect, useState } from 'react';
import { Rate, Button, Modal, Input } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductDetails } from '../../actions/productAction';
import Layout from '../Layout/Layout';


const URL_PRODUCT = `${process.env.REACT_APP_URL}/api/v1/product`;
const token = JSON.parse(localStorage.getItem("token"));
    const options = {
        headers: {"Authorization" : token}
    };


const HomeProductDetails = () => {
  const {id} = useParams();
  const [product,setProduct] = useState({});
  const [givenRaging,setGivenRating]=useState(0);
  const [givenComment,setGivenComment]=useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productDetails = async()=>{
    const details = await getProductDetails(id);
    setProduct(details);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async() => {
    const newReview = {
      productId:id,
      rating:givenRaging,
      comment:givenComment
    }
    
        
    await axios.put(`${URL_PRODUCT}/put-review`, newReview, options);
    await productDetails(); 
    await toast.success("Review submitted successfully");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addToCart = async() =>{

    let storedCart = [];

    if(localStorage.getItem('cart')){
      storedCart = JSON.parse(localStorage.getItem('cart')).filter((item)=>item._id !== product._id);
    };
    product.quantity=1;
    storedCart.push(product);

    await localStorage.setItem('cart', JSON.stringify(storedCart));
    await toast.success("Product add to Cart");
  }

  useEffect(()=>{
    productDetails();  
  },[]);


  return (
    <Layout>
    <div className='container'>
      <h2 className='mt-3 text-center border-bottom'>Product Details</h2>
      <div className='p-3'>
        <div className='border p-3 mb-4 mx-auto' style={{maxWidth:'300px'}}>
          <img src={product?.image?.url} alt='Product' className='w-100'/>
          <h3>{product?.name}</h3>
          <p>Category : {product?.category}</p>
          <p>Description : {product?.description}</p>
          <p>Price : {product?.price}</p>

          <div className='mb-3'>
            <Rate 
              allowHalf
              value={product?.ratings}
              disabled={true}
            />
          </div>
          
          {token && <div className='mb-2'>
            <>
              <Button type="primary" onClick={showModal}>
                Give Review
              </Button>
              <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <span>Raging : </span>
                <Rate
                  defaultValue={0}
                  onChange={(value)=>setGivenRating(value)}
                />
                <Input
                  placeholder="Comment Please"
                  onChange={(e)=>setGivenComment(e.target.value)} 
                />
              </Modal>
            </>
          </div>}
          <div>
            <button className='btn btn-info btn-sm mt-2 px-3' onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
        <div className='mt-5'>
          <h3 className='text-center'>All Reviews of Product</h3>
          <div className='container d-flex flex-wrap'>
          {product?.reviews?.map((review,i)=>(
            <div key={i} className='card p-3 m-2'>
              <h4>{review.name}</h4>
              <Rate 
                allowHalf
                value={review?.rating}
                disabled={true}
              />
              <p>{review.comment}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default HomeProductDetails;
