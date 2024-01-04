import mongoose from "mongoose";

const exchangeScheme = mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    governUniversity: { type: Boolean, default: false },
    stateOrPrivate: Number,
    category: Number,
    profession: { type: String, trim: true, default: "" },
    district: { type: Number, default: 0 },
    workPlace: { type: String, default: "" },
    workPlaceLocation: { type: String, default: "" },
    target: [{ type: Number, default: [] }],
    targetPlaces: [{ type: String, default: [] }],
    isPublic: { type: Boolean, default: false },
    title: { type: String, default: "" },
    postBody: { type: String, default: "" },
    createdAt: {
      type: Date,
      default: new Date(),
  },
    requests: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "User",
       
        },
        state: { type: Boolean, default: false },
        
      }
    ],
    university: { type: Number, default: 0 },
    faculty: { type: Number, default: 0 },
    targetUniversities: [{ type: Number, default: [] }],
  }

  /* {
    "occupationField": "3",
    "profession": "fsdffds",
    "isGovernment": "1",
    "workingDistrict": "14",
    "company": "dfdsfd",
    "location": "fsdfdf",
    "targetTransferDistricts": [
        {
            "key": "2",
            "value": "Kilinochchi"
        },
        {
            "key": "3",
            "value": "Mannar"
        },
        {
            "key": "4",
            "value": "Mullaitivu"
        }
    ],
    "targetLocations": [
        "light t"
    ],
    "universityNumber": 0,
    "facultyNumber": 0,
    "targetUniversityNumbers": []
} */
);

var ExcahngeScheme = mongoose.model("exchangeSchema", exchangeScheme);

export default ExcahngeScheme;
