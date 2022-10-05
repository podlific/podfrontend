import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PodcastWidget from "../shared/WebPage/PodcastWidget";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { RiFileUploadFill, RiCloseCircleFill } from "react-icons/ri";
import { AiFillPlusSquare } from "react-icons/ai";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setUserName,
  setUniqueID,
  setUserType,
} from "../../store/activateSlice";
import toast from "react-hot-toast";
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

const AdminDashboard = ({ requestPodcast, userInfo }) => {
  const [request, setRequest] = useState([]);
  const [allusers, setAllusers] = useState([]);
  const [totalusers, setTotalusers] = useState(0);
  const [totalseller, setTotalseller] = useState(0);
  const [totalbuyer, setTotalbuyer] = useState(0);
  const [totalpendingrequests, setTotalpendingrequests] = useState(0);
  const [searchTag, setSearchTag] = useState("");
  const [allRequest, setAllRequest] = useState([]);
  const [sellerRequest, setSellerRequest] = useState([]);
  const [buyerRequest, setBuyerRequest] = useState([]);
  const [acceptedSeller, setAcceptedSeller] = useState([]);
  const [acceptedBuyer, setAcceptedBuyer] = useState([]);
  const [allAcceptedUsers, setAllAcceptedUsers] = useState([]);
  const [showtype, setShowType] = useState("sellerRequest");
  const [checked, setChecked] = useState(true);
  const [broadcastMessages, setBroadcastMessages] = useState([]);
  const [broadcastText, setBroadcastText] = useState("");
  const [showPocast, setShowPodcast] = useState([]);
  const [ModalState, setModalState] = useState(false);
  const [open, setOpen] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [csvName, setCsvName] = useState();
  const [themes, setThemes] = useState([]);
  const [tags, setTags] = useState([]);
  const [groups, setGroups] = useState([]);
  const [themeVal, setThemeVal] = useState("");
  const [tagVal, setTagVal] = useState("");
  const [groupVal, setGroupVal] = useState("");
  const [arr, setArr] = useState([]);
  const [brr, setBrr] = useState([]);
  const [crr, setCrr] = useState([]);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.activate.unique_id);
  const usertype = useSelector((state) => state.activate.usertype);
  useEffect(() => {
    if (
      usertype.usertype === "seller" ||
      usertype.usertype === "buyer" ||
      usertype.usertype === "" ||
      usertype.usertype === undefined
    ) {
      navigate("../login");
    }
  }, []);
  useEffect(() => {
    const getInfo = async () => {
      let data = {
        uid: "#adminmodel123",
      };
      let info;

      info = api
        .post("/api/getadmininfo", data)
        .then((res) => {
          setRequest(res.data[0].requests);
          setBroadcastMessages(res.data[0].broadcastmessages);
          setTags(res.data[0].tags);
          setThemes(res.data[0].themes);
          setGroups(res.data[0].targetgroups);
          toast.success("Admin info loaded successfully");
        })
        .catch((err) => {
          toast.error("Unable to load data");
        });

      let info1 = api
        .get("/api/getalluser")
        .then((res) => {
          setAllusers(res.data);
          toast.success("User data loaded sucessfully");
        })
        .catch(() => {
          toast.error("Unable to load users data");
        });
      let data1 = {
        searchItem: "",
      };
      // let info2 = api
      //   .post("/api/getpodcastfromsearch", data1)
      //   .then((res) => {
      //     setShowPodcast(res.data);
      //     toast.success("Podcast data loaded succesfully");
      //   })
      //   .catch((err) => {
      //     toast.error("Unable to fetch podcast ");
      //   });

      Promise.all([info, info1]);
    };
    if (usertype.usertype === "admin") {
      getInfo();
    } else {
      navigate("../login");
    }
  }, []);

  useEffect(() => {
    let len = allusers.length;
    setTotalusers(len);
    let sellercount = 0;
    let buyercount = 0;
    let seller = [];
    let buyer = [];
    allusers.forEach((Element) => {
      if (Element.usertype === "seller") {
        sellercount++;
        seller.push(Element);
      } else {
        buyercount++;
        buyer.push(Element);
      }
    });
    setAcceptedBuyer(buyer);
    setAcceptedSeller(seller);
    setTotalbuyer(buyercount);
    setTotalseller(sellercount);
    if (request.length >= 0) {
      len = request.length;
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
    }
  }, [request, allusers]);
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
  // useEffect(() => {}, [broadcastMessages]);
  const requestAcceptFunction = async (user) => {
    let data = {
      username: user.username,
      usertype: user.usertype,
      email: user.email,
      name: user?.name,
      phoneno: user?.phoneno,
      companyname: user?.companyname,
    };
    let info;
    try {
      info = await api.post("/api/createnewuseraccount", data);
    } catch (err) {
      toast.error("Unable to update data");
      return;
    }
    if (info.status === 200) {
      let brr = [];
      request.forEach((Element) => {
        if (Element.username !== user.username) {
          brr.push(Element);
        }
      });
      setRequest(brr);
      let data1 = {
        username: user.username,
        usertype: user.usertype,
        name: user?.name,
        companyname: user?.companyname,
        phoneno: user?.phoneno,
        connected: [],
        podcast: [],
        requests: [],
      };
      setAllusers((oldArray) => [...oldArray, data1]);
      toast.success("User accepted successfully");
    }
  };

  const requestDeclineFunction = async (user) => {
    let data = {
      username: user.username,
    };
    let info;
    try {
      info = await api.post("/api/deleteuserrequest", data);
    } catch (err) {
      toast.error("Unable to update data");
      return;
    }
    if (info.status === 200) {
      let brr = [];
      request.forEach((Element) => {
        if (Element.username !== user.username) {
          brr.push(Element);
        }
      });
      setRequest(brr);
    }
  };
  const postBroadcastMessage = async () => {
    if (broadcastText === "") {
      toast.error("Fill all fields");
      return;
    }
    let data = {
      text: broadcastText,
    };
    let info;
    try {
      info = await api.post("/api/postbroadcastmessage", data);
    } catch (err) {
      toast.error("Unable to update data , try again");
      return;
    }
    if (info.status === 200) {
      // setBroadcastMessages((oldArray) => [...oldArray, data]);
      setBroadcastMessages([...broadcastMessages, broadcastText]);
      setBroadcastText("");
      toast.success("Data updated successfully");
    }
  };
  const changeHandler = (event) => {
    // console.log("working");
    setCsvName(event.target.files[0].name);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setCsvData(results.data);
        toast.success("CSV file added successfully");
      },
    });
  };
  const uploadCSVdata = async () => {
    if (csvData === null) {
      toast.error("Please add CSV file to be uploaded");
      return;
    }
    let data = {
      csvData: csvData,
    };

    try {
      let info = await api.post("/api/addcsvdata", data);
      if (info) {
        toast.success("CSV data uploaded successfully");
      }
    } catch (err) {
      toast.success("Unable to update CSV data ,try again");
      return;
    }
    setAllusers((oldArray) => [...oldArray, csvData]);
    setCsvData([]);
    setCsvName(null);
    handleClose();
  };
  useEffect(() => {
    setArr(tags);
    setBrr(themes);
    setCrr(groups);
  }, [themes, groups, tags]);
  const removeItem = (item, arrType) => {
    if (arrType === "tag") {
      let drr = [];
      tags.forEach((Element) => {
        if (Element !== item) {
          drr.push(Element);
        }
      });
      setTags(drr);
    } else if (arrType === "theme") {
      let drr = [];
      themes.forEach((Element) => {
        if (Element !== item) {
          drr.push(Element);
        }
      });
      setThemes(drr);
    } else {
      let drr = [];
      groups.forEach((Element) => {
        if (Element !== item) {
          drr.push(Element);
        }
      });
      setGroups(drr);
    }
  };

  const updateTags = async () => {
    if (tags.length === 0 && themes.length === 0 && groups.length === 0) {
      toast.error("Please add some data");
      return;
    }
    let data = {
      tags: tags,
      themes: themes,
      targetgroups: groups,
    };
    try {
      let info = await api.post("/api/updateadmintags", data);
      if (info) {
        toast.success("Tags updated successfully");
      }
    } catch (err) {
      toast.error("Unable to update Tags , try again");
    }
  };
  async function logoutUser() {
    try {
      await api.post("/api/logout");
      dispatch(setUserName({ username: "" }));
      dispatch(setUniqueID({ unique_id: "" }));
      dispatch(setUserType({ usertype: "" }));
      navigate("/login", { replace: true });
      toast.success("User logged out successfully");
    } catch (err) {
      toast.error("Unable to logout , try again");
      return;
    }
  }
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="w-full flex flex-row h-1/4 ">
        <div className="w-1/4 flex flex-col ">
          <div>
            <img className="h-20" src="../logo.png" alt="logo" />
          </div>
          <div className="pl-5 font-medium">Profile</div>
          <div className="flex flex-row justify-between px-5">
            <div className="font-medium ">Username</div>
            <div className="font-normal">{userInfo?.username}</div>
          </div>
          <div className="flex flex-row justify-between px-5">
            <div className="font-medium">Usertype</div>
            <div className="">{userInfo?.usertype}</div>
          </div>
        </div>
        <div className="w-full flex flex-col ">
          <div className="bg-[#5F50A3] text-white py-2 px-3 pl-10 text-[20px] rounded-l-3xl my-3 font-semibold">
            Dashboard
          </div>
          <div className="h-full flex flex-row justify-between items-center  mx-20 rounded-3xl overflow-hidden text-white ">
            <div className="flex flex-col items-center justify-center bg-[#B198FF] h-full w-1/4 ">
              <div className="text-[45px] ">{totalusers}</div>
              <div className="text-[20px] ">Total User</div>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#5F50A3] h-full w-1/4">
              <div className="text-[45px] ">{totalseller}</div>
              <div className="text-[20px] ">Seller</div>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#B198FF] h-full w-1/4">
              <div className="text-[45px] ">{totalbuyer}</div>
              <div className="text-[20px] ">Buyer</div>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#5F50A3] h-full w-1/4">
              <div className="text-[45px] ">{totalpendingrequests}</div>
              <div className="text-[20px] ">Pending Request</div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-3/4 flex flex-row w-full px-4">
        <div className="w-1/4 flex flex-col gap-4 py-2 mb-4  border-2 border-gray-400 rounded-lg ">
          <div
            className="pl-4 py-2 cursor-pointer hover:text-white font-medium hover:bg-[#B198FF] "
            onClick={() => {
              setShowType("sellerRequest");
            }}
          >
            <span>Requests</span>
          </div>
          <div
            className="pl-4 py-2 cursor-pointer hover:text-white font-medium hover:bg-[#B198FF] "
            onClick={() => {
              setShowType("acceptedSeller");
            }}
          >
            <span>Users</span>
          </div>

          <div
            className="pl-4 py-2 cursor-pointer hover:text-white font-medium hover:bg-[#B198FF] "
            onClick={() => {
              setShowType("broadcastMessage");
            }}
          >
            <span>Broadcast Messages</span>
          </div>

          <div
            className="pl-4 py-2 cursor-pointer hover:text-white font-medium hover:bg-[#B198FF] "
            onClick={() => {
              handleClick();
              setShowType("tags");
            }}
          >
            <span>Tags</span>
          </div>
          <div
            className="pl-4 py-2 cursor-pointer hover:text-white font-medium hover:bg-[#B198FF] "
            onClick={() => {
              setShowType("podcasts");
            }}
          >
            <span>Podcast</span>
          </div>
          <div
            className="pl-4 py-2 cursor-pointer hover:text-white font-medium hover:bg-[#B198FF] "
            onClick={() => {
              handleClick();
              setShowType("uploadcsv");
            }}
          >
            <span>CSV</span>
          </div>
          <div
            className="pl-4 py-2 cursor-pointer hover:text-white font-medium hover:bg-[#B198FF]  mt-20"
            onClick={() => {
              logoutUser();
            }}
          >
            <span>Logout</span>
          </div>
        </div>
        <div className="w-full flex flex-col ">
          <div className=" w-full  ">
            {showtype === "sellerRequest" && (
              <div className="flex flex-row justify-between items-center mx-20 py-2">
                <div className=""></div>
                <div className="flex flex-row items-center">
                  <div className="font-medium">Buyer</div>
                  <ThemeProvider theme={theme}>
                    <Switch
                      checked={checked}
                      onChange={() => {
                        setShowType("buyerRequest");
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </ThemeProvider>
                  <div className="font-medium">Seller</div>
                </div>
              </div>
            )}
            {showtype === "buyerRequest" && (
              <div className="flex flex-row justify-between items-center mx-20 py-2">
                <div></div>
                <div className="flex flex-row items-center">
                  <div className="font-medium">Buyer</div>
                  <ThemeProvider theme={theme}>
                    <Switch
                      checked={!checked}
                      onChange={() => {
                        setShowType("sellerRequest");
                      }}
                      color="secondary"
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </ThemeProvider>
                  <div className="font-medium">Seller</div>
                </div>
              </div>
            )}
            {showtype === "acceptedSeller" && (
              <div className="flex flex-row justify-between items-center mx-20 py-2">
                <div></div>
                <div className="flex flex-row items-center">
                  <div className="font-medium">Buyer</div>
                  <ThemeProvider theme={theme}>
                    <Switch
                      checked={checked}
                      onChange={() => {
                        setShowType("acceptedBuyer");
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </ThemeProvider>
                  <div className="font-medium">Seller</div>
                </div>
              </div>
            )}
            {showtype === "acceptedBuyer" && (
              <div className="flex flex-row justify-between items-center mx-20 py-2">
                <div></div>
                <div className="flex flex-row items-center">
                  <div className="font-medium">Buyer</div>
                  <ThemeProvider theme={theme}>
                    <Switch
                      checked={!checked}
                      onChange={() => {
                        setShowType("acceptedSeller");
                      }}
                      color="secondary"
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </ThemeProvider>
                  <div className="font-medium">Seller</div>
                </div>
              </div>
            )}
            {showtype === "broadcastMessage" && (
              <div className="w-full flex flex-col">
                <div className="mx-20 py-2 font-medium">Broadcast Messages</div>
                <div className="mx-20 flex flex-col py-2">
                  <textarea
                    value={broadcastText}
                    className="w-full  bg-[#f2f4f5] box-shadow-[2px 2px 6px rgba(0, 0, 0, 0.1)] hover:cursor-pointer border-2 hover:border-solid hover:border-[#0063ff] shadow-md rounded-xl pl-3 pt-2"
                    placeholder="Write Here"
                    onChange={(e) => {
                      setBroadcastText(e.target.value);
                    }}
                  />
                  <div
                    className="flex flex-col justify-end items-end mt-3"
                    onClick={() => {
                      postBroadcastMessage();
                    }}
                  >
                    <span className="p-2 px-5 font-medium bg-[#0063ff] rounded-3xl text-white hover:bg-[#f2f4f5] hover:text-[#0063ff] hover:cursor-pointer border-2 hover:border-solid hover:border-[#0063ff] ">
                      Post
                    </span>
                  </div>
                </div>
              </div>
            )}
            {showtype === "podcasts" && (
              <div className="mx-20 py-2 font-medium">Podcasts</div>
            )}

            {showtype === "uploadcsv" && (
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
                    onChange={changeHandler}
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
                      onClick={() => uploadCSVdata()}
                    >
                      Upload Data
                    </button>
                  </div>
                </Box>
              </Modal>
            )}
            {showtype === "tags" && (
              <div className="flex flex-row justify-between mx-20 p-2 pt-5">
                <span className="font-medium">Tags</span>
                <div className=" flex flex-row justify-end">
                  <button
                    type="submit"
                    className="py-1 px-2 bg-[#B198FF] text-white font-semibold rounded-xl"
                    onClick={() => {
                      updateTags();
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col h-full overflow-y-auto overflow-auto ">
            {showtype === "sellerRequest" && sellerRequest && (
              <div className="flex flex-col w-full h-full gap-2">
                {sellerRequest.map((ele, index) => {
                  return (
                    <div className="flex flex-col " key={index}>
                      <div className="flex flex-row bg-[#f2f4f5] mx-20 rounded-xl items-center py-2 h-[50px]">
                        <div className="w-1/6 flex flex-row justify-center ">
                          <span>{ele?.name}</span>
                        </div>
                        <div className="w-1/6  flex-row justify-center hidden ">
                          <span>{ele?.username}</span>
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.email}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.usertype}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {/* {ele?.podcast.length} */}
                          {ele?.phoneno}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.companyname}
                        </div>
                        <div className="w-[200px] flex flex-row justify-center whitespace-nowrap overflow-hidden hover:overflow-auto ">
                          {ele?.description}
                        </div>
                        <div className="flex flex-row w-1/5 justify-center ">
                          <div
                            className="mx-1"
                            onClick={() => {
                              requestAcceptFunction(ele);
                            }}
                          >
                            <span className="p-2 bg-green-500 rounded-lg cursor-pointer">
                              YES
                            </span>
                          </div>
                          <div
                            className="mx-1"
                            onClick={() => {
                              requestDeclineFunction(ele);
                            }}
                          >
                            <span className="p-2  bg-red-400 rounded-lg cursor-pointer">
                              NO
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {showtype === "buyerRequest" && buyerRequest && (
              <div className="flex flex-col w-full h-full overflow-y-scroll gap-2">
                {buyerRequest.map((ele, index) => {
                  return (
                    <div className="flex flex-col " key={index}>
                      <div className="flex flex-row bg-[#f2f4f5] mx-20 rounded-xl items-center py-2 h-[50px]">
                        <div className="w-1/6 flex flex-row justify-center ">
                          <span>{ele?.name}</span>
                        </div>
                        <div className="w-1/6  flex-row justify-center hidden">
                          <span>{ele?.username}</span>
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.email}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.usertype}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {/* {ele?.podcast.length} */}
                          {ele?.phoneno}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.companyname}
                        </div>
                        <div className="w-[200px] flex flex-row justify-center whitespace-nowrap overflow-hidden hover:overflow-auto ">
                          {ele?.description}
                        </div>
                        <div className="flex flex-row w-1/5 justify-center ">
                          <div
                            className="mx-1"
                            onClick={() => {
                              requestAcceptFunction(ele);
                            }}
                          >
                            <span className="p-2 bg-red-400 rounded-lg cursor-pointer">
                              YES
                            </span>
                          </div>
                          <div
                            className="mx-1"
                            onClick={() => {
                              requestDeclineFunction(ele);
                            }}
                          >
                            <span className="p-2 bg-green-500 rounded-lg cursor-pointer">
                              NO
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {showtype === "acceptedSeller" && acceptedSeller && (
              <div className="flex flex-col w-full h-full overflow-y-scroll gap-2">
                {acceptedSeller.map((ele, index) => {
                  return (
                    <div className="flex flex-col " key={index}>
                      <div className="flex flex-row justify-between bg-[#f2f4f5] mx-20 rounded-xl items-center py-2 h-[50px]">
                        <div className="w-1/6 flex flex-row justify-center ">
                          <span>{ele?.name}</span>
                        </div>
                        <div className="w-1/6  flex-row justify-center  hidden">
                          <span>{ele?.username}</span>
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.email}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.usertype}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {/* {ele?.podcast.length} */}
                          {ele?.phoneno}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.companyname}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {showtype === "acceptedBuyer" && acceptedBuyer && (
              <div className="flex flex-col w-full  h-full overflow-y-scroll gap-2">
                {acceptedBuyer.map((ele, index) => {
                  return (
                    <div className="flex flex-col" key={index}>
                      <div className="flex flex-row justify-between bg-[#f2f4f5] mx-20 rounded-xl items-center py-2 h-[50px]">
                        <div className="w-1/6 flex flex-row justify-center ">
                          <span>{ele?.name}</span>
                        </div>
                        <div className="w-1/6  flex-row justify-center hidden ">
                          <span>{ele?.username}</span>
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.email}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.usertype}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {/* {ele?.podcast.length} */}
                          {ele?.phoneno}
                        </div>
                        <div className="w-1/6 flex flex-row justify-center">
                          {ele?.companyname}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {showtype === "broadcastMessage" && broadcastMessages && (
              <div className="h-full flex flex-col mx-20  gap-3 ">
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
            )}
            {showtype === "podcasts" && showPocast && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 mx-20">
                {showPocast.map((pod, index) => {
                  return (
                    <PodcastWidget
                      key={index}
                      episodename={pod.episodeName}
                      podcastname={pod.podcastName}
                      tags={pod.tags}
                      image={pod.image}
                    />
                  );
                })}
              </div>
            )}
            {showtype === "tags" && (
              <div className="h-full flex flex-col px-1 mt-10 mx-20 ">
                <div className="flex flex-col ">
                  <div className="w-full p-2 shadow-sm shadow-zinc-900 rounded-lg">
                    <div className="flex flex-row p-2">
                      {/* <MdGroups size={22} /> */}
                      <span className="ml-2 font-semibold text-[#343C44]">
                        Tags
                      </span>
                    </div>
                    <div className="p-2 flex flex-wrap ">
                      {arr &&
                        arr.map((tag, index) => {
                          return (
                            <div
                              className="flex flex-row items-center p-1 pl-2 m-1 pr-2 rounded-xl bg-[#B198FF] text-white "
                              key={index}
                            >
                              <span className="pr-1">{tag}</span>
                              <RiCloseCircleFill
                                onClick={() => {
                                  removeItem(tag, "tag");
                                }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="w-full flex flex-row items-center ">
                    <div className="pt-1">
                      <input
                        className="rounded-md bg-[#FBFBFB] border-[1px] border-[#D6E4EC] pl-3 p-1"
                        placeholder="Type tags"
                        value={tagVal}
                        onChange={(e) => setTagVal(e.target.value)}
                      />
                    </div>
                    <AiFillPlusSquare
                      className="pl-3 rounded-md"
                      size={50}
                      color={"#B198FF"}
                      radius={10}
                      onClick={() => {
                        setTags((oldArray) => [...oldArray, tagVal]);
                        setTagVal("");
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="w-full p-2 shadow-sm shadow-zinc-900 rounded-lg">
                    <div className="flex flex-row p-2">
                      {/* <MdGroups size={22} /> */}
                      <span className="ml-2 font-semibold text-[#343C44]">
                        Themes
                      </span>
                    </div>
                    <div className="p-2 flex flex-wrap ">
                      {brr &&
                        brr.map((theme, index) => {
                          return (
                            <div
                              className="flex flex-row items-center p-1 pl-2 m-1 pr-2 rounded-xl bg-[#B198FF] text-white "
                              key={index}
                            >
                              <span className="pr-1">{theme}</span>
                              <RiCloseCircleFill
                                onClick={() => {
                                  removeItem(theme, "theme");
                                }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="w-full flex flex-row  items-center">
                    <div className="pt-1">
                      <input
                        className="rounded-md bg-[#FBFBFB] border-[1px] border-[#D6E4EC] pl-3 p-1"
                        placeholder="Type Theme"
                        value={themeVal}
                        onChange={(e) => setThemeVal(e.target.value)}
                      />
                    </div>
                    <AiFillPlusSquare
                      className="pl-3 rounded-md"
                      size={50}
                      color={"#B198FF"}
                      radius={10}
                      onClick={() => {
                        setThemes((oldArray) => [...oldArray, themeVal]);
                        setThemeVal("");
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="w-full p-2 shadow-sm shadow-zinc-900 rounded-lg">
                    <div className="flex flex-row p-2">
                      {/* <MdGroups size={22} /> */}
                      <span className="ml-2 font-semibold text-[#343C44]">
                        Target Groups
                      </span>
                    </div>
                    <div className="p-2 flex flex-wrap ">
                      {crr &&
                        crr.map((tag, index) => {
                          return (
                            <div
                              className="flex flex-row items-center p-1 pl-2 m-1 pr-2 rounded-xl bg-[#B198FF] text-white "
                              key={index}
                            >
                              <span className="pr-1">{tag}</span>
                              <RiCloseCircleFill
                                onClick={() => {
                                  removeItem(tag, "group");
                                }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="w-full flex flex-row items-center ">
                    <div className="pt-1">
                      <input
                        className="rounded-md bg-[#FBFBFB] border-[1px] border-[#D6E4EC] pl-3 p-1"
                        placeholder="Type Target Group"
                        value={groupVal}
                        onChange={(e) => setGroupVal(e.target.value)}
                      />
                    </div>
                    <AiFillPlusSquare
                      className="pl-3 rounded-md"
                      size={50}
                      color={"#B198FF"}
                      radius={10}
                      onClick={() => {
                        setGroups((oldArray) => [...oldArray, groupVal]);
                        setGroupVal("");
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
