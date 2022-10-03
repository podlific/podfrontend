import React, { useEffect, useState } from "react";
import FooterMobile from "../shared/Mobile/FooterMobile";
import NavigationMobile from "../shared/Mobile/NavigationMobile";
import PodcastWidgetMobile from "../shared/Mobile/PodcastWidgetMobile";
import FooterWebPage from "../shared/WebPage/FooterWebPage";
import NavigationWebPage from "../shared/WebPage/NavigationWebPage";
import PodcastWidget from "../shared/WebPage/PodcastWidget";
import "react-multi-carousel/lib/styles.css";
// import api from "../../config/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
import Loader from "../Loader/Loader";
import { TagSortingFucntion } from "./FilterPageFunctions";
let tagsSet = new Set();

const SellerFilterPage = ({ userPodcast, adminInfo }) => {
  const navigate = useNavigate();
  const currtype = useSelector((state) => state.activate.usertype);
  const user = useSelector((state) => state.activate.unique_id);
  useEffect(() => {
    if (user.unique_id === "" || user.unique_id === undefined) {
      navigate("/login");
    }
    if (currtype.usertype === "admin") {
      navigate("../admindashboard");
    }
  }, [user.unique_id]);
  const [selectedTags, setSelectedTag] = useState([]);
  const [active, setActive] = useState(false);
  const [theme, setTheme] = useState(false);
  const [show, setShow] = useState(true);
  const [showThemes, setShowThemes] = useState(false);
  const [ListofPodcast, setListofPodcast] = useState([...userPodcast]);
  const [ListofPodcast2, setListofPodcast2] = useState([...userPodcast]);
  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [start, setStart] = useState(1);
  const [start2, setStart2] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTag, setSearchTag] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionArray, setSuggestionArray] = useState([]);
  const [suggestionToShow, setSuggestionToShow] = useState([]);
  const [tempArr, setTempArr] = useState([]);
  const [tags, setTags] = useState([]);
  let tempUserPodcast = [];
  const currPage = () => {
    let s = 0;
    let e = Math.min(len, 9);
    let brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr(brr);
  };
  const currPage1 = () => {
    let s = 0;
    let e = Math.min(len1, 4);
    let brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr(brr);
  };

  useEffect(() => {
    const init = () => {
      setStart(1);
      currPage();
    };
    init();
  }, [ListofPodcast, ListofPodcast2]);
  useEffect(() => {
    let adminTags = [];
    if (adminInfo !== null) {
      for (let i = 0; i < adminInfo.tags.length; i++) {
        adminTags.push(adminInfo.tags[i].tagname);
      }
      setTags(adminTags);
    }
  }, [adminInfo]);
  const searchFunction = () => {
    userPodcast.forEach((element) => {
      let x = element.podcastName.toLowerCase();
      x = x.search(searchTag.toLowerCase());
      if (x !== -1) {
        tempUserPodcast = [...tempUserPodcast, element];
      }
    });
    setListofPodcast([...tempUserPodcast]);
    setListofPodcast2([...tempUserPodcast]);
    let l = tempUserPodcast.length;
    let e = Math.min(l, 9);
    let ee = Math.min(l, 4);
    let cnt = 0;
    let brr = [];
    let brrr = [];
    tempUserPodcast.forEach((element) => {
      if (cnt < e) {
        brr.push(element);
      }
      if (cnt < ee) {
        brrr.push(element);
      }
      cnt++;
    });
    setArr([...brr]);
    setArr2([...brrr]);
    onHandleClick();
  };

  useEffect(() => {
    setTempArr(userPodcast);
    setListofPodcast([...userPodcast]);
    setListofPodcast2([...userPodcast]);
    let l = userPodcast.length;
    let e = Math.min(l, 9);
    let ee = Math.min(l, 4);
    let cnt = 0;
    let brr = [];
    let brrr = [];
    userPodcast.forEach((element) => {
      if (cnt < e) {
        brr.push(element);
      }
      if (cnt < ee) {
        brrr.push(element);
      }
      cnt++;
    });
    setArr([...brr]);
    setArr2([...brrr]);

    setLoading(false);
  }, [userPodcast]);
  useEffect(() => {
    setSuggestionToShow(suggestionArray);
  }, [suggestionArray]);
  useEffect(() => {
    if (searchTag === "") {
      setListofPodcast(userPodcast);
      setListofPodcast2(userPodcast);
    }
    let tempSuggestions = [];
    tempArr.forEach((element) => {
      let x = element.podcastName.toLowerCase();
      x = x.search(searchTag.toLowerCase());
      if (x !== -1) {
        tempSuggestions = [...tempSuggestions, element];
      }
    });
    setSuggestionArray(tempSuggestions);
  }, [searchTag]);
  function hide(obj) {
    if (obj === "filter-1" && active) {
      let el = document.getElementById(obj);
      el.style.display = "none";
      setActive(false);
    }
    if (obj === "obj" && theme) {
      let el = document.getElementById(obj);
      el.style.display = "none";
      setTheme(false);
    }

    if (obj === "filter-1" && !active) {
      let p = document.getElementById(obj);
      p.style.display = "block";
      setActive(true);
    }
    if (obj === "obj" && !theme) {
      let p = document.getElementById(obj);
      p.style.display = "block";
      setTheme(true);
    }
  }
  const handleClickTag = (event, tag) => {
    let element = event.currentTarget;
    if (element.style.backgroundColor === "rgb(95,80,163)") {
      element.style.backgroundColor = "#C2C2C2";
      let data = selectedTags;
      let data1 = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i] !== tag) {
          data1.push(data[i]);
        }
      }
      tagsSet.delete(tag);
      setSelectedTag(data);
    } else {
      let data = selectedTags;
      data.push(tag);
      element.style.backgroundColor = "rgb(95,80,163)";
      // setSelectedTag((oldArray) => [...oldArray, data]);
      tagsSet.add(tag);
      setSelectedTag(data);
    }
  };
  const myTimeout = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 2000);
    clearTimeout(myTimeout);
  };

  let len, len1;
  if (!Array.isArray(ListofPodcast)) {
    len = 0;
  } else {
    len = ListofPodcast.length;
  }
  if (!Array.isArray(ListofPodcast2)) {
    len1 = 0;
  } else {
    len1 = ListofPodcast2.length;
  }

  let intialArray = [];
  for (let i = 0; i < Math.min(9, len); i++) {
    intialArray.push(ListofPodcast[i]);
  }

  const onHandleClick = () => {
    setStart(1);
    currPage();
    setStart2(1);
    currPage1();
  };
  function onNext() {
    if (start * 9 > len) {
      return;
    }
    let s = 9 * start;
    let e = Math.min(len, 9 * (start + 1));
    setStart(start + 1);
    let brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr(brr);
  }
  function onNext1() {
    if (start2 * 4 > len1) {
      return;
    }
    let s = 4 * start2;
    let e = Math.min(len1, 4 * (start2 + 1));
    setStart2(start2 + 1);
    let brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr(brr);
  }
  function onPrev() {
    if (9 * (start - 2) < 0) {
      return;
    }
    let s = Math.max(0, 9 * (start - 2));
    let e = Math.min(Math.abs(9 * (start - 1)), len);
    setStart(start - 1);
    let brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr(brr);
  }
  function onPrev1() {
    if (4 * (start2 - 2) < 0) {
      return;
    }
    let s = Math.max(0, 4 * (start2 - 2));
    let e = Math.min(Math.abs(4 * (start2 - 1)), len1);
    setStart2(start2 - 1);
    let brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr(brr);
  }

  return loading === true ? (
    <Loader />
  ) : (
    <div className="md:h-screen scrollbar-hide flex flex-col justify-between">
      <div className="w-full relative">
        <div className="  bg-white md:hidden">
          <NavigationMobile />
        </div>
      </div>
      <div className="hidden h-[14.5%] md:block">
        <NavigationWebPage />
      </div>
      <div className=" flex flex-row drop-shadow-lg md:pt-0 w-4/5 pl-3 pt-4 z-1 relative md:hidden ">
        <input
          className=" w-full  rounded-lg rounded-r-none indent-5 outline-none border-none border-transparent focus:border-transparent focus:ring-0 placeholder:text-[#43176F] "
          type="text"
          value={searchTag}
          placeholder="Search"
          onChange={(e) => setSearchTag(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => myTimeout()}
        />
        <div
          className={
            showSuggestions === true
              ? "top-[100%] w-full   min-h-4 absolute px-4 py-2 flex flex-col gap-2 bg-white rounded-b-lg"
              : "hidden"
          }
        >
          {suggestionToShow.length > 0 && searchTag.length > 0 ? (
            suggestionToShow.map((item, index) => {
              return (
                <div
                  className="cursor-pointer border-2 border-b-2 border-emerald-50 w-full"
                  key={index}
                  onClick={() => {
                    setSearchTag(item.podcastName);
                  }}
                >
                  {item.podcastName}
                </div>
              );
            })
          ) : (
            <div className="opacity-[0.5] italic">Searching...</div>
          )}
        </div>
        <div
          className="p-2 pl-3 pr-3 bg-[#5F50A3] rounded-lg m-auto h-full  flex flex-col justify-center items-center -ml-3 cursor-pointer"
          onClick={() => {
            searchFunction();
          }}
        >
          <BiSearch color="white" size="22" />
        </div>
      </div>
      <div className="md:flex flex-col justify-between md:h-[85.5%]  ">
        <div className="md:flex md:flex-row md:w-full md:h-[85.5%] pt-3">
          <div className="  flex flex-row md:w-[25%] md:h-[100%] md:justify-center">
            <div className="flex flex-col pt-2 ml-4 md:ml-0 md:pt-[26%]   md:pl-1 lg:w-full lg:ml-0 xl:w-5/6 ">
              <div
                className="flex flex-row text-[#5F50A3] font-bold md:pl-[15%] lg:pl-[10%] xl:pl-[5%]   "
                onClick={() => hide("filter-1")}
              >
                FILTER
              </div>
              <div
                className="hidden md:flex flex-row ml-6 p-1 md:pt-3 md:pr-4 md:visible overflow-y-hidden scrollbar-hide   "
                id="filter-1"
              >
                <div className="flex flex-col">
                  <div className="flex flex-row items-center ">
                    {/* <span className="pr-2">+</span> */}
                    <span
                      className="pt-1"
                      onClick={() => {
                        setShow(!show);
                      }}
                    >
                      Tags
                    </span>
                  </div>
                  {/* "hidden md:flex flex-wrap md:text-xs lg:text-sm lg:w-full */}
                  {/* lg:ml-0 text-black xl:ml-4 " */}

                  <div
                    className={
                      show
                        ? ` flex flex-wrap w-[70%] md:w-full  md:text-md lg:text-sm lg:w-full gap-1 md:gap-0 overflow-auto  py-2  `
                        : `hidden`
                    }
                    id="obj2"
                  >
                    {tags &&
                      tags?.slice(0).map((tag, index) => {
                        return (
                          <div className="mt-4" key={index}>
                            <span
                              className={`pt-1 pb-1 px-2 bg-[#C2C2C2] rounded-2xl mx-1 my-1 cur`}
                              index={index}
                              onClick={(e) => handleClickTag(e, tag)}
                            >
                              {tag}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                  <button
                    onClick={() => {
                      TagSortingFucntion(
                        tagsSet,
                        setArr,
                        userPodcast,
                        setListofPodcast
                      );
                      onHandleClick();
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col   p-1 sm:p-5 md:p-0 md:w-[75%] md:h-[100]%">
            <div className="flex flex-row justify-between md:h-[10%] p-2">
              <div className=" hidden md:flex  md:flex-row   md:visible w-1/2 ">
                <div className=" flex flex-row drop-shadow-lg md:pt-0  z-10  relative md:w-8/12 lg:w-7/12   ">
                  <input
                    className=" w-full  rounded-lg rounded-r-none indent-5 outline-none border-none border-transparent focus:border-transparent focus:ring-0 placeholder:text-[#43176F] "
                    type="text"
                    value={searchTag}
                    placeholder="Search"
                    onChange={(e) => setSearchTag(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => myTimeout()}
                  />
                  <div
                    className={
                      showSuggestions === true
                        ? "top-[100%] w-[96%] left-0 min-h-4 absolute px-4 py-2 flex flex-col gap-2 bg-white rounded-b-lg"
                        : "hidden"
                    }
                  >
                    {suggestionToShow.length > 0 && searchTag.length > 0 ? (
                      suggestionToShow.map((item, index) => {
                        return (
                          <div
                            className="cursor-pointer border-2 border-b-2 border-emerald-50 w-full"
                            key={index}
                            onClick={() => {
                              setSearchTag(item.podcastName);
                            }}
                          >
                            {item.podcastName}
                          </div>
                        );
                      })
                    ) : (
                      <div className="opacity-[0.5] italic">Searching...</div>
                    )}
                  </div>
                  <div
                    className="p-2 pl-3 pr-3 bg-[#5F50A3] rounded-lg m-auto h-full  flex flex-col justify-center items-center -ml-3 cursor-pointer"
                    onClick={() => {
                      searchFunction();
                    }}
                  >
                    <BiSearch color="white" size="22" />
                  </div>
                </div>
              </div>
              <div className=" hidden  md:flex flex-col md:visible justify-end mr-[6.5%] ">
                <div className=" hidden md:flex flex-col md:visible  ">
                  <span className="text-[#5F50A3] font-bold ">
                    LIST OF PODCAST
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col overflow-scroll  justify-center md:hidden ">
              {Array.isArray(arr) &&
                arr.map((pod, index) => {
                  return (
                    user.unique_id === pod?.sellerId && (
                      <PodcastWidgetMobile
                        key={index}
                        episodename={pod.episodeName}
                        podcastname={pod.podcastName}
                        image={pod.image}
                        tags={pod.tags}
                      />
                    )
                  );
                })}
            </div>
            <div className="flex md:hidden flex-row mt-auto  justify-around">
              <div className="w-[50%] flex flex-row justify-center items-center  py-3">
                <BsArrowLeftCircleFill
                  className="cursor-pointer"
                  size={25}
                  color="#5F50A3"
                  onClick={() => onPrev1()}
                />
              </div>
              <div className="w-[50%]  flex flex-row justify-center items-center py-3">
                <BsArrowRightCircleFill
                  className="cursor-pointer "
                  size={25}
                  color="#5F50A3"
                  onClick={() => onNext1()}
                />
              </div>
            </div>
            <div className="hidden  md:grid md:grid-cols-2 py-3 pt-8  lg:grid-cols-2 xl:grid-cols-3 gap-5 mr-[6%] scrollbar-hide  overflow-y-scroll scroll-smooth ">
              {arr &&
                arr?.map((pod, index) => {
                  return (
                    user.unique_id === pod.sellerId && (
                      <PodcastWidget
                        key={index}
                        episodename={pod.episodeName}
                        podcastname={pod.podcastName}
                        image={pod.image}
                        tags={pod.tags}
                      />
                    )
                  );
                })}
            </div>
            <div className="hidden md:flex flex-row mt-auto  justify-around">
              <div className="w-[50%] flex flex-row justify-center items-center  py-3">
                <BsArrowLeftCircleFill
                  className="cursor-pointer"
                  size={25}
                  color="#5F50A3"
                  onClick={() => onPrev()}
                />
              </div>
              <div className="w-[50%]  flex flex-row justify-center items-center py-3">
                <BsArrowRightCircleFill
                  className="cursor-pointer "
                  size={25}
                  color="#5F50A3"
                  onClick={() => onNext()}
                />
              </div>
            </div>
          </div>
        </div>
        <FooterMobile />
        <div className="flex flex-row justify-center p-1 bg-[#D9D9D97A] visible md:hidden">
          PODFORM 2022 © All Rights Reserved{" "}
        </div>
        <div className="hidden md:block">
          <FooterWebPage />
        </div>
      </div>
    </div>
  );
};

export default SellerFilterPage;
