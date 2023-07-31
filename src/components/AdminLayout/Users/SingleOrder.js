import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const URL_ORDER = `${process.env.REACT_APP_URL}/api/v1/order`;

const SingleOrder = () => {
    const navigate = useNavigate();
    const {orderId} = useParams();
    const [order,setOrder] = useState({});

    const getSingleOrder = async(orderId) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const tokenOptions = {
                headers: {"Authorization" : token}
            };
            const {data} = await axios.get(`${URL_ORDER}/single-order/${orderId}`,tokenOptions);
            setOrder(data?.order);
            console.log(data?.order);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(()=>{
        getSingleOrder(orderId);
    },[]);

    const changeStatus = async(status) => {
        console.log(orderId, status);
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          const tokenOptions = {
              headers: {"Authorization" : token}
          };
          await axios.put(`${URL_ORDER}/order-status/${orderId}`,{status},tokenOptions);
          getSingleOrder(orderId);
        } catch (error) {
            console.log(error);
        };
      }

      const deleteOrder = async() => {
        console.log(orderId);
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          const tokenOptions = {
              headers: {"Authorization" : token}
          };
          await axios.delete(`${URL_ORDER}/order-delete/${orderId}`,tokenOptions);
          navigate("/admin/orders")
        } catch (error) {
            console.log(error);
        };
      }

  return (
    <AdminLayout>
        <div className='container-fluid'>
            <div className='m-3'>
                <h2 className='ms-3'>SINGLE ORDER</h2>
                <div className='row border m-3 p-3 position-relative'>
                    <h5>Order ID : {order?._id}</h5>
                    <button type="button" className='btn btn-warning position-absolute top-0 end-0 m-2 fw-semibold py-1' onClick={()=>deleteOrder()} style={{width:80}}>Delete</button>
                    <div className='col-12'>
                        <p>Name : <span>{order?.buyer?.name}</span></p>
                        <p>Contact : <span>{order?.shippingInfo?.contact}</span></p>
                        <p>Address : <span>{order?.shippingInfo?.address}</span></p>
                        <p>Total Price : <span>{order?.totalPrice}</span></p>
                        <p>Shipping Status :  
<select className="form-select w-25 d-inline ms-3" onChange={(event)=>changeStatus(event.target.value)} aria-label="Default select example">
    <option defaultValue={order?.orderStatus}>{order?.orderStatus}</option>
    <option value="Processing">Processing</option>
    <option value="Shipped">Shipped</option>
    <option value="deliverd">deliverd</option>
    <option value="canceled">canceled</option>
</select>
                        </p>
                    </div>
<div className="col-12">
    <p className='text-center fw-bold fs-3 mb-0 border-bottom'>Products</p>
    <table className="table">
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
                <td><img id="imgWidth" src={item?.product?.image?.url}/></td>
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
        </div>
    </AdminLayout>
  );
};

export default SingleOrder;
