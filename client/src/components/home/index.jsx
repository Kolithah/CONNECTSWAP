import BannerImage from "../../assets/img/bannerimage.jpg";
import About from "./About";
import { useNavigate } from "react-router-dom";
import Testpage from "./Testpage";
import { motion } from "framer-motion";
import Opportunity from "./Opportunity";
const index = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
      <section className="">
        <div className="container flex flex-col justify-center sm:mt-5  p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-3 text-center rounded-sm lg:max-w-lg xl:max-w-lg lg:text-left">
            <h1 className="text-4xl md:mt-5 mt-10  font-bold leading-none font-poppins sm:text-6xl">
              Co
              <span className="text-primary">nnect</span>swap
            </h1>
            <p className="mt-6 mb-8  sm:mb-12 font-poppins md:text-base text-sm text-justify">
              Discover endless possibilities with CONNECTSWAP! Our platform
              connects individuals in Sri Lanka who are seeking mutually agreed
              exchanges. Whether you're a student looking to transfer from your
              university or a government/private sector employee seeking to
              transfer for another branch of your company, we've got you
              covered. Experience a seamless transition to your desired location
              by connecting with like-minded individuals who share your
              aspirations. Join us today and unlock a world of exciting
              opportunities!
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <div className="btn btn-primary btn-xl md:w-56 sm:w-36">
                Get Started
              </div>

              <div
                className="btn btn-outline btn-primary btn-xl md:w-56 sm:w-36"
                onClick={() => navigate("/browse")}
              >
                Browse
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-3 mt-8 lg:mt-20 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src={BannerImage}
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-70 2xl:h-128"
            />
          </div>
        </div>
      </section>
      <section className="">
    <About/>
      </section>

 <Testpage/>

      


     

 <footer className="footer footer-center p-10 bg-primary-focus text-primary-content">
  <div>
<div className="text-xl font-poppins font-semibold text-white">Co<span className="text-primary">nnect</span>swap</div>    <p className="font-bold">
      CONNECTSWAP ltd. <br/>Since 2016
    </p> 
    <p>Copyright © 2023 - All right reserved</p>
  </div> 
  <div>
    <div className="grid grid-flow-col gap-4">
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> 
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
    </div>
  </div>
</footer>
      <input type="checkbox" id="my-modal-9" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle z-[10000] sm:visible">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal-9" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default index;
