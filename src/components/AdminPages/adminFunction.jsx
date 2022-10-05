import api from "../../config/axios";
import toast from "react-hot-toast";
import Papa from "papaparse";
import {
  setUserName,
  setUniqueID,
  setUserType,
} from "../../store/activateSlice";

export const getInfo = async (
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
) => {
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
      setAdminTags(res.data[0].admintags);
      setRequestedTags(res.data[0].requestedtags);
      // toast.success("Admin info loaded successfully");
      // //console.log(res.data[0],"resitags")
    })
    .catch((err) => {
      toast.error("Unable to load data , try again");
    });

  let info1 = api
    .get("/api/getalluser")
    .then((res) => {
      setAllusers(res.data);
      // toast.success("User data loaded sucessfully");
    })
    .catch(() => {
      toast.error("Unable to load users data");
    });
  let data1 = {
    searchItem: "",
  };
  let info2 = api
    .post("/api/getpodcastfromsearch", data1)
    .then((res) => {
      setShowPodcast(res.data);
      // toast.success("Podcast data loaded succesfully");
    })
    .catch((err) => {
      toast.error("Unable to fetch podcast ");
    });

  // let info3 = api
  //   .get("/api/gettagdataforadmin")
  //   .then((res) => {
  //     setTagData(res.data);
  //     // //console.log(res.data,"resdata")
  //     toast.success("Tag data loaded successfully");
  //   })
  //   .catch((err) => {
  //     toast.error("Unable to get tag data");
  //   });
  await Promise.all([info, info1, info2]).then(() => {
    setShowType("overview");
    setLoading(false);
  });
};
export const addNewtag = async (tagname,requestedTags) => {
  // console.log(requestedTags,"ddddd")
  for (var i = 0; i < requestedTags.length; i++) {
    if (tagname.toLowerCase() === requestedTags[i].tagname.toLowerCase()) {
      toast.error("Tag already exist");
      return;
    }
  }
  if (tagname === null || tagname.length === 0) {
    toast.error("Please add something ");
    return;
  }
  let data = {
    tagname: tagname,
  };
  try {
    // //console.log(data, "tagtest");
    let info = await api.post("/api/addnewtagbyadmin", data);
    if (info) {
      toast.success(" data Added successfully");
    }
  } catch (err) {
    toast.error("Unable to Add,try again");
    return;
  }
};

