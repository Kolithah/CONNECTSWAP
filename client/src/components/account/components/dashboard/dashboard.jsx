import { useQuery } from "@tanstack/react-query";
import { getUsersRequests } from "../../../../api";
import { useSelector } from "react-redux";
import ExchangeSchemes from "./exchangeSchemes";
import NotificationsGetter from "./notificationsGetter";
import { useOutletContext } from "react-router-dom";
import PostGetter from "./postSection/PostGetter";
import { motion } from "framer-motion";
const dashboard = () => {
  const token = useSelector((state) => state.token);
  const authUser = useSelector((state) => state.user);
  const [modalOpen, setModalOpen, modalpage, setModalPage] = useOutletContext();
  const { isLoading, data, isError, error, refetch, isSuccess } = useQuery(
    ["notifications"],
    () => {
      return getUsersRequests(token);
    }
  );
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prof-dashboard">
      <div>
        <div className="flex justify-between mx-2 my-5">
          <div className="text-4xl ml-1 ">Notifications</div>
          <div className="flex gap-2 mr-3 h-full justify-center items-center align-middle">
            <button onClick={refetch} className="btn btn-circle btn-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <NotificationsGetter
            isLoading={isLoading}
            data={data}
            isError={isError}
            error={error}
            refetch={refetch}
            isSuccess={isSuccess}
            authUser={authUser}
          />
        </div>
      </div>
      <div className="divider"></div>
      <div className="prof-dashboard-postBar">
        <div className="flex justify-between mx-3">
          <div className="text-4xl ">Posts</div>
          <div className="flex flex-col justify-center items-center align-middle">
            {" "}
            <button
              className="btn  btn-secondary"
              onClick={() => {
                setModalOpen(true);
                setModalPage(2);
              }}
            >
              Create
            </button>
          </div>
        </div>
        <div className="mt-3">
          <PostGetter />
        </div>
      </div>
      <div>
        <div className="divider"></div>
        <div className="flex justify-between mx-3">
          <div className="text-4xl ">Exchange Scheme</div>
          <div className="flex flex-col justify-center items-center align-middle">
            {" "}
            <button
              className="btn  btn-secondary"
              onClick={() => {
                setModalOpen(true);
                setModalPage(1);
              }}
            >
              Create
            </button>
          </div>
        </div>
        <ExchangeSchemes />
      </div>
    </motion.div>
  );
};

export default dashboard;
