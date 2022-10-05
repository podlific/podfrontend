import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BsCart4, BsClock } from "react-icons/bs";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import Progressbar from "./Progressbar";
import PopularTags from "./PopularTags";
import { Modal, Button } from "react-bootstrap";
import {
  requestAcceptFunction,
  requestDeclineFunction,
  postBroadcastMessage,
  changeHandler,
  uploadCSVdata,
  addNewtag,
  TagSearchFunction,
  UserSearchFunction,
} from "./adminFunction";
import {
  BarGraph,
  Chart,
  ChartArea,
  HorizontalLine,
  PieChart,
} from "./ChartFunction";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { el } from "date-fns/locale";
import UserTag from "./UserTag";
import { element } from "prop-types";
const theme = createTheme({
  palette: {
    primary: {
      main: "#5F50A3",
    },
    secondary: {
      main: "#B198FF",
    },
  },
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #3e77f1",
  boxShadow: 24,
  color: "black",
  p: 4,
};

export const Request = ({
  sellerRequest,
  setSellerRequest,
  buyerRequest,
  setBuyerRequest,
  setAllRequest,
  request,
  setRequest,
  setAllusers,
  setShowType,
  showtype,
  show,
  setShow,
  setModalState,
  handleClick,
  setTotalpendingrequests,
}) => {
  // let arr = showtype === "sellerRequest" ? sellerRequest : buyerRequest;
  const [arr, setArr] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  useEffect(() => {
    if (showtype === "sellerRequest") {
      setArr(sellerRequest);
    } else {
      setArr(buyerRequest);
    }
  }, [showtype]);
  useEffect(() => {
    if (showtype === "sellerRequest" && searchUser === "") {
      setArr(sellerRequest);
    } else if (showtype === "buyerRequest" && searchUser === "") {
      setArr(buyerRequest);
    } else if (showtype === "sellerRequest" && searchUser !== "") {
      UserSearchFunction(sellerRequest, setArr, searchUser);
    } else if (showtype === "buyerRequest" && searchUser !== "") {
      UserSearchFunction(buyerRequest, setArr, searchUser);
    }
  }, [searchUser, showtype, sellerRequest, buyerRequest]);

  useEffect(() => {
    let len = request.length;
    let seller = [];
    let buyer = [];
    let all = [];
    request.forEach((Element) => {
      if (Element.usertype === "seller") {
        seller.push(Element);
      } else {
        buyer.push(Element);
      }
      all.push(Element);
    });
    setBuyerRequest(buyer);
    setSellerRequest(seller);
    setAllRequest(all);
    setTotalpendingrequests(len);
  }, [request]);

  return (
    <div className="h-full flex flex-col ">
      <div className="flex flex-row py-2 justify-between">
        <div className="pl-3">
          <button
            className="p-1 px-6 bg-[#5F50A3] text-white text-sm rounded-md"
            onClick={() => {
              handleClick();
              setShowType("uploadcsv");
            }}
          >
            CSV
          </button>
        </div>
        <div className="flex flex-row gap-x-4 p-1 px-3 rounded-lg bg-[#F2F4F5] ">
          <div className=" flex flex-col items-center justify-center">
            <img
              className="h-[18px] w-[18px]"
              src="./adminicons/search.png"
              alt="serach"
            />
          </div>

          <div className="text-[#9C9C9C] w-28">
            <input
              className="bg-[#F2F4F5] w-full  "
              placeholder="Search here"
              value={searchUser}
              onChange={(e) => {
                setSearchUser(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-row justify-end">
          <div className="flex flex-row justify-center items-center pr-7 -mt-2">
            <div className="font-medium">Buyer</div>
            <ThemeProvider theme={theme}>
              <Switch
                checked={showtype === "sellerRequest" ? true : false}
                onChange={() => {
                  showtype === "sellerRequest"
                    ? setShowType("buyerRequest")
                    : setShowType("sellerRequest");
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            </ThemeProvider>
            <div className="font-medium">Seller</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 ">
        <div className=" flex flex-row justify-center ">Name</div>
        <div className=" flex flex-row justify-center ">Email</div>
        {/* <div className=" flex flex-row justify-center ">Usertype</div> */}
        <div className=" flex flex-row justify-center ">Phone No.</div>
        <div className=" flex flex-row justify-center overflow-x-hidden">
          Company Name
        </div>
        <div className=" flex flex-row justify-center ">Description</div>
        <div className=" flex flex-row justify-center ">Response</div>
      </div>
      {arr && (
        <div className="flex flex-col w-full h-full gap-2  ">
          {arr.map((ele, index) => {
            return (
              <div
                className={
                  index % 2 === 0
                    ? "flex flex-col bg-[#f2f4f5] "
                    : "flex flex-col  "
                }
                key={index}
              >
                <div className="grid grid-cols-6  py-2">
                  <div className="flex flex-row justify-center ">
                    <span>{ele?.name}</span>
                  </div>
                  <div className="flex flex-row justify-start ">
                    <p className=" overflow-x-scroll scrollbar-hide w-full cursor-pointer">
                      {ele?.email}
                    </p>
                  </div>
                  {/* <div className="flex flex-row justify-center">
                    {ele?.usertype}
                  </div> */}
                  <div className="flex flex-row justify-center">
                    {/* {ele?.podcast.length} */}
                    {ele?.phoneno}
                  </div>
                  <div className="flex flex-row justify-center">
                    {ele?.companyname}
                  </div>
                  <div className=" flex flex-col justify-center items-center cursor-pointer relative">
                    <img
                      className="w-[22px] h-[28px]"
                      src="./adminicons/description.png"
                      alt="des"
                      onClick={() => {
                        if (show === index) {
                          setShow(null);
                        } else if (show !== null) {
                          setShow(index);
                        } else {
                          setShow(index);
                        }
                      }}
                    />
                    {/* border-[2px] border-black */}
                    <div
                      className={
                        show === index
                          ? "absolute border-[2px] border-[#5F50A3] h-28 w-[350px] p-1 rounded-md scrollbar-hide   bg-white bottom-10 right-[30%] z-10 overflow-auto flex-nowrap drop-shadow-lg"
                          : "hidden"
                      }
                    >
                      <p>
                        <span className="font-semibold">Description : </span>
                        {ele.description}
                      </p>
                    </div>
                    <div
                      className={
                        show === index
                          ? "absolute rotate-45 h-8 w-8 bg-[#5F50A3] bottom-9 right-[37%] "
                          : "hidden"
                      }
                    ></div>
                  </div>
                  <div className="flex flex-row justify-center gap-x-2 ">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        requestAcceptFunction(
                          ele,
                          request,
                          setRequest,
                          setAllusers
                        );
                      }}
                    >
                      <img
                        className="w-[32px] h-[32px] pointer-cursor"
                        src="./adminicons/lock.png"
                        alt="lock"
                      />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        requestDeclineFunction(ele, request, setRequest);
                      }}
                    >
                      <img
                        className="w-[32px] h-[32px] pointer-cursor"
                        src="./adminicons/delete.png"
                        alt="lock"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Accepted = ({
  showtype,
  setShowType,
  acceptedSeller,
  acceptedBuyer,
}) => {
  // let arr = showtype === "acceptedSeller" ? acceptedSeller : acceptedBuyer;
  const [arr, setArr] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  useEffect(() => {
    if (showtype === "acceptedSeller") {
      setArr(acceptedSeller);
    } else {
      setArr(acceptedBuyer);
    }
  }, [showtype]);
  useEffect(() => {
    if (showtype === "acceptedSeller" && searchUser === "") {
      setArr(acceptedSeller);
    } else if (showtype === "acceptedBuyer" && searchUser === "") {
      setArr(acceptedBuyer);
    } else if (showtype === "acceptedSeller" && searchUser !== "") {
      UserSearchFunction(acceptedSeller, setArr, searchUser);
    } else if (showtype === "acceptedBuyer" && searchUser !== "") {
      UserSearchFunction(acceptedBuyer, setArr, searchUser);
    }
  }, [searchUser, showtype]);

  return (
    <div className="h-full flex flex-col ">
      <div className="flex flex-row py-2 justify-between">
        {/* <div className="pl-3 hidden">
          <button className="p-1 px-6 bg-[#5F50A3] text-white text-sm rounded-md">
            CSV
          </button>
        </div> */}
        {/* <div className="flex flex-row gap-x-4 p-1 px-3 rounded-lg bg-[#F2F4F5] mr-7"> */}
        <div className=" flex flex-row items-center justify-center lg:ml-[40%] mb-5">
          {/* <img
            className="h-[18px] w-[18px]"
            src="./adminicons/search.png"
            alt="serach"
          /> */}
          {/* </div> */}
          <div class="flex flex-row items-center justify-center bg-[#F2F4F5] mr-2 w-1/2 ">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-2 ">
                <button
                  type="submit"
                  class="p-1 focus:outline-none focus:shadow-outline"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    class="w-6 h-6"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="q"
                value={searchUser}
                class="py-2 text-sm text-white border-2 border-gray-300 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Search..."
                autocomplete="off"
                onChange={(e) => {
                  setSearchUser(e.target.value);
                }}
              />
            </div>
          </div>
          {/* <div className="text-[#9C9C9C] w-28">
            <input
              className="bg-[#F2F4F5] w-full  "
              placeholder="Search here"
              value={searchUser}
              onChange={(e) => {
                setSearchUser(e.target.value);
              }}
            />
          </div> */}
        </div>
        <div className="flex flex-row justify-end">
          <div className="flex flex-row justify-center items-center pr-7 -mt-2">
            <div className="font-medium">Buyer</div>
            <ThemeProvider theme={theme}>
              <Switch
                checked={showtype === "acceptedSeller" ? true : false}
                onChange={() => {
                  showtype === "acceptedSeller"
                    ? setShowType("acceptedBuyer")
                    : setShowType("acceptedSeller");
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            </ThemeProvider>
            <div className="font-medium">Seller</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 ">
        <div className=" flex flex-row justify-center ">Name</div>
        <div className=" flex flex-row justify-center ">Email</div>
        <div className=" flex flex-row justify-center ">Phone No.</div>
        <div className=" flex flex-row justify-center overflow-x-hidden">
          Company Name
        </div>
      </div>
      {arr && (
        <div className="flex flex-col w-full h-full gap-2">
          {arr.map((ele, index) => {
            return (
              <div className="flex flex-col " key={index}>
                <div className="grid grid-cols-4 bg-[#f2f4f5] py-2 ">
                  <div className="flex flex-row justify-center ">
                    <span>{ele?.name}</span>
                  </div>
                  <div className="flex flex-row justify-center text-start overflow-auto">
                    {ele?.email}
                  </div>

                  <div className="flex flex-row justify-center">
                    {ele?.companyname}
                  </div>
                  <div className="flex flex-row justify-center">
                    {/* {ele?.podcast.length} */}
                    {ele?.phoneno}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Broadcastmessage = ({
  broadcastMessages,
  setBroadcastMessages,
  broadcastText,
  setBroadcastText,
}) => {
  return (
    <div className="px-7 h-[89%]">
      <div className="h-[45%] w-full flex flex-col">
        <div className="font-medium">Broadcast Messages</div>
        <div className=" flex flex-col pt-2">
          <textarea
            value={broadcastText}
            className="w-full h-36 max-h-36 bg-[#f2f4f5] box-shadow-[2px 2px 6px rgba(0, 0, 0, 0.1)] hover:cursor-pointer border-2 hover:border-solid hover:border-[#0063ff] shadow-md rounded-xl pl-3 pt-2 py-8 "
            placeholder="Write Here"
            onChange={(e) => {
              setBroadcastText(e.target.value);
            }}
          />
          <div className="flex flex-row justify-end items-end mt-3">
            <button className="p-1 px-5 font-medium bg-[#0063ff] rounded-3xl text-white hover:bg-[#f2f4f5] hover:text-[#0063ff] hover:cursor-pointer border-2 hover:border-solid hover:border-[#0063ff] ">
              Preview
            </button>
            <button
              className="p-1 px-8 font-medium bg-[#0063ff] rounded-3xl text-white hover:bg-[#f2f4f5] hover:text-[#0063ff] hover:cursor-pointer border-2 hover:border-solid hover:border-[#0063ff] "
              onClick={() => {
                postBroadcastMessage(
                  broadcastText,
                  setBroadcastMessages,
                  broadcastMessages,
                  setBroadcastText
                );
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col py-3 h-[44%] gap-y-3 overflow-auto">
        {broadcastMessages
          .slice(0)
          .reverse()
          .map((ele) => {
            return (
              <div className="flex flex-row items-center  bg-[#f2f4f5]   rounded-xl pl-3 py-2">
                {ele}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export const CSV = ({
  open,
  handleClose,
  Modal,
  Box,
  RiFileUploadFill,
  csvName,
  setCsvName,
  setCsvData,
  setAllusers,
  setModalState,
  setOpen,
  csvData,
  setShowType,
}) => {
  return (
    <div className="h-full">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            className="outline-0"
            type="file"
            name="csvfile"
            onChange={(e) => {
              changeHandler(e, setCsvName, setCsvData);
            }}
            accept=".csv"
            id="csvfile"
            hidden
          />
          <label htmlFor="csvfile">
            <div className="h-3/4 w-full flex flex-col gap-5 items-center justify-center cursor-pointer">
              <RiFileUploadFill size={30} color="#3e77f1" />
              <h3 className="font-semibold">Upload CSV file </h3>
              {csvName && (
                <p className=" w-full flex flex-row justify-center font-semibold">
                  {csvName}
                </p>
              )}
            </div>
          </label>
          <div className="w-full flex flex-row justify-center">
            <button
              type="submit"
              className="py-2 px-5 bg-[#3e77f1] text-white rounded-lg cursor-pointer hover:bg-white hover:text-[#3e77f1] hover:border-[#3e77f1] border-2 "
              onClick={() =>
                uploadCSVdata(
                  csvData,
                  setAllusers,
                  setCsvData,
                  setCsvName,
                  setModalState,
                  setOpen,
                  setShowType
                )
              }
            >
              Upload Data
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export const Overview = ({
  totalusers,
  totalseller,
  totalbuyer,
  allRequest,
  sellerRequest,
  buyerRequest,
  userweekDaysData,
  userweekDaysLabel,
  podcastweekDaysData,
  showPodcast,
  tags,
}) => {
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const [percentage3, setPercentage3] = useState(0);
  const [percentage4, setPercentage4] = useState(0);
  useEffect(() => {
    let p1 = (totalbuyer - 1) / totalusers,
      p2 = totalseller / totalusers,
      p3 = buyerRequest.length / allRequest,
      p4 = sellerRequest.length / allRequest;
    if (p1 !== -Infinity && !isNaN(p1)) {
      setPercentage1(p1);
    }
    if (p2 !== -Infinity && !isNaN(p2)) setPercentage2(p2);
    setPercentage2(totalseller / totalusers);
    if (p3 === 0) {
      setPercentage3(1);
    } else {
      setPercentage3(p3);
    }
    if (p4 === 0) {
      setPercentage4(0);
    } else {
      setPercentage4(p4);
    }
  }, [
    totalbuyer,
    totalseller,
    totalusers,
    allRequest,
    sellerRequest,
    buyerRequest,
  ]);

  return (
    <div className="lg:grid grid-cols-3  gap-2 h-[90%] pl-2 pt-2  mr-4 ">
      <div className="min-h-[200px]">
        <div className="h-full ">
          <div className=" flex flex-col  h-full bg-[#F0F0F0] rounded-xl">
            <div className="flex flex-row pl-4 text-lg font-semibold">
              Total Users
            </div>
            <div className="flex flex-row h-full">
              <div className="w-1/2 h-[99%] relative">
                <ChartArea
                  percentage1={percentage1}
                  percentage2={percentage2}
                />
                <div className="absolute top-[45%] left-[48%] font-medium text-[22px]">
                  {totalusers}
                </div>
              </div>
              <div className="w-1/2 flex flex-col ">
                <div className="w-full h-1/2 flex flex-col justify-start ">
                  <div className="h-1/2 flex flex-col justify-start ">
                    Buyer
                  </div>
                  <div className="h-1/2 flex flex-col justify-start">
                    <HorizontalLine percentage={percentage1 * 100} />
                  </div>
                </div>
                <div className="w-full h-1/2 flex flex-col justify-start ">
                  <div className="h-1/2 ">Seller</div>
                  <div className="h-1/2 flex flex-col justify-start">
                    <HorizontalLine percentage={percentage2 * 100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-[#F0F0F0] rounded-xl lg:min-h-[200px] mt-2 mb-2 lg:mt-0 lg:mb-0">
        <div className="flex flex-col lg:h-full ">
          <div className="flex flex-row pl-4 text-lg font-semibold">
            Pending Request
          </div>
          <div className="flex flex-row h-full">
            <div className="w-1/2 h-[99%] relative">
              <ChartArea percentage1={percentage3} percentage2={percentage4} />
              <div className="absolute top-[45%] left-[48%] font-medium text-[22px]">
                {allRequest}
              </div>
            </div>
            <div className="w-1/2 flex flex-col ">
              <div className="w-full h-1/2 flex flex-col justify-start ">
                <div className="h-1/2 flex flex-col justify-start ">Buyer</div>
                <div className="h-1/2 flex flex-col justify-start">
                  <HorizontalLine percentage={percentage3 * 100} />
                </div>
              </div>
              <div className="w-full h-1/2 flex flex-col justify-start ">
                <div className="h-1/2 ">Seller</div>
                <div className="h-1/2 flex flex-col justify-start py-2 ">
                  <HorizontalLine percentage={percentage4 * 100} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[200px]">
        <div className="w-full h-full bg-[#F0F0F0] rounded-xl">
          <div className="flex flex-row pl-4 text-lg font-semibold">
            Trending Tags
          </div>
          <div className="w-full md:w-[70%] lg:w-full h-[90%] py-2 pr-8">
            <PieChart tags={tags} />
          </div>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 gap-3 col-span-3 mt-5 mb-5">
        <div className="flex flex-col h-[99%]">
          <div className="pl-4 font-semibold">Total Users</div>
          <div className="w-full h-[99%] px-2">
            {/* <BarGraph
              userweekDaysData={userweekDaysData}
              userweekDaysLabel={userweekDaysLabel}
              showLabel={"Number of user per day"}
            /> */}
            {BarGraph(
              userweekDaysData,
              userweekDaysLabel,
              "Number of user per day"
            )}
          </div>
        </div>
        <div className="flex flex-col h-[99%]">
          <div className="pl-4 font-semibold">Total Podcast</div>
          <div className="w-full h-[99%] flex flex-row justify-end pl-4">
            {BarGraph(
              podcastweekDaysData,
              userweekDaysLabel,
              "Number of podcast per day"
            )}
          </div>
        </div>
      </div>
      <div className="col-span-3 h-fit flex flex-col py-2  rounded-xl px-2 bg-gray-100 mt-[10px] text-center ">
        <div className="pr-7   pl-4 font-bold underline">Top Five Podcast</div>
        <div className="grid grid-cols-5 pr-7 pl-2 font-semibold ">
          <div className="flex flex-row justify-center">Podcast Name</div>
          <div className="flex flex-row justify-center">Seller Name</div>
          <div className="flex flex-row justify-center">Average Length</div>
          <div className="flex flex-row justify-center">No. of bookings</div>
          <div className="flex flex-row justify-center">Uploaded On</div>
          {/* <div className="flex flex-row justify-center">Description</div> */}
        </div>
        <div className="bg-[#F0F0F0] rounded-xl mt-2 ">
          {showPodcast &&
            showPodcast
              .sort((a, b) => {
                return a.bookings.length - b.bookings.length;
              })
              .filter((item, index) => index > showPodcast.length - 6)
              .map((Element, index) => {
                return (
                  <div className="" key={index}>
                    <div className="grid grid-cols-5 pr-7 pl-2 border-b-[1px] border-gray-200">
                      <div className="flex flex-row justify-center truncate">
                        {Element.podcastName}
                      </div>
                      <div className="flex flex-row justify-center truncate">
                        {Element.sellername}
                      </div>
                      <div className="flex flex-row justify-center truncate">
                        {Element.averageEpisodeLength}
                      </div>
                      <div className="flex flex-row justify-center truncate">
                        {Element.bookings.length}
                      </div>
                      <div className="flex flex-row justify-center truncate">
                        {Element.createdAt.slice(0, 10)}
                      </div>
                      {/* <div className="flex flex-row justify-start overflow-auto text-ellipsis text-left">
                        {Element.description}
                      </div> */}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

function singlePodcast(item) {
  return (
    <div className="bg-[#F2F4F5] flex flex-row justify-center rounded-xl ">
      <div className=" w-[90%] bg-white my-4 rounded-xl">
        <div className="">
          <div className="p-5 pb-0 h-1/2 flex flex-row">
            <img
              src={item.image}
              className="rounded-xl object-fit  h-[200px] object-fit w-full"
              alt="images"
            />
          </div>
        </div>
        <div className="px-5 font-semibold text-md">{item.podcastName}</div>
        <div className="flex flex-row px-5 justify-between py-1">
          <div>
            <div className="flex flex-row justify-center">
              <MdOutlineLibraryBooks size={22} color="#5F50A3" />
            </div>
            <div className="text-[#5F50A3]">{item.episodeName}</div>
          </div>
          <div className="">
            <div className="flex flex-row justify-center">
              <BsCart4 size={22} color="#5F50A3" />
            </div>
            <div className="text-[#5F50A3]">
              {item.bookings.length} Purchases
            </div>
          </div>
          <div className="">
            <div className="flex flex-row justify-center">
              <BsClock size={22} color="#5F50A3" />
            </div>
            <div className="text-[#5F50A3]">{item.averageLTR} mins</div>
          </div>
        </div>
        <div className="flex flex-row px-5 py-2">
          <div className="flex flex-row justify-center items-center mr-2">
            <IoIosPricetags size={22} color="#5F50A3" />
          </div>
          <div className="flex flex-row overflow-hidden">
            {item.tags &&
              item.tags.map((ele, index) => {
                return (
                  <div key={index} className="text-[#5F50A3] mx-2">
                    {ele}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export const PodcastView = ({ showPodcast }) => {
  const [searchPodcast, setSearchPodcast] = useState("");
  const [tempArr, setTempArr] = useState([]);
  useEffect(() => {
    if (searchPodcast === "") {
      setTempArr(showPodcast);
    } else {
      let arr = [];
      showPodcast.forEach((element) => {
        let podcastname = element.podcastName.toLowerCase();
        podcastname = podcastname.search(searchPodcast.toLowerCase());
        if (podcastname !== -1) {
          arr.push(element);
        }
      });
      setTempArr(arr);
    }
  }, [searchPodcast, showPodcast]);
  return (
    <div className="h-[89%] overflow-scroll">
      <div class="flex items-center justify-center bg-[white]">
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2 ">
            <button
              type="submit"
              class="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="q"
            value={searchPodcast}
            class="py-2 text-sm text-white border-2 border-gray-100 rounded-2xl mb-3 mt-2 pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder="Search..."
            autocomplete="off"
            onChange={(e) => {
              setSearchPodcast(e.target.value);
            }}
          />
        </div>
      </div>
      {/* <div>
        <input
          className="mx-2 "
          type="text"
          value={searchPodcast}
          placeholder="Search here"
          onChange={(e) => {
            setSearchPodcast(e.target.value);
          }}
        />
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-1 mx-2">
        {tempArr &&
          tempArr.map((ele, index) => {
            return singlePodcast(ele);
          })}
      </div>
    </div>
  );
};
export const TagView = ({
  adminTags,
  reqestedTags,
  setAdminTags,
  setRequestedTags,
}) => {
  // console.log(adminTags);
  const [showinput, setShowinput] = useState("false");
  const [showTypeofTag, setShowTypeofTag] = useState("admin");
  const [sortingOrder, setSortingOrder] = useState([]);
  const [arr, setArr] = useState([]);
  const [searchTag, setSearchTag] = useState("");
  useEffect(() => {
    if (searchTag === "") {
      TagSearchFunction(adminTags, setArr);
    } else {
      let tempArr = [];
      adminTags.forEach((element) => {
        let tagname = element.tagname.toLowerCase();
        tagname = tagname.search(searchTag.toLowerCase());
        if (tagname !== -1) {
          tempArr.push(element);
        }
      });
      TagSearchFunction(tempArr, setArr);
    }
  }, [searchTag, adminTags]);

  useEffect(() => {
    TagSearchFunction(adminTags, setArr);
  }, [adminTags]);

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  const inputRef = useRef(null);

  return (
    <div className="h-[89%] flex flex-col lg:flex-row ml-[1%]">
      <div className="flex flex-col  w-full lg:w-3/4">
        <div className="flex flex-col ">
          <div className="w-full underline underline-offset-8 decoration-1 font-bold">
            Tags
          </div>
          <div
            className="w-full flex flex-row mb-5"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleShow}
              className="border-0 rounded-2xl bg-[#5F50A3]"
            >
              <p className="ml-7 mr-7 mb-1.5 mt-1 text-white">Add Tag</p>
            </button>

            <div>
              <Modal
                className="absolute inset-0 text-center  lg:w-[30%] w-[80%] h-[30%] ml-[10%] lg:ml-[34%]  mt-[15%]  bg-gray-300 min-h-[200px] rounded-xl"
                show={showModal}
                onHide={handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="mt-3 font-bold">Add Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body className="h-[15%] mb-10">
                  <input
                    ref={inputRef}
                    className="rounded-l text-center w-[80%] bg-gray-100 "
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    className="bg-gray-600 text-white font-semibold rounded-xl mr-4"
                    onClick={handleClose}
                  >
                    <div className="m-2 ml-5 mr-5">Close</div>
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-purple-600 text-white font-semibold rounded-xl"
                    onClick={() => {
                      addNewtag(inputRef.current.value);
                      setAdminTags((oldArray) => [
                        ...oldArray,
                        { tagname: inputRef.current.value, tagcount: 0 },
                      ]);
                    }}
                  >
                    <div className="m-2 ml-5 mr-5">Submit</div>
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div
              className="ml-2 mr-2  flex flex-row border-1 rounded-2xl bg-[#F2F4F5]"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p className="ml-2">Seller</p>
              <div className="border-5">
                <ThemeProvider theme={theme}>
                  <Switch
                    // checked={showtype === "sellerRequest" ? true : false}
                    checked={showTypeofTag === "admin" ? true : false}
                    onChange={() => {
                      showTypeofTag === "admin"
                        ? setShowTypeofTag("request")
                        : setShowTypeofTag("admin");
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </ThemeProvider>
              </div>
              <p className="mr-2">Admin</p>
            </div>
            <button
              className="border-0 rounded-2xl bg-[#5F50A3]"
              onClick={() => setShowTypeofTag("request")}
            >
              <p className="ml-7 mr-7 mb-1.5 mt-1 text-white">Requests</p>
            </button>
          </div>
          <div
            className="w-full flex flex-row mb-5 rounded-2xl"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div class="flex items-center justify-center bg-[#F2F4F5]">
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2 ">
                  <button
                    type="submit"
                    class="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      class="w-6 h-6"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="q"
                  value={searchTag}
                  class="py-2 text-sm text-white border-2 border-black rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                  placeholder="Search..."
                  autocomplete="off"
                  onChange={(e) => {
                    setSearchTag(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col w-full  "
          style={{ overflowY: "scroll", overflowX: "hidden" }}
        >
          {arr &&
            arr.map((element, index) => {
              return (
                <div
                  className="flex flex-row w-full mt-2"
                  style={{ borderTopWidth: "1px" }}
                  key={index}
                >
                  <div className="flex flex-row w-full mt-2">
                    <div className="font-bold mr-[1%] text-2xl">
                      {element.currChar.toUpperCase()}
                    </div>
                    <div className="flex flex-col w-full">
                      {element.currArr &&
                        element.currArr.map((element2, index) => {
                          return (
                            <div
                              className="flex flex-row  w-full    "
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Progressbar
                                progress={element2?.tagcount}
                                tagname={element2?.tagname}
                              />
                              <div className="mr-10">{element2?.tagcount}</div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
          {<popularTags />}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:w-1/4 relative">
        {showTypeofTag === "admin" ? (
          <PopularTags a={adminTags} />
        ) : (
          <UserTag
            b={reqestedTags}
            setAdminTags={setAdminTags}
            setRequestedTags={setRequestedTags}
          />
        )}
      </div>
    </div>
  );
};
