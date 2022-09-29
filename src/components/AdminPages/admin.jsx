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
  request,
  setRequest,
  setAllusers,
  setShowType,
  showtype,
  show,
  setShow,
  setModalState,
  handleClick,
}) => {
  let arr = showtype === "sellerRequest" ? sellerRequest : buyerRequest;

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
        <div className="flex flex-row gap-x-4 p-1 px-3 rounded-lg bg-[#F2F4F5] mr-7">
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
            />
          </div>
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
  let arr = showtype === "acceptedSeller" ? acceptedSeller : acceptedBuyer;

  return (
    <div className="h-full flex flex-col ">
      <div className="flex flex-row py-2 justify-end">
        <div className="pl-3 hidden">
          <button className="p-1 px-6 bg-[#5F50A3] text-white text-sm rounded-md">
            CSV
          </button>
        </div>
        <div className="flex flex-row gap-x-4 p-1 px-3 rounded-lg bg-[#F2F4F5] mr-7">
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
            />
          </div>
        </div>
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
                  <div className="flex flex-row justify-center overflow-clip text-start">
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
  function compare(a, b) {
    let booking1 = a.bookings.length;
    let booking2 = b.bookings.length;

    let comparison = 0;
    if (booking1 > booking2) {
      comparison = 1;
    } else {
      comparison = -1;
    }
    return comparison;
  }
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 h-[90%] pl-2 pt-2  mr-4 ">
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

      <div className="h-full bg-[#F0F0F0] rounded-xl min-h-[200px]">
        <div className="flex flex-col  h-full">
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
                <div className="h-1/2 flex flex-col justify-start py-2 pr-8">
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
          <div className="w-full h-[90%] py-2 pr-8">
            <PieChart tags={tags} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 col-span-3 mt-5 mb-5">
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
      <div className="col-span-3 h-full flex flex-col py-2  rounded-xl px-2 bg-[#F0F0F0] mt-[10px] ">
        <div className="pr-7   pl-4 font-semibold">Top Five Podcast</div>
        <div className="grid grid-cols-6 pr-7 pl-2 font-semibold ">
          <div className="flex flex-row justify-center">Podcast Name</div>
          <div className="flex flex-row justify-center">Seller Name</div>
          <div className="flex flex-row justify-center">Average Length</div>
          <div className="flex flex-row justify-center">No. of bookings</div>
          <div className="flex flex-row justify-center">Uploaded On</div>
          <div className="flex flex-row justify-center">Description</div>
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
                    <div className="grid grid-cols-6 pr-7 pl-2 border-b-[1px] border-gray-200">
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
                      <div className="flex flex-row justify-start truncate text-ellipsis text-left">
                        {Element.description}
                      </div>
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
          <div className="flex flex-row overflow-clip">
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
  return (
    <div className="h-[89%] overflow-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-1 mx-2">
        {showPodcast &&
          showPodcast.map((ele, index) => {
            return singlePodcast(ele);
          })}
      </div>
    </div>
  );
};
export const TagView = ({ adminTags, reqestedTags }) => {
  // console.log(adminTags);
  const [showinput, setShowinput] = useState("false");
  const [showTypeofTag, setShowTypeofTag] = useState("admin");
  const [sortingOrder, setSortingOrder] = useState([]);
  let arr = [];
  // useEffect(()=>{

  // })
  for (let i = 0; i < 26; i++) {
    let data = { currChar: "", currArr: [] };
    let c = String.fromCharCode(97 + i);
    adminTags.forEach((element) => {
      if (element.tagname[0].toLowerCase() === c) {
        data.currArr.push({ ...element });
        data.currChar = c;
      }
    });
    if (data.currChar !== "") arr = [...arr, data];
  }
  // useEffect(() => {
  //   setSortingOrder([...arr]);
  // }, [arr]);
  // console.log(arr);
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  const inputRef = useRef(null);
  //  function updateArr(c)
  //  {
  //   console.log(c,"hellp")

  //  }

  return (
    <div className="h-[89%] flex flex-row ml-[1%]">
      <div className="flex flex-col w-3/4">
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
                className="absolute inset-0 text-center w-[30%] h-[30%] ml-[34%] mt-[15%]  bg-gray-300 min-h-[200px] rounded-xl"
                show={showModal}
                onHide={handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="mt-3 font-bold">Add Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body className="h-[15%] mb-10">
                  <input
                    ref={inputRef}
                    className="rounded-xl text-center w-[80%]  "
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    className="bg-red-600 text-white font-semibold rounded-xl mr-4"
                    onClick={handleClose}
                  >
                    <div className="m-2 ml-5 mr-5">Close</div>
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-green-600 text-white font-semibold rounded-xl"
                    onClick={() => {
                      addNewtag(inputRef.current.value);
                      adminTags.push({
                        tagname: inputRef.current.value,
                        tagcount: 3,
                      });
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
            <input className="h-5 rounded-2xl bg-red-100" />
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
      <div className="flex flex-row w-1/4 relative">
        {showTypeofTag === "admin" ? (
          <PopularTags a={adminTags} />
        ) : (
          <UserTag b={reqestedTags} />
        )}
      </div>
    </div>
  );
};