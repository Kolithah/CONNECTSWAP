import Login from "./login"
import Register from "./register"
import { useState } from "react"
const modal = (props) => {

  
  const handleChange = (e)=>{
    if (e.target.checked){
      document.documentElement.style.height = '100%'
      document.body.style.height= '100%';
    }
    else{
      document.documentElement.style.height = ''
      document.body.style.height= '';
    }
  }

  return (
    <>
        <input type="checkbox" id={`form-modal`}  className="modal-toggle" />
<div className="modal modal-bottom sm:modal-middle">
  <div className="modal-box bg-base-100 px-10 py-5">
    {props.loginOrRegister ? <Login onclickFunction={props.setLoginOrRegister} /> : <Register onclickFunction={props.setLoginOrRegister}/>}

    <div className="modal-action">
    <label htmlFor={`form-modal`}  className="tn btn-primary btn-outline btn-sm btn-circle absolute right-3 top-3 ">

    <svg xmlns="http://www.w3.org/2000/svg" className="p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>

    </label>
    </div>
  </div>
</div>
    </>
  )
}

export default modal