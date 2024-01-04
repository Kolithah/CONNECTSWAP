import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./login";

import { setLogout } from "../../state/authSlice";
import { useNavigate } from "react-router-dom";
const Index = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // const [userActive, setActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const userActive = Boolean(useSelector((state) => state.token));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logout = () => {
    dispatch(setLogout());
    navigate("/");
    window.location.reload(false);
  };
  const preventD = useMemo(() => {
    return (e) => {
      e?.preventDefault();
      return (e.returnValue = "");
    };
  }, []);
 

  return (
    <>
      {userActive ? (
        <div className="flex">
          <div className="btn-group">
  <button  className="btn btn-sm btn-primary pr-7" onClick={()=>navigate('/profile')}>
   
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="primary-content" className="w-4 h-4 mr-1">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
</svg>

    
    Profile</button>
  <button className="btn btn-sm btn-outline btn-primary " onClick={logout}>Logout</button>
</div>
        </div>
      ) : (
        <div className="flex ">
          <div className={` font-normal cursor-pointer text-[16px] mr-3`}>
            <label
              htmlFor={`form-modal`}
              className="btn btn-outline border-2 transition-colors duration-300 ease-in  btn-sm p-1  w-[100px] rounded-full"
               onClick={()=>props.setLoginOrRegister(true)}
            >
              Login
            </label>
          </div>

          <div className={` font-normal cursor-pointer text-[16px]`}>
            <label
              className={`btn btn-outline border-2 transition-colors duration-300 ease-in  btn-sm p-1  w-[100px] rounded-full`}
              htmlFor={`form-modal`}
              onClick={()=>props.setLoginOrRegister(false)}
            >
              Sign Up
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
