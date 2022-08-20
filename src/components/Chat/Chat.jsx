import React, { useEffect, useRef, useState } from "react";
import FooterWebPage from "../shared/WebPage/FooterWebPage";
// import { initSocket } from "../../socket";
import { useSelector } from "react-redux";
import api from "../../config/axios";
import { Messages } from "./Messages";
import NavigationWebPage from "../shared/WebPage/NavigationWebPage";
import { useNavigate } from "react-router-dom";
import NavigationMobile from "../shared/Mobile/NavigationMobile";
import Loader from "../Loader/Loader";
import { CgProfile } from "react-icons/cg";
import FooterMobile from "../shared/Mobile/FooterMobile";
const ss = new Set();
const Chat = ({
  socketRef,
  receivedMessages,
  setReceivedMessages,
  arrivedMessages,
  setArrivedMessages,
  contacts,
  setContacts,
  requestPodcast,
  setRequestPodcast,
  userPodcast,
  setUserPodcast,
}) => {
  const user = useSelector((state) => state.activate.unique_id);
  const username = useSelector((state) => state.activate.username);
  const navigate = useNavigate();
  const [typedMessage, setTypedMessage] = useState("");
  const [toMessageUser, setToMessageUser] = useState("");
  const [toMessageUserName, setToMessageUserName] = useState("");
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////////////////TIME FUNCTION BELOW////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////TIME FUNCTION ABOVE///////////////////////////////////////////////////////////////////
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
    if (user.unique_id !== "" || user.unique_id !== undefined) {
      getcontacts();
    }
    if (receivedMessages.length === 0) {
      setLoading(false);
    }
    if (receivedMessages.length !== 0) {
      let cnt = 0;
      receivedMessages.forEach((element) => {
        cnt++;
        if (user.unique_id === element.from) {
          if (element.seen === "false") {
            ss.add(element.to);
          }
        }
        if (user.unique_id === element.to) {
          if (element.seen === "false") {
            ss.add(element.from);
          }
        }
      });
      if (cnt === receivedMessages.length) {
        setLoading(false);
      }
    }
  }, [receivedMessages]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSendMessage = async (
    content,
    to,
    from,
    request,
    podcastid,
    selectedDate,
    selectedTime
  ) => {
    ss.delete(to);
    let date = Date.now();
    let arr = {
      message: content,
      from: from,
      to: to,
      seen: "true",
      date,
      time:
        "date" +
        new Date().toLocaleTimeString() +
        " " +
        "time" +
        new Date().toLocaleDateString(),
      request: request,
      podcastid: podcastid,
      SelectedDate: selectedDate,
      SelectedTime: selectedTime,
    };
    const mes = await api.post("/api/sendnewmessages", arr);

    // setArrivedMessages((oldArray) => [...oldArray, arr]);
    setReceivedMessages((oldArray) => [...oldArray, arr]);
    socketRef.current.emit("private message", {
      content,
      to,
      from,
      date,
      time:
        "date" +
        new Date().toLocaleTimeString() +
        " " +
        "time" +
        new Date().toLocaleDateString(),
      seen: "false",
      request: request,
      podcastid: podcastid,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
    });
    setTypedMessage("");
  };

  const handleTypedMessage = (e) => {
    e.preventDefault();
    setTypedMessage(e.target.value);
  };
  const handleClick = (curruser) => {
    setToMessageUser(curruser.userId);
    setToMessageUserName(curruser.userName);
  };
  receivedMessages.sort(function (x, y) {
    return x.date - y.date;
  });
  useEffect(() => {
    if (user.unique_id === "" || user.unique_id === undefined) {
      navigate("/login");
    }
  }, []);
  /// dummy data

  return loading === true ? (
    <Loader />
  ) : (
    <div className="flex flex-col h-screen justify-between">
      <div className="hidden md:block">
        <NavigationWebPage
          socketRef={socketRef}
          receivedMessages={receivedMessages}
        />
      </div>
      <div className="block md:hidden">
        <NavigationMobile />
      </div>
      <div className="flex flex-row  h-[87%] mt-5 ">
        <div className="md:w-2/12 flex flex-col"></div>
        <div className="md:w-10/12 flex felx-row justify-center items-start mt-4 md:-mt-4 md:mb-5  ">
          <div className="w-11/12 h-[95%] flex flex-row">
            <div className="flex flex-col w-1/3">
              <div className="flex flex-row justify-center mb-5">
                <input
                  className=" rounded-xl p-2 w-[100%] shadow-md shadow-[#dabff6] "
                  type="text"
                  placeholder="Search"
                />
              </div>
              <div className="flex flex-col h-full overflow-y-scroll scrollbar-hide rounded-b-md shadow-md shadow-[#dabff6]">
                <div className="flex flex-row rounded-t-md  bg-white sticky top-0 w-full">
                  <span className="ml-[4%] font-semibold">People</span>
                </div>
                {contacts &&
                  contacts.map((curruser, index) => {
                    return (
                      <div
                        className={
                          ss.has(curruser.userId) === true
                            ? "flex flex-row p-1 mt-1 md:h-[] border-b-[0.5px] rounded-b-sm border-[#B4ABAB] bg-[#B198FF]"
                            : "flex flex-row p-1 mt-1 md:h-[] border-b-[0.5px] rounded-b-sm border-[#B4ABAB] "
                        }
                        key={index}
                        onClick={() => {
                          handleClick(curruser);
                        }}
                      >
                        <div className=" md:w-1/5  flex flex-col   overflow-clip justify-center items-center  ">
                          <div className="  w-12 h-12  md:rounded-full flex flex-col items-center justify-center bg-[#5F50A3] text-lg font-bold text-white">
                            {curruser.userName[0]}
                          </div>
                        </div>
                        <div className="w-3/4 flex flex-col justify-center ml-3">
                          <div className="flex flex-row justify-between">
                            <span className="font-semibold capitalize">
                              {curruser.userName}
                            </span>
                            <span className="hidden text-xs md:flex flex-col justify-center">
                              {curruser.userType}
                            </span>
                          </div>

                          {/* <div className="text-xs whitespace-nowrap overflow-hidden w-[75%]"></div> */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-col w-2/3 ">
              {toMessageUser === "" && (
                <div className=" h-full flex flex-col justify-center items-center font-bold text-center">
                  Select a user to view chats
                </div>
              )}
              {toMessageUser !== "" && (
                <Messages
                  handleTypedMessage={handleTypedMessage}
                  handleSendMessage={handleSendMessage}
                  setTypedMessage={setTypedMessage}
                  typedMessage={typedMessage}
                  toMessageUser={toMessageUser}
                  receivedMessages={receivedMessages}
                  user={user}
                  setReceivedMessages={setReceivedMessages}
                  arrivedMessages={arrivedMessages}
                  setArrivedMessages={setArrivedMessages}
                  username={username}
                  toMessageUserName={toMessageUserName}
                  requestPodcast={requestPodcast}
                  setRequestPodcast={setRequestPodcast}
                  userPodcast={userPodcast}
                  setUserPodcast={setUserPodcast}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <FooterWebPage />
      </div>
      <div className="md:hidden">
        <FooterMobile />
      </div>
    </div>
  );
};

export default Chat;
