import React from "react";
import { Link } from "react-router-dom";
import api from "../../../config/axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setUserName,
  setUniqueID,
  setUserType,
} from "../../../store/activateSlice";
import toast from "react-hot-toast";
const NavigationWebPage = ({ socketRef, receivedMessages }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.activate.unique_id);
  const usertype = useSelector((state) => state.activate.usertype);

  async function logoutUser() {
    try {
      const senddata = {
        message: receivedMessages,
        from: user.unique_id,
      };
      if (
        usertype.usertype !== "admin" &&
        usertype.usertype !== "" &&
        user.unique_id !== "" &&
        usertype.usertype !== undefined
      ) {
        try {
          await api.post("/api/oldmessageupdate", senddata);
        } catch (err) {
          toast.error("Messages not updated , try again");
          return;
        }
      }
      try {
        await api.post("/api/logout");
      } catch (err) {
        toast.error("Unable to logout , try again ");
        return;
      }
      toast.success("Successfully logged out");
      dispatch(setUserName({ username: "" }));
      dispatch(setUniqueID({ unique_id: "" }));
      dispatch(setUserType({ usertype: "" }));
      if (
        usertype.usertype !== "admin" &&
        usertype.usertype !== "" &&
        user.unique_id !== "" &&
        usertype.usertype !== undefined
      ) {
        socketRef.current.on("disconnecting");
      }
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex flex-row justify-between font-medium text-white mt-3 pl-10 ">
      <div className=" w-[20%]  pt-4 flex flex-row justify-start ">
        <div className="w-full flex flex-row justify-center pr-8 lg:pr-16 xl:pr-32">
          <Link
            to={
              usertype.usertype === "seller"
                ? "/sellerdashboard"
                : "/buyerdashboard"
            }
          >
            <img className="  " src="../logo.png" alt="logo" />
          </Link>
        </div>
      </div>
      <div className=" w-[80%] flex flex-col  justify-center text-white ">
        <div className="flex flex-row justify-around  rounded-l-3xl bg-[#5F50A3] py-1 ">
          <Link
            to={
              usertype.usertype === "seller"
                ? "/sellerdashboard"
                : "/buyerdashboard"
            }
          >
            <div className="flex flex-col justify-center md:p-4 md:pl-4 md:h-3">
              Home
            </div>
          </Link>
          <Link to="/usercampaignpage">
            <div className="flex flex-col justify-center md:p-4 md:pl-4 md:h-3">
              My Campaigns
            </div>
          </Link>
          {usertype.usertype === "seller" && (
            <Link to="/addnewpodcast">
              <div
                className={
                  usertype.usertype === "seller"
                    ? "flex flex-col justify-center text-sm md:p-4 md:pl-4 md:h-3"
                    : "hidden"
                }
              >
                Add Podcast
              </div>
            </Link>
          )}
          <Link to="/chat">
            <div className="flex flex-col justify-center md:p-4 md:pl-0 md:h-3">
              Messages
            </div>
          </Link>
          <Link to="/userinfo">
            <div className="flex flex-col justify-center md:p-4 md:pl-4 md:h-3">
              User Info
            </div>
          </Link>
          <Link to="/calendar">
            <div
              className={"flex flex-col justify-center md:p-4 md:pl-4 md:h-3"}
            >
              Calendar
            </div>
          </Link>
          <div
            className="flex flex-col justify-center md:p-4 md:pl-4 md:h-3 cursor-pointer"
            onClick={() => logoutUser()}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationWebPage;
// whitespace - nowrap;
