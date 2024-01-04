import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const RequestSelector = ({ data, message }) => {
  const navigate = useNavigate();
  const id = data._id;
  const authUser = useSelector((state) => state.user);
  const [owner, setOwner] = useState(null);
  const [otherUser, setOtherUser] = useState("");
  const [recentDate, setRecentDate] = useState(new Date());
  const extractUserIndexAndRecentTime = (data, userId) =>{
    // Extract user index from the users array
    const userIndex = data.users.findIndex((user) => user.user._id === userId);
  
    // Find the most recent time among notificationsA, notificationsB, and messages
    let mostRecentTime = null;
  
    const allTimeFields = [
      ...data.notificationsA.map((item) => item.time),
      ...data.notificationsB.map((item) => item.time),
      ...data.messages.map((item) => item.time),
    ];
  
    if (allTimeFields.length > 0) {
      mostRecentTime = new Date(Math.max(...allTimeFields.map((time) => new Date(time))));
    }
   
    return { userIndex, mostRecentTime };
  }
  

  useEffect(() => {
    console.log(data);
   const output =  extractUserIndexAndRecentTime(data, authUser);
   console.log(output);
   if(output?.userIndex ==0){
     setOwner(false);
   }else{
     setOwner(true);
   }
   setOtherUser(data.users[1-output?.userIndex]?.user.name);
   setRecentDate(output?.mostRecentTime);
  }, []);
   
  return (
    
      <motion.div
      layout
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={() => navigate(`${id}`)}
        className="flex flex-col w-full h-full justify-center align-middle items-center"
      >
        <div className="w-full hover:bg-primary-focus h-14 px-3 py-1 bg-primary rounded-lg my-1">
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-1 flex flex-col  justify-center ">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512">
            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
            </div>
            <div className="flex justify-between col-span-11">
              <div className="text-primary-content text-lg cursor-default">
           {message}
                <div className="md:text-sm sm:text-xs">Posted by:{(owner)? " You": " "+otherUser}  <span className="ml-3">Requested by:{(!owner)? " You": " "+otherUser} </span></div>
              </div>
              <div className="text-primary-content text-sm">{dayjs(recentDate).fromNow()}</div>
            </div>
          </div>
        </div>
      </motion.div>
    
  );
};

export default RequestSelector;
