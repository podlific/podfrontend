import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../config/axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "black",
  p: 4,
};
let todayDate = "";
let podname = "";
export const Messages = ({
  handleSendMessage,
  handleTypedMessage,
  typedMessage,
  setTypedMessage,
  toMessageUser,
  receivedMessages,
  user,
  arrivedMessages,
  setArrivedMessages,
  SetreceivedMessages,
  username,
  toMessageUserName,
  requestPodcast,
  setRequestPodcast,
  userPodcast,
  setUserPodcast,
  showUserName,
}) => {
  const handleDate = (date) => {
    console.log(date);
  };
  const mySet = new Set();
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = yyyy + "-" + mm + "-" + dd;
  const usertype = useSelector((state) => state.activate.usertype);
  const [unseen, setUnseen] = useState([]);
  const [show, setShow] = useState(false);
  const [ModalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [selectedPodcast, setSelectedPodcast] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentBooking, setCurrentBooking] = useState("");
  const [arrMessages, setArrMessages] = useState(receivedMessages);
  const [currentDate, setCurrentDate] = useState("");
  const [availableTime, setAvailableTime] = useState([
    "09:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "01:00 pm",
    "02:00 pm",
    "03:00 pm",
    "04:00 pm",
    "05:00 pm",
    "06:00 pm",
  ]);
  const [name, setname] = useState("");
  const updateRequest = async () => {
    let data = {
      podcastid: selectedPodcast,
      buyerid: toMessageUser,
      sellerid: user.unique_id,
      date: todayDate,
      time: selectedTime,
    };
    // toast
    userPodcast.forEach((element) => {
      if (element._id === selectedPodcast) {
        element.bookings.push({ date: todayDate, time: selectedTime });
      }
    });
    try {
      await api.post("/api/updaterequest", data);
      toast.success("Offer sent Successfully");
    } catch (err) {
      toast.error("Unable to send Offer , try again");
    }
  };
  const existingBooking = (curr) => {
    let arr = [];
    userPodcast.forEach((element) => {
      if (element._id === curr) {
        arr = element.bookings;
      }
    });
    setCurrentBooking(arr);
  };
  const checkCommon = (currDate) => {
    currentBooking.forEach((element) => {
      if (element.date === currDate) {
        mySet.add(element.time);
      }
    });
    let arr = [
      "09:00 am",
      "10:00 am",
      "11:00 am",
      "12:00 pm",
      "01:00 pm",
      "02:00 pm",
      "03:00 pm",
      "04:00 pm",
      "05:00 pm",
      "06:00 pm",
    ];
    let brr = [];
    arr.forEach((element) => {
      if (!mySet.has(element)) {
        brr.push(element);
      }
    });
    setAvailableTime(brr);
  };
  const changeDateFormat = (inputDate) => {
    // expects Y-m-d
    var splitDate = inputDate.split("-");
    if (splitDate.count === 0) {
      return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2];
    todayDate = day + "-" + month + "-" + year;
    console.log(todayDate);
    checkCommon(todayDate);
  };

  const handleChangeState = async () => {
    receivedMessages.forEach((chat) => {
      if (chat.from === toMessageUser) {
        chat.seen = "true";
        setShow(false);
      }
    });
    setShow(false);
  };
  const updateNewMessage = async () => {
    await api.post("/api/oldmessageupdate", {
      message: receivedMessages,
      from: user.unique_id,
    });
    setShow(false);
  };

  const checkUnseen = () => {
    let arr = [];
    receivedMessages.forEach((chat) => {
      if (chat.from === toMessageUser && chat.seen === "false") {
        arr = [...arr, chat];
        setShow(true);
      }
    });
    setUnseen([...arr]);
  };
  useEffect(() => {
    checkUnseen();
    setArrMessages(receivedMessages);
  }, [receivedMessages]);

  useEffect(() => {
    var element = document.getElementById("chatlogs");
    element.scrollTop = element.scrollHeight;
    checkUnseen();
  }, []);
  const timefunction = (time) => {
    let t = time.slice(4, 9);
    let a = time.slice(12, 15);
    if (t[t.length - 1] === ":") {
      t = t.slice(0, 4);
    }
    return t + " " + a;
  };
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

  const declineFunction = async (chat) => {
    handleChangeState();
    let data = {
      podcastid: chat.podcastid,
      date: chat.selectedDate,
      time: chat.SelectedTime,
    };
    let info = await api.post("/api/removetimefrompodcast", data);
    receivedMessages.forEach((element) => {
      if (
        element.podcastid === chat.podcastid &&
        element.SelectedDate === chat.SelectedDate &&
        element.SelectedTime === chat.SelectedTime
      ) {
        element.request = "declined";
      }
    });

    handleSendMessage(
      `The Offer for ${chat.podcastname} has been rejected.`,
      toMessageUser,
      user.unique_id,
      "false",
      "",
      "",
      ""
    );
    acceptFunction(chat);
    setArrMessages(receivedMessages);

    updateNewMessage();
    // window.location.reload();
  };
  const acceptFunction = async (chat) => {
    let data = {
      podcastid: chat.podcastid,
      sellerid: toMessageUser,
      buyerid: user.unique_id,
      date: chat.SelectedDate,
      time: chat.SelectedTime,
    };
    // toast

    let info = await api.post("/api/updaterequestbyuser", data);
  };
  useEffect(() => {
    setArrMessages(receivedMessages);
  }, [arrMessages]);

  const optionRemoveFunction = (chat) => {
    handleChangeState();
    receivedMessages.forEach((element) => {
      if (
        element.podcastid === chat.podcastid &&
        element.SelectedDate === chat.SelectedDate &&
        element.SelectedTime === chat.SelectedTime
      ) {
        element.request = "true";
      }
    });

    acceptFunction(chat);
    setArrMessages(receivedMessages);
    handleSendMessage(
      `The Offer for podcast has been accepted.`,
      toMessageUser,
      user.unique_id,
      "false",
      "",
      "",
      ""
    );
    updateNewMessage();
    // window.location.reload();
  };
  return (
    <div className="h-full flex flex-col justify-between ">
      <div className="h-[11%] flex flex-col">
        <div className=" h-full flex flex-row w-full justify-between">
          <div className="h-full w-full flex flex-row">
            <div className=" ml-3 flex flex-col   overflow-clip justify-center items-center rounded-full ">
              <div className=" w-12 h-12  rounded-full flex flex-col items-center justify-center bg-[#5F50A3] text-lg font-bold text-white capitalize">
                {showUserName[0]}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center pl-4 text-[#303030] font-semibold">
              {showUserName}
            </div>
          </div>
          <div
            className={
              usertype.usertype === "seller"
                ? "flex flex-col justify-center  "
                : "hidden"
            }
            onClick={handleClick}
          >
            <span className="font-semibold flex flex-row">Create Offer</span>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="w-[95%] border-t border-black"></div>
        </div>
      </div>
      <div className="h-[80%] overflow-y-scroll scrollbar-hide" id="chatlogs">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col justify-evenly h-full">
              <div>Create Offer to Buyer</div>
              <div className="flex flex-row justify-between">
                <select
                  name="opt1"
                  id="opt1"
                  onClick={(e) => {
                    setSelectedPodcast(e.target.value);
                    existingBooking(e.target.value);
                  }}
                >
                  {requestPodcast &&
                    requestPodcast.map((request, index) => {
                      return request.buyerid === toMessageUser ? (
                        <option
                          value={request.podcastid}
                          // podname={request.podcastname}
                          setname={request.podcastname}
                          key={index}
                        >
                          {request.podcastname}
                        </option>
                      ) : (
                        <></>
                      );
                    })}
                </select>
                <input
                  type="date"
                  value={currentDate}
                  onChange={(e) => {
                    setCurrentDate(e.target.value);
                    todayDate = e.target.value;
                    changeDateFormat(e.target.value);
                  }}
                />
                <select
                  name="opt2"
                  id="opt2"
                  onClick={(e) => {
                    setSelectedTime(e.target.value);
                  }}
                >
                  {availableTime &&
                    availableTime.map((request, index) => {
                      return (
                        <option value={request} key={index}>
                          {request}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="flex flex-row justify-end">
                <span
                  className=" p-1 rounded-2xl bg-[#5F50A3] text-white px-2"
                  onClick={() => {
                    updateRequest();
                    handleSendMessage(
                      `This is ths offer Date ${todayDate} at Time ${selectedTime} for your requested podcast `,
                      toMessageUser,
                      user.unique_id,
                      "offerfromseller",
                      selectedPodcast,
                      todayDate,
                      selectedTime
                    );
                    handleChangeState();
                    setModalState(false);
                    setOpen(false);
                  }}
                >
                  Submit
                </span>
              </div>
            </div>
          </Box>
        </Modal>
        {arrMessages &&
          arrMessages.map((chat, index) => {
            return chat.from === toMessageUser && chat.seen === "true" ? (
              <div
                className="w-full flex flex-col items-start mt-3 mb-2"
                key={index}
              >
                <div className="w-[60%]  flex flex-row justify-start font-normal text-white text-left rounded-xl ml-3 ">
                  <span
                    className={
                      chat.request === "offerfromseller" &&
                      usertype.usertype === "buyer"
                        ? "p-2 pl-4 pr-4 rounded-3xl text-left bg-[#B198FF]"
                        : chat.request === "declined"
                        ? "p-2 pl-4 pr-4 rounded-3xl text-left bg-[#ec6161] "
                        : chat.request === "true"
                        ? "p-2 pl-4 pr-4 rounded-3xl text-left bg-[#56ea66] "
                        : "p-2 pl-4 pr-4 rounded-3xl text-left bg-[#5F50A3]"
                    }
                  >
                    {chat.message}
                    {chat.request === "offerfromseller" &&
                      usertype.usertype === "buyer" && (
                        <div className="w-full mt-2">
                          <div className="w-full font-medium">
                            Please select Yes or No for the offer given
                          </div>
                          <div className="w-full flex flex-row mt-1 ">
                            <div
                              className="bg-[#22d042] p-1 rounded-xl px-2 cursor-pointer"
                              onClick={() => {
                                optionRemoveFunction(chat);
                              }}
                            >
                              YES
                            </div>
                            <div
                              className="bg-[#22d042] p-1 rounded-xl px-2 ml-3 cursor-pointer"
                              onClick={() => {
                                declineFunction(chat);
                              }}
                            >
                              NO
                            </div>
                          </div>
                        </div>
                      )}
                  </span>
                </div>
                <div className="w-[20%] flex flex-row justify-start ml-4  ">
                  {/* {chat.time.slice(4, 9)} */}
                  <span className="text-[12px] p-1 pr-2 ">
                    {timefunction(chat.time)}
                  </span>
                </div>
              </div>
            ) : chat.to === toMessageUser ? (
              <div className="w-full flex flex-col items-end mt-3 mb-2">
                <div className="w-[60%] m flex flex-row justify-end font-normal text-white text-left rounded-xl mr-3 ">
                  <span
                    className={
                      chat.request === "true" && usertype.usertype === "buyer"
                        ? "p-2 pl-4 pr-4 rounded-3xl text-left bg-[#B198FF]"
                        : chat.request === "true"
                        ? "p-2 pl-4 pr-4 rounded-3xl text-left bg-[#56ea66] "
                        : "p-2 pl-4 pr-4 rounded-3xl text-left bg-[#5F50A3] "
                    }
                  >
                    {chat.message}
                  </span>
                </div>
                <div className="w-[20%] flex flex-row justify-end mr-3  ">
                  {/* {chat.time.slice(4, 9)} */}
                  <span className="text-[12px] p-1 pr-2 ">
                    {timefunction(chat.time)}
                  </span>
                </div>
              </div>
            ) : (
              <div></div>
            );
          })}
        {unseen && (
          <div
            className={
              show === true
                ? " flex flex-row justify-center font-bold"
                : "hidden"
            }
          >
            <span className="p-1 px-4 rounded-2xl bg-slate-100">
              Unseen Message
            </span>
          </div>
        )}

        {unseen &&
          unseen.map((chat, index) => {
            return chat.from === toMessageUser && chat.seen === "false" ? (
              <div
                className="w-full flex flex-col items-start mt-3 mb-2"
                key={index}
              >
                <div className="w-[60%] flex flex-row justify-start font-normal text-white text-left rounded-xl ml-3 ">
                  <div
                    className={
                      chat.request === "offerfromseller" &&
                      usertype.usertype === "buyer"
                        ? "p-2 pl-4 pr-4 rounded-3xl text-left bg-[#ec6161]"
                        : chat.request === "true"
                        ? "p-2 pl-4 pr-4 rounded-3xl text-left bg-[#56ea66] "
                        : "p-2 pl-4 pr-4 rounded-3xl text-left bg-[#5F50A3] "
                    }
                  >
                    {chat.message}
                    {chat.request === "offerfromseller" &&
                      usertype.usertype === "buyer" && (
                        <div className="w-full mt-2">
                          <div className="w-full font-medium">
                            Please select Yes or No for the offer given
                          </div>
                          <div className="w-full flex flex-row mt-1 ">
                            <div
                              className="bg-[#22d042] p-1 rounded-xl px-2 cursor-pointer"
                              onClick={() => {
                                optionRemoveFunction(chat);
                              }}
                            >
                              YES
                            </div>
                            <div
                              className="bg-[#22d042] p-1 rounded-xl px-2 ml-3 cursor-pointer"
                              onClick={() => {
                                declineFunction(chat);
                              }}
                            >
                              NO
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                <div className="w-[20%] flex flex-row justify-start ml-4  ">
                  {/* {chat.time.slice(4, 9)} */}
                  <span className="text-[12px] p-1 pr-2 ">
                    {timefunction(chat.time)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden"></div>
            );
          })}
      </div>
      <div className="h-[10%] mt- 1 flex flex-row ">
        <div className="w-[85%] flex flex-row justify-center items-center">
          <input
            className="w-[95%] h-[90%] rounded-xl bg-[#F1F7FC] indent-5 outline-none"
            type="text"
            placeholder="Type here"
            value={typedMessage}
            onChange={(e) => handleTypedMessage(e)}
            id="input_box"
          />
        </div>
        <div className=" w-[15%] flex flex-row justify-center items-center relative">
          <div className="w-[80%] lg:w-[60%] h-[90%] rounded-xl bg-[#5F50A3] xl:-mr-4"></div>
          <img
            className="absolute p-1 xl:right-[22%] 2xl:right-[25%]"
            src="./icons/doubletick.png"
            alt="tick"
            onClick={() => {
              typedMessage &&
                handleSendMessage(
                  typedMessage,
                  toMessageUser,
                  user.unique_id,
                  "false",
                  "",
                  "",
                  ""
                );
              setTypedMessage("");
              handleChangeState();
              updateNewMessage();
            }}
          />
        </div>
      </div>
    </div>
  );
};
