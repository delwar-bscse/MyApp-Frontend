import React, { Fragment, useEffect } from 'react';
import {Helmet} from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminMenu from './AdminMenu';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../actions/usersAction';

const AdminLayout = ({children, description, keywords, author, title}) => {
  const dispatch = useDispatch();
  const {users} = useSelector(state=>state.users);
  const token = JSON.parse(localStorage.getItem("token"));
  
  useEffect(()=>{
    token && !users && dispatch(loadUsers());
  },[dispatch,token,users]);

  return (
    <Fragment >
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <main>
        <div className='container-fluid adminPanel'>
          <h1 className='text-center border-bottom py-2 position-sticky top-0'>Admin Panel</h1>
          <div className='row'>
            <div className='col-2 h-100 adminMenu'><AdminMenu/></div>
            <div className='col-10'>{children}</div>
          </div>
        </div>

        <ToastContainer
            position="top-right"
            autoClose={900}
            hideProgressBar={true}
            theme="light"
        />
      </main>
    </Fragment>
  );
};

AdminLayout.defaultProps = {
    title: "MyApp-AdminPanel",
    description: "MERN Stack Project",
    keywords: "mern, react, node, express, mongodb",
    author: "M D Hossain"
  };

export default AdminLayout;
