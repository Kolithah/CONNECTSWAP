
import { createScheme } from "../../../../../api";


export const schemeCreation = async (e) => {
  console.log(e);

  const token = e.token;
  const goverUni=(e) =>{
    if(e.occupationField == "6" && e.isGovernment == "1"){return true}
    else {return false;} }
  const checkGovern = goverUni(e);
  const formData = {
    governUniversity: checkGovern,
    stateOrPrivate: Number(e.isGovernment),
    category: Number(e.occupationField),
    profession: (e.occupationField==6)?("Student"):(e.profession),
    target: checkGovern? (e.targetUniversityNumbers.map((e)=>{return Number(e.district)})):(e.targetTransferDistricts.map((e)=> {return Number(e.key)})),
    district: Number(e.workingDistrict),
    workPlace: checkGovern?(""):(e.company),
    workPlaceLocation:  checkGovern?(""):(e.location),
    targetPlaces:  checkGovern?(""):(e.targetLocations),
    isPublic: false,
    title: "",
    postBody: "",
    university:  !checkGovern?(0):(Number(e.universityNumber)),
    faculty:  !checkGovern?(0):(Number(e.facultyNumber)),
    targetUniversities:  !checkGovern?([]):(e.targetUniversityNumbers.map((e)=>{return Number(e.key)})),
  };

  console.log(formData);
  try {
    const data = await createScheme(formData,token);
    console.log(data);
    return data;
    
  } catch (error) {
    console.log(error);
    return error;
    
  }
  // const exchangeScheme = mongoose.Schema({
  // from auth()    owner: {type: mongoose.Schema.Types.ObjectID, ref:"User"},
  //   func()  governUniversity: { type:Boolean, default:false},
  // isGovernment:    stateOrPrivate: Number,
  //    occupationField category:  Number,
  //   profession   profession: {type:String, trim:true, default:""},
  //    workingDistrict  district: {type:Number, default:0},
  // company    workPlace:{type:String, default:""},
  // location    workPlaceLocation: {type:String, default:""},
  // targetTransferDistricts    target:[{type:Number, default:[]}],
  // targetLocations     targetPlaces: [{type:String, default:[]}],
  //     public: {type: Boolean, default: false},
  //     title: {type:String, default:""},
  //     postBody: {type:String, default:""},
  // universityNumber     university: {type:Number, default:0},
  //facultyNumber     faculty:{type:Number, default:0},
  //  targetUniversityNumbers:    targetUniversities:[{type:Number, default:[]}]

  // const initialData = {
  //     : 0,
  //    : "",
  //     0,
  //    : 0,
  //     : "",
  //     : "",
  //     : [],
  //    : [],
  //    : 0,
  //     :0,
  //   []

  //   };
};
