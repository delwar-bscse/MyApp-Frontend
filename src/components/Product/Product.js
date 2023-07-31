import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rate } from 'antd';
import { useDispatch } from 'react-redux';


const Product = ({product}) => {
  const navigate = useNavigate();

  const productDetails = async(id) =>{
    navigate(`/admin/product-details/${id}`)
  };


  return (
    <div className='card'>
      <img className='card-img-top p-1' src={product?.image?.url}/>
      <div className='card-body'>
        <h5 className='card-title'>{product.name}</h5>
        <p className='card-title'>Category : {product.category}</p>
        <p className='card-text'>Price : {product.price}</p>
        <p className='card-text fw-light'>Description : {product.description}</p>
        <div>
          <Rate 
            allowHalf
            value={product.ratings}
            disabled={true}
          />
        </div>
        <button className='btn btn-primary py-1 mt-2' onClick={()=>productDetails(product._id)}>Details</button>
      </div>
    </div>
  );
};

export default Product;
