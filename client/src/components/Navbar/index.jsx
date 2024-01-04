import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from '../form/index'

import Modal from "../form/modal";
const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 const [loginOrRegister, setLoginOrRegister] = useState(true);
 useEffect(()=>{
  console.log(loginOrRegister)
 },[loginOrRegister])
  useEffect(() => {
    const onScroll = () => {
      console.log("scrolling");
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`w-full fixed z-20 top-0 left-0 flex py-3 justify-between items-center navbar ${
        !scrolled
          ? `bg-transparent`
          : `bg-neutral shadow-md border-b border-gray-200 dark:border-gray-800`
      }`}
    >
      <div className={`font-poppins ml-3 font-bold text-2xl tracking-wider cursor-default ${(!scrolled && active == "Home") ? "opacity-0" : ""} `}>Co<span className="text-primary">nnect</span>swap</div>
      <Modal setLoginOrRegister={setLoginOrRegister} loginOrRegister={loginOrRegister}/>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        <li className={`cursor-pointer text-[16px] mr-10  font-semibold hover:text-primary ${active == "Home" ? "" : "text-slate-400"}`} onClick={() => setActive("Home")}><Link to={"/"}>Home</Link></li>
        <li className={`  cursor-pointer text-[16px] mr-10 font-semibold hover:text-primary ${active == "Browse" ? "" : "text-slate-400"}`} onClick={() => setActive("Browse")}><Link to={"/browse"}>Browse</Link></li>
        <li className={` font-normal cursor-pointer text-[16px] mr-3`}>
        <Form setLoginOrRegister={setLoginOrRegister} loginOrRegister={loginOrRegister}/>
        </li>
        
      
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <div>
          <label className="btn btn-circle swap swap-rotate">
            <input type="checkbox" onChange={() => setToggle(!toggle)} />

            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-base-300 z-10 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start p-3 flex-1 flex-col">
            <li className=" font-poppins font-medium cursor-pointer text-[20px]">
              <Link to={"/"} onClick={() => setActive("Home")}>Home</Link>
            </li>
            <li className=" font-poppins font-medium cursor-pointer mt-6 text-[20px]">
              <Link to={"/browse"} onClick={() => setActive("Browse")}>Browse</Link>
            </li>
            <li className=" font-poppins font-medium cursor-pointer my-6 text-[20px]">
            <Form  setLoginOrRegister={setLoginOrRegister} loginOrRegister={loginOrRegister}/>
            </li>
          </ul>
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [activeLink, setActiveLink] = useState("home");
//   const [scrolled, setScrolled] = useState(false);

//   {
//     /*useEffect hook is a code to run on every re-render */
//   }

//   const onUpdateActiveLink = (value) => {
//     setActiveLink(value);
//   };
//   return (
//     <div className={`navbar  fixed w-full z-20 top-0 left-0  ${!scrolled? `bg-transparent`:`bg-base-100 shadow-md border-b border-gray-200 dark:border-gray-800`}`}>
//   <div className="flex-1">
//     <a className="btn btn-ghost font-poppins tracking-widest font-bold normal-case text-2xl">CONN<span className="font-telemarines">e</span>CT <span className="text-primary">SWAP</span></a>
//   </div>
//   <div className="flex-none font-semibold p-1 mr-5 hover:text-primary cursor-pointer text-xl">
//     <Link to={'/'}>Home</Link>
//   </div>
//   <div className="flex-none font-semibold p-1 mr-5 hover:text-primary text-xl cursor-pointer">
//     <Link to={'/'}>Browse</Link>
//   </div>
//   <div className="flex-none font-semibold p-1 mr-5 hover:text-primary text-xl cursor-pointer">
//     <Link to={'/'}>Contact</Link>
//   </div>
//   <div className="flex-none p-1 mr-2 mt-1 ">

//   </div>
//   <div className="flex-none p-1 mr-2 mt-1">
//     <button className={`btn border-2 transition-colors duration-300 ease-in btn-outline btn-sm p-1  w-[100px] rounded-full`}>
//       Register
//     </button>
//   </div>
// </div>
//   )
// }

// export default Navbar
