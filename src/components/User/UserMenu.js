import { Dropdown, Space } from 'antd';
import {Link} from 'react-router-dom';
import { BiSolidUserAccount } from 'react-icons/bi';

const linkStyle = 'text-decoration-none fs-6 text-secondary'

const items = [
  {
    key: '1',
    label: (
      <Link className={linkStyle} rel="noopener noreferrer" to="/auth/profile">
        Profile
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link className={linkStyle} rel="noopener noreferrer" to="/auth/orders">
        Orders
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link className={linkStyle} rel="noopener noreferrer"  to="/new-account">
        Sign Up
      </Link>
    ),
  }
];

const UserMenu = () => (
  <Space direction="vertical">
      <Space wrap>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
        >
          <Link><BiSolidUserAccount /></Link>
        </Dropdown>
      </Space>
    </Space>
);
export default UserMenu;