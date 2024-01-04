import PostWidget from "./PostWidget";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { getSchemes } from "../../../../../api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { districts,categories,universities } from "../../../../../constants";
import BeatLoader from "react-spinners/BeatLoader";
const PostGetter = () => {
  const token = useSelector((state) => state.token);
  const getCategory = (e) => {
    try {
      const value = categories[e.category - 1][1];
      return value;
    } catch (error) {
      console.log(error);
      return "loading...";
    }
  };
  const { isLoading, data, isSuccess, isError, error } = useQuery(
    ["exchangeSchemes"],
    () => {
      return getSchemes(token);
    },{refetchInterval: 500}
  );

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-28 justify-center align-middle items-center">
        <BeatLoader color="hsl(var(--pf))"></BeatLoader>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col w-full h-28 justify-center align-middle items-center">
        Error occured, try again
      </div>
    );
  }
  if (isSuccess && data.length == 0) {
    return (
      <div className="flex flex-col w-full font-poppins h-28 justify-center align-middle items-center">
        You have not published any public posts
      </div>
    );
  } else if (isSuccess && data.length != 0)
    return (
      <div>
        <div className="tooltip" data-tip={<div>Hello hi</div>}></div>
        {data.map((e) => {
          const studentCheck = e.governUniversity;
          if (e?.isPublic) return (
            <PostWidget
              key={e._id}
              occupation={e?.profession}
              field={getCategory(e)}
              location={districts[e.district - 1]?.value}
              workingPlace={
                studentCheck
                  ? universities[e.university - 1]?.value
                  : e.workPlace
              }
              data={e}
            />
          );
        }
        
        )}
      </div>
    );
  else return <h3>Error occured, try again</h3>;
};

export default PostGetter;
