import React from "react";



import { useState, useEffect } from "react";

import Multiselect from "multiselect-react-dropdown";
import { TagsInput } from "react-tag-input-component";
import { useSelector } from "react-redux";

const districts = [
  { key: "1", value: "Jaffna" },
  { key: "2", value: "Kilinochchi" },
  { key: "3", value: "Mannar" },
  { key: "4", value: "Mullaitivu" },
  { key: "5", value: "Vavuniya" },
  { key: "6", value: "Puttalam" },
  { key: "7", value: "Kurunegala" },
  { key: "8", value: "Gampaha" },
  { key: "9", value: "Colombo" },
  { key: "10", value: "Kalutara" },
  { key: "11", value: "Anuradhapura" },
  { key: "12", value: "Polonnaruwa" },
  { key: "13", value: "Matale" },
  { key: "14", value: "Kandy" },
  { key: "15", value: "NuwaraEliya" },
  { key: "16", value: "Kegalle" },
  { key: "17", value: "Ratnapura" },
  { key: "18", value: "Trincomalee" },
  { key: "19", value: "Batticaloa" },
  { key: "20", value: "Ampara" },
  { key: "21", value: "Badulla" },
  { key: "22", value: "Monaragala" },
  { key: "23", value: "Hambantota" },
  { key: "24", value: "Matara" },
  { key: "25", value: "Galle" },
];

const universities = [
  { key: "1", value: "University of Colombo", district: "9" },
  { key: "2", value: "University of Peradeniya", district: "14" },
  { key: "3", value: "University of Kelaniya", district: "8" },
  { key: "4", value: "University of Moratuwa", district: "9" },
  { key: "5", value: "University of Jaffna", district: "1" },
  { key: "6", value: "University of Sri Jayewardenepura", district: "9" },
  { key: "7", value: "University of Vavuniya", district: "5" },
  { key: "8", value: "University of Ruhuna", district: "24" },
  { key: "9", value: "Eastern University of Sri Lanka", district: "19" },
  { key: "10", value: "Rajarata University of Sri Lanka", district: "11" },
  { key: "11", value: "Sabaragamuwa University of Sri Lanka", district: "17" },
  {
    key: "12",
    value: " South Eastern University of Sri Lanka",
    district: "20",
  },
  { key: "13", value: "Uva Wellassa University", district: "20" },
  { key: "14", value: "Wayamba University of Sri Lanka", district: "7" },
];

