
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Notification from "./widgets/Notification";
const notificationsGetter = ({isLoading, data, authUser,isSuccess, isError, error}) => {
  
    const [currentItems, setCurrentItems] = useState([]);
    const [isOkay, setIsOkay] = useState(false);
    const [overFlowed, setOverFlowed] = useState(false);
    const [notificationData, setNotifications] = useState([]);
 

      const filterAndAppendNotifications = () => {
        const filteredNotifications = data.reduce((accumulator, obj) => {
          if (obj.users[0].user._id === authUser) {
         
            [...obj.notificationsA].forEach(element => {
              accumulator.push({notification: element, user: obj.users[1].user});
            });
           
          } else if (obj.users[1].user._id === authUser) {
        
            [...obj.notificationsB].forEach(element => {
              accumulator.push({notification: element, user: obj.users[0].user});
            })
           
          }
          return accumulator;
        }, []);
    
        setNotifications((prev) => [...prev, ...filteredNotifications]);
        setIsOkay(true);
      };
    
      useEffect(() => {
        if (data?.length > 0) {
          console.log(data);
          setNotifications([]);
          filterAndAppendNotifications();
        }
      }, [data, authUser]);
    
      useEffect(() => {
        if (notificationData?.length > 0) {
          if (notificationData.length < 4) {
            setCurrentItems(notificationData);
            setOverFlowed(false);
          } else {
            setCurrentItems(notificationData.slice(-3));
            setOverFlowed(true);
          }
        }
        console.log(notificationData);
      }, [notificationData]);

  if (isLoading) {
    return  <div className="flex flex-col w-full h-28 justify-center align-middle items-center"><BeatLoader color="hsl(var(--pf))"></BeatLoader></div>;
  }
  if (isOkay){
    return (
      <div className="flex flex-col-reverse w-full">
      {currentItems.map((item) => {
        console.log("item",item);
        return <Notification notificationState={item.notification.state} user={item.user?.name} key={item.notification?._id} time={item.notification?.time} />
      })}
      </div>
    )
  }
  return (
    <div>
        {isLoading?<h1>Loading...</h1>:(isError?(()=>{ <div>{error.message}</div>}):( <div className="flex flex-col w-full h-20 align-middle items-center">
          
        
          </div>))}
 
        {overFlowed?<div></div>:(<div></div>)}


    </div>
  )
}
export default notificationsGetter;
