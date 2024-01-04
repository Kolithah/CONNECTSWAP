import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getSchemes } from "../../../../../api";
import BeatLoader from "react-spinners/BeatLoader";
import { motion } from "framer-motion";
import {
  universities,
  districts,
  categories,
  faculties,
} from "../../../../../constants";

import { SchemeForm } from "../schemeForm";

const postStepOne = ({setModalPage, finalForm, SetFinalForm}) => {
  const [form, setForm] = useState({
    prof: "",
    category: "",
    govern: "",
    workPlace: "",
    targets: "",
    places: "",
  });
  const [schemeVisible, setVisible] = useState(false);
  const token = useSelector((state) => state.token);

  const { isLoading, data, isError, error, isSuccess } = useQuery(
    ["exchangeSchemes"],
    () => {
      return getSchemes(token);
    }
  );



  const handleSelect = (ex) => {
    const e = ex.target.value;
    setVisible(false);
    console.log(finalForm);
    SetFinalForm({ ...finalForm, ["schemeId"]: e });
    const filtered = data.filter((item) => {
      return item._id == e;
    });
    console.log(filtered[0]);
    if (filtered.length != 0) {
      if (filtered[0].governUniversity) {
        setForm({
          prof: filtered[0].profession,
          category: "University Student",
          govern: "Government",
          workPlace:
            faculties[filtered[0].faculty] +
            "-" +
            universities[filtered[0].university - 1].value,
          targets: filtered[0].target
            .map((e) => {
              return districts[e - 1].value;
            })
            .join(),
          places: filtered[0].targetUniversities
            .map((e) => {
              return universities[e - 1].value;
            })
            .join(),
        });
      } else {
        setForm({
          prof: filtered[0].profession,
          category: categories[filtered[0].category - 1][1],
          govern: filtered[0].stateOrPrivate == 1 ? "Government" : "Private",
          workPlace: filtered[0].workPlace,
          targets: filtered[0].target
            .map((e) => {
              return districts[e - 1].value;
            })
            .join(),
          places: filtered[0].targetPlaces.join(),
        });
      }
      setVisible(true);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full justify-center align-middle items-center">
        <div>Please wait.... Loading your Exchange Schemes</div>
        <BeatLoader color="#36d7b7" />
      </div>

    )
  }
  if (isSuccess && data.length == 0) {
    return (
      <div className="flex flex-col w-full h-full justify-center align-middle items-center">
        <div>No data found</div>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="flex flex-col w-full h-full justify-center align-middle items-center">
        <div>Error occured, try again</div>
      </div>
    )
  }



  if (isSuccess && data.length != 0) return (
    <div className="">
      <p className="font-poppins text-sm">*Please note that you have to create a Exchange sceme first to create a public post. If you haven&apos;t created a one plase <a className="link link-primary" onClick={() => setModalPage(1)}> click here </a>to create a one</p>
      <div className="mt-3 mb-1">Select an Exchange Sceme:</div>
      <select className="select select-primary select-sm w-full md:max-w-sm " onChange={handleSelect} value={finalForm.schemeId}>
        <option disabled selected value={''}>
          Choose an Exchange Sceme
        </option>

        {data.map((e)=>{
        const studentCheck = e.governUniversity;
        return ( <option className="" disabled={e.isPublic} value={e._id} key={e._id}>
        {e.profession}/
        {studentCheck? (universities[e.university-1].value):(e.workPlace)}/
        {districts[e.district-1].value}
        </option>)
      })}
      </select>

      {schemeVisible? (<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      
      className="md:text-sm text-xs mt-3 font-poppins"> 
            <div><span className="text-primary content font-semibold">Profession:&nbsp;</span>{form.prof}</div>
            <div><span className="text-primary content font-semibold">Category:&nbsp;</span>{form.category}</div>
            <div><span className="text-primary content font-semibold">Government/Private:&nbsp;</span>{form.govern}</div>
            <div><span className="text-primary content font-semibold">Working place/Institute:&nbsp;</span>{form.workPlace}</div>
            <div><span className="text-primary content font-semibold">Targeted districts:&nbsp;</span>{form.targets}</div>
            <div><span className="text-primary content font-semibold">Targeted places:&nbsp;</span>{form.places}</div>
          </motion.div>):(<div></div>)}
    </div>
  );
};

export default postStepOne;
