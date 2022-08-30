import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiUser, BiLogOut } from "react-icons/bi";
import { SiGooglepodcasts } from "react-icons/si";
import { Link } from "react-router-dom";
import api from "../../../config/axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router";
import {
  setUserName,
  setUniqueID,
  setUserType,
} from "../../../store/activateSlice";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { MdOutlineForwardToInbox, MdOutlineMoveToInbox } from "react-icons/md";
import toast from "react-hot-toast";
const NavigationMobile = ({ socketRef, receivedMessages }) => {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.activate.unique_id);

  async function logoutUser() {
    try {
      const senddata = {
        message: receivedMessages,
        from: user.unique_id,
      };
      try {
        await api.post("/api/oldmessageupdate", senddata);
      } catch (err) {
        toast.error("Messages not updated , try again");
        return;
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
      // navigate.go(0);
      navigate("/login", { replace: true });
      socketRef.current.on("disconnecting");
    } catch (err) {}
  }
  return (
    <div className="  flex flex-row justify-between p-3 shadow-md shadow-zinc-500/75 relative">
      <div className="flex flex-row w-3/6 items-center ">
        <div>
          {!show && (
            <GiHamburgerMenu
              onClick={() => {
                setShow(!show);
              }}
            />
          )}
          {show && (
            <CgClose
              onClick={() => {
                setShow(!show);
              }}
            />
          )}
        </div>
        <div className="ml-3">
          <BiUser />
        </div>
      </div>
      <div className="w-3/6 flex flex-row justify-end  items-center">
        <img className="h-10 w-24 " src="./logo.png" alt="logo" />
      </div>

      <div
        className={
          show === true
            ? "h-screen w-1/2 z-10 translate-x-px duration-500 ease-linear top-[68px] -left-1 bg-[#FFFFFF] absolute md:hidden transform-gpu"
            : "h-screen w-1/2 z-10 translate-x-px duration-500 ease-linear top-[68px] left-[-500px] bg-[#FFFFFF] absolute md:hidden transform-gpu"
        }
      >
        <div className="p-1 flex flex-col font-semibold ">
          <Link to="/buyerdashboard">
            <div className="pl-3 mb-4 flex flex-row items-center">
              <MdOutlineSpaceDashboard />
              <span className="pl-1">Dashboard</span>
            </div>
          </Link>
          <Link to="/podcast">
            <div className="pl-3 mb-4 flex flex-row items-center">
              <SiGooglepodcasts />
              <span className="pl-1">Browse Podcast</span>
            </div>
          </Link>
          <Link to="/usercampaignpage">
            <div className="pl-3 mb-4 flex flex-row items-center">
              <MdOutlineMoveToInbox />{" "}
              <span className="pl-1">My Campaigns</span>
            </div>
          </Link>
          <Link to="/chat">
            <div className="pl-3 mb-4 flex flex-row items-center">
              <MdOutlineForwardToInbox /> <span className="pl-1">Messages</span>
            </div>
          </Link>
          <Link to="/userinfo">
            <div className="pl-3 mb-4 flex flex-row items-center">
              <BiUser /> <span className="pl-1">User Info</span>
            </div>
          </Link>
          <Link to="/calendar">
            <div className="pl-3 mb-4 flex flex-row items-center">
              <BiUser /> <span className="pl-1">Calendar</span>
            </div>
          </Link>

          <div
            className="pl-3 mb-4 flex flex-row items-center"
            onClick={() => logoutUser()}
          >
            <BiLogOut /> <span className="pl-1">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMobile;
