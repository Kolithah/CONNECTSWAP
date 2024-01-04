import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import RequestSelector from "./requestTab/RequestSelector";
import { getUsersRequests } from "../../../api";
import BeatLoader from "react-spinners/BeatLoader";
const cancelled = () => {

  const token = useSelector((state)=>state.token);
  const authUser = useSelector((state)=>state.user);
  
  const {isLoading, data, isSuccess, isError,error} = useQuery(['getUserRequests'],()=> {return getUsersRequests(token)});
  if (isLoading) {
    return <div className="flex flex-col w-full h-[300px] justify-center align-middle items-center"><BeatLoader color="hsl(var(--pf))" /></div>
  }
  if (isError) {
    return <div className="flex flex-col w-full h-[300px] font-poppins text-2xl font-semibold justify-center align-middle items-center">Error occured, try again</div>
  }
  if(isSuccess){
    console.log(data);
  }

  if(isSuccess && data.filter((e)=>{return (e?.users?.some(user => user?.reqStatus == 6 ))})?.length==0){
 
    return <div className="flex flex-col w-full h-[300px] font-poppins text-2xl font-semibold justify-center align-middle items-center">No Cancelled Requests found </div>
  }
    else  return (
    <>
      
    
    <div className="flex  flex-col-reverse w-full h-full justify-center align-middle items-center">
      {data.filter((e)=>{return (e?.users?.some(user => user?.reqStatus == 7 || user?.reqStatus == 8 || user?.reqStatus == 10 || user?.reqStatus == 11))})?.map((e)=>{
          console.log("checke",e);
          return (<RequestSelector key={e._id}
            message={"Cancelled Exchange"}
            data={e}
            
            
            
            />)
      })}

    </div>
</>
  )
}

export default cancelled