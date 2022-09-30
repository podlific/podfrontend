import React, { useEffect, useState } from "react";
import FooterWebPage from "../WebPage/FooterWebPage";
import NavigationWebPage from "../WebPage/NavigationWebPage";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/daygrid/main.css";
import styled from "@emotion/styled";
import NavigationMobile from "../Mobile/NavigationMobile";
import { splitTime, addOneDayToDate, convertDate } from "./ConvertDate";
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button,
  .fc-button.fc-next-button,
  .fc-button.fc-button-primary {
    background: #b198ff;
    background-image: none;
    opacity: 1;
  }
  .fc-view-harness.fc-view-harness-active {
  }
  .fc-scrollgrid.fc-scrollgrid-liquid {
  }
  .fc.fc-toolbar {
    ${"" /* justify-content: flex-end */}
  }
  .fc-header-toolbar.fc-toolbar {
    white-space: nowrap;
  }
  .fc-header-toolbar.fc-toolbar > .fc-toolbar-chunk ~ .fc-toolbar-chunk {
  }

  @media screen and (max-width: 480px) {
    .fc-toolbar-chunk:first-of-type {
      width: 100px;
      font-size: 12px;
    }
  }
`;

const SellerCalendar = ({ requestPodcast, setRequestPodcast }) => {
  const [displayArray, setDisplayArray] = useState([]);
  const [markedEvents, setMarkedEvents] = useState([]);
  const [currDate, setCurrDate] = useState("TODAY'S BOOKING");
  console.log(requestPodcast, "reqpod");

  function changeDateFormat(inputDate) {
    var splitDate = inputDate.split("-");
    if (splitDate.count === 0) {
      return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2];

    return day + "-" + month + "-" + year;
  }
  const handleSelectedDates = (e) => {
    // console.log(e.dateStr);
    let d = e.dateStr;
    d = changeDateFormat(d);
    setCurrDate(d);
    let brr = [];
    for (let i = 0; i < requestPodcast.length; i++) {
      let day = requestPodcast[i].date;
      let buyer = requestPodcast[i].buyername;
      let time = requestPodcast[i].time;
      if (day === d && requestPodcast[i].confirmed === "true") {
        brr.push({ buyerName: buyer, time: time });
      }
    }
    setDisplayArray(brr);
  };
  const configureDate = (e) => {
    let d = e.split("/");
    // let day;
    // let mon;
    // let year;
    for (let i = 0; i < d.length; i++) {
      if (d[i].length % 2 !== 0) {
        d[i] = "0" + d[i];
      }
    }

    let temp = d[d.length - 1];
    d[d.length - 1] = d[0];
    d[0] = temp;

    return d.join("-");
  };
  const formateDate = (d) => {
    console.log(d, "formate");
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = "" + d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };
  const currentBooking = requestPodcast;
  useEffect(() => {
    requestPodcast.forEach((element) => {});
  }, [requestPodcast]);
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < requestPodcast.length; i++) {
      let startDay = splitTime(requestPodcast[i].date);
      let endDay = new Date(configureDate(requestPodcast[i].time));
      // console.log("dates",requestPodcast[i].time,"che")
      endDay.setDate(endDay.getDate() + 1);
      endDay = formateDate(endDay);
      // endDay='2022-09-25'
      // endDay = addOneDayToDate(endDay);
      // endDay = convertDate(endDay);
      // console.log("dates",startDay,endDay)
      if (requestPodcast[i].confirmed === "true") {
        arr.push({
          start: startDay,
          end: endDay,
          display: "background",
          color: startDay % 2 === 0 ? "#B198FF" : "#B198FF",
        });
      }
    }

    setMarkedEvents(arr);
  }, [requestPodcast]);
  useEffect(() => {
    const c = (document
      .getElementById("news")
      .getElementsByTagName("div")[0].style.width = "100%");
  }, []);
  const compdate = (lastdate) => {
    console.log(lastdate, "passvalue");
    var todaysdate = new Date();
    var compdate = new Date(configureDate(lastdate));
    console.log(todaysdate, "comparefunc", compdate);
    if (todaysdate > compdate) {
      return false;
    }
    return true;
  };
  const pastcompdate = (lastdate) => {
    console.log(lastdate, "passvalue");
    var todaysdate = new Date();
    var compdate = new Date(configureDate(lastdate));
    console.log(todaysdate, "comparefunc", compdate);
    if (todaysdate < compdate) {
      return false;
    }
    return true;
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between ">
      <div className="hidden md:block">
        <NavigationWebPage />
      </div>
      <div className="block md:hidden">
        <NavigationMobile />
      </div>
      <div className="grid grid-cols-4 ">
        <div className="col-span-3 mt-3 md:mt-0 px-3  h-full w-full flex-row flex md:flex-row justify-center md:px-10 overflow-scroll">
          {/* md:w-2/3 flex md:flex-start */}
          <div className=" md:w-[70%] flex-center " id="news">
            <StyleWrapper>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                themeSystem="bootstrap5"
                selectable={true}
                dateClick={function (info) {
                  handleSelectedDates(info);
                }}
                height={500}
                events={markedEvents}
                contentHeight={600}
                aspectRatio={1}
              />
            </StyleWrapper>
          </div>
          <div className=" w-full md:w-1/3  flex-col justify-start hidden">
            <div className=" mb-5  md:mb-0 w-full flex flex-row justify-center pt-16 h-full">
              <div className="w-full md:w-[65%] h-72   bg-[#F3F3F3] rounded-lg flex flex-col justify-start p-3">
                <div className="w-full flex flex-row justify-center ">
                  <span className="font-bold text-lg">{currDate}</span>
                </div>
                <div className="w-full  hover:overflow-auto overflow-clip mt-2 hidden ">
                  {Array.isArray(displayArray) &&
                    displayArray.map((prop, index) => {
                      return (
                        <div
                          className={
                            index % 2 === 0
                              ? "w-full px-3 mb-2 rounded-lg h-12 flex  flex-row items-center bg-[#B198FF] justify-between"
                              : " w-full px-3 mb-2 rounded-lg h-12 flex  flex-row items-center bg-[#B198FF] justify-between"
                          }
                          key={index}
                        >
                          <span>{prop.buyerName} </span>
                          <span>{prop.time}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid col-span-1 mr-3 mt-3 overflow-scroll">
          <div>
            <div className="w-full border-2 rounded-t-lg border-purple-600 text-center bg-purple-600 h-fit">
              <h>UpComming</h>
            </div>
            <div className=" grid grid-cols-2  text-center ">
              <div className="border-2 border-gray-500">UserName </div>
              <div className="border-r-2 border-t-2 border-b-2 border-gray-500">
                Date
              </div>
            </div>

            {requestPodcast.map((item, ind) => {
              console.log(item["time"], "before passing");
              if (item["confirmed"] === "true" && compdate(item["time"])) {
                return (
                  <div key={ind} className=" grid grid-cols-2 text-center ">
                    <div className="border-r-2 border-l-2 border-b-2 border-gray-500">
                      {item["buyerusername"]}
                    </div>
                    <div className="border-r-2  border-b-2 border-gray-500">
                      {item["date"]}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div>
            <div className="w-full border-2 rounded-t-lg border-purple-600 text-center bg-purple-600 h-fit">
              <h>Past Schedule</h>
            </div>
            <div className=" grid grid-cols-2  text-center ">
              <div className="border-2 border-gray-500">UserName </div>
              <div className="border-r-2 border-t-2 border-b-2 border-gray-500">
                Date
              </div>
            </div>

            {requestPodcast.map((item, ind) => {
              if (item["confirmed"] === "true" && pastcompdate(item["time"])) {
                return (
                  <div key={ind} className=" grid grid-cols-2 text-center ">
                    <div className="border-r-2 border-l-2 border-b-2 border-gray-500">
                      {item["buyerusername"]}
                    </div>
                    <div className="border-r-2  border-b-2 border-gray-500">
                      {item["date"]}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div>
        <FooterWebPage />
      </div>
    </div>
  );
};

export default SellerCalendar;
