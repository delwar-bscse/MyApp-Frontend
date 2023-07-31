import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rate } from 'antd';
import { toast } from 'react-toastify';


const Product = ({product}) => {
  const navigate = useNavigate();

  const productDetails = async(id) =>{
    navigate(`/product-details/${product._id}`);
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
  };


  return (
    <div className='card p-2'>
      <img className='card-img' src={product?.image?.url}/>
      <h3 className='card-title'>{product.name}</h3>
      <p className=' card-text my-0 py-0'>Category : {product.category}</p>
      <p className='card-text my-0 py-0'>Price : {product.price}</p>
      <p className='card-text fw-light my-0 py-0'>Description : {product.description}</p>
      <div className='mb-3'>
        <Rate 
          allowHalf
          value={product?.ratings}
          disabled={true}
        />
      </div>
      <div>
        <button className='btn btn-success btn-sm mt-2 px-3 mx-1' onClick={()=>productDetails(product._id)}>Details</button>
        <button className='btn btn-info btn-sm mt-2 px-3 mx-1' onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
