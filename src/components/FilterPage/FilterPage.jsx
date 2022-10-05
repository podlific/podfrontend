import React, { useEffect, useState } from "react";
import FooterMobile from "../shared/Mobile/FooterMobile";
import NavigationMobile from "../shared/Mobile/NavigationMobile";
import FooterWebPage from "../shared/WebPage/FooterWebPage";
import NavigationWebPage from "../shared/WebPage/NavigationWebPage";
import PodcastWidget from "../shared/WebPage/PodcastWidget";
import "react-multi-carousel/lib/styles.css";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";

import {
  TagSortingFucntion,
  handleClickTag,
  hide,
  onNext,
  onPrev,
  searchFunction,
} from "./FilterPageFunctions";
let tagsSet = new Set();

const FilterPage = ({
  ListofPodcast,
  setListofPodcast,
  currPodcastInfo,
  setCurrentPodcastInfo,
  setAdminInfo,
  adminInfo,
  overAllPodcastList,
  setOverAllPodcastList,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.activate.unique_id);
  const currtype = useSelector((state) => state.activate.usertype);
  useEffect(() => {
    if (user.unique_id === "" || user.unique_id === undefined) {
      navigate("/login");
    }
  }, [user.unique_id]);
  const [active, setActive] = useState(false);
  const [theme, setTheme] = useState(false);
  const [show, setShow] = useState(true);
  const [start, setStart] = useState(1);
  // const [Search, setSearch] = useState("");
  const [arr, setArr] = useState(ListofPodcast);
  const [arr2, setArr2] = useState(ListofPodcast);
  const [start2, setStart2] = useState(1);
  const [tempArr, setTempArr] = useState(ListofPodcast);
  const [searchTag, setSearchTag] = useState("");
  const [tags, setTags] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionArray, setSuggestionArray] = useState([]);
  const [suggestionToShow, setSuggestionToShow] = useState([]);
  let tempUserPodcast = [];
  // useEffect(() => {
  //   if (currtype.usertype === "admin") {
  //     navigate("../admindashboard");
  //   }
  //   const init = async () => {
  //     let data1 = {
  //       searchItem: "",
  //     };
  //     await api.post("/api/getpodcastfromsearch", data1).then((res) => {
  //       setOverAllPodcastList(res.data);
  //       setListofPodcast(res.data);
  //       // setTempArr(res.data);
  //       onHandleClick();
  //     });
  //   };
  //   if (ListofPodcast.length === 0) {
  //     init();
  //   }
  // }, []);
  useEffect(() => {
    if (currtype.usertype === "admin") {
      navigate("../admindashboard");
    }
    setTempArr(ListofPodcast);
    onHandleClick();
  }, [ListofPodcast]);
  function currPage() {
    let s = 0;
    let e = Math.min(len, 9);
    let brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr(brr);
    s = 0;
    e = Math.min(len, 4);
    brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr2(brr);
  }
  function currPage1() {
    let s = 0;
    let e = Math.min(len, 4);
    let brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr2(brr);
  }
  let len;
  if (!Array.isArray(ListofPodcast)) {
    len = 0;
  } else {
    len = ListofPodcast.length;
  }

  useEffect(() => {
    const init = () => {
      setStart(1);
      currPage();
      currPage1();
    };
    init();
  }, [ListofPodcast]);

  useEffect(() => {
    let adminTags = [];
    if (adminInfo !== null) {
      for (let i = 0; i < adminInfo.tags.length; i++) {
        adminTags.push(adminInfo.tags[i].tagname);
      }
      setTags(adminTags);
    }
  }, [adminInfo]);

  useEffect(() => {
    setSuggestionToShow(suggestionArray);
  }, [suggestionArray]);
  useEffect(() => {
    if (searchTag === "") {
      setListofPodcast(overAllPodcastList);
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

  const myTimeout = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 1500);
    clearTimeout(myTimeout);
  };

  function onHandleClick() {
    setStart(1);
    currPage();
    setStart2(1);
    currPage1();
  }

  return (
    <div className="md:h-screen scrollbar-hide flex flex-col justify-between">
      <div className="w-full relative">
        <div className=" z-10 bg-white md:hidden">
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
          onChange={(e) => {
            setSearchTag(e.target.value);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => myTimeout()}
        />

        <div
          className={
            showSuggestions === true
              ? "top-[100%] w-[96%]   min-h-4 absolute px-4 py-2 flex flex-col gap-2 bg-white rounded-b-lg"
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
            searchFunction(
              tempArr,
              searchTag,
              tempUserPodcast,
              setListofPodcast,
              setArr,
              setArr2,
              onHandleClick
            );
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
                onClick={() =>
                  hide("filter-1", active, setActive, theme, setTheme)
                }
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
                        ? ` flex flex-wrap w-[70%] md:w-full  md:text-md lg:text-sm lg:w-full gap-1 md:gap-0 overflow-auto  py-2 `
                        : `hidden`
                    }
                    id="obj2"
                  >
                    {tags &&
                      tags?.slice(0).map((tag, index) => {
                        return (
                          <div className="mt-4" key={index}>
                            <span
                              className={`pt-1 pb-1 px-2 bg-[#C2C2C2] rounded-2xl mx-1 my-1`}
                              index={index}
                              onClick={(e) => handleClickTag(e, tag, tagsSet)}
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
                        overAllPodcastList,
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
                <div className=" flex flex-row drop-shadow-lg md:pt-0 z-10   md:w-8/12 lg:w-7/12 relative  ">
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
                        ? "top-[100%] w-full left-0 min-h-4 absolute px-4 py-2 flex flex-col gap-2 bg-white rounded-b-lg"
                        : "hidden"
                    }
                  >
                    {suggestionToShow.length > 0 && searchTag.length > 0 ? (
                      suggestionToShow.map((item, index) => {
                        return (
                          <div
                            className="cursor-pointer  w-full"
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
                    className="p-2 pl-3 pr-3 bg-[#5F50A3] rounded-lg m-auto h-full  flex flex-col justify-center items-center -ml-3"
                    onClick={() =>
                      searchFunction(
                        tempArr,
                        searchTag,
                        tempUserPodcast,
                        setListofPodcast,
                        setArr,
                        setArr2,
                        onHandleClick
                      )
                    }
                  >
                    <BiSearch color="white" size="22" />
                  </div>
                </div>
              </div>
              <div className=" hidden  md:flex flex-col md:visible justify-end mr-[6.5%] ">
                <div className=" hidden md:flex flex-col md:visible  ">
                  <span className="text-[#5F50A3] font-bold hidden ">
                    LIST OF PODCAST
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col overflow-scroll  justify-center md:hidden ">
              {Array.isArray(arr2) &&
                arr2.map((pod, index) => {
                  return (
                    <Link to={`/campaign/${pod._id}`} key={index}>
                      <PodcastWidget
                        key={index}
                        episodename={pod.episodeName}
                        podcastname={pod.podcastName}
                        image={pod.image}
                        tags={pod.tags}
                      />
                    </Link>
                  );
                })}
            </div>
            <div className="flex md:hidden flex-row mt-auto  justify-around">
              <div className="w-[50%] flex flex-row justify-center items-center  py-3">
                <BsArrowLeftCircleFill
                  className="cursor-pointer"
                  size={25}
                  color="#5F50A3"
                  onClick={() =>
                    onPrev(start2, len, setStart2, ListofPodcast, setArr2, 4)
                  }
                />
              </div>
              <div className="w-[50%]  flex flex-row justify-center items-center py-3">
                <BsArrowRightCircleFill
                  className="cursor-pointer "
                  size={25}
                  color="#5F50A3"
                  onClick={() =>
                    onNext(start2, len, setStart2, ListofPodcast, setArr2, 4)
                  }
                />
              </div>
            </div>
            <div className="hidden  md:grid md:grid-cols-2 py-3 pt-8  lg:grid-cols-2 xl:grid-cols-3 gap-5 mr-[6%] scrollbar-hide  overflow-y-scroll scroll-smooth ">
              {arr &&
                arr.map((pod, index) => {
                  return (
                    <Link to={`/campaign/${pod._id}`} key={index}>
                      <PodcastWidget
                        key={index}
                        episodename={pod.episodeName}
                        podcastname={pod.podcastName}
                        image={pod.image}
                        tags={pod.tags}
                      />
                    </Link>
                  );
                })}
            </div>
            <div className="hidden md:flex flex-row mt-auto  justify-around">
              <div className="w-[50%] flex flex-row justify-center items-center  py-3">
                <BsArrowLeftCircleFill
                  className="cursor-pointer"
                  size={25}
                  color="#5F50A3"
                  onClick={() =>
                    onPrev(start, len, setStart, ListofPodcast, setArr, 9)
                  }
                />
              </div>
              <div className="w-[50%]  flex flex-row justify-center items-center py-3">
                <BsArrowRightCircleFill
                  className="cursor-pointer "
                  size={25}
                  color="#5F50A3"
                  onClick={() =>
                    onNext(start, len, setStart, ListofPodcast, setArr, 9)
                  }
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

export default FilterPage;
