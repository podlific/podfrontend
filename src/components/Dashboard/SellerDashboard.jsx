import React, { useEffect } from "react";
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
import NavigationWebPage from "../shared/WebPage/NavigationWebPage";
const SellerDashboard = ({
  contacts,
  setContacts,
  userPodcast,
  adminInfo,
  userInfo,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.activate.unique_id);
  const usertype = useSelector((state) => state.activate.usertype);
  useEffect(() => {
    if (user.unique_id === "" || user.unique_id === undefined) {
      navigate("/login");
    }
    if (usertype.usertype === "admin") {
      navigate("/admindashboard");
    }
  }, []);

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
    <div className="h-screen flex flex-col w-full   ">
      <div className="w-full relative">
        <div className=" fixed  z-10 w-full bg-white md:hidden">
          <NavigationMobile />
        </div>
      </div>
      <div className="hidden md:flex flex-row w-full">
        <NavigationWebPage />
      </div>
      <div className="  h-full md:flex flex-row justify-between w-full ">
        <div className="w-[25%] flex flex-col items-center  justify-center -ml-4">
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
                <div className="flex flex-col justify-between items-center  ">
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
            <Link to="/sellerfilterpage">
              <div className="bg-[#B198FF] rounded-2xl md:text-xs mb-1  lg:p-1 lg:text-base">
                <div className="p-2">Browse Podcast</div>
              </div>
            </Link>
            <Link to="/userinfo">
              <div className="bg-[#B198FF] rounded-2xl md:text-xs mb-1  lg:p-1 lg:text-base">
                <div className="p-2 ">User Info</div>
              </div>
            </Link>
            <div className="bg-[#B198FF] rounded-2xl  md:text-xs   lg:p-1 lg:text-base">
              <div className="p-2">Help & Contact</div>
            </div>
          </div>
        </div>

        <div className="md:w-[75%]  items-end  flex flex-col md:justify-center  ">
          <div className=" px-4 mt-16 md:mt-0 py-2  flex flex-col justify-around pt-3 md:pb-1 md:pl-7 md:pr-7 w-full ">
            <div className="  flex flex-row  rounded-2xl bg-[#5F50A3] text-[#FFFFFF]  ">
              <div className=" ml-2 mt-2 w-full  flex flex-col">
                <div className="  md:p-3  lg:p-3 xl:text-">
                  <span className="font-medium">Platform News for Seller</span>
                </div>
                <div className=" lg:h-5/6 lg:pl-1 lg:pb-3 xl:h-5/6 w-full max-h-[200px] overflow-auto " style={{  scrollbarWidth:'0px'}}>
                  <div className=" w-full inline">
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
                {Array.isArray(userPodcast) &&
                  userPodcast
                    .filter((item, index) => index < 4)
                    .map((pod, index) => {
                      return (
                        user.unique_id === pod.sellerId && (
                          <PodcastWidget
                            key={index}
                            episodename={pod.episodeName}
                            podcastname={pod.podcastName}
                            tags={pod.tags}
                            image={pod.image}
                          />
                        )
                      );
                    })}
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

export default SellerDashboard;
