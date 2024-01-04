import React from 'react'
import { setLogout } from '../../state/authSlice';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../App.css'

import { CloseButton, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Register from './register';
import Login from './login'
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loginOn, changeLogin] = useState(true);
  // const [userActive, setActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const userActive = Boolean(useSelector((state) => state.token));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logout = () =>{
    dispatch(setLogout());
    navigate('/');
    window.location.reload(false);
  }

  return (
    <>
    <span className="navbar-text">
    {/* Buttons are added a transition effect
    first we have made default buttons invisble so we can apply our own style to it*/ }
<button className="vvd" onClick={userActive ? (()=>(console.log("profile"))):(()=>{changeLogin(true); handleShow()})}>{userActive ? (<span onClick={()=>{ navigate('/profile')}} className='Profile-icon-navbar'> Profile</span> ): (<span>login</span>) }</button>
<button className="vvd" onClick={userActive? (logout):(()=>{changeLogin(false); handleShow();})}><span>{userActive ? "Logout" : "Register" }</span></button>
</span>

{/*modalOpen && <Modal setOpenModal={setModalOpen} /> */}


 <Modal show={show} onHide={handleClose} centered className='class321'>
      
          
       
        <Modal.Body  className='bg-dark test21'>
          
         {(loginOn? <Login />: <Register/>) }
         </Modal.Body>
        <Modal.Footer className=''>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> 


</>
  )
}

export default index;
