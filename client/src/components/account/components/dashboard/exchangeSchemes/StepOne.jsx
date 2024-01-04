import { motion, AnimatePresence } from "framer-motion";

const StepOne = ({ occupation, setOccupation, handleChange, isPublic, setSector, formData }) => {
  return (
    <div 
    key={"stepOne"}
    
    >
      <AnimatePresence>
        <motion.div
        key={"occupation"}
        
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-1 text-sm">Select your occupation/work field:</div>
          <select
            className="select select-primary select-sm w-full max-w-sm"
            aria-label="occupation selection"
            name="occupation"
            value={occupation}
            onChange={(e) => {
              setOccupation(e.target.value);
            }}
          >
            <option value="0" disabled defaultValue>
              Open this select menu
            </option>
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
        </motion.div>
        {occupation == 6 ? (
          <div></div>
        ) : (
          <motion.div
          key={"profession"}
           
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-5"
          >
            <div className="mb-1 text-sm">Your Profession:</div>
            <input
              type="text"
              name="profession"
              onChange={handleChange}
              value={formData.profession}
              placeholder="Enter your Profession"
              className="w-full px-3 py-2 border rounded-md h-8 placeholder:text-sm bg-neutral input-primary"
            />
          </motion.div>
        )}
        <motion.div
        key={"govern"}
       
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-5"
        >
          <div className="mb-1 text-sm">
            {occupation == 6
              ? "Government or Private university:"
              : "If your company is goverment sector or private:"}
          </div>
          <select
            name="govern"
            value={isPublic}
            className="select select-primary select-sm w-full max-w-xs"
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="0" disabled defaultValue>
              Select
            </option>
            <option value="1">Government</option>
            <option value="2">Private</option>
          </select>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StepOne;
