import { Space, Spin } from 'antd';

const Loading = () => (
    <div className='text-center'>
    <Space direction="vertical">
      <Spin size="large"/>
    </Space>
    </div>
  );

export default Loading;
