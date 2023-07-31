import React, { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout/AdminLayout';
import axios from 'axios';
import { Progress, Space, Col, Row, Statistic } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../actions/usersAction';
import { getProducts } from '../../actions/productAction';


const URL_ORDER = `${process.env.REACT_APP_URL}/api/v1/order`;


const AdminDashboard = () => {
  const {products} = useSelector(state=>state.products);
  const dispatch = useDispatch();
  const {allUsers} = useSelector(state=>state.users);
  const token = JSON.parse(localStorage.getItem("token"));

  const productStock = products?.filter((product)=>product?.stock).length/products?.length*100;


  const [orderList,setOrderList] = useState({
    totalBalance:"",
    totalOrders:"",
    processOrders:"",
    shippedOrders:"",
    deliveredOrders:"",
    canceledOrders:""
  });
  const {totalBalance,totalOrders,processOrders,shippedOrders,deliveredOrders,canceledOrders} = orderList;
  const POs = Math.round(processOrders/totalOrders*100);
  const SOs = Math.round(shippedOrders/totalOrders*100);
  const DOs = Math.round(deliveredOrders/totalOrders*100);
  const COs = Math.round(canceledOrders/totalOrders*100);

    const getAllOrderList = async() => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const tokenOptions = {
                headers: {"Authorization" : token}
            };
            const {data} = await axios.get(`${URL_ORDER}/all-orders`,tokenOptions);
  setOrderList({
    totalBalance: data?.orders?.filter((order)=>order.orderStatus!=="Canceled").reduce((total,order)=>total+order.totalPrice, 0),
    totalOrders: data?.orders?.length,
    processOrders: data?.orders?.filter((order)=>order.orderStatus==="Processing").length,
    shippedOrders: data?.orders?.filter((order)=>order.orderStatus==="Shipped").length,
    deliveredOrders: data?.orders?.filter((order)=>order.orderStatus==="Delivered").length,
    canceledOrders: data?.orders?.filter((order)=>order.orderStatus==="Canceled").length
  });
        } catch (error) {
            console.log(error);
        };
    }

    useEffect(()=>{
        getAllOrderList();
        dispatch(getProducts());
    },[]);

  useEffect(()=>{
    token && !allUsers && dispatch(loadUsers());
  },[token,allUsers]);

  return (
    <AdminLayout title='Admin Dashboard'>
      <div className='container-fluid w-75'>
        <div>
          <div className='my-3'>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Active Users" value={allUsers?.length} />
              </Col>
              <Col span={12}>
                <Statistic title="Account Balance (USD)" value={totalBalance} precision={2} />
              </Col>
            </Row>
          </div>
          <div className='mt-5'>
            <h3 className=''>TOTAL ORDERS : {totalOrders}</h3>
            <span className=''>Process</span>
            <div className="progress">
              <div className="progress-bar bg-info" role="progressbar" style={{width:`${POs}%`}} aria-valuenow={POs} aria-valuemin={0} aria-valuemax={100} />
            </div>
            <span className=''>Shipped</span>
            <div className="progress">
              <div className="progress-bar bg-primary" role="progressbar" style={{width: `${SOs}%`}} aria-valuenow={SOs} aria-valuemin={0} aria-valuemax={100} />
            </div>
            <span className=''>Delevered</span>
            <div className="progress">
              <div className="progress-bar bg-success" role="progressbar" style={{width: `${DOs}%`}} aria-valuenow={DOs} aria-valuemin={0} aria-valuemax={100} />
            </div>
            <span className=''>Canceled</span>
            <div className="progress">
              <div className="progress-bar bg-warning" role="progressbar" style={{width: `${COs}%`}} aria-valuenow={COs} aria-valuemin={0} aria-valuemax={100} />
            </div>
          </div>
          <div className='mt-5'>
            <div><h3>TOTAL PRODUCTS : {products?.length}</h3></div>
            <div className='d-flex'>
              <div className='me-3'>
                <p>In Stock : <span className='bg-primary d-inline-block' style={{width:"30px",height:"10px"}}></span></p>
              </div>
              <div>
                <p>Out of Stock : <span className='bg-danger d-inline-block' style={{width:"30px",height:"10px"}}></span></p>
              </div>
            </div>
            <div className='text-center'>
              <Space wrap>
                <Progress type="circle" percent={productStock} size={200} strokeColor={"blue"}/>
                <Progress type="circle" percent={100-productStock} size={200} strokeColor={"red"}/>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
