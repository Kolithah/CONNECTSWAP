import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Datepicker from "react-tailwindcss-datepicker";
const API = axios.create({ baseURL: "http://localhost:5000" });


const Register = (props) => {
  const [errorStateMessage, setErrorStateMessage] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
 const [birthDateError, setBirthDateError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [birthDate, onDateChange] = useState('');
  const [registerError, setRegisterError] = useState(false);
  let initialState = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: birthDate,
    password: "",
    confirmPassword: "",
  };
  const [form, setForm] = useState(initialState);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const [show, setShow] = useState(false);
  const handleClose = (state) => {
    setShow(state);
  };

  const notify = () => toast((t) => (
    <div >
     Account Successfully Created
      <button className="ml-3 font-semibold" onClick={() => toast.dismiss(t.id)}>
        X
      </button>
    </div>
  ))
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setBirthDateError(false);
    setRegisterError(false);
    console.log(birthDate);

    if(form.firstName==''){
      setFirstNameError(true);
      setErrorStateMessage("This field is required");
    }
    if(form.lastName==''){
      setLastNameError(true);
      setErrorStateMessage("This field is required");
    }
    else if(form.email==''){
      setEmailError(true);
      setErrorStateMessage("This field is required");
    }
    else if(form.password==''){
      setPasswordError(true);
      setErrorStateMessage("This field is required");
    }
    else if(form.confirmPassword==''){
      setPasswordError(true);
      setErrorStateMessage("This field is required");
    }
    
    else if(birthDate==''){
      console.log(birthDate);
      setBirthDateError(true);
      setErrorStateMessage("This field is required");
      
    }
    else if(form.password!=form.confirmPassword){
      setPasswordError(true);
      setErrorStateMessage("Passwords do not match");}

    else {
      setForm({ ...form, ["dateOfBirth"]: birthDate });
      form.dateOfBirth = new Date(birthDate.startDate);
      try {
        console.log(form.dateOfBirth);
        const resp = await API.post("/user/signup", form);
        console.log(resp.data);
        if (resp.data?.token) {
          notify();
          props.onclickFunction(true)
        }
      } catch (error) {
        if(error.request.status == 400){
         setRegisterError(true);
        }
      }



    }
   
  };
  return (
    <>
     
      <form onSubmit={handleSubmit}>
      <Toaster 
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                className: 'bg-info text-info-content',
                style: {
                    border: '1px solid #713200',
                    padding: '10px',
                },
              }}
           />
        <div>
          <div>
            {" "}
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
              <p className="text-sm dark:text-gray-400">
                Please fill in this form to create an account.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <label className="mb-2 text-sm"> First Name </label>

              <div
                className={`${firstNameError ? "tooltip tooltip-open" : ""}  tooltip-primary w-full`}
                data-tip={`${errorStateMessage}`}
              >
                <input
                  type="text"
                  name="firstName"

                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md  bg-neutral input-primary"
                  placeholder="Enter First Name"
                  size="15"
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="mb-2 text-sm"> Last Name </label>
              <div
                className={`${lastNameError ? "tooltip tooltip-open" : ""}  tooltip-primary w-full`}
                data-tip={`${errorStateMessage}`}
              >
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md  bg-neutral input-primary"
                placeholder="Enter Last Name"
                size="15"
              /> </div>
            </div>
          </div>
          <div className="my-2">
            <label className=" text-sm">Date of Birth</label>
            <div className="">
            <div
                className={`${birthDateError ? "tooltip tooltip-open" : ""}  tooltip-primary w-full`}
                data-tip={`${errorStateMessage}`}
              >
              <Datepicker
                useRange={false}
                asSingle={true}
                popoverDirection="down"
                value={birthDate}
                inputClassName="w-full px-3 py-2 border rounded-md text-neutral-content  bg-neutral input-primary"
                onChange={onDateChange}
              /> </div>
            </div>
          </div>

          <div className="mb-2">
            <label className="text-sm">
              <b>Email</b>
            </label>
            <div
                className={`${emailError ? "tooltip tooltip-open" : ""}  tooltip-primary w-full`}
                data-tip={`${errorStateMessage}`}
              >

             
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full px-3 py-2 border rounded-md  bg-neutral input-primary"
              onChange={handleChange}
              name="email"
              id="email"
              required
            /> </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <label>
                <b>Password</b>
              </label>
              <div
                className={`${passwordError ? "tooltip tooltip-open" : ""}  tooltip-primary w-full`}
                data-tip={`${errorStateMessage}`}
              >
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="w-full px-3 py-2 border rounded-md  bg-neutral input-primary"
                onChange={handleChange}
                id="psw"
                required
              /> </div>
            </div>
            <div className="col-span-1">
              <label>
                <b>Repeat Password</b>
              </label>
              <div
                className={`${confirmPasswordError? "tooltip tooltip-open" : ""}  tooltip-primary w-full`}
                data-tip={`${errorStateMessage}`}
              >
              <input
                type="password"
                placeholder="Repeat Password"
                name="confirmPassword"
                className="w-full px-3 py-2 border rounded-md  bg-neutral input-primary"
                onChange={handleChange}
                id="psw-repeat"
                required
              /> </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-2">
            <div>
              <div className={`${registerError ? "" : "opacity-0"}  tooltip-primary text-error text-sm m-0 font-semibold flex w-full justify-center`}><div>User with that email already exists </div></div>
            <button className="btn btn-primary btn-wide mt-2" type="submit">
            Register
          </button>
          <p className="px-6 mt-1 text-sm text-center dark:text-gray-400">
            Already have an account?
            <span
              rel="noopener noreferrer"
              onClick={()=>props.onclickFunction(true)}

              className="hover:underline cursor-pointer  dark:text-violet-400"
            >
              Sign In
            </span>
            .
          </p>
            </div>
          
          </div>

          
        </div>

        <div>
          
        </div>
      </form>
    </>
  );
};

export default Register;
