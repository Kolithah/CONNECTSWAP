import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { makeRequest } from "../../../api";
import toast, { Toaster } from 'react-hot-toast';
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  districts,
  universities,
  categories,
  faculties,
} from "../../../constants";
import { ImageLoader } from "./ImageLoader";
dayjs.extend(relativeTime);
const initalData = "";
const card = (props) => {
  const [someForm, setSomeForm] = useState(initalData);
  const [submitForm, setSubmitForm] = useState(initalData);
  const CardSwal = withReactContent(Swal)
  const authToken = useSelector((state) => state.token);
  const authUser = useSelector((state) => state.user);
  const isAuth = Boolean(authToken);
  const data = props.cardData;



  const notify = () => toast((t) => (
    <div >
     {buttonState == 2? "Request has been cancelled.": "Request has been sent." } 
      <button className="ml-3 font-semibold" onClick={() => toast.dismiss(t.id)}>
        X
      </button>
    </div>
  ))
  const [isRequestLoading, setLoading] = useState(false);
  const [isRequestSuccess, setLoadingSuccess] = useState(false);
  const [buttonState, setButtonState] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    document.body.style.overflowY = "auto";
    setShow(false);
  };
  const handleShow = () => {
    document.body.style.overflowY = "hidden";
    setShow(true);
  };
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => {
    document.body.style.overflowY = "auto";
    setShow1(false);
  };
  const handleShow1 = () => {
    console.log("used");
    document.body.style.overflowY = "hidden";
    setShow1(true);
  };

  useEffect(() => {
    console.log(submitForm);
  }, [submitForm]);

  const createRequest = async (e) => {
    setLoading(true);
     console.log(e);
    try {
      const requestoutlog = await makeRequest(
        authToken,
        { message: e },
        props.cardData._id
      );
      setLoading(false);
      console.log(requestoutlog);
      if (requestoutlog.status == 200) {
        setLoadingSuccess(true);
        setShow1(false);
        if (buttonState == 1) {
          setButtonState(2);
        } else if (buttonState == 2) {
          setButtonState(1);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoadingSuccess(false);
    notify();
  
    props.cardRefetch();
  };
  useEffect(() => {
    console.log(authUser);
    const requestArr = data.requests.find((e) => e.user == authUser);
    console.log(data.requests[0]);
    console.log("owner", data.owner, "authUser", authUser);
    
    if (data.owner._id == authUser) {
      setButtonState(4);
    }
    else if (!requestArr) {
      setButtonState(1);
    } else {
      if (requestArr.state) {
        setButtonState(3);
      } else {
        setButtonState(2);
      }
    }
  }, []);
  
  const handleChange = (e) => { console.log(e.target.value); setSomeForm(e.target.value); console.log(someForm); setSubmitForm(e.target.value ); setSubmitForm("sfsfs"); console.log(submitForm); };
  const SwalHtml = () => {
    return (
      <div>
<textarea onChange={handleChange} name="message" placeholder="Enter the Message to send a request"  className="w-full px-3 py-2 border rounded-md placeholder:text-sm bg-neutral input-primary" rows={3} />
      </div>
    )
  }
const handleOngoingClick=()=>{
  CardSwal.fire({
  icon: 'question',
  title: 'Ongoing Request',
  text: 'Your request is already accepted by the post owner, check the your profile to see the request details',
  color: "hsl(var(--nc))",
  background: "hsl(var(--b1))",
  scrollbarPadding: false,
  })
}
  const handleRequestClick = () => {
    
    CardSwal.fire({
      title: "Enter your Message",
      input: "textarea",
      color: "hsl(var(--nc))",
      background: "hsl(var(--b1))",
      confirmButtonColor: "hsl(var(--pf))",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Send",
      scrollbarPadding: false,

    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        createRequest(result.value);
      }
    })
  }
  return (
    <motion.div
    layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      
      
    >
           <Toaster 
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                className: 'bg-info text-info-content',
                style: {
                    border: '1px solid #713200',
                    padding: '10px',
                },
              }}
           />
      <div className="card overflow-hidden  border-2 border-transparent transition-[border] ease-in-out hover:border-slate-200 w-[320px] ml-3 mt-3 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="absolute top-[10%] right-0 left-[40%] bottom-[50%] image_gradient"></div>
          <div className="absolute  ">
            <img
              src={ImageLoader(data.category)}
              className="w-[120px] h-[200px] ml-[130px] "
            />
          </div>
          <div className="card-title truncate ">
            <div className="flex flex-col">
              <div className="mb-1 leading-none ">
                <div className=" ">
                  {data.governUniversity
                    ? universities[data.university - 1].value
                    : data.workPlace}{" "}
                </div>
                <div className="truncate">
                  {districts[data.district - 1].value}
                </div>
              </div>

              <div className="text-slate-400 text-xs leading-none mt-1">
                <div>Posted By</div>
                <div className="capitalize">{data.owner.name}</div>
              </div>
            </div>
          </div>
          <div className="flex  flex-col gap-1">
            <div className="badge badge-secondary mt-5">
              {data.stateOrPrivate == 1 ? "Government" : "Private"}
            </div>
            <div className="badge badge-primary badge-lg pl-2">
              {data.profession}
            </div>
            <div
              className={`badge badge-accent ${
                data.governUniversity ? "" : "opacity-0"
              }`}
            >
              {data.governUniversity ? faculties[data.faculty - 1] : "none"}
            </div>
          </div>
          <div className="leading-none">
            <div className="text-sm">preferred districts:</div>
            <div className="text-slate-400 truncate">
              {data.target.map((e) => {
                return districts[e - 1].value + ", ";
              })}
            </div>
          </div>
          <div className="flex flex-row-reverse text-xl  font-semibold font-poppins mt-2">
            <div className="truncate ">{categories[data.category - 1][1]}</div>
          </div>

          <div className="flex w-full justify-around text-center mt-auto">
            <button
              className="btn btn-primary normal-case text-base tracking-wide rounded-2xl w-24 "
              onClick={() => props.modalClick(data)}
            >
              Details
            </button>
            <button
              className={`btn  normal-case text-base tracking-wide rounded-2xl w-24  ${
                isRequestLoading
                  ? "loading btn-primary"
                  : buttonState == 1
                  ? "btn-primary"
                  : buttonState == 2
                  ? "btn-secondary"
                  : buttonState == 4
                  ? "btn-primary btn-disabled"
                  :"btn-success"
              }`}
              onClick={()=>{ if (buttonState ==1) {handleRequestClick()} else if(buttonState==3){handleOngoingClick()} else { createRequest()} }}
            >
              {isRequestLoading
                ? ""
                : buttonState == 1
                ? "Request"
                : buttonState == 2
                ? "Requested"
                : buttonState == 4
                ? "Request"
                :"Ongoing"}
            </button>
          </div>

          <div className="flex flex-row-reverse text-sm mt-2 font-semibold">
            <div>{"- "+dayjs(data.createdAt).fromNow()}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default card;