export const UpdateList = async (
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
) => {
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
};
export const requestAcceptFunction = async (
  user,
  request,
  setRequest,
  setAllusers
) => {
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

export const requestDeclineFunction = async (user, request, setRequest) => {
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
export const postBroadcastMessage = async (
  broadcastText,
  setBroadcastMessages,
  broadcastMessages,
  setBroadcastText
) => {
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

export const changeHandler = async (event, setCsvName, setCsvData) => {
  setCsvName(event.target.files[0].name);
  await Papa.parse(event.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      setCsvData(results.data);
      toast.success("CSV file added successfully");
    },
  });
};
export const uploadCSVdata = async (
  csvData,
  setAllusers,
  setCsvData,
  setCsvName,
  setModalState,
  setOpen,
  setShowType
) => {
  if (csvData === null || csvData.length === 0) {
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
  setShowType("sellerRequest");
  setCsvData([]);
  setCsvName(null);
  setModalState(false);
  setOpen(false);
};

export const removeItem = (
  item,
  arrType,
  tags,
  setTags,
  themes,
  setThemes,
  groups,
  setGroups
) => {
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

export const updateTags = async (tags, themes, groups) => {
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

export const logoutUser = async (dispatch, navigate) => {
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
};

const convertDate = (currDate) => {
  let splitTime = currDate.split("/");
  if (splitTime[1] < 10) {
    splitTime[1] = "0" + splitTime[1];
  }
  if (splitTime[0] < 10) {
    splitTime[0] = "0" + splitTime[0];
  }
  splitTime = splitTime[2] + "-" + splitTime[0] + "-" + splitTime[1]; //version related problem // error
  return splitTime;
};
export const BarGraphFunctions = (
  allusers,
  setUserWeekDaysLabel,
  setUserWeekDaysData,
  showPodcast,
  setPodcastWeekDaysData
) => {
  let createdDatesofUser = [];
  let createdDatesofPodcast = [];
  let currdaystoshow = [];
  let currPodcastdaystoshow = [];
  let currweekdaystoshow = [];
  /// exracting the date on which the user was created
  if (allusers) {
    for (let i = 1; i < allusers.length; i++) {
      if (allusers[i].createdAt !== undefined) {
        createdDatesofUser.push(allusers[i].createdAt.slice(0, 10));
      }
    }
  }
  /// exracting the date on which the podcast was created
  if (showPodcast) {
    for (let i = 0; i < showPodcast.length; i++) {
      if (showPodcast[i].createdAt !== undefined) {
        createdDatesofPodcast.push(showPodcast[i].createdAt.slice(0, 10));
      }
    }
  }
  // exracting the last 7 days from current day
  for (let i = 0; i < 7; i++) {
    let newDate = new Date();
    newDate = newDate.setDate(newDate.getDate() - i);
    let new1 = new Date(newDate);
    let new2 = new1.toString();
    new1 = new1.toLocaleDateString();
    currdaystoshow.push(convertDate(new1));
    currPodcastdaystoshow.push(convertDate(new1));
    currweekdaystoshow.push(new2.split(" ")[0]);
  }

  //console.log(currdaystoshow, "currweekdaystoshow");
  setUserWeekDaysLabel(currweekdaystoshow.reverse()); // this array contain the week days
  let weekData = new Map();
  let podcastWeekData = new Map();
  for (let i = 0; i < createdDatesofUser.length; i++) {
    if (!weekData.has(createdDatesofUser[i])) {
      weekData.set(createdDatesofUser[i], 1);
    } else {
      let currValue = weekData.get(createdDatesofUser[i]);
      weekData.set(createdDatesofUser[i], currValue + 1);
    }
  }
  for (let i = 0; i < createdDatesofPodcast.length; i++) {
    if (!podcastWeekData.has(createdDatesofPodcast[i])) {
      podcastWeekData.set(createdDatesofPodcast[i], 1);
    } else {
      let currValue = podcastWeekData.get(createdDatesofPodcast[i]);
      podcastWeekData.set(createdDatesofPodcast[i], currValue + 1);
    }
  }
  // for (let [key, value] of weekData) {
  //   //console.log(key, value, "key");
  // }
  for (let [key, value] of weekData) {
    //console.log(key, value);
  }
  let toshowdata = [];
  let toshowPodcastData = [];
  for (let i = 0; i < 7; i++) {
    if (weekData.has(currdaystoshow[i])) {
      toshowdata.push(weekData.get(currdaystoshow[i]));
    } else {
      toshowdata.push(0);
    }
    if (podcastWeekData.has(currPodcastdaystoshow[i])) {
      toshowPodcastData.push(podcastWeekData.get(currPodcastdaystoshow[i]));
    } else {
      toshowPodcastData.push(0);
    }
  }

  // //console.log(toshowdata);
  setUserWeekDaysData(toshowdata.reverse()); /// number of user created during last seven days
  setPodcastWeekDaysData(toshowPodcastData.reverse()); // similar for podcast
};

export const TagSearchFunction = (adminTags, setArr) => {
  let tempArr = [];
  for (let i = 0; i < 26; i++) {
    let data = { currChar: "", currArr: [] };
    let c = String.fromCharCode(97 + i);
    adminTags.forEach((element) => {
      if (element.tagname[0].toLowerCase() === c) {
        data.currArr.push({ ...element });
        data.currChar = c;
      }
    });
    // if (data.currChar !== "") arr = [...arr, data]
    if (data.currChar !== "") tempArr.push(data);
  }
  setArr(tempArr);
  return;
};
export const UserSearchFunction = (userarray, setArr, searchUser) => {
  let tempArr = [];
  userarray.forEach((element) => {
    let username = element?.name.toLowerCase();
    username = username.search(searchUser.toLowerCase());
    let useremail = element?.email.toLowerCase();
    useremail = useremail.search(searchUser.toLowerCase());

    if (username !== -1 || useremail !== -1) {
      tempArr.push(element);
    }
  });
  setArr(tempArr);
};
