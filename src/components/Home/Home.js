import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Slider } from 'antd';
import { getProducts } from '../../actions/productAction';
import { allCategory } from '../../actions/categoryAction';
import Product from './Product';
const {Option} = Select;


 

const Home = () => {
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
    !categories && dispatch(allCategory());
  },[currentPage,category,price,rating]);

  return (
    <Layout title="Home Page">
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-4 col-sm-3 col-md-2  h-100'>
            <div className='my-3 w-100'>
              <Select placeholder="category" style={{width:"100%"}} onChange={(value)=>setCategory(value)}>
                <Option value="">All Category</Option>
                {categories?.map((c)=>(
                  <Option key={c._id} value={c.name}>{c.name}</Option>
                ))}
              </Select>
            </div>
            <div>
              <div>
                <span>Price</span>
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
              <div>
                <span>Rating</span>
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
          <div className='col-xs-8 col-sm-9 col-md-10'>
            <div className="input-group my-3 w-50 m-auto" style={{minWidth:"250px"}}>
              <input type="text" className="form-control" onChange={(e)=>setKeyword(e.target.value)} placeholder="Search Product" aria-label="Recipient's username" aria-describedby="button-addon2" />
              <button className="btn border bg-info opacity-75 z-1" onClick={featureProducts} type="button" id="button-addon2">Search</button>
            </div>

            <div className='row'>
              {products?.map((product,i)=>(
                <div key={i} className='col-sm-6 col-md-4 col-lg-3 p-0'>
                  <div className='m-2'>
                    <Product product={product}/>
                  </div>
                </div>
              ))}
            </div>
            
            <nav aria-label="Page navigation example">
              <div className="pagination my-3 w-25 m-auto">
                <button disabled={currentPage<=1} onClick={()=>{setCurrentPage(currentPage-1)}}  className="page-item btn btn-success rounded-0 px-3 mx-1">Prev</button>

                <button disabled={filterProductsCount<3} onClick={()=>{setCurrentPage(currentPage+1)}} className="page-item btn btn-success rounded-0 px-3 mx-1">Next</button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
