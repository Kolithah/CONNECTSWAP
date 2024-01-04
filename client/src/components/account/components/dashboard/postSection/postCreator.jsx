import MultiStepProgressBar from "./multiStepProgressBar";
import { useState } from "react";
import PostStepOne from "./postStepOne";
import PostStepTwo from "./postStepTwo";
import PostStepThree from "./postStepThree";
import { createPost } from "../../../../../api";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getSchemes } from "../../../../../api";

const postCreator = ({setModalOpen , setModalPage}) => {
  const [finalForm, SetFinalForm] =useState({schemeId:"", title:"", description:"", createdAt: new Date()});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const authToken = useSelector((state) => state.token);
  const authUser = useSelector((state) => state.user);

  const handlePost = async () =>{
    setLoading(true);
    try {
      const data = await createPost(authToken, finalForm, finalForm.schemeId);
      console.log(data);
    
    }
    catch (error) {
      console.log(error);
    }
    
  setLoading(false);
    

  }
  
  return (
    <div 
    key={"exchangeSchemeCreator"}
    className="flex flex-col w-full h-full">
      <div className="bg-primary p-5 ">
        <div className="flex flex-row-reverse" onClick={() =>{setPage(1); setModalOpen(false);   } }>
          {" "}
          <div className="btn btn-circle btn-sm ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <div className="mb-3 text-center">
          <h1 className="my-1 text-4xl font-bold text-primary-content">
            Post Creator
          </h1>
          <p className="text-sm dark:text-secondary-content text-secondary-content">
            Please fill in this form to create a post
          </p>
        </div>
        <div className="px-20 mt-5">
          <MultiStepProgressBar step={page} />
        </div>
      </div>
      <div 
    
      key={'pagesSet'}
      className="px-5 md:px-20 py-5 mb-auto">
        {page === 1 ? (
             <PostStepOne
             setModalPage={setModalPage}
             finalForm={finalForm}
             SetFinalForm={SetFinalForm}
           />
            
        ):(page === 2 ? (
            <PostStepTwo
            finalForm={finalForm}
            SetFinalForm={SetFinalForm}
            />
        ):(page === 3 ? (
            <PostStepThree
            SchemeId={finalForm.schemeId}
            handlePost={handlePost}
            loading={loading}
            />
        ):(<div></div>)))}
       
      </div>
      <div className="flex justify-center items-center gap-2 h-20 bg-primary mt-auto">
        <div 
        className={`btn btn-sm ${page === 1 ? "btn-disabled" : ""}`}
        onClick={() => setPage(page - 1)}
        >
          <svg
            className="mr-2 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
          Prev
        </div>
        <div
          className={`btn btn-sm ${page === 3 ? "btn-disabled" : (finalForm.schemeId === "" ? "btn-disabled" : "")}`}

          onClick={() => setPage(page + 1)}
        >
          Next
          <svg
            className="ml-2"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default postCreator