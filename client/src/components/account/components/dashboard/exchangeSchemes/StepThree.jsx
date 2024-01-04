import { districts } from "../../../../../constants";
import { TagsInput } from "react-tag-input-component";
import Multiselect from "multiselect-react-dropdown";
import { motion } from "framer-motion";

const StepThree = ({
  isPublic,
  occupation,
  university,
  universitiesSelect,
  onUniSelectOptions,
  onUniRemoveOptions,
  uniSelectedOptions,
  selectedOptions,
  onSelectOptions,
  onRemoveOptions,
  selectedTargets,
  setSelectedTargets,
  handleSubmit,
  loading,

}) => {
  return (
    <motion.div
      key={"StepThree"}
      layout
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isPublic == 1 && occupation == 6 && university != 0 ? (
        <div className="">
          <div className="mb-1 text-sm">
            Select your Target transfer universities:
          </div>
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
                background: "hsl(var(--b1))",
              },
              multiselectContainer: {
                color: "hsl(var(--nc))",
                background: "hsl(var(--b1))",
              },
              searchBox: {
                border: "2px solid hsl(var(--p))",
                background: "hsl(var(--nf)",
                "borderBottom": "2px solid hsl(var(--p))",
                "borderRadius": "10px",
              },
              optionContainer: {
                // To change css for option container
                border: "2px solid hsl(var(--pf))",
                background: "hsl(var(--b1))",
              },
              option: {
                // To change css for dropdown options
                color: "hsl(var(--nc))",
                background: "hsl(var(--b1))",
              },
            }}
          />
        </div>
      ) : (
        <div>
          <div>
            <div className="mb-1 text-sm">
              Select your Target transfer districts:
            </div>
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
                  background: "hsl(var(--b1))",
                },
                multiselectContainer: {
                  color: "hsl(var(--nc))",
                  background: "hsl(var(--b1))",
                },
                searchBox: {
                  border: "2px solid hsl(var(--p))",
                  background: "hsl(var(--nf)",
                  "borderBottom": "2px solid hsl(var(--p))",
                  "borderRadius": "10px",
                },
                optionContainer: {
                  // To change css for option container
                  border: "2px solid hsl(var(--pf))",
                  background: "hsl(var(--b1))",
                },
                option: {
                  // To change css for dropdown options
                  color: "hsl(var(--nc))",
                  background: "hsl(var(--b1))",
                },
              }}
            />
          </div>
          <div className="text-sm mt-5 mb-1">
            Give your target Companies/Institutes with location:
          </div>

          <div>
            <TagsInput
              value={selectedTargets}
              onChange={setSelectedTargets}
              name="conpaniesOr"
              classNames=" "
              placeHolder="Enter your targets"
            />
          </div>
          <div className="text-xs mt-2">
            * Write and press enter to and also Separate the location with a
            &quot; - &quot;
          </div>

          <div className="text-xs">ex:- Singer Showroom - Colombo</div>
          <em className="text-xs">
            you can add multiples,press enter or comma to add new tag
          </em>
        </div>
      )}
       <div className="mt-5 w-full justify-center flex">
            <button onClick={(e) => handleSubmit(e)} className={`btn btn-primary btn-sm  btn-wide ${loading ? "loading" : ((((occupation == 6 && isPublic == 2) || (occupation != 6 && isPublic !=0)) &&!(selectedTargets.length > 0 && selectedOptions.length > 0)) ||((occupation == 6 && isPublic == 1) && !(uniSelectedOptions.length > 0))) ? "btn-disabled" : ""}`}>Submit</button>
        </div>
    </motion.div>
  );
};

export default StepThree;
