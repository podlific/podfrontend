import React, { useEffect, useState } from "react";
import FooterMobile from "../shared/Mobile/FooterMobile";
import NavigationMobile from "../shared/Mobile/NavigationMobile";
import PodcastWidgetMobile from "../shared/Mobile/PodcastWidgetMobile";
import FooterWebPage from "../shared/WebPage/FooterWebPage";
import NavigationWebPage from "../shared/WebPage/NavigationWebPage";
import PodcastWidget from "../shared/WebPage/PodcastWidget";
import "react-multi-carousel/lib/styles.css";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
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
  const [selectedTags, setSelectedTag] = useState([]);
  const [active, setActive] = useState(false);
  const [theme, setTheme] = useState(false);
  const [show, setShow] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [start, setStart] = useState(1);
  const [Search, setSearch] = useState("");
  const [arr, setArr] = useState(ListofPodcast);
  const [arr2, setArr2] = useState(ListofPodcast);
  const [start2, setStart2] = useState(1);
  const [tempArr, setTempArr] = useState(ListofPodcast);
  const [searchTag, setSearchTag] = useState("");
  const [tags, setTags] = useState([]);
  const [targetGroups, setTargetGroups] = useState([]);
  const [themes, setThemes] = useState([]);
  const [showTargetGroups, setShowTargetGroups] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionArray, setSuggestionArray] = useState([]);
  const [suggestionToShow, setSuggestionToShow] = useState([]);
  let tempUserPodcast = [];
  useEffect(() => {
    if (currtype.usertype === "admin") {
      navigate("../admindashboard");
    }
    const init = async () => {
      let data1 = {
        searchItem: Search,
      };
      const info = await api
        .post("/api/getpodcastfromsearch", data1)
        .then((res) => {
          setOverAllPodcastList(res.data);
          setListofPodcast(res.data);
          setTempArr(res.data);
          onHandleClick();
        });
    };
    if (ListofPodcast.length === 0) {
      init();
    }
  }, []);
  function currPage() {
    let s = 0;
    let e = Math.min(len, 9);
    let brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr(brr);
    s = 0;
    e = Math.min(len1, 4);
    brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr2(brr);
  }
  function currPage1() {
    let s = 0;
    let e = Math.min(len1, 4);
    let brr = [];
    for (let i = s; i < e; i++) {
      brr.push(ListofPodcast[i]);
    }
    setArr2(brr);
  }
  let len, len1;
  if (!Array.isArray(ListofPodcast)) {
    len = 0;
  } else {
    len = ListofPodcast.length;
  }
  if (!Array.isArray(ListofPodcast)) {
    len1 = 0;
  } else {
    len1 = ListofPodcast.length;
  }
  useEffect(() => {
    const init = () => {
      setStart(1);
      currPage();
      currPage1();
    };
    init();
  }, [ListofPodcast]);
  // useEffect(() => {
  //   let tags = {
  //     tags: selectedTags,
  //   };
  //   const tagsSearch = async () => {
  //     let data1 = await api
  //       .post("/api/getpodcastfromtags", tags)
  //       .then((res) => {
  //         console.log(res.data[0]);
  //         setListofPodcast(res.data[0]);
  //         setStart(1);
  //         currPage();
  //       });
  //   };
  //   tagsSearch();
  // }, [selectedTags]);
  useEffect(() => {
    setTags(adminInfo?.tags);
    setThemes(adminInfo?.themes);
    setTargetGroups(adminInfo?.groups);
  }, [adminInfo]);
  const searchFunction = () => {
    tempArr.forEach((element) => {
      let x = element.podcastName.toLowerCase();
      x = x.search(searchTag.toLowerCase());
      if (x !== -1) {
        tempUserPodcast = [...tempUserPodcast, element];
      }
    });
    setListofPodcast([...tempUserPodcast]);
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
    if (element.style.backgroundColor === "rgb(148, 68, 124)") {
      element.style.backgroundColor = "#C2C2C2";
      let data = selectedTags;
      let data1 = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i] !== tag) {
          data1.push(data[i]);
        }
      }
      setSelectedTag(data);
    } else {
      let data = selectedTags;
      data.push(tag);
      element.style.backgroundColor = "rgb(148, 68, 124)";
      // setSelectedTag((oldArray) => [...oldArray, data]);
      setSelectedTag(data);
    }
  };

  let intialArray = [];
  for (let i = 0; i < Math.min(9, len); i++) {
    intialArray.push(ListofPodcast[i]);
  }

  function onHandleClick() {
    setStart(1);
    currPage();
    setStart2(1);
    currPage1();
  }
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
    setArr2(brr);
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
    setArr2(brr);
  }

  return (
    <div className="md:h-screen scrollbar-hide flex flex-col justify-between">
      <div className="w-full relative">
        <div className=" fixed  z-10 w-full bg-white md:hidden">
          <NavigationMobile />
        </div>
      </div>
      <div className="hidden h-[14.5%] md:block">
        <NavigationWebPage />
      </div>
      <div className=" flex flex-row drop-shadow-lg md:pt-0 w-4/5 pl-3 pt-20 z-10 relative md:hidden ">
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
                    // console.log(item.podcastName);
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
                <ol className="flex flex-col text-[#716d6d] gap-2">
                  <li
                    className="pt-1"
                    onClick={() => {
                      setShowTargetGroups(!showTargetGroups);
                    }}
                  >
                    <span className="pr-2">+</span>
                    <span className="">Target Group </span>
                  </li>
                  <div
                    className={
                      showTargetGroups
                        ? ` flex flex-wrap w-[70%] md:w-full  md:text-md lg:text-sm lg:w-full gap-1 md:gap-0 overflow-auto py-2  `
                        : `hidden`
                    }
                    id="obj2"
                  >
                    {targetGroups?.slice(0).map((tag, index) => {
                      return (
                        <div className="mt-4" key={index}>
                          <span
                            className={`pt-1 pb-1 px-2 bg-[#C2C2C2] rounded-2xl mx-1 my-1`}
                            index={index}
                            onClick={(e) => handleClickTag(e, tag)}
                          >
                            {tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <li
                    className="pt-1 "
                    onClick={() => setShowThemes(!showThemes)}
                  >
                    <span className="pr-2">+</span>
                    <span>Themes</span>
                  </li>
                  <div
                    className={
                      showThemes
                        ? "flex flex-wrap w-[70%] md:w-full  md:text-md lg:text-sm lg:w-full gap-1 md:gap-0 overflow-auto py-2 "
                        : "hidden"
                    }
                    id="obj"
                  >
                    {themes?.slice(0).map((tag, index) => {
                      return (
                        <div className="mt-4" key={index}>
                          <span
                            className={`pt-1 pb-1 px-2 bg-[#C2C2C2] rounded-2xl mx-1 my-1`}
                            index={index}
                            onClick={(e) => handleClickTag(e, tag)}
                          >
                            {tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-row items-center ">
                    <span className="pr-2">+</span>
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
                    {tags?.slice(0).map((tag, index) => {
                      return (
                        <div className="mt-4" key={index}>
                          <span
                            className={`pt-1 pb-1 px-2 bg-[#C2C2C2] rounded-2xl mx-1 my-1`}
                            index={index}
                            onClick={(e) => handleClickTag(e, tag)}
                          >
                            {tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </ol>
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
                              // console.log(item.podcastName);
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
                    onClick={() => searchFunction()}
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
              {Array.isArray(arr2) &&
                arr2.map((pod, index) => {
                  return (
                    <Link to={`/campaign/${pod._id}`}>
                      <PodcastWidgetMobile
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
                arr.map((pod, index) => {
                  return (
                    <Link to={`/campaign/${pod._id}`}>
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

export default FilterPage;
