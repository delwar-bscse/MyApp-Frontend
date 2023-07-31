import { Button, Modal } from 'antd';
import { useState } from 'react';
import { forgotPassword } from '../../actions/userAction';
import { useDispatch } from 'react-redux';

const EmailModel = () => {
  const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email,setEmail] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
    setIsModalOpen(false);
    dispatch(forgotPassword(email));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className='EmailBtn' type="text" onClick={showModal}>
        Forgot Password
      </Button>
      <Modal title="Enter email to reset password" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input placeholder='Enter Your Email' className='p-1 w-100' type='email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      </Modal>
    </>
  );
};
export default EmailModel;