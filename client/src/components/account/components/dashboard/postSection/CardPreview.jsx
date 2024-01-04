import { ImageLoader } from "../../../../browse/card/ImageLoader";
import { motion } from "framer-motion";
import { universities, districts, categories, faculties } from "../../../../../constants";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getSchemes } from "../../../../../api";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
dayjs.extend(relativeTime);
const CardPreview = ({ SchemeId}) => {
    const token = useSelector((state) => state.token);

    const { isLoading, data, isError, error, isSuccess } = useQuery(
      ["exchangeSchemes"],
      () => {
        return getSchemes(token);
      }
    );
    if (isLoading) {
        return (
          <div className="flex flex-col w-full h-full justify-center align-middle items-center">
            <div>Please wait.... Generating a Preview</div>
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
            <div>Error occured</div>
          </div>
        )
      }
if (isSuccess && data.length != 0) {
    const filtered = data.filter((item) => {
        return item._id ==  SchemeId;
      });

    const cardData = filtered[0];
    return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    
    
  >
        
    <div className="card overflow-hidden  border-2 border-slate-200 transition-[border] ease-in-out hover:border-slate-200 p-3 w-[200px] bg-base-100 shadow-xl">
      <div className="flex flex-col basis-2">
        <div className="absolute top-[10%] right-0 left-[40%] bottom-[50%] image_gradient"></div>
        <div className="absolute  ">
          <img
            src={ImageLoader(cardData.category)}
            className="w-[80px] h-[140px] ml-[90px] "
          />
        </div>
        <div className=" truncate ">
          <div className="flex flex-col">
            <div className="mb-1 leading-none ">
              <div className=" ">
                {cardData.governUniversity
                  ? universities[cardData.university - 1].value
                  : cardData.workPlace}{" "}
              </div>
              <div className="truncate">
                {districts[cardData.district - 1].value}
              </div>
            </div>

            <div className="text-slate-400 text-xs leading-none mt-1">
              <div>Posted By</div>
              <div className="capitalize">Your Name</div>
            </div>
          </div>
        </div>
        <div className="flex  flex-col gap-1">
          <div className="badge badge-sm badge-secondary mt-1">
            {cardData.stateOrPrivate == 1 ? "Government" : "Private"}
          </div>
          <div className="badge badge-primary badge-xs pl-1">
            {cardData.profession}
          </div>
          <div
            className={`badge badge-accent badge-xs ${
                cardData.governUniversity ? "" : "opacity-0"
            }`}
          >
            {cardData.governUniversity ? faculties[cardData.faculty - 1] : "none"}
          </div>
        </div>
        <div className="leading-none">
          <div className="text-sm">preferred districts:</div>
          <div className="text-slate-400 truncate text-sm">
            {cardData.target.map((e) => {
              return districts[e - 1].value + ", ";
            })}
          </div>
        </div>
        <div className="flex flex-row-reverse text-sm font-semibold font-poppins mt-2">
          <div className="truncate ">{categories[cardData.category - 1][1]}</div>
        </div>

        <div className="flex w-full justify-around text-center mt-auto">
          <button
            className="btn btn-primary normal-case text-base tracking-wide btn-sm rounded-2xl  "
           
          >
            Details
          </button>
          <button
            className={`btn  normal-case text-base tracking-wide btn-primary btn-sm rounded-2xl   `}
            
          >
        Request
          </button>
        </div>

        <div className="flex flex-row-reverse text-xs mt-1 font-semibold">
          <div>{"- "+dayjs(cardData.createdAt).fromNow()}</div>
        </div>
      </div>
    </div>
  </motion.div>
  )}
}

export default CardPreview