import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../AdminLayout/AdminLayout';
import { getProducts } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product';
import { allCategory } from '../../actions/categoryAction';
import { Select, Slider } from 'antd';
const {Option} = Select;

const Products = () => {
  const dispatch = useDispatch();
  const {products,filterProductsCount} = useSelector(state=>state.products);
  const {categories} = useSelector(state=>state.category);
  const [keyword,setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [price,setPrice] = useState([0,5000]);
  const [rating,setRating] = useState([0,5]);


  const featureProducts = () =>{
    dispatch(getProducts(keyword?.trim(),currentPage,category,price,rating));
  };

  useEffect(()=>{
    featureProducts();
    dispatch(allCategory());
  },[currentPage,category,price,rating]);

  return (
    <AdminLayout title={'Create Product'}>
      <div className='container-fluid'>
      <div className='mx-auto' style={{maxWidth:"600px"}}>
        <div className="input-group my-3">
          <input type="text" className="form-control" onChange={(e)=>setKeyword(e.target.value)} placeholder="Search Product" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button className="btn btn-outline-secondary" onClick={featureProducts} type="button" id="button-addon2">Search</button>
        </div>

        <div>
          <div className='d-flex align-items-center'>
            <p className='m-0' style={{width:60}}>Price</p>
            <div className='flex-grow-1'>
              <Slider
                range={{
                draggableTrack: true,
                }}
                min={0}
                max={5000}
                defaultValue={[0, 5000]}
                onAfterChange={(value)=>setPrice(value)}
                autoFocus={true}
              />
            </div>
          </div>
          <div className='d-flex align-items-center'>
            <p className='m-0' style={{width:60}}>Rating</p>
            <div className='flex-grow-1'>
              <Slider
                range={{
                draggableTrack: true,
                }}
                min={0}
                max={5}
                defaultValue={[0, 5]}
                onAfterChange={(value)=>setRating(value)}
                autoFocus={true}
              />
            </div>
          </div>
        </div>

        <div className='d-flex justify-content-between my-3'>
          <div>
            <p className='d-inline me-1'>Select Category : </p>
            <Select placeholder="Select a category" onChange={(value)=>setCategory(value)}>
              <Option value="">All Category</Option>
                {categories?.map((c)=>(
                  <Option key={c._id} value={c.name}>{c.name}</Option>
                ))}
            </Select>
          </div>
          <div className='text-end'>
            <Link className='text-decoration-none float-right btn btn-success' to="/admin/create-product">Create</Link>
          </div>
        </div>
      </div>

        <div className='row'>
          {products?.map((product,i)=>(
            <div key={i} className='col-sm-6 col-md-4 col-lg-3 p-2'>
              <Product product={product}/>
            </div>
          ))}
        </div>

        <nav aria-label="Page navigation example">
          <div className="pagination d-flex justify-content-center my-3">
            <button type='button' disabled={currentPage<=1} onClick={()=>{setCurrentPage(currentPage-1)}} className="page-item btn btn-success rounded-0 px-3 mx-1">Prev</button>

            <button type='button' disabled={filterProductsCount<3} onClick={()=>{setCurrentPage(currentPage+1)}} className="page-item btn btn-success rounded-0 px-3 mx-1">Next</button>
          </div>
        </nav>

      </div>
    </AdminLayout>
  );
};

export default Products;
