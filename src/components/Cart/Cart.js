import React, { useEffect, useState } from 'react';
import DropIn from "braintree-web-drop-in-react";
import Layout from '../Layout/Layout';
import axios from 'axios';
import Loading from '../Others/Loading';
import { useNavigate } from 'react-router-dom';

const URL_ORDER = `${process.env.REACT_APP_URL}/api/v1/order`;

const Cart = () => {
  const [cartProducts,setCartProducts] = useState([]);
  const [totalPrice,setTotalPrice] = useState(0);
  const [contact,setContact] = useState("");
  const [address,setAddress] = useState("");

  const [clientToken,setClientToken] = useState("");
  const [instance,setInstance] = useState("");
  const navigate = useNavigate();
  
  //get payment gateway token
  const getToken = async() =>{
    const token = JSON.parse(localStorage.getItem("token"));
    const tokenOptions = {
        headers: {"Authorization" : token}
    };
    try {
      const {data} = await axios.get(`${URL_ORDER}/braintree-token`,tokenOptions);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(()=>{
    localStorage.getItem('token') && getToken();
    if(localStorage.getItem('cart')){
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      const total = storedCart.reduce((total,product)=>total + (product?.price*product?.quantity),0);
      setTotalPrice(total);
      setCartProducts(storedCart);
    };
  },[]);

    //handle payment
    const handlePayment = async() =>{
      try {
        const { nonce } = await instance.requestPaymentMethod();
        
        const orderOptions = {
          nonce,
          cart:cartProducts?.map((product)=>{
            return {
              quantity:product?.quantity,
              product:product?._id
            }
          }),
          totalPrice,
          shippingInfo:{
            address,
            contact
          }
        }
        const token = JSON.parse(localStorage.getItem("token"));
        const tokenOptions = {
            headers: {"Authorization" : token}
        };
        const { data } = await axios.post(`${URL_ORDER}/braintree-payment`, orderOptions, tokenOptions);
        localStorage.removeItem('cart');
        navigate("/auth/orders")
      } catch (error) {
        console.log(error);
      }
    };

  const removeItem = (productId)=>{
    let newCart = [];
    newCart = cartProducts.filter((product)=>product?._id!==productId);
    const total = newCart.reduce((total,product)=>total + (product?.price*product?.quantity),0);
    setTotalPrice(total);
    setCartProducts(newCart);
    localStorage.setItem("cart",JSON.stringify(newCart));
  };

  const productQuantity = (e,id) =>{
    let newCart = [];
    newCart = cartProducts?.map((product)=>{
      if(product?._id===id){
        product.quantity = Math.ceil(e.target.value);
      }
      return product;
    });
    const total = newCart.reduce((total,product)=>total + (product?.price*product?.quantity),0);
    setTotalPrice(total);
    setCartProducts(newCart);
    localStorage.setItem("cart",JSON.stringify(newCart));
  }


  return (
    <Layout title='Your Cart'>
      <div className='container'>
        {!cartProducts.length ? <h3 className='my-3 text-warning'>Please add products to Cart</h3> : <div className='cartTable01'><table className="table">
          <thead>
            <tr className='align-items-center'>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product,i)=>(
            <tr key={i}>
              <td><img style={{width:40}} src={product?.image?.url}/></td>
              <td>{product?.name}</td>
              <td>{product?.price}</td>
              <td id='quantitySec'>
                <input type='number' style={{width:55}} value={product?.quantity} onChange={(e)=>productQuantity(e,product?._id)} />
              </td>
              <td>{product?.price*product?.quantity}</td>
              <td><button className='btn btn-info btn-sm' onClick={()=>removeItem(product?._id)}>Remove</button></td>
            </tr>
            ))}
          </tbody>
        </table>
        </div>}
        <div>
          {!cartProducts.length ? "" : <div className='d-block'>
            <table className="table border">
              <tbody>
                <tr>
                  <th className='bg-light opacity-75 border-end'>Total Price</th>
                  <td className='text-center fw-bold'>{totalPrice}</td>
                </tr>
                <tr>
                  <th className='bg-light opacity-75 border-end'>Contact Number</th>
                  <td><input type='text' placeholder='Enter Your Number' className='w-100 p-1 border-0' onChange={(e)=>setContact(e.target.value)} /></td>
                </tr>
                <tr>
                  <th className='bg-light opacity-75 border-end'>Delivery Address</th>
                  <td><input type='text' placeholder='Enter Your Address' className='w-100 p-1 border-0' onChange={(e)=>setAddress(e.target.value)} ></input></td>
                </tr>
              </tbody>
            </table>
          </div>}
          {cartProducts?.length && clientToken && contact && address ? (
            <div className='mt-2 z-1'>
              <DropIn
                options={{ authorization:clientToken}}
                onInstance={(instance) => setInstance(instance)}
              />
              <button className='btn btn-primary mb-3' onClick={handlePayment} disabled={!instance===" "}>Make Payment</button>
          </div>
          ) : (
            <div className='mt-5'>
              <p className='p-0lh-1 text-danger'>Please fillup above fileds to pay</p>
              <Loading/>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
