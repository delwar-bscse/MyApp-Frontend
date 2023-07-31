import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout';
import axios from 'axios';

const URL_ORDER = `${process.env.REACT_APP_URL}/api/v1/order`;

const UserOrders = () => {
    const [orders,setOrders]=useState([]);

    const getMyOrders = async() => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const tokenOptions = {
                headers: {"Authorization" : token}
            };
            const {data} =token &&  await axios.get(`${URL_ORDER}/orders`,tokenOptions);
            setOrders(data?.orders);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(()=>{
        getMyOrders();
    },[]);


  return (
    <Layout title={"Orders"}>
        <div className='container-fluid'>
            {!orders.length ? <h3 className='text-center text-warning mt-5'>No Order found</h3> : <div className='m-3'>
                <h2>Your Orders</h2>
                {orders?.map((order,i)=>(
                <div key={i} className='row border m-0 py-2'>
                    <div className='col-md-4'>
                        <h5>Order Number : {i+1}</h5>
                        <p>Name : <span>{order?.buyer?.name}</span></p>
                        <p>Contact : <span>{order?.shippingInfo?.contact}</span></p>
                        <p>Address : <span>{order?.shippingInfo?.address}</span></p>
                        <p>Total Price : <span>{order?.totalPrice}</span></p>
                        <p>Shipping Status : <span>{order?.orderStatus}</span></p>
                    </div>
<div className="col-md-8">
    <p className='text-center fw-bold fs-3 mb-0 border-bottom'>Products</p>
    <div className='orderTable01'>
        <table className="table" style={{minWidth:'410px'}}>
            <thead>
                <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {order?.orderItems?.map((item,i)=>(
                <tr key={i}>
                <td><img style={{width:40}} src={item?.product?.image?.url}/></td>
                <td>{item?.product?.name}</td>
                <td>{item?.product?.price}</td>
                <td>{item?.quantity}</td>
                <td>{item?.product?.price*item?.quantity}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
                </div>
                ))}
            </div>}
        </div>
    </Layout>
  )
};

export default UserOrders;
