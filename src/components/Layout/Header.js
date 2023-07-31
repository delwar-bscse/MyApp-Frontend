import React, { useState } from 'react';
import { BsFillCartCheckFill } from "react-icons/bs";
import {Link, useNavigate} from 'react-router-dom';
import companyLogo from '../../images/MyApp.png';
import UserMenu from '../User/UserMenu';
import { RiLogoutBoxRLine, RiLoginBoxLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userAction';
import { CgMenu } from 'react-icons/cg';
import { toast } from 'react-toastify';

const Header = () => {
  const [ btnToggle,setBtnToggle] = useState(false);
  const {user} = useSelector(state=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");




  const handleLogOut = async() =>{
    await dispatch(logout());
    await toast.success("Log Out Successfully");
    setTimeout(()=>navigate("/"),500);
  };

  return (
    <div className='userMenuNav d-flex border-bottom p-1 justify-content-between w-100'>
      <div className='d-flex'>
        <button className='border-0 px-2 fs-1 text-primary pt-0 mt-0 bg-body text-opacity-75' onClick={()=>setBtnToggle(!btnToggle)}><CgMenu/></button>
        <img className='px-2' src={companyLogo} onClick={()=>navigate("/")} alt='MyApp'/>
      </div>
      <div>
        <div>
          <ul className='list-group list-group-horizontal'>
            <li className="list-group-item border-0 z-1 fs-2 p-1">
              {token ? <button className='border-0 bg-body text-primary' onClick={handleLogOut}><RiLogoutBoxRLine/></button> : <Link to="/login"><RiLoginBoxLine/></Link>}
            </li>
            <li className="list-group-item border-0 z-1 fs-2 p-1"><Link to='/cart'><BsFillCartCheckFill/></Link></li>
            <li className="list-group-item border-0 z-1 fs-2 p-1"><UserMenu/></li>
          </ul>
        </div>
      </div>
      <div className={`userMenu ${btnToggle ? "userMenuIn" : "userMenuOut"}`}>
        <ul className='list-group'>
          {user?.role==="admin" && <li className='list-group-item'><Link to="/admin/dashboard"> Dashboard</Link></li>}
          <li className="list-group-item m-0 p-0"><Link className='p-1 m-1 d-block' to='/'>Home</Link></li>
          <li className="list-group-item m-0 p-0"><Link className='p-1 m-1 d-block' to='/about'>About</Link></li>
          <li className="list-group-item m-0 p-0"><Link className='p-1 m-1 d-block' to='/contact'>Contact</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
