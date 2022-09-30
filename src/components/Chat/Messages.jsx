import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../config/axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import { DayPicker } from "react-day-picker";
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "black",
  p: 4,
};
const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;
let todayDate = "";
const pastMonth = new Date(2020, 10, 15);
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
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const usertype = useSelector((state) => state.activate.usertype);
  const [unseen, setUnseen] = useState([]);
  const [show, setShow] = useState(false);
  const [ModalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState("");
  const [currentBooking, setCurrentBooking] = useState("");
  const [arrMessages, setArrMessages] = useState(receivedMessages);
  const [disabledDays, setDisabledDays] = useState([]);

  let newDate = "",
    newTime = "";
  const updateRequest = async () => {
    if (newDate === "" || newTime === "") {
      toast.error("Select the starting and ending date");
      return;
    }
    let data = {
      podcastid: selectedPodcast,
      buyerid: toMessageUser,
      sellerid: user.unique_id,
      date: newDate,
      time: newTime,
    };
    // toast
    userPodcast.forEach((element) => {
      if (element._id === selectedPodcast) {
        element.bookings.push({ date: newDate, time: newTime });
      }
    });
    try {
      await api.post("/api/updaterequest", data).then(() => {
        toast.success("Offer sent Successfully");
      });
    } catch (err) {
      toast.error("Unable to send Offer , try again");
    }
  };
  useEffect(() => {
    setDisabledDays(currentBooking);
  }, [currentBooking]);
  const existingBooking = (curr) => {
    let arr = [];
    userPodcast.forEach((element) => {
      if (element._id === curr) {
        element.bookings.forEach((ele) => {
          let datefrom = ele.date.split("/");
          let dateto = ele.time.split("/");
          arr.push({
            from: new Date(datefrom[2], datefrom[1] - 1, datefrom[0]),
            to: new Date(dateto[2], dateto[1] - 1, dateto[0]),
          });
        });
      }
    });

    setCurrentBooking(arr);
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
      userid: user.unique_id,
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
  const [days, setDays] = useState([]);
  useEffect(() => {
    if (days.length === 1) {
      newDate = days[0].toLocaleDateString().split("/");
      newDate = newDate[1] + "/" + newDate[0] + "/" + newDate[2];
    } else if (days.length > 1) {
      newDate = days[0].toLocaleDateString().split("/");
      newDate = newDate[1] + "/" + newDate[0] + "/" + newDate[2];
      newTime = days[1].toLocaleDateString().split("/");
      newTime = newTime[1] + "/" + newTime[0] + "/" + newTime[2];
    }
  }, [days]);
  // console.log(days);

  const footer =
    days && days.length > 0 ? (
      <p>You selected {days.length} day(s).</p>
    ) : (
      <p>Please pick two dates </p>
    );

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
          <Box sx={style1}>
            <div className="flex flex-col justify-evenly h-full">
              <div>Create Offer to Buyer</div>
              <div className="flex flex-col md:flex-row justify-between">
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
                      return request.buyerid === toMessageUser &&
                        request.confirmed !== "true" ? (
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

                <DayPicker
                  mode="multiple"
                  max={2}
                  selected={days}
                  onSelect={setDays}
                  footer={footer}
                  disabled={disabledDays}
                />
              </div>
              <div className="flex flex-row justify-end">
                <button
                  className=" p-1 rounded-2xl bg-[#5F50A3] text-white px-2"
                  onClick={() => {
                    updateRequest();
                    handleSendMessage(
                      `This is ths offer from ${newDate} to ${newTime} for your requested podcast `,
                      toMessageUser,
                      user.unique_id,
                      "offerfromseller",
                      selectedPodcast,
                      newDate,
                      newTime
                    );
                    handleChangeState();
                    setModalState(false);
                    setOpen(false);
                  }}
                >
                  Submit
                </button>
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
