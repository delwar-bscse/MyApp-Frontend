import React from 'react';
import {Helmet} from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header.js';
import Footer from './Footer.js';

const Layout = ({children, description, keywords, author, title}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{minHeight:'90vh'}}>
        {children}
        <ToastContainer
            position="top-right"
            autoClose={900}
            hideProgressBar={true}
            theme="light"
        />
      </main>
      <Footer/>
    </div>
  );
};

Layout.defaultProps = {
    title: "MyApp",
    description: "MERN Stack Project",
    keywords: "mern, react, node, express, mongodb",
    author: "M D Hossain"
  };

export default Layout;
