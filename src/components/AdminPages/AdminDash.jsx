import React, { useEffect, useState } from "react";
import {
  setUserName,
  setUniqueID,
  setUserType,
} from "../../store/activateSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Accepted,
  Broadcastmessage,
  CSV,
  Overview,
  PodcastView,
  Request,
  TagView,
} from "./admin";
import {
  getInfo,
  UpdateList,
  logoutUser,
  BarGraphFunctions,
  addNewtag
} from "./adminFunction";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { RiFileUploadFill, RiCloseCircleFill } from "react-icons/ri";
import { AiFillPlusSquare } from "react-icons/ai";
import Loader from "../Loader/Loader";
import { BarGraph } from "./ChartFunction";
const AdminDash = ({ requestPodcast, userInfo }) => {
  const [request, setRequest] = useState([]);
  const [allusers, setAllusers] = useState([]);
  const [totalusers, setTotalusers] = useState(null);
  const [totalseller, setTotalseller] = useState(null);
  const [totalbuyer, setTotalbuyer] = useState(null);
  const [totalpendingrequests, setTotalpendingrequests] = useState(null);
  const [searchTag, setSearchTag] = useState("");
  const [allRequest, setAllRequest] = useState([]);
  const [sellerRequest, setSellerRequest] = useState([]);
  const [buyerRequest, setBuyerRequest] = useState([]);
  const [acceptedSeller, setAcceptedSeller] = useState([]);
  const [acceptedBuyer, setAcceptedBuyer] = useState([]);
  const [allAcceptedUsers, setAllAcceptedUsers] = useState([]);
  const [showtype, setShowType] = useState("");
  const [checked, setChecked] = useState(true);
  const [broadcastMessages, setBroadcastMessages] = useState([]);
  const [broadcastText, setBroadcastText] = useState("");
  const [showPodcast, setShowPodcast] = useState([]);
  const [ModalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [csvName, setCsvName] = useState();
  const [themes, setThemes] = useState([]);
  const [tags, setTags] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [themeVal, setThemeVal] = useState("");
  const [tagVal, setTagVal] = useState("");
  const [groupVal, setGroupVal] = useState("");
  const [userweekDaysLabel, setUserWeekDaysLabel] = useState([]);
  const [userweekDaysData, setUserWeekDaysData] = useState([]);
  const [podcastweekDaysData, setPodcastWeekDaysData] = useState([]);
  const [adminTags, setAdminTags] = useState([]);
  const [reqestedTags, setRequestedTags] = useState([]);
  let [show, setShow] = useState(null);
  const [arr, setArr] = useState([]);
  const [brr, setBrr] = useState([]);
  const [crr, setCrr] = useState([]);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.activate.unique_id);
  const usertype = useSelector((state) => state.activate.usertype);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (usertype.usertype === "admin") {
      setLoading(true);
      let info = getInfo(
        setRequest,
        setBroadcastMessages,
        setTags,
        setThemes,
        setGroups,
        setAllusers,
        setShowPodcast,
        setTagData,
        setLoading,
        setShowType,
        setAdminTags,
        setRequestedTags
      );
    } else {
      navigate("../login");
    }
  }, []);
  useEffect(() => {
    UpdateList(
      allusers,
      setTotalusers,
      setAcceptedBuyer,
      setAcceptedSeller,
      setTotalbuyer,
      setTotalseller,
      request,
      setBuyerRequest,
      setSellerRequest,
      setAllRequest,
      setTotalpendingrequests
    );
    BarGraphFunctions(
      allusers,
      setUserWeekDaysLabel,
      setUserWeekDaysData,
      showPodcast,
      setPodcastWeekDaysData
    );
  }, [request, allusers, showPodcast]);
  useEffect(() => setShowPodcast(requestPodcast), [requestPodcast]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setModalState(false);
    setOpen(false);
  };
  useEffect(() => {
    if (ModalState === true) {
      handleOpen();
    }
  }, [ModalState]);
  function handleClick() {
    setModalState(true);
  }
  useEffect(() => {
    setArr(tags);
    setBrr(themes);
    setCrr(groups);
  }, [themes, groups, tags]);

  return loading ? (
    <Loader message="" />
  ) : (
    <div className="h-screen flex flex-row ">
      <div className="flex flex-col w-1/6">
        <div className="">
          <div className="h-[10%]">
            <img className="bg-[#5F50A3]" src="./adminlogo.png" alt="logo" />
          </div>
        </div>
        <div className="flex flex-col h-[60%] bg-[#5F50A3] text-white pl-5 pt-5 ">
          <div className="">
            <div className="flex flex-row items-center gap-x-3 py-3">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="bg-[#5F50A3] h-[22px] w-[22px]"
                  src="./adminicons/overview.png"
                  alt="overciew"
                />
              </div>
              <button
                onClick={() => {
                  setShowType("overview");
                }}
              >
                Overview
              </button>
            </div>
            <div className="flex flex-row items-center gap-x-3 py-3">
              <div className=" flex flex-col justify-center items-center">
                <img
                  className="bg-[#5F50A3] h-[22px] w-[22px]"
                  src="./adminicons/request.png"
                  alt="overciew"
                />
              </div>
              <button
                className="cursor-pointer"
                onClick={() => {
                  setShowType("sellerRequest");
                }}
              >
                Request
              </button>
            </div>
            <div className="flex flex-row items-center gap-x-3 py-3">
              <div className=" flex flex-col justify-center items-center">
                <img
                  className="bg-[#5F50A3] h-[22px] w-[22px]"
                  src="./adminicons/users.png"
                  alt="overciew"
                />
              </div>
              <button
                className="cursor-pointer"
                onClick={() => {
                  setShowType("acceptedSeller");
                }}
              >
                Users
              </button>
            </div>
            <div className="flex flex-row items-center gap-x-3 py-3">
              <div className=" flex flex-col justify-center items-center">
                <img
                  className="bg-[#5F50A3] h-[22px] w-[22px]"
                  src="./adminicons/messages.png"
                  alt="overciew"
                />
              </div>
              <button
                className="text-start"
                onClick={() => {
                  setShowType("broadcastMessage");
                }}
              >
                Broadcast Messages
              </button>
            </div>
            <div className="flex flex-row items-center gap-x-3 py-3">
              <div className=" flex flex-col justify-center items-center">
                <img
                  className="bg-[#5F50A3] h-[22px] w-[22px] "
                  src="./adminicons/tags.png"
                  alt="overciew"
                />
              </div>
              <button
                onClick={() => {
                  handleClick();
                  setShowType("tags");
                }}
              >
                Tags
              </button>
            </div>
            <div className="flex flex-row items-center gap-x-3 py-3">
              <div className=" flex flex-col justify-center items-center">
                <img
                  className="bg-[#5F50A3] h-[22px] w-[22px]"
                  src="./adminicons/podcast.png"
                  alt="overciew"
                />
              </div>
              <button
                onClick={() => {
                  setShowType("podcasts");
                }}
              >
                Podcast
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full bg-[#5F50A3] text-white pl-5 justify-end pb-10 ">
          <div className="flex flex-row items-center gap-x-3">
            <div className="h-[22px] w-[22px] flex flex-col justify-center items-center">
              <img
                className="bg-[#5F50A3] "
                src="./adminicons/logout.png"
                alt="overciew"
              />
            </div>
            <button
              onClick={() => {
                logoutUser(dispatch, navigate);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-5/6">
        <div className="h-[11%] flex flex-col justify-end items-end pb-2 pr-7 border-b-black border-b-[1px] ">
          <div className="flex flex-row gap-x-2">
            <div className="h-[25px] w-[25px] flex flex-col items-center justify-center">
              <img src="./adminicons/username.png" alt="username" />
            </div>
            <div>
              <h5 className="font-medium">Username</h5>
            </div>
            <div className="h-[25px] w-[25px] flex flex-col items-center justify-center">
              <img src="./adminicons/downkey.png" alt="down" />
            </div>
          </div>
        </div>
        {(showtype === "sellerRequest" || showtype === "buyerRequest") && (
          <Request
            sellerRequest={sellerRequest}
            setSellerRequest={setSellerRequest}
            buyerRequest={buyerRequest}
            user={user}
            request={request}
            setRequest={setRequest}
            setAllusers={setAllusers}
            setShowType={setShowType}
            showtype={showtype}
            show={show}
            setShow={setShow}
            setModalState={setModalState}
            handleClick={handleClick}
          />
        )}
        {(showtype === "acceptedSeller" || showtype === "acceptedBuyer") && (
          <Accepted
            setShowType={setShowType}
            showtype={showtype}
            acceptedSeller={acceptedSeller}
            acceptedBuyer={acceptedBuyer}
          />
        )}
        {showtype === "broadcastMessage" && (
          <Broadcastmessage
            setShowType={setShowType}
            showtype={showtype}
            broadcastMessages={broadcastMessages}
            setBroadcastMessages={setBroadcastMessages}
            broadcastText={broadcastText}
            setBroadcastText={setBroadcastText}
          />
        )}
        {showtype === "uploadcsv" && (
          <CSV
            open={open}
            Modal={Modal}
            Box={Box}
            RiFileUploadFill={RiFileUploadFill}
            csvName={csvName}
            csvData={csvData}
            handleClose={handleClose}
            setCsvName={setCsvName}
            setCsvData={setCsvData}
            setAllusers={setAllusers}
            setModalState={setModalState}
            setOpen={setOpen}
            setShowType={setShowType}
          />
        )}
        {showtype === "overview" && (
          <Overview
            totalusers={totalusers}
            totalbuyer={totalbuyer}
            totalseller={totalseller}
            allRequest={totalpendingrequests}
            sellerRequest={sellerRequest}
            buyerRequest={buyerRequest}
            userweekDaysData={userweekDaysData}
            userweekDaysLabel={userweekDaysLabel}
            podcastweekDaysData={podcastweekDaysData}
            showPodcast={showPodcast}
          />
        )}
        {showtype === "podcasts" && <PodcastView showPodcast={showPodcast} />}
        {showtype === "tags" && (
          <TagView adminTags={adminTags} reqestedTags={reqestedTags} />
        )}
      </div>
    </div>
  );
};

export default AdminDash;
