import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import axios from 'axios';
import { TbListDetails } from 'react-icons/tb';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const URL_ORDER = `${process.env.REACT_APP_URL}/api/v1/order`;

const AdminOrders = () => {
    const [orderList,setOrderList] = useState([]);

    const getAllOrderList = async() => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const tokenOptions = {
                headers: {"Authorization" : token}
            };
            const {data} = await axios.get(`${URL_ORDER}/all-orders`,tokenOptions);
            setOrderList(data?.orders);
            // console.log(data?.orders);
        } catch (error) {
            console.log(error);
        };
    }

    useEffect(()=>{
        getAllOrderList();
    },[]);

    const changeStatus = async(orderId,event) => {
      console.log(orderId, event.target.value);
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const tokenOptions = {
            headers: {"Authorization" : token}
        };
        await axios.put(
          `${URL_ORDER}/order-status/${orderId}`,
          {status: event.target.value},
          tokenOptions
        );
      } catch (error) {
          console.log(error);
      };
    }
    const deleteOrder = async(orderId) => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const tokenOptions = {
            headers: {"Authorization" : token}
        };
        await axios.delete(`${URL_ORDER}/order-delete/${orderId}`,tokenOptions);
        getAllOrderList();
      } catch (error) {
          console.log(error);
      };
    }



  return (
    <AdminLayout>
    <div className='container-fluid'>
      <h1 className='text-center my-2'>Orders List</h1>
      <table className="table mx-auto w-100">
        <thead>
            <tr>
              <th scope="col">OrderID</th>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Payment</th>
              <th scope="col">Status</th>
              <th scope="col"  className='text-center'>Action</th>
            </tr>
        </thead>
        <tbody>
            {orderList?.map((item,i)=>(
            <tr key={i}>
              <td>{item?._id.substring(16)}</td>
              <td>{item?.buyer?.name}</td>
              <td>{item?.shippingInfo?.contact}</td>
              <td>{item?.totalPrice}</td>
              <td>
                <select className="form-select" onChange={(event)=>changeStatus(item?._id,event)} aria-label="Default select example">
                  <option defaultValue={item?.orderStatus}>{item?.orderStatus}</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </td>
              <td className='text-center'>
                <Link to={`/admin/single-order/${item._id}`} className='btn btn-sm fs-5 lh-1'><TbListDetails/></Link>
                <button onClick={()=>deleteOrder(item?._id)} className='btn btn-sm fs-5 lh-1'><RiDeleteBin6Line/></button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  )
}

export default AdminOrders
