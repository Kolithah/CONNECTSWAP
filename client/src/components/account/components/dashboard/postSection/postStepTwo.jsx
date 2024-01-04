


const postStepTwo = ({ finalForm, SetFinalForm}) => {
    const handleChange = (e) =>  SetFinalForm({ ...finalForm, [e.target.name]: e.target.value });
    
console.log(finalForm);

  return (
    <div>
      <div className="font-poppins">
        <div className="md:text-lg text-base" >Extra details</div>
        <div className="md:text-sm text-xs">These details will we included as extra details, but you are not required
            to fill this, if you want you can skip this step and go to the the final step
        </div>
        <form>
          <div className="mb-2 mt-2">
            <label className="md:text-sm text-xs">Title:</label>
            <input type="text" onChange={handleChange} name="title" value={finalForm?.title} className="w-full px-3 py-2 border rounded-md h-8 placeholder:text-sm bg-neutral input-primary" placeholder="Enter title" />
          </div>
          <div className="mb-3" >
            <label className="md:text-sm text-xs">Description:</label>
            <div>
            <textarea onChange={handleChange} placeholder="Enter description" value={finalForm?.description} className="w-full px-3 py-2 border rounded-md placeholder:text-sm bg-neutral input-primary" name="description" rows={3} />
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default postStepTwo;
