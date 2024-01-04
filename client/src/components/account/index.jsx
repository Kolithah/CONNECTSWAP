import { NavLink, Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import PostCreator from "./components/dashboard/postSection/postCreator";
import ExchangeSchemeCreator from "./components/dashboard/exchangeSchemes/exchangeSchemeCreator";
import BigView from "./components/dashboard/otherPages/BigView";
import { motion } from "framer-motion";
import { getNameById } from "../../api";
const index = () => {
  const location = useLocation();
  const navigate = useNavigate();
 const [profileTab, setProfileTab] = useState("Dashboard");
  const [modalpage, setModalPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname == "/profile") {
      navigate("/profile/dashboard");
    }
  }, [location]);


  const handledropClick = (e) => {
    const elem = document.activeElement;
    if(elem){
      elem?.blur();
    }
  setProfileTab(e);
  }
  const authUser = useSelector((state) => state.user);
  const {isLoading, data, isSuccess, isError,error} = useQuery(['getUsRequests'],()=> {return getNameById(authUser)});
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
      <div className="opacity-0">d</div>

      <div
        className={`${
          modalOpen ? "" : "hidden"
        } absolute bg-primary left-0 right-0 backdrop-saturate-125  bg-white/30 top-0 bottom-0 z-[1000]`}
      >
        <div className="fixed w-full h-full flex flex-col justify-center align-middle items-center">
          <div className="md:w-[60%] sidebar bg-base-100 h-[90%] rounded-md overflow-y-auto ">
            {modalpage == 1 ? (
              <ExchangeSchemeCreator
                setModalPage={setModalPage}
                setModalOpen={setModalOpen}
              />
            ) : modalpage == 2 ? (
              <PostCreator
                setModalPage={setModalPage}
                setModalOpen={setModalOpen}
              />
            ) : (
              <BigView setModalPage={setModalPage} setModalOpen={setModalOpen} />
            )}
          </div>
        </div>
      </div>

      <div className="md:mt-24 mt-20 z-0">
        <div className="md:text-8xl text-5xl flex flex-row-reverse w-full">
          <motion.div initial={{ opacity: 0 , x: -400 }} animate={{ opacity: 1 , x: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="mr-5 mb-5 font-poppins font-semibold">Pro<span className="text-primary">fi</span>le</motion.div>
        </div>
        <main className="relative min-h-screen overflow-hidden bg-neutral rounded-2xl">
          <div className="flex items-start justify-between">
            <div className="relative hidden min-h-screen my-4 ml-4 shadow-lg lg:block w-80">
              <div className="h-[1100px] rounded-2xl bg-base-200">
                <div className="flex items-center text-sm justify-center pt-6">
                  Welcome back &nbsp;{isLoading ? "..." : (<span className="text-primary">{data?.name}</span>)}
                </div>
                <nav className="mt-6 font-poppins">
                  <ul className="menu w-full p-2 rounded-box bg-base-200">
                    <li onClick={()=> setProfileTab("Dashboard")}>
                      <NavLink to="dashboard">
                        <div className=" px-5 ">Dashboard </div>
                      </NavLink>
                    </li>
                    <li onClick={()=> setProfileTab("Pending Requests")}>
                      <NavLink to="requests">
                        <div className="indicator px-5 ">
                       
                          Pending Requests{" "}
                        </div>
                      </NavLink>
                    </li>

                    <li onClick={()=> setProfileTab("Ongoing Exchanges")}>
                      <NavLink to="ongoing">
                        <div className="indicator px-5 ">
                          
                          Ongoing exchanges
                        </div>
                      </NavLink>
                    </li>
                    <li onClick={()=> setProfileTab("Successful Exchanges")}>
                      <NavLink to="successful">
                        <div className="indicator px-5 ">
                        
                          Succesful exchanges{" "}
                        </div>
                      </NavLink>
                    </li>
                    <li onClick={()=> setProfileTab("Cancelled Exchanges")}>
                      <NavLink to="cancelled">
                        <div className="indicator px-5 ">
                         
                          Cancelled exchanges{" "}
                        </div>
                      </NavLink>
                    </li>
                   
                  </ul>
                </nav>
              </div>
            </div>
            <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
              <header className="z-0 items-center w-full h-16  shadow-lg bg-base-200 rounded-2xl">
                <div className="relative z-0 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                  <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="relative flex  justify-end ">
                      <div className="">
                       <div className="lg:block hidden text-3xl font-semibold font-poppins ml-3 tracking-wider text-primary">{profileTab} </div> 
                        <div className="dropdown lg:hidden ">
                          <label tabIndex={0} className="btn btn-sm flex justify-between m-1 w-56">
                           <div>{profileTab}</div> 
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" height="1.25em" viewBox="0 0 512 512">
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box "
                          >
                            <li onClick={()=>handledropClick("Dashboard")}>
                      <NavLink to="dashboard">
                        <div className="indicator  ">Dashboard </div>
                      </NavLink>
                    </li>
                    <li onClick={()=>handledropClick("Pending Requests")}>
                      <NavLink to="requests">
                        <div className="indicator  ">
                         
                          Pending Requests{" "}
                        </div>
                      </NavLink>
                    </li>

                    <li onClick={()=>handledropClick("Ongoing exchanges")}>
                      <NavLink to="ongoing">
                        <div className="indicator  ">
                        
                          Ongoing exchanges
                        </div>
                      </NavLink>
                    </li>
                    <li onClick={()=>handledropClick("Successful exchanges")}>
                      <NavLink to="successful">
                        <div className="indicator  ">
                         
                          Succesful exchanges
                        </div>
                      </NavLink>
                    </li>
                    <li onClick={()=>handledropClick("Cancelled exchanges")}>
                      <NavLink to="cancelled">
                        <div className="indicator  ">
                        
                          Cancelled exchanges
                        </div>
                      </NavLink>
                    </li>
                   
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
              <div className="min-h-full px-3 ">
                <Outlet
                  context={[modalOpen, setModalOpen, modalpage, setModalPage]}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};
export default index;
