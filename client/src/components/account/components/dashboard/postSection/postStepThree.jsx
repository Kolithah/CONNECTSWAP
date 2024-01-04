import CardPreview from "./CardPreview"

const postStepThree = ({ SchemeId,handlePost, loading}) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full h-full justify-center align-middle items-center">
         
       <CardPreview SchemeId={SchemeId}/>
       <div className="flex flex-col w-full h-full gap-3 justify-center align-middle items-center">
        <div className="text-xs md:text-base font-poppins"> Click to confirm posting the public post</div>
        <div className={`btn btn-primary btn-sm md:btn-md ${loading ? "loading" : ""}`} onClick={handlePost}>Confirm</div>
       </div>
        
    </div>
  )
}

export default postStepThree