const initialData = {
  occupationField: 0,
  profession: "",
  isGovernment:0,
  workingDistrict: 0,
  company: "",
  location: "",
  targetTransferDistricts: [],
  targetLocations: [],
  universityNumber: 0,
  facultyNumber:0,
  targetUniversityNumbers:[],
  token: ""

};
const selected = [];
const selectedUni = [];
export const SchemeForm = () => {
  const token = useSelector((state)=>state.token)
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
  const handleSubmit = (e) => {
    
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
    if(occupation==6){
      if(isPublic==1){
        if(university==0 ||  faculty==0 || uniSelectedOptions.length==0){ console.log("All fields are reqiured")}
      }
      else{}
    }
    else{}
    
   
  };
  useEffect(() => {
    const newArr = structuredClone(universities);

    if (university != 0) {
      newArr.splice(university - 1, 1);
      
      setUniSelect(newArr);
    }
  }, [university]);

  const handleChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <>
      <form className="p-5" >
      <div className="hidden mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Exchange scheme</h1>
              <p className="text-sm dark:text-gray-400">
                Please fill in this form to create an account.
              </p>
            </div>
    <div className="">
        <div>
          <div>Select your occupation/work field</div>
          <select
            className="select select-primary select-sm w-full max-w-xs"
            aria-label="occupation selection"
            name="occupation"
            value={occupation}
            onChange={(e) => {
              setOccupation(e.target.value);
            }}
          >
            <option value="0" disabled selected>Open this select menu</option>
            <option value="1">Architecture and engineering</option>
            <option value="2">Arts, culture and entertainment</option>
            <option value="3">Business, management and administration</option>
            <option value="4">Communications</option>
            <option value="5">Community and social services</option>
            <option value="6">College/University Student</option>
            <option value="7">Education</option>
            <option value="8">Science and technology</option>
            <option value="9">Installation, repair and maintenance</option>
            <option value="10">Farming, fishing and forestry</option>
            <option value="11">Health and medicine</option>
            <option value="12">Law and public policy</option>
            <option value="13">Hospitality, Travel and Tourism</option>
          </select>
        </div>
        <div>
          {occupation == 6 ? (
            <div></div>
          ) : (
            <div>
              <div>Your Profession</div>
              <input
                type="text"
                name="profession"
                onChange={handleChange}
                placeholder="Enter your Profession "
                size="25"
              />
            </div>
          )}
        </div>
        <div>
          <div>
            {occupation == 6
              ? "Government or Private university"
              : "if your company is goverment sector or private"}
          </div>
          <select
            name="govern"
            value={isPublic}
            className="select select-primary select-sm w-full max-w-xs"
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="0" disabled selected>Select</option>
            <option value="1">Government</option>
            <option value="2">Private</option>
          </select>
        </div>
        {isPublic == 1 && occupation == 6 ? (
          <div>
            <div>Select your university</div>
            <select
            className="select select-primary select-sm w-full max-w-xs"
              name="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            >
              <option value="0"> Select the University</option>
              <option value="1">University of Colombo</option>
              <option value="2">University of Peradeniya</option>
              <option value="3">University of Kelaniya</option>
              <option value="4">University of Moratuwa</option>
              <option value="5">University of Jaffna</option>
              <option value="6">University of Sri Jayewardenepura</option>
              <option value="7">University of Vavuniya</option>
              <option value="8">University of Ruhuna</option>
              <option value="9">Eastern University of Sri Lanka</option>
              <option value="10">Rajarata University of Sri Lanka</option>
              <option value="11">Sabaragamuwa University of Sri Lanka</option>
              <option value="12">South Eastern University of Sri Lanka</option>
              <option value="13">Uva Wellassa University</option>
              <option value="14">Wayamba University of Sri Lanka</option>
            </select>
            <div> Select your Faculty</div>
            <select
              name="faculty"
              className="select select-sm select-primary w-full max-w-xs"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="0">Select</option>
              <option value="1">Medicine</option>
              <option value="2">Engineering</option>
              <option value="3">Physical Science</option>
              <option value="4">Biological Science</option>
              <option value="5">Accounting and Management</option>
              <option value="6">Statistics</option>
              <option value="7">Arts</option>
            </select>
          </div>
        ) : (
          <div>
            <div>Your current working/studying district</div>
            <select
            className="select select-primary select-sm w-full max-w-xs"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            >
              <option>Select district</option>
              {districts.map((e) => (
                <option key={e.key} value={e.key}>
                  {e.value}
                </option>
              ))}
            </select>
          </div>
        )}

        {isPublic == 1 && occupation == 6 ? (
          <div></div>
        ) : (
          <div>
            <div>
              <div>Company/Institute/Government sector your working for:</div>
              <input
                type="text"
                name="company"
                placeholder="Enter sector/company"
                size="35"
                onChange={handleChange}
              />
            </div>
            <div>
              <div>Location of your working place</div>
              <input
                type="text"
                name="location"
                placeholder="Enter location of your working place"
                onChange={handleChange}
                size="35"
              />
            </div>
          </div>
        )}

        {isPublic == 1 && occupation == 6 && university != 0 ? (
          <div className="text-primary-content">
            <div>Select your Target transfer universities</div>
            <Multiselect
              options={universitiesSelect}
              name="particulars1"
              onSelect={onUniSelectOptions}
              onRemove={onUniRemoveOptions}
              displayValue="value"
              closeIcon="cancel"
              placeholder="Select Options"
              selectedValues={uniSelectedOptions}
              style={{
                chips: {
                  background: 'red'
                },
                multiselectContainer: {
                  color: 'red'
                },
                searchBox: {
                  border: 'none',
                  'border-bottom': '1px solid blue',
                  'border-radius': '0px'
                }
              }}
            />
          </div>
        ) : (
          <div>
            <div>
              <div>Select your Target transfer districts</div>
              <Multiselect
                options={districts}
                name="particulars"
                onSelect={onSelectOptions}
                onRemove={onRemoveOptions}
                displayValue="value"
                closeIcon="cancel"
                placeholder="Select Options"
                selectedValues={selectedOptions}
                className="bg-base-100 hover:bg-black rounded-md" 
                style={{
                  chips: {
                    background: 'red'
                  },
                  multiselectContainer: {
                    color: 'red',
                    background: 'red'
                  },
                  searchBox: {
                    border: 'none',
                    background: 'red',
                    'border-bottom': '1px solid blue',
                    'border-radius': '10px'
                  },
                  optionContainer: { // To change css for option container 
                    border: '2px solid',
                    background: 'red'
                    },
                    option: { // To change css for dropdown options
                      color: 'green',
                      background: 'red'
                      },
                }}
              />
            </div>
            <div>Give your target Companies/Institutes with location</div>
            <div>Separate the location with a "-"</div>
            <TagsInput
              value={selectedTargets}
              onChange={setSelectedTargets}
              name="conpaniesOr"
              placeHolder="Enter your targets"
            />
            <div>ex:- Singer Showroom - Colombo</div>
            <em>
              you can add multiples,press enter or comma to add new tag
            </em>
          </div>
        )}
        </div>
        <button onClick={handleSubmit}> Submit</button>
      </form>
    </>
  );
};
