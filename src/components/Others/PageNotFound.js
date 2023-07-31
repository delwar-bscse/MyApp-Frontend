import React from 'react';
import { Button, Result } from 'antd';
import {useNavigate} from 'react-router-dom';
import Layout from '../Layout/Layout';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Page Not Found">
      <Result status="warning" title="Oops! Page Not Found"
        extra={
          <Button type="primary" key="console" onClick={()=>navigate("/")}>
            Go Home
          </Button>
        }
      />
    </Layout>
  );
};

export default PageNotFound;
