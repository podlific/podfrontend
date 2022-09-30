import React, { useEffect, useState } from "react";
import FooterWebPage from "../shared/WebPage/FooterWebPage";
import NavigationWebPage from "../shared/WebPage/NavigationWebPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import NavigationMobile from "../shared/Mobile/NavigationMobile";
import FooterMobile from "../shared/Mobile/FooterMobile";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
let todayDate = "";
const RequestWebPage = ({
  socketRef,
  setReceivedMessages,
  contacts,
  setContacts,
  currPodcastInfo,
  setCurrentPodcastInfo,
  requestPodcast,
  setRequestPodcast,
  userInfo,
}) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = yyyy + "-" + mm + "-" + dd;
  const user = useSelector((state) => state.activate.unique_id);
  const username = useSelector((state) => state.activate.username);
  const navigate = useNavigate();
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [targetGroup, setTargetGroup] = useState("");
  const [addTargetGroup, setAddTargetGroup] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
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
  // const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [selectedTime, setSelectedTime] = useState("");
  const [currentDate, setCurrentDate] = useState(formattedToday);
  const usertype = useSelector((state) => state.activate.usertype);

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
  };
  useEffect(() => {
    if (usertype.usertype === "seller") {
      navigate("/login");
    }
    if (usertype.usertype === "admin") {
      navigate("/admindashboard");
    }
    if (
      user.unique_id === "" ||
      user.unique_id === undefined ||
      currPodcastInfo === null ||
      currPodcastInfo.length === 0
    ) {
      setLoading(false);
      navigate("/login");
    }
    setLoading(false);
  }, []);
  const handleSendMessage = async (content, to, from) => {
    if (
      client === "" ||
      product === "" ||
      targetGroup === "" ||
      addTargetGroup === "" ||
      todayDate === "" ||
      selectedTime === "" ||
      description === ""
    ) {
      toast.error("Please fill all fields");
      return;
    }
    let check = 0;
    to = currPodcastInfo.sellerId; /// need to replace this with seller id only
    from = user.unique_id; /// user id
    let data = {
      podcastid: currPodcastInfo._id,
      podcastname: currPodcastInfo.podcastName,
      date: todayDate,
      time: selectedTime,
      sellername: currPodcastInfo.sellerUserName,
      sellerusername: currPodcastInfo.sellername,
      sellerid: currPodcastInfo.sellerId,
      buyerid: user.unique_id,
      buyername: username.username,
      buyerusername: userInfo.name,
      client: client,
      product: product,
      targetgroup: targetGroup,
      addtargetgroup: addTargetGroup,
      description: description,
      confirmed: "false",
    };
    setRequestPodcast((oldArray) => [...oldArray, data]);
    let requestapi;
    try {
      requestapi = await api.post("/api/updatepodcastrequest", data);
    } catch (err) {
      toast.error("Unable to update request ,try again");
      toast.error("Server Error , try again");
      return;
    }
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].userId === to) {
        check = 1;
        break;
      }
    }
    if (check === 1) {
      let date = Date.now();
      let arr = {
        message: content,
        from: from,
        to: currPodcastInfo.sellerId,
        seen: "true",
        date,
        time:
          "date" +
          new Date().toLocaleTimeString() +
          " " +
          "time" +
          new Date().toLocaleDateString(),
        request: "true",
      };
      let mes;
      try {
        mes = await api.post("/api/sendnewmessages", arr);
      } catch (err) {
        toast.error("Unable to update request in messages");
        return;
      }
      if (mes) {
      }
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
        request: "true",
      });
      navigate("/login");
      toast.success("Request updated");
    }

    if (check === 0) {
      let date = Date.now();
      let arr = {
        message: content,
        from: from,
        to: currPodcastInfo.sellerId,
        seen: "true",
        date,
        time:
          "date" +
          new Date().toLocaleTimeString() +
          " " +
          "time" +
          new Date().toLocaleDateString(),
        request: "true",
      };
      let mes;
      try {
        mes = await api.post("/api/sendnewmessages", arr);
      } catch (err) {
        toast.error("Unable to update request in messages");
        return;
      }

      setReceivedMessages((oldArray) => [...oldArray, arr]);
      let newContacts = {
        userId: currPodcastInfo.sellerId,
        userName: currPodcastInfo.sellerUserName,
        userType: "seller",
      };
      setContacts((oldArray) => [...oldArray, newContacts]);
      let c = {
        from: from,
        newuser: currPodcastInfo.sellerId,
      };
      to = currPodcastInfo.sellerId;
      let cont;
      try {
        cont = await api.post("/api/updatecontacts", c);
      } catch (err) {
        toast.error("Unable to update Request in chat , try again");
        return;
      }
      if (cont) {
      }
      socketRef.current.emit("new request message", {
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
        request: "true",
      });
      navigate("/login");
      toast.success("Request updated");
    }
  };

  return loading === true ? (
    <Loader />
  ) : (
    <div className="h-screen flex flex-col justify-between">
      <div className=" hidden md:flex flex-col  ">
        <NavigationWebPage />
      </div>
      <div className="block md:hidden">
        <NavigationMobile />
      </div>

      <div className="m-4 md:m-0 md:flex flex-row md:h-full  md:w-[100%] ">
        <div className=" md:w-[45%] flex flex-col items-center ">
          <div className=" flex flex-row  md:mt-5 h-1/3 md:w-2/3  rounded-3xl relative shadow-md shadow-zinc-900 ">
            {/* src={`data:image/png;base64,${currPodcastInfo.image}`} */}
            <img
              className=" w-[100%]  rounded-3xl  "
              src={`${currPodcastInfo.image}`}
              alt="logo-1"
            />
            <img
              className="w-[100%] absolute rounded-2xl  bottom-0"
              src="./Rectangle657.png"
              alt="img"
            />
          </div>
          <div className="w-full flex flex-row justify-evenly  md:flex-row md:w-2/3  ">
            <div className="p-3">
              <img className="" src="./Facebook.png" alt="log" />
            </div>
            <div className="p-3">
              <img className="" src="./Twitter.png" alt="log" />
            </div>
            <div className="p-3">
              <img className="" src="./Instagram.png" alt="log" />
            </div>
            <div className="p-3">
              <img className="" src="./Youtube.png" alt="log" />
            </div>
            <div className="p-3">
              <img className="" src="./Slack.png" alt="log" />
            </div>
          </div>
        </div>
        <div className="ml-2 md:ml-0 md:pl-10 md:w-[75%] flex flex-row ">
          <div className="flex flex-col md:w-[60%] md:justify-between lg:w-[65%] xl:w-[50%] lg:p-3  md:pl-2  ">
            <div className="w-full  flex flex-col md:flex-col ">
              <div className="w-full flex flex-row  text-[#5F50A3] font-bold">
                Client
              </div>
              <div className="flex flex-row  justify-start  ">
                <input
                  className=" w-full pl-3   border-solid border-[1.5px] border-[#afd3e8] rounded-lg p-1 "
                  type="text"
                  value={client}
                  placeholder="Client"
                  onChange={(e) => setClient(e.target.value)}
                />
                {/* <option value="suggestion">suggestion</option>
                  <option value="suggestion1">suggestion1</option>
                  <option value="suggestion2">suggestion2</option>
                </select> */}
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-col">
              <div className="flex flex-row text-[#5F50A3] font-bold ">
                Product
              </div>
              <div className="flex flex-row  justify-start ">
                <input
                  className=" w-full pl-3 border-solid border-[1.5px] border-[#afd3e8] rounded-lg p-1  "
                  type="text"
                  placeholder="Enter Product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                />
                {/* <option value="suggestion">suggestion</option>
                  <option value="suggestion1">suggestion1</option>
                  <option value="suggestion2">suggestion2</option>
                </select> */}
              </div>
            </div>
            <div className="w-full  flex flex-col md:flex-col">
              <div className="flex flex-row text-[#5F50A3] font-bold  ">
                Target Group
              </div>
              <div className="flex flex-row my-1  md:justify-end border-solid border-[1.5px] border-[#afd3e8] rounded-lg  bg-[#FBFBFB]">
                <input
                  className="w-full rounded-lg p-1 pl-3"
                  type="text"
                  placeholder="Type Target Group"
                  value={targetGroup}
                  onChange={(e) => setTargetGroup(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full  flex flex-col md:flex-col">
              <div className="flex flex-row text-[#5F50A3] font-bold ">
                Additional Info on Target Group
              </div>
              <div className="flex flex-row md:justify-end border-solid border-[1.5px] border-[#afd3e8] rounded-lg  bg-[#FBFBFB]">
                <input
                  className="w-full rounded-lg p-1 pl-3 "
                  type="text"
                  placeholder="Type Here"
                  value={addTargetGroup}
                  onChange={(e) => setAddTargetGroup(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-col">
              <div className="flex flex-row text-[#5F50A3] font-bold ">
                Timing
              </div>
              <div className="flex flex-row md:justify-between md:pl-0  pl-3">
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
            </div>
            <div className="w-full  flex flex-col md:flex-col">
              <div className="flex flex-row text-[#5F50A3] font-bold ">
                Description of Campaign
              </div>
              <textarea
                className="flex flex-row pl-3 pt-2 md:justify-end border-solid border-[1.5px] border-[#afd3e8] rounded-lg   bg-[#FBFBFB] h-20"
                placeholder="Write here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col mb-1 mt-1">
              <div className="flex flex-row justify-end h-8  ">
                <button
                  className="  bg-[#7800F073] rounded-3xl flex flex-col justify-center md:text-xs lg:text-base  pl-4 pr-4 "
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendMessage(
                      `Hey I would like to have a talk on your Podcast : ${currPodcastInfo.podcastName} I am working for our Client: ${client} for Product: ${product} our main focused Target Group are ${targetGroup} and here is the addition target Info ${addTargetGroup} my Preferred Date is ${todayDate}  at ${selectedTime} and here's the Description : ${description} `,
                      "",
                      currPodcastInfo.sellerId
                    );
                  }}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:flex-col md:visible  md:justify-end  ">
        <FooterWebPage />
      </div>
      <div className="md:hidden">
        <FooterMobile />
      </div>
    </div>
  );
};

export default RequestWebPage;
