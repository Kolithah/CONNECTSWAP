import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { schemeCreation } from "./schemeCreation";
import { universities } from "../../../../../constants";
import { motion } from "framer-motion";
import MultiStepProgressBar from "../postSection/multiStepProgressBar";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
const initialData = {
  occupationField: 0,
  profession: "",
  isGovernment: 0,
  workingDistrict: 0,
  company: "",
  location: "",
  targetTransferDistricts: [],
  targetLocations: [],
  universityNumber: 0,
  facultyNumber: 0,
  targetUniversityNumbers: [],
  token: "",
};

const selected = [];
const selectedUni = [];
const exchangeSchemeCreator = ({setModalOpen , setModalPage}) => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);
  const [universitiesSelect, setUniSelect] = useState([universities]);
  const [formData, setFormData] = useState(initialData);
  const [district, setDistrict] = useState(0);
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [faculty, setFaculty] = useState(0);
  const [uniSelectedOptions, setUniSelectedOptions] = useState([]);
  const [occupation, setOccupation] = useState(0);
  const [isPublic, setSector] = useState(0);
  const [university, setUniversity] = useState(0);
  const [loading, setLoading] = useState(false);
  

  const onSelectOptions = (selectedList, selectedItem) => {
    selected.push(selectedItem.key);

    setSelectedOptions([...selectedOptions, selectedItem]);
  };
  const onRemoveOptions = (selectedList, removedItem) => {
    const indexRem = selected.indexOf(removedItem.key);

    selected.splice(indexRem, 1);
    const newArr = selectedOptions;
    newArr.splice(indexRem, 1);
    setSelectedOptions(newArr);
  };

  const onUniSelectOptions = (selectedList, selectedItem) => {
    selectedUni.push(selectedItem.key);

    setUniSelectedOptions([...uniSelectedOptions, selectedItem]);
  };
  const onUniRemoveOptions = (selectedList, removedItem) => {
    const indexRem = selectedUni.indexOf(removedItem.key);

    selectedUni.splice(indexRem, 1);
    const newArr = uniSelectedOptions;
    newArr.splice(indexRem, 1);
    setUniSelectedOptions(newArr);
  };

  const handleSubmit = async(e) => {
    setLoading(true);
    formData.occupationField=occupation;
    formData.isGovernment =isPublic;
    formData.workingDistrict = (occupation==6 && isPublic==1)?(universities[university-1].district):(district);
    formData.targetTransferDistricts= selectedOptions;
    formData.targetLocations = selectedTargets;
    formData.universityNumber = university;
    formData.facultyNumber = faculty;
    formData.targetUniversityNumbers= uniSelectedOptions;
    formData.token = token;
     
   

    e.preventDefault();
      
     const response = await schemeCreation(formData);
     console.log(response);
     setLoading(false);
  }
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        const newArr = structuredClone(universities);
    
        if (university != 0) {
          newArr.splice(university - 1, 1);
          
          setUniSelect(newArr);
        }
      }, [university]);
  return (
    <div 
    key={"exchangeSchemeCreator"}
    className="flex flex-col w-full h-full">
      <div className="bg-primary p-5 ">
        <div className="flex flex-row-reverse" onClick={() =>{setModalOpen(false);setPage(1);   } }>
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
            Exchange scheme
          </h1>
          <p className="text-sm dark:text-secondary-content text-secondary-content">
            Please fill in this form to create an exchange scheme
          </p>
        </div>
        <div className="md:px-20 px-5 mt-5">
          <MultiStepProgressBar step={page} />
        </div>
      </div>
      <div 
    
      key={'pagesSet'}
      className="px-5 md:px-20 py-5 mb-auto">
        {page === 1 ? (
             <StepOne
             occupation={occupation}
             setOccupation={setOccupation}
             isPublic={isPublic}
             setSector={setSector}
             handleChange={handleChange}
             formData={formData}
           />
            
        ):(page === 2 ? (
            <StepTwo
            occupation={occupation}
            district={district}
            setDistrict={setDistrict}
            university={university}
            setUniversity={setUniversity}
            handleChange={handleChange}
            isPublic={isPublic}
            faculty=    {faculty}
            setFaculty={setFaculty}
            formData={formData}
            />
        ):(page === 3 ? (
            <StepThree
            isPublic={isPublic}
            occupation={occupation}
            university={university}
            universitiesSelect={universitiesSelect}
            onUniSelectOptions={onUniSelectOptions}
            onUniRemoveOptions={onUniRemoveOptions}
            selectedTargets={selectedTargets}
            setSelectedTargets={setSelectedTargets}
            uniSelectedOptions={uniSelectedOptions}
            selectedOptions={selectedOptions}
            onSelectOptions={onSelectOptions}
            onRemoveOptions={onRemoveOptions}
            handleSubmit={handleSubmit}
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
          className={`btn btn-sm ${
            page === 1
              ? occupation === 0 ||
                isPublic === 0 ||
                (formData.profession == "" && occupation != "6")
                ? "btn-disabled"
                : ""
              : page === 2
              ? (((occupation == 6 && isPublic == 1 && (university == 0 || faculty == 0)) || (!(occupation == 6 && isPublic == 1) && (formData.company == "" || formData.location == "" || district == 0 )))? "btn-disabled": "")
              : "btn-disabled"
          }`}

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
  );
};

export default exchangeSchemeCreator;
