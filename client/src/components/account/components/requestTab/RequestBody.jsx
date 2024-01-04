import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { proceedRequest, makeRequest } from "../../../../api";
import {
  initiateSocket,
  switchChannel,
  sendMessage,
  subscribeToMessages,
} from "./ChatFunctions";
import {
  universities,
  categories,
  districts,
  faculties,
} from "../../../../constants";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../../../api";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
const RequestBody = () => {
  const RequestSwal = withReactContent(Swal);
  const navigate = useNavigate();
  const params = useParams();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isButtonAbortLoading, setIsButtonAbortLoading] = useState(false);
  const [userNumber, setUserNumber] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const token = useSelector((state) => state.token);
  const authUser = useSelector((state) => state.user);

  const { isLoading, data, isSuccess, isError, error, refetch } = useQuery(
    ["requestForUser"],
    () => {
      return getRequest(token, params.id);
    }, {refetchInterval: 500},
  );

  const nickname = authUser;
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState(params.id);
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    console.log("user", authUser);
    console.log("new Message:", messages);
  }, [messages]);
  const prevChannelRef = useRef();
  useEffect(() => {
    prevChannelRef.current = channel;
  });
  const prevChannel = prevChannelRef.current;

  useEffect(() => {
    if (prevChannel && channel) {
      switchChannel(prevChannel, channel);
      setChannel(channel);
    } else if (channel) {
      initiateSocket(channel, nickname);
    }
  }, [channel]);

  useEffect(() => {
    setMessages([]);
    setMessagesLoading(true);

    if (data?.length != 0) {
      console.log(data);
      setMessages(data?.messages);
      console.log("available messages", messages);
      console.log(messages?.length);
      if (data?.users[0].user?._id == authUser) {
        setUserNumber(0);
        setRequestStatus(data?.users[0]?.reqStatus);
      } else if (data?.users[1]?.user._id == authUser) {
        setUserNumber(1);
        setRequestStatus(data?.users[1]?.reqStatus);
        console.log(data?.users[1]?.reqStatus);
      }
      console.log("user number", userNumber, "request status", requestStatus);
    }
  }, [isLoading, isSuccess, data]);

  useEffect(() => {
    subscribeToMessages((err, data1) => {
      setMessages((messages) => [...messages, data1]);
    });
  }, []);

  const handleMessageChange = (event) => {
    console.log("came to handle message change");
    setMessage(event.target.value);
  };
  const getNextGoodState = (state) => {
    if (state == 1 || state == 2) {
      return [3, 3];
    }
    if (state == 3) {
      return [4, 4];
    }
    if (state == 5) {
      return [6, 6];
    }
  };

  const getNextBadState = (state) => {
    if (state == 2 || state == 3) {
      return [7, 7];
    }
    if (state == 4) {
      return [9, 3];
    }
    if (state == 6) {
      return [7, 7];
    }
  };
  const createRequest = async (message) => {
    setIsButtonLoading(true);
    try {
      const goodState = getNextGoodState(requestStatus);
      console.log(goodState);
      const data = await proceedRequest(token, params.id, {
        newState: goodState[0],
      });
      console.log(data);
      setRequestStatus(goodState[1]);
    } catch (error) {
      console.log(error);
    }
    setIsButtonLoading(false);
  };

  const createAbortRequest = async (message) => {
    setIsButtonAbortLoading(true);

    if (requestStatus == 1) {
      try {
        const requestoutlog = await makeRequest(
          token,
          { message: "Aborted" },
          data.exchangeScheme._id
        );
        console.log(requestoutlog);
        navigate(-1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const badNextState = getNextBadState(requestStatus);

        const data = await proceedRequest(token, params.id, {
          newState: badNextState[0],
        });
        console.log(data);
        setRequestStatus(badNextState[1]);
      } catch (error) {
        console.log(error);
      }
    }
    setIsButtonAbortLoading(false);
  };

  const handleMessageSend = (e) => {
    console.log("came to handle message send");
    if (!message) return;
    console.log(message);

    e.preventDefault();
    const data = {
      id: uuidv4(),
      channel,
      user: userNumber,
      message: message,
      time: Date.now(),
    };
    setMessages((messages) => [
      ...messages,
      { user: userNumber, message: message, time: Date.now() },
    ]);
    sendMessage(data);
    setMessage("");
  };
  const handleRequestClick = () => {
    RequestSwal.fire({
      title: "Are you sure?",
      icon: "info",
      color: "hsl(var(--nc))",
      background: "hsl(var(--b1))",
      confirmButtonColor: "hsl(var(--pf))",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      scrollbarPadding: false,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        createRequest(result.value);
      }
    });
  };

  const handleAbortRequestClick = () => {
    RequestSwal.fire({
      title: "Are you sure ?",
      icon: "warning",
      color: "hsl(var(--nc))",
      background: "hsl(var(--b1))",
      confirmButtonColor: "hsl(var(--pf))",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      scrollbarPadding: false,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("sffsf sfsf ");
        createAbortRequest(result.value);
      }
    });
  };
  //ACtion form stuff

  const getCategory = (e) => {
    try {
      return categories[e - 1][1];
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const filtered = [data?.exchangeScheme];
    if (filtered.length != 0) {
      if (filtered[0]?.governUniversity) {
        setForm({
          prof: filtered[0]?.profession,
          category: "University Student",
          govern: "Government",
          workPlace:
            faculties[filtered[0]?.faculty] +
            "-" +
            universities[filtered[0].university - 1].value,
          targets: filtered[0]?.target
            .map((e) => {
              return districts[e - 1].value;
            })
            .join(),
          places: filtered[0]?.targetUniversities
            .map((e) => {
              return universities[e - 1].value;
            })
            .join(),
        });
      } else {
        setForm({
          prof: filtered[0]?.profession,
          category: getCategory(filtered[0]?.category),
          govern: filtered[0]?.stateOrPrivate == 1 ? "Government" : "Private",
          workPlace: filtered[0]?.workPlace,
          targets: filtered[0]?.target
            .map((e) => {
              return districts[e - 1].value;
            })
            .join(),
          places: filtered[0]?.targetPlaces.join(),
        });
      }
      setVisible(true);
    }
  }, [data]);
  const [form, setForm] = useState({
    prof: "",
    category: "",
    govern: "",
    workPlace: "",
    targets: "",
    places: "",
  });
  const [schemeVisible, setVisible] = useState(false);

  if (isLoading)
    return (
      <div className="flex flex-col w-full h-[300px] justify-center align-middle items-center">
        <BeatLoader color="hsl(var(--pf))" />
      </div>
    );

  if (isError) return <div>Error</div>;
  else if (isSuccess)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="prof-content "
      >
        <div className="flex w-full justify-items-start bg-primary-focus mb-2 rounded-lg">
          <div
            className="btn btn-primary btn-active"
            onClick={() => navigate(-1)}
          >
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              height="1.25em"
              viewBox="0 0 256 512"
            >
              <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
            </svg>
            Back
          </div>
        </div>
        <div className="grid grid-cols-6 h-full gap-3">
          <div className="relative md:col-span-3 md:order-2 order-last col-span-6 bg-base-100 p-2 rounded-lg">
            <div
              className={`absolute ${
                requestStatus == 3 || requestStatus == 4 || requestStatus==6 || requestStatus==5? "hidden" : ""
              } top-0 right-0 left-0 bottom-0 backdrop-opacity-10 backdrop-invert bg-white/10 z-50`}
            >
              <div className="w-full h-full flex items-center align-middle justify-center">
                <div className="text-primary-content font-poppins text-lg text-center ">
                  {requestStatus == 2
                    ? "*To reply to this message your have to accept the request"
                    : requestStatus == 1
                    ? "*Your request is pending to be accepted"
                    : "*Your request has been accepted"}
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              ref={messageContainerRef}
              layout
              className="bg-primary-focus rounded-lg h-[500px] flex flex-col w-full items-center justify-center grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-[hsl(var(--pf))]"
            >
              {messages?.map((message) => {
                if (message.user == userNumber) {
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={message?.message}
                      className="chat chat-end w-full"
                    >
                      <div className="chat-image avatar"></div>
                      <div className="chat-header">You</div>
                      <div className="chat-bubble">{message?.message}</div>
                      <div className="chat-footer opacity-50">
                        {dayjs(message?.time).fromNow()}
                      </div>
                    </motion.div>
                  );
                } else
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={message?._id}
                      className="chat chat-start w-full"
                    >
                      <div className="chat-image avatar"></div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="chat-header"
                      >
                        {data?.users[(userNumber + 1) % 2]?.user?.name}
                      </motion.div>
                      <div className="chat-bubble">{message?.message}</div>
                      <div className="chat-footer text-xs font-semibold opacity-50">
                        {dayjs(message?.time).fromNow()}
                      </div>
                    </motion.div>
                  );
              })}
            </motion.div>
            <div className="flex p-2 gap-3 bg-primary-focus mt-2 rounded-md w-full">
              <input
                type="text"
                placeholder="Message"
                onChange={handleMessageChange}
                className="input input-bordered w-full"
                value={message}
              ></input>
              <button
                onClick={handleMessageSend}
                className="btn btn-primary-focus"
              >
                Send
                <svg
                  className="ml-2 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.25em"
                  viewBox="0 0 512 512"
                >
                  <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="md:col-span-3 col-span-6 md:order-2 order-1 w-full min-h-[500px] h-full  bg-primary rounded-lg p-2">
            <div className="flex flex-col justify-between items-center h-full bg-primary-focus rounded-lg">
              <div className="p-3">
                <div className="text-primary-content font-poppins text-2xl mt-2">
                  Request Details{" "}
                </div>

                {schemeVisible ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className=" text-xs mt-3 font-poppins"
                  >
                    <div>
                      <span className="text-primary-content font-semibold">
                        Profession:&nbsp;
                      </span>
                      {form.prof}
                    </div>
                    <div>
                      <span className="text-primary-content font-semibold">
                        Category:&nbsp;
                      </span>
                      {form.category}
                    </div>
                    <div>
                      <span className="text-primary-content font-semibold">
                        Government/Private:&nbsp;
                      </span>
                      {form.govern}
                    </div>
                    <div>
                      <span className="text-primary-content font-semibold">
                        Working place/Institute:&nbsp;
                      </span>
                      {form.workPlace}
                    </div>
                    <div>
                      <span className="text-primary-content font-semibold">
                        Targeted districts:&nbsp;
                      </span>
                      {form.targets}
                    </div>
                    <div>
                      <span className="text-primary-content font-semibold">
                        Targeted places:&nbsp;
                      </span>
                      {form.places}
                    </div>
                  </motion.div>
                ) : (
                  <div></div>
                )}
                <div>
                  <div className="flex flex-col gap-0 text-lg mt-2">
                    <div>
                      <span className="text-primary-content font-semibold">
                        Post Owner:
                      </span>{" "}
                      {userNumber == 1
                        ? "You"
                        : data?.users[(userNumber + 1) % 2]?.user?.name}
                    </div>
                    <div>
                      <span className="text-primary-content font-semibold">
                        Requested by:
                      </span>{" "}
                      {userNumber == 0
                        ? "You"
                        : data?.users[(userNumber + 1) % 2]?.user?.name}
                    </div>
                    <div>
                      <span className="text-primary-content font-poppins font-bold text-lg">
                        Current Status:
                      </span>{" "}
                      {requestStatus == 2
                    ? "Pending to be Accepted"
                    : requestStatus == 1
                    ? "Pending to be Accepted"
                    : requestStatus == 3
                    ? "Ongoing Exchange"
                    : requestStatus == 4
                    ? "Pending confirmation request to be accepted"
                    : requestStatus == 5
                    ? "Pending confirmation request to be accepted"
                    : requestStatus == 6
                    ? "Congratulations on your Successful exchange"
                    : requestStatus == 7
                    ? "Request Aborted"
                    : requestStatus == 8
                    ? "Click the button below to accept the request"
                    : requestStatus == 9
                    ? "Click the button below to accept the request"
                    : requestStatus == 10
                    ? ""
                    : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-base-100 rounded-lg min-h-[40%] w-full p-2 flex flex-col justify-center align-middle items-center">
                <div className="text-3xl font-semibold">ACTIONS</div>
                <div className="text-sm font-poppins mt-4 ">
                  {requestStatus == 2
                    ? "Click the button below to accept the request"
                    : requestStatus == 1
                    ? "Wait until your request is accepted"
                    : requestStatus == 3
                    ? "Click the button below to send a Exchange confirmation request"
                    : requestStatus == 4
                    ? "Wait until your Exchange confirmation request is accepted"
                    : requestStatus == 5
                    ? "Do you accept the exchange confirmation?"
                    : requestStatus == 6
                    ? "Request Confirmed"
                    : requestStatus == 7
                    ? "Request Aborted"
                    : requestStatus == 8
                    ? "Click the button below to accept the request"
                    : requestStatus == 9
                    ? "Click the button below to accept the request"
                    : requestStatus == 10
                    ? ""
                    : ""}
                </div>
                <div
                  className={`btn btn-success btn-sm mt-1 btn-wide ${
                    isButtonLoading
                      ? "loading"
                      : requestStatus == 1 ||
                        requestStatus == 4 ||
                        requestStatus == 7 ||
                        requestStatus == 8 ||
                        requestStatus == 0 ||
                        requestStatus == 10 ||
                        requestStatus == 11 ||
                        requestStatus == 6
                      ? "btn-disabled"
                      : ""
                  }`}
                  onClick={handleRequestClick}
                >
                  {isButtonLoading ? "Loading..." : "Accept"}
                </div>
                <div className="text-sm font-poppins mt-4">
                  Click the button below to abort the request
                </div>
                <div
                  className={`btn btn-error btn-sm mt-1 btn-wide ${
                    isButtonAbortLoading
                      ? "loading"
                      : requestStatus == 7 ||
                        requestStatus == 8 ||
                        requestStatus == 0 ||
                        requestStatus == 10 ||
                        requestStatus == 11 ||
                        requestStatus == 6
                      ? "btn-disabled"
                      : ""
                  }`}
                  onClick={handleAbortRequestClick}
                >
                  {isButtonAbortLoading ? "Loading..." : "Abort"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
};

export default RequestBody;
