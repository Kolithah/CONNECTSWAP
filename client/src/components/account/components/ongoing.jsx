import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import RequestSelector from "./requestTab/RequestSelector";
import { getUsersRequests } from "../../../api";
import BeatLoader from "react-spinners/BeatLoader";
const ongoing = () => {

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

  if(isSuccess && data.filter((e)=>{return (e?.users?.some(user => user?.reqStatus == 3 || user?.reqStatus == 4 || user?.reqStatus == 5))})?.length==0){
 
    return <div className="flex flex-col w-full h-[300px] font-poppins text-2xl font-semibold justify-center align-middle items-center">No Ongoing Requests found </div>
  }
    else  return (
    <>
      
    
    <div className="flex  flex-col-reverse w-full h-full justify-center align-middle items-center">
      {data.filter((e)=>{return (e?.users?.some(user => user?.reqStatus == 3 || user?.reqStatus == 4 || user?.reqStatus == 5))})?.map((e)=>{
          console.log("checke",e);
          return (<RequestSelector key={e._id}
            message={"Ongoing Request"}
            data={e}
            
            
            
            />)
      })}

    </div>
</>
  )
}

export default ongoing 