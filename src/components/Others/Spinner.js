import React, {useState, useEffect, Fragment} from 'react';
import { useNavigate } from 'react-router-dom';

const Spinner = ({path=""}) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(3);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((preValue)=> --preValue);
        },1000);

        count === 0 && navigate(`/${path}`);

        return () => clearInterval(interval);
        
    },[count, navigate]);

  return (
    <Fragment>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}>
            <h1 className='text-center d-block'>Redirecting to you in {count} second</h1><br/>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </Fragment>
  );
};

export default Spinner;
