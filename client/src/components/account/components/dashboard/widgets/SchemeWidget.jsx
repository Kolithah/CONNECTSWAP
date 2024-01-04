import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { districts, universities, faculties } from "../../../../../constants";
import { motion } from "framer-motion";
const SchemeWidget = (props) => {
  const schemeData = props.data;
  const MySwal = withReactContent(Swal);
  const SwalHtml = () => {
    return (
      <div className="font-poppins">
        <div className="flex gap-2">
          Category:<div>{props.field}</div>
        </div>
        <div className="flex gap-2">
          Profession:<div>{props.occupation}</div>
        </div>
        <div className="flex gap-2">
          Government or Private: <div>
            {schemeData.stateOrPrivate == 1 ? "Government" : "Private"}
          </div>

        </div>
        <div className="flex gap-2">
          Working Place/Institute:<div>{props.workingPlace}</div>
        </div>
        <div className="flex gap-2">
          Location:<div>{props.location}</div>
        </div>
        <div className="flex gap-2">
          Target districts:
          <div>
            {schemeData.target.map((e) => {
              return districts[e - 1].value + ", ";
            })}
          </div>
        </div>
      {(schemeData.governUniversity
)?(<>
<div className="flex gap-2">
          Faculty:<div>{faculties[schemeData.university - 1]}</div>
        </div>
  <div className="grid grid-cols-4">
          <div className="col-span-2 w-full text-left">Target Universities:</div>
         <div className="col-span-2 w-full text-left">

   
          {schemeData.targetUniversities.map((e) => {
              return universities[e - 1].value + ", ";
            })}      </div>
       
  </div>

</>):(<div>
  <div className="">
          Target Places:
      
            {schemeData.targetPlaces?.map((e) => {
              return " "+e + ", ";
            })}
          
        </div>

</div>)}
      </div>
    );
  };
  const infoClick = () => {
    MySwal.fire({
      title: "Exchange Scheme Info",
      html: SwalHtml(),
      scrollbarPadding: false,
      color: "hsl(var(--nc))",
      background: "hsl(var(--n))",
      confirmButtonColor: "hsl(var(--pf))",
      customClass: {
        container: "...",
        popup: "...",
        header: "...",
        title: "...",
        closeButton: "...",
        icon: "...",
        image: "...",
        htmlContainer: "...",
        input: "...",
        inputLabel: "...",
        validationMessage: "...",
        actions: "...",
        confirmButton: "...",
        denyButton: "...",
        cancelButton: "...",
        loader: "...",
        footer: "....",
        timerProgressBar: "....",
      },
    });
  };

  const deleteClick = () => {
    MySwal.fire({
      title: 'Do you want to save the changes?',
      scrollbarPadding: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}  className="w-full hover:bg-primary-focus md:h-20 h-20 px-3  p-1 bg-primary rounded-lg my-1">
      <div className="grid grid-cols-12 h-full gap-2">
        <div className="col-span-4 flex flex-col  text-primary-content   justify-center ">
          <div className="font-semibold md:ml-3 ml-1 md:text-base text-xs">
            {props.field}
          </div>
        </div>
        <div className="flex justify-between col-span-8">
          <div className="text-primary-content flex flex-col gap-0 font-poppins  cursor-default">
            <div className="md:text-sm text-xs md:mt-0 mt-2">{props.occupation}</div>
            <div className="md:text-sm text-xs flex  gap-1 ">
              at <div>{props.workingPlace}</div>{" "}
            </div>
            <div className="md:text-sm text-xs">{props.location}</div>
          </div>
          <div className="text-primary-content text-sm flex gap-2 md:flex-row flex-col justify-center items-center align-middle">
            <div
              className="btn md:btn-sm btn-xs md:w-24 w-20  "
              onClick={infoClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white mr-2"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
              </svg>
              Info
            </div>
            <div className="btn md:btn-sm btn-xs md:w-24 w-20" onClick={deleteClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                className="fill-white mr-2"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
              Delete
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SchemeWidget;
