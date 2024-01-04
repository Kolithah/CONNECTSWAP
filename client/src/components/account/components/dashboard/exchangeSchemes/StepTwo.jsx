import { motion, AnimatePresence } from "framer-motion";
import { districts } from "../../../../../constants";
const StepTwo = ({
  occupation,
  district,
  setDistrict,
  university,
  setUniversity,
  handleChange,
  isPublic,
  faculty,
  setFaculty,
  formData,
}) => {
  return (
    <motion.div
      key={"stepTwo321"}
      layout
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence key={"stepTwo3213"}>
        {isPublic == 1 && occupation == 6 ? (
          <motion.div key={'sfsfwga'}>
            <motion.div
              layout
              key={"university"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-1 text-sm">Select your university:</div>
              <select
                className="select select-primary select-sm w-full max-w-xs"
                name="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              >
                <option value="0" disabled defaultValue>
                  Select the University
                </option>
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
                <option value="12">
                  South Eastern University of Sri Lanka
                </option>
                <option value="13">Uva Wellassa University</option>
                <option value="14">Wayamba University of Sri Lanka</option>
              </select>
            </motion.div>
            <motion.div
              layout
              key={"faculty1"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-5"
            >
              <div className="mb-1 text-sm"> Select your Faculty:</div>
              <select
                name="faculty"
                className="select select-sm select-primary w-full max-w-xs"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              >
                <option value="0" disabled defaultValue>
                  Select
                </option>
                <option value="1">Medicine</option>
                <option value="2">Engineering</option>
                <option value="3">Physical Science</option>
                <option value="4">Biological Science</option>
                <option value="5">Accounting and Management</option>
                <option value="6">Statistics</option>
                <option value="7">Arts</option>
              </select>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
          layout 
          key={"district1"}
          className="mt-5">
            <div className="mb-1 text-sm">
              Your current working/studying district:
            </div>
            <select
              className="select select-primary select-sm w-full max-w-xs"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="0" disabled defaultValue>
                Select district
              </option>
              {districts.map((e) => (
                <option key={e.key} value={e.key}>
                  {e.value}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        {isPublic == 1 && occupation == 6 ? (
          <div></div>
        ) : (
          <motion.div key={"company1fsf"}>
            <motion.div
              layout
              key={"company1"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-5"
            >
              <div className="mb-1 text-sm">
                Company/Institute/Government sector your working for:
              </div>
              <input
                type="text"
                name="company"
                placeholder="Enter sector/company"
                size="35"
                onChange={handleChange}
                value={formData.company}
                className="w-full px-3 py-2 border rounded-md h-8 placeholder:text-sm bg-neutral input-primary"
              />
            </motion.div>
            <motion.div
              layout
              key={"location"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="mt-5"
            >
              <div className="mb-1 text-sm">
                Location of your working place:
              </div>
              <input
                type="text"
                name="location"
                placeholder="Enter location of your working place"
                onChange={handleChange}
                size="35"
                value={formData.location}
                className="w-full px-3 py-2 border rounded-md h-8 placeholder:text-sm bg-neutral input-primary"
              />
            </motion.div>
          </motion.div>
        )}
       
      </AnimatePresence>
    </motion.div>
  );
};

export default StepTwo;
