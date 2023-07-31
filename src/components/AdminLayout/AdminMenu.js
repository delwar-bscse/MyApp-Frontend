import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const AdminMenu = () => {
  return (
    <Fragment>
      <>
        <h3 className='text-start ps-2 border-bottom'>Menu</h3>
        <div className='d-flex flex-column'>
          <Link className='text-decoration-none py-1 text-secondary-emphasis' to="/">Go Home</Link>
          <Link className='text-decoration-none py-1 text-secondary-emphasis' to="/admin/dashboard">Dashboard</Link>
          <Link className='text-decoration-none py-1 text-secondary-emphasis' to="/admin/products">Products</Link>
          <Link className='text-decoration-none py-1 text-secondary-emphasis' to="/admin/categories">Categories</Link>
          <Link className='text-decoration-none py-1 text-secondary-emphasis' to="/admin/all-users">Users</Link>
          <Link className='text-decoration-none py-1 text-secondary-emphasis' to="/admin/orders">Order</Link>
        </div>
      </>
    </Fragment>
  );
};

export default AdminMenu;
