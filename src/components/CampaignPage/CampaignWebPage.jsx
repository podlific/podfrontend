import React, { useEffect, useState } from "react";
import FooterMobile from "../shared/Mobile/FooterMobile";
import FooterWebPage from "../shared/WebPage/FooterWebPage";
import NavigationWebPage from "../shared/WebPage/NavigationWebPage";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { MdGroups } from "react-icons/md";
import { HiPhotograph } from "react-icons/hi";
import { ImPriceTags } from "react-icons/im";
import Loader from "../Loader/Loader";
const CampaignWebPage = ({
  ListofPodcast,
  setListofPodcast,
  currPodcastInfo,
  setCurrentPodcastInfo,
}) => {
  let { id } = useParams();
  let navigate = useNavigate();
  const usertype = useSelector((state) => state.activate.usertype);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (usertype.usertype === "seller") {
      navigate("/login");
    }
    if (ListofPodcast.length === 0) {
      navigate("/buyerdashboard");
    }
    if (usertype.usertype === "admin") {
      navigate("/admindashboard");
    }

    if (!Array.isArray(ListofPodcast)) {
      navigate("/login");
    }
    let check = 0;
    for (let i = 0; i < ListofPodcast.length; i++) {
      if (id === ListofPodcast[i]._id) {
        setCurrentPodcastInfo(ListofPodcast[i]);
        check = 1;
        setLoading(false);
        break;
      }
    }
    if (check === 0) {
      navigate("/buyerdashboard");
    }
  }, []);

  const handleClick = () => {
    navigate("../requestcampaign");
  };

  return loading === true ? (
    <Loader />
  ) : (
    <div className=" h-screen flex flex-col  ">
      {/* md:h-[12%] lg:h-[15%] xl:h-[17%] */}
      <div className=" hidden md:flex flex-col    ">
        <NavigationWebPage />
      </div>

      {/* Mobile Design  */}
      {/* <div className="flex flex-col p-3  md:hidden">
        <div className=" flex flex-row  h-2/3  rounded-2xl relative shadow-md shadow-zinc-900 ">
          <img
            className=" w-[100%]  rounded-3xl  "
            src="../img-cover1.png"
            alt="logo-1"
          />
          <img
            className="w-[100%] absolute rounded-2xl  bottom-0"
            src="../Rectangle657.png"
            alt="img"
          />
        </div>
        <div className="flex flex-row mr-2">
          <div className="p-3">
            <img className="" src="../Facebook.png" alt="log" />
          </div>
          <div className="p-3">
            <img className="" src="../Twitter.png" alt="log" />
          </div>
          <div className="p-3">
            <img className="" src="../Instagram.png" alt="log" />
          </div>
          <div className="p-3">
            <img className="" src="../Youtube.png" alt="log" />
          </div>
          <div className="p-3">
            <img className="" src="../Slack.png" alt="log" />
          </div>
        </div>
      </div> */}

      {/* Web Design  */}

      <div className="m-4 flex flex-col md:flex md:flex-row md:h-[80%] md:m-0 overflow-y-scroll scrollbar-hide">
        <div className="  md:flex md:flex-col w-[100%]">
          <div className="h-1/4 flex flex-row  md:flex md:flex-row  md:h-[86%]  justify-center   w-[100%] ">
            <div className="flex flex-row justify-center w-[100%]  md:h-full  md:w-[95%] lg:w-[75%] xl:w-[70%]  relative  rounded-b-3xl rounded-t-3xl  shadow-md shadow-zinc-900  ">
              <img
                className=" md:h-full w-[100%] rounded-b-3xl  "
                src={`data:image/png;base64,${currPodcastInfo?.image}`}
                alt="logo-1"
              />
              <img
                className="h-1/2 hidden md:block md:h-full w-[100%] absolute rounded-b-3xl  bottom-0"
                src="../Rectangle657.png"
                alt="img"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center">
            <div className=" flex flex-row justify-between items-center  md:w-[95%] lg:w-[75%] xl:w-[70%]  ">
              <div className=" p-2 md:p-0 flex flex-row justify-between ">
                <div className="md:p-3 xl:pl-3">
                  <img className="" src="../Facebook.png" alt="log" />
                </div>
                <div className="md:p-3 xl:pl-9">
                  <img className="" src="../Twitter.png" alt="log" />
                </div>
                <div className="md:p-3 xl:pl-9">
                  <img className="" src="../Instagram.png" alt="log" />
                </div>
                <div className="md:p-3 xl:pl-9">
                  <img className="" src="../Youtube.png" alt="log" />
                </div>
                <div className="md:p-3 xl:pl-9">
                  <img className="" src="../Slack.png" alt="log" />
                </div>
              </div>
              <div className="flex flex-row p-2 md:p-3">
                <div
                  className="flex whitespace-nowrap md:flex-row rounded-full bg-[#9B3FF7] p-2   md:p-2 lg:p-3 text-xs md:text-base font-medium text-white"
                  onClick={() => handleClick()}
                >
                  Request for Campaign
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center ">
            <div className="flex flex-col md:flex-row  p-2 md:w-[95%] lg:w-[75%] xl:w-[70%] relative">
              <div className=" flex flex-col md:flex-row lg:w-[80%]  relative bg-[#F2F2F2] rounded-md shadow-md shadow-zinc-800">
                <div className="flex flex-col p-3 xl:pr-4 xl:mr-4">
                  <span className="md:text-sm font-semibold">
                    Average Listners
                  </span>
                  <span className="md:text-2xl font-semibold">
                    {currPodcastInfo?.averageListener}
                  </span>
                  <div className="flex flex-row md:text-sm items-center font-semibold">
                    <span>
                      <img className="" src="../icons/g4.png" alt="g4" />
                    </span>
                    <span className="text-[#2DF595]">+33.7% </span>
                    <span className="text-[#999999] ml-1"> vs last week</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="h-[65%] border-r border-[#C4C4C4]"></div>
                </div>
                <div className="flex flex-col p-3 xl:pr-7">
                  <span className="md:text-sm font-semibold">
                    Average Episode Length
                  </span>
                  <span className="md:text-2xl font-semibold">
                    {currPodcastInfo?.averageEpisodeLength}
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="h-[65%] border-r border-[#C4C4C4]"></div>
                </div>
                <div className="flex flex-col p-3 xl:pr-7 xl:mr-6">
                  <span className="md:text-sm font-semibold">Average LTR</span>
                  <span className="md:text-2xl font-semibold">
                    {currPodcastInfo?.averageLTR}
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="h-[65%] border-r border-[#C4C4C4]"></div>
                </div>
                <div className="flex flex-col p-3 xl:pr-16">
                  <span className="md:text-sm font-semibold ">
                    Release Frequency
                  </span>
                  <span className="md:text-2xl font-semibold">
                    {currPodcastInfo?.releaseFrequency}
                  </span>
                </div>
              </div>
              <div className="hidden md:flex flex-col justify-center items-center md:p-6 md:pl-4 md:pr-4 lg:p-6  absolute right-0 rounded-md bg-[#FFFFFF] shadow-md shadow-zinc-800">
                <div className="mb-1">
                  <img
                    className="w-6 bg-white "
                    src="../icons/shopping-cart.svg"
                    alt="cart"
                  />
                </div>
                <span className="p- font-medium text-[#8e4dd0]">
                  Ad Product
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center mt-5 ">
            <div className="flex flex-col md:flex-row  p-2 md:w-[95%] lg:w-[75%] xl:w-[70%] relative">
              <div className="w-full md:w-2/3  p-2 shadow-md shadow-zinc-900 rounded-lg">
                <div className="flex flex-row p-2">
                  <MdGroups size={22} />
                  <span className="ml-2 font-semibold text-[#343C44]">
                    Target Group
                  </span>
                </div>
                <div className="p-2 flex flex-wrap ">
                  {currPodcastInfo &&
                    currPodcastInfo?.groups.map((group, index) => {
                      return (
                        <span
                          className="p-1 pl-2 m-1 pr-2  rounded-xl bg-[#34C759] text-white"
                          key={index}
                        >
                          {group}
                        </span>
                      );
                    })}
                </div>
              </div>
              <div className="w-full md:w-2/4 md:mx-3 p-2 shadow-md shadow-zinc-900 rounded-lg">
                <div className="flex flex-row p-2">
                  <HiPhotograph size={22} />
                  <span className="ml-2 font-semibold text-[#343C44]">
                    Themes of Show
                  </span>
                </div>
                <div className="p-2 flex flex-wrap ">
                  {currPodcastInfo &&
                    currPodcastInfo?.theme.map((t, index) => {
                      return (
                        <span
                          className="p-1 pl-2 m-1 pr-2  rounded-xl bg-[#34C759] text-white"
                          key={index}
                        >
                          {t}
                        </span>
                      );
                    })}
                </div>
              </div>
              <div className="w-full md:w-1/3 p-2 shadow-md shadow-zinc-900 rounded-lg">
                <div className="flex flex-row p-2">
                  <ImPriceTags size={22} />
                  <span className="ml-2 font-semibold text-[#343C44]">
                    Tags
                  </span>
                </div>
                <div className="p-2 flex flex-wrap ">
                  {currPodcastInfo &&
                    currPodcastInfo?.tags.map((tag, index) => {
                      return (
                        <span
                          className="p-1 pl-2 m-1 pr-2  rounded-xl bg-[#34C759] text-white"
                          key={index}
                        >
                          {tag}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:flex-col md:visible  justify-end  ">
        <FooterWebPage />
      </div>
      <div className="  md:hidden  ">
        <FooterMobile />
      </div>
    </div>
  );
};

export default CampaignWebPage;

/// slide code here
//  <div className="flex flex-row justify-center mt-3 ">
//    <div className="flex flex-col  p-2 md:w-[95%] lg:w-[75%] xl:w-[70%] relative">
//      <span className="font-medium text-[#616161]">$ Price Range</span>
//      <div className="w-[60%]">
//        <ThemeProvider theme={theme}>
//          <Slider
//            defaultValue={10}
//            aria-label="Default"
//            valueLabelDisplay="auto"
//            max={150}
//            size="medium"
//            width="10px"
//            color="primary"
//            step={10}
//            marks
//          />
//        </ThemeProvider>
//        <div className="flex flex-row justify-between font-medium -mt-5 ">
//          <span>$ 0 </span>
//          <span>$150 </span>
//        </div>
//      </div>
//    </div>
//  </div>;
