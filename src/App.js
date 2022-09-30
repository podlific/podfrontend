import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import FilterPage from "./components/FilterPage/FilterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import CampaignWebPage from "./components/CampaignPage/CampaignWebPage";
import RequestWebPage from "./components/RequestPage/RequestWebPage";
import SellerDashboard from "./components/Dashboard/SellerDashboard";
import Chat from "./components/Chat/Chat";
import { useSelector } from "react-redux";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Switch,
  Navigate,
} from "react-router-dom";
import { initSocket } from "./socket";
import api from "./config/axios";
import Loader from "./components/Loader/Loader";
import SellerPodcastAddPage from "./components/SellerPodcastAddPage/SellerPodacstAddPage";
import SellerCalendar from "./components/shared/Seller/SellerCalendar";
import SellerFilterPage from "./components/FilterPage/SellerFilterPage";
import UserCampaignPage from "./components/UserCampaignPage/UserCampaignPage";
import AdminDashboard from "./components/AdminPages/AdminDashboard";
import UserInfo from "./components/shared/UserInfo/UserInfo";
import { Toaster } from "react-hot-toast";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import PasswordMail from "./components/PasswordReset/PasswordMail";
import "react-day-picker/dist/style.css";
import AdminDash from "./components/AdminPages/AdminDash";
function App() {
  //////////////////////////////////////////////////SOCKET.IO IMPLEMENTATION BELOW////////////////////////////////////////////////////////////
  const user = useSelector((state) => state.activate.unique_id);
  const usertype = useSelector((state) => state.activate.usertype);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [arrivedMessages, setArrivedMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [ListofPodcast, setListofPodcast] = useState([]);
  const [overAllPodcastList, setOverAllPodcastList] = useState([]);
  const [currPodcastInfo, setCurrentPodcastInfo] = useState([]);
  const [requestPodcast, setRequestPodcast] = useState([]);
  const [userPodcast, setUserPodcast] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [adminInfo, setAdminInfo] = useState(null);
  const { loading } = useLoadingWithRefresh({ setUserInfo });

  const socketRef = useRef(null);
  const data = {
    currUserId: user.unique_id,
  };
  useEffect(() => {
    async function getcontacts() {
      const cont = await api.post("/api/getconnected", data);
      if (cont) {
        if (cont !== contacts) {
          setContacts(cont.data);
        }
      }
    }

    if (
      user.unique_id !== "" &&
      user.unique_id !== undefined &&
      usertype.usertype !== "" &&
      usertype.usertype !== "admin"
    ) {
      getcontacts();
    }
  }, [user.unique_id]);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      if (user.unique_id !== undefined && user.unique_id !== "") {
        socketRef.current.emit("connected", {
          user,
        });
      }
      socketRef.current.on(
        "private message",
        ({
          content,
          from,
          date,
          time,
          seen,
          request,
          podcastid,
          selectedDate,
          selectedTime,
        }) => {
          let arr = {
            message: content,
            from: from,
            to: user.unique_id,
            date,
            time,
            seen: "false",
            request: request,
            podcastid: podcastid,
            SelectedDate: selectedDate,
            SelectedTime: selectedTime,
          };
          setReceivedMessages((oldArray) => [...oldArray, arr]);
        }
      );

      socketRef.current.on(
        "new request message",
        ({ content, from, date, time, seen, request }) => {
          let arr = {
            message: content,
            from: from,
            to: user.unique_id,
            date,
            time,
            seen: "false",
            request: request,
          };
          setReceivedMessages((oldArray) => [...oldArray, arr]);
          setContacts((oldArray) => [...oldArray, from]);
        }
      );
    };

    const ExtractAdminInfo = async () => {
      let data = {
        uid: "#adminmodel123",
      };
      let info = await api.post("/api/sendinfoforuser", data);
      if (info) {
        setAdminInfo(info.data);
      }
    };
    const Extractmessage = async () => {
      let data = {
        userId: user.unique_id,
      };
      let cont = await api.post("/api/extractmessages", data);
      if (cont) {
        setReceivedMessages(cont.data.messages);
        setRequestPodcast(cont.data.requests);
      }
    };
    if (
      user.unique_id !== "" &&
      user.unique_id !== undefined &&
      usertype.usertype !== "" &&
      usertype.usertype !== "admin"
    ) {
      ExtractAdminInfo();
      Extractmessage();
      init();
    }

    const getPodcastforSeller = async () => {
      let data = {
        userId: user.unique_id,
      };
      let cont = await api.post("/api/getpodcastforparticularuser", data);
      setUserPodcast(cont.data);
    };
    if (usertype.usertype === "seller") {
      getPodcastforSeller();
    }
    return () => {
      // socketRef.current.off("connected");
      // socketRef.current.off("private message");
      // socketRef.current.disconnect();
    };
  }, [user.unique_id]);

  //////////////////////////////////////////////////SOCKET.IO IMPLEMENTATION ABOVE////////////////////////////////////////////////////////////
  return loading ? (
    <Loader message="" />
  ) : (
    <div>
      <Toaster position="top-center" reverseOrder={false} duration={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route
            path="/login"
            element={<LoginPage setUserInfo={setUserInfo} />}
          />

          <Route
            path="/chat"
            element={
              <Chat
                socketRef={socketRef}
                receivedMessages={receivedMessages}
                setReceivedMessages={setReceivedMessages}
                arrivedMessages={arrivedMessages}
                setArrivedMessages={setArrivedMessages}
                contacts={contacts}
                setContacts={setContacts}
                requestPodcast={requestPodcast}
                setRequestPodcast={setRequestPodcast}
                userPodcast={userPodcast}
                setUserPodcast={setUserPodcast}
              />
            }
          />

          <Route
            path="/requestcampaign"
            element={
              <RequestWebPage
                socketRef={socketRef}
                receivedMessages={receivedMessages}
                setReceivedMessages={setReceivedMessages}
                contacts={contacts}
                setContacts={setContacts}
                currPodcastInfo={currPodcastInfo}
                setCurrentPodcastInfo={setCurrentPodcastInfo}
                requestPodcast={requestPodcast}
                setRequestPodcast={setRequestPodcast}
                userInfo={userInfo}
              />
            }
          />
          <Route path="/userinfo" element={<UserInfo userInfo={userInfo} />} />
          <Route
            path="/sellerdashboard"
            element={
              <SellerDashboard
                contacts={contacts}
                setContacts={setContacts}
                userPodcast={userPodcast}
                adminInfo={adminInfo}
                userInfo={userInfo}
              />
            }
          />
          <Route
            path="/sellerfilterpage"
            element={<SellerFilterPage userPodcast={userPodcast} />}
          />
          <Route
            path="/campaign/:id"
            element={
              <CampaignWebPage
                ListofPodcast={ListofPodcast}
                setListofPodcast={setListofPodcast}
                currPodcastInfo={currPodcastInfo}
                setCurrentPodcastInfo={setCurrentPodcastInfo}
              />
            }
          />
          <Route path="/resetpassword/:id" element={<PasswordReset />} />
          <Route
            path="/usercampaignpage"
            element={
              <UserCampaignPage
                requestPodcast={requestPodcast}
                setRequestPodcast={setRequestPodcast}
              />
            }
          />
          <Route
            path="/buyerdashboard"
            element={
              <Dashboard
                contacts={contacts}
                setContacts={setContacts}
                ListofPodcast={ListofPodcast}
                adminInfo={adminInfo}
                userInfo={userInfo}
                setListofPodcast={setListofPodcast}
                overAllPodcastList={overAllPodcastList}
                setOverAllPodcastList={setOverAllPodcastList}
              />
            }
          />
          <Route
            path="/podcast"
            element={
              <FilterPage
                ListofPodcast={ListofPodcast}
                setListofPodcast={setListofPodcast}
                currPodcastInfo={currPodcastInfo}
                setCurrentPodcastInfo={setCurrentPodcastInfo}
                setAdminInfo={setAdminInfo}
                adminInfo={adminInfo}
                overAllPodcastList={overAllPodcastList}
                setOverAllPodcastList={setOverAllPodcastList}
              />
            }
          />
          <Route
            path="/addnewpodcast"
            element={<SellerPodcastAddPage userInfo={userInfo} />}
          />
          <Route
            path="/calendar"
            element={
              <SellerCalendar
                requestPodcast={requestPodcast}
                setRequestPodcast={setRequestPodcast}
              />
            }
          />
          {/* <Route
            path="/admindashboard"
            element={
              <AdminDashboard
                requestPodcast={requestPodcast}
                setRequestPodcast={setRequestPodcast}
                userInfo={userInfo}
              />
            }
          /> */}
          <Route path="/admindashboard" element={<AdminDash />} />
          <Route path="/resetmail" element={<PasswordMail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
