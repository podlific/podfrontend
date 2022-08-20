import React, { useEffect, useState } from "react";
import FooterWebPage from "../shared/WebPage/FooterWebPage";
import PodcastWidget from "../shared/WebPage/PodcastWidget";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterMobile from "../shared/Mobile/FooterMobile";
import api from "../../config/axios";
import {
  MdOutlineForwardToInbox,
  MdOutlineMoveToInbox,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import NavigationMobile from "../shared/Mobile/NavigationMobile";
const Dashboard = ({ contacts, setContacts, adminInfo, userInfo }) => {
  const navigate = useNavigate();
  const [showList, setShowList] = useState([]);
  const [ListofPodcast, setListofPodcast] = useState([]);
  const currtype = useSelector((state) => state.activate.usertype);
  const user = useSelector((state) => state.activate.unique_id);
  useEffect(() => {
    if (user.unique_id === "" || user.unique_id === undefined) {
      navigate("/login");
    }
    if (currtype.usertype === "admin") {
      navigate("../admindashboard");
    }
  }, []);
  useEffect(() => {
    const init = async () => {
      let data1 = {
        searchItem: "",
      };
      const info = await api
        .post("/api/getpodcastfromsearch", data1)
        .then((res) => {
          setShowList(res.data);
        });
    };
    init();
  }, []);

  useEffect(() => {
    setListofPodcast(showList);
  }, [showList]);
  const data = {
    currUserId: user.unique_id,
  };
  useEffect(() => {
    async function getcontacts() {
      const cont = await api.post("/api/getconnected", data);
      if (cont) {
        if (cont !== contacts) {
          setContacts(cont.data);
        }
      }
    }

    if (user.unique_id !== "" || user.unique_id !== undefined) {
      getcontacts();
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-between  ">
      <div className="w-full relative">
        <div className=" fixed  z-10 w-full bg-white md:hidden">
          <NavigationMobile />
        </div>
      </div>
      <div className="  h-full md:flex flex-row  overflow-auto ">
        <div className="w-1/4 flex flex-col items-center">
          <div className=" hidden h-1/4 w-2/3 md:flex flex-col justify-center">
            <img
              className="w-full h-10 ml-0 mt-0 place-self-start overflow-y-hidden md:ml-0 md:mt-0 md:h-20 md:w-full lg:ml-0  lg:w-full"
              src="./logo.png"
              alt="logo"
            />
          </div>
          <div className=" hidden md:h-3/6 lg:h-2/6 w-2/3  md:flex flex-col justify-center items-center rounded-xl bg-gradient-to-b from-gray-200/100 to-gray-50  shadow-lg">
            <div className=" flex flex-row justify-center p-2 ">
              <img
                className=" md:h-16 md:w-16 "
                src="./ellipse4.png"
                alt="icon"
              />
            </div>

            <div className="pb-2 w-5/6 border-b border-zinc-400/80 flex justify-center  font-black  tracking-wide">
              {userInfo?.name}
            </div>

            <div className=" w-5/6 flex flex-row justify-around pt-1  ">
              <Link to="/usercampaignpage">
                <div className=" flex flex-col justify-evenly items-center ">
                  <MdOutlineMoveToInbox size={26} />
                  <span className="text-xs p-1 font-semibold">Campaigns</span>
                </div>
              </Link>
              <Link to="/chat">
                <div className="flex flex-col justify-between items-center  ">
                  <MdOutlineForwardToInbox size={26} />
                  <span className="text-xs p-1 font-semibold">Messages</span>
                </div>
              </Link>
            </div>
          </div>
          <div className=" hidden h-1/4 w-2/3 md:flex flex-col justify-evenly text-center text-[#FFFFFF] mt-4 ">
            <Link to="/podcast">
              <div className="  bg-[#B198FF] rounded-2xl md:text-xs mb-1  lg:p-1 lg:text-base">
                <div className="p-2">Browse Podcast</div>
              </div>
            </Link>
            <Link to="/userinfo">
              <div className=" bg-[#B198FF] rounded-2xl md:text-xs mb-1  lg:p-1 lg:text-base">
                <div className="p-2 ">User Info</div>
              </div>
            </Link>
            <div className=" bg-[#B198FF] rounded-2xl  md:text-xs   lg:p-1 lg:text-base">
              <div className="p-2">Help & Contact</div>
            </div>
          </div>
        </div>

        <div className="md:w-3/4  items-center  flex flex-col md:justify-evenly  ">
          <div className=" px-4 mt-16 md:mt-0 py-2  flex flex-col justify-around pt-3 md:pb-1 md:pl-7 md:pr-7 w-full ">
            <div className="  flex flex-row  rounded-2xl bg-[#5F50A3]  text-[#FFFFFF] w-full ">
              <div className=" ml-2 mt-2  w-full  flex flex-col">
                <div className="  md:p-3  lg:p-3 xl:text-">
                  <span className="font-medium">Platform News for Buyers</span>
                </div>
                <div className=" lg:h-5/6 lg:pl-1 lg:pb-3 xl:h-5/6 w-full">
                  <div className=" inline w-full">
                    <p className="md:text-xs lg:text-sm xl:text-lg md:p-2 lg:p-3">
                      {adminInfo?.broadcastmessages}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/4 md:w-1/6 flex flex-col justify-center">
                <div className=" flex flex-row justify-evenly ">
                  NEXT
                  <div>
                    <img className=" md:r-0 " src="./circle.png" alt="circle" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className=" w-full flex flex-col justify-center shrink">
            <div className=" md:w-full px-7  md:px-7 md:pt-0 pt-1 ">
              <span className="font-bold text-[#5F50A3]">
                TOP PICKS FOR THE DAY
              </span>
            </div>
            <div className="  md:w-full px-5 md:px-7 ">
              <div className="w-full flex flex-col py-3 md:py-0 md:pt-1  md:grid grid-rows-2  md:grid-cols-2 gap-2 shrink">
                {Array.isArray(ListofPodcast) &&
                  ListofPodcast.filter((item, index) => index < 4).map(
                    (pod, index) => {
                      return (
                        <Link to={`/campaign/${pod._id}`}>
                          <PodcastWidget
                            key={index}
                            episodename={pod.episodeName}
                            podcastname={pod.podcastName}
                            tags={pod.tags}
                            image={pod.image}
                          />
                        </Link>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <FooterMobile />
        </div>
      </div>
      <div className="hidden md:block">
        <FooterWebPage />
      </div>
    </div>
  );
};

export default Dashboard;
