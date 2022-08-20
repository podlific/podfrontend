import React, { useState } from "react";
import FooterMobile from "../shared/Mobile/FooterMobile";
import NavigationMobile from "../shared/Mobile/NavigationMobile";
import FooterWebPage from "../shared/WebPage/FooterWebPage";
import NavigationWebPage from "../shared/WebPage/NavigationWebPage";

const UserCampaignPage = ({ requestPodcast, setRequestPodcast }) => {
  const [showLine1, setShowLine1] = useState(true);
  const [showLine2, setShowLine2] = useState(false);
  const [currPodcast, setCurrPodcast] = useState({});
  return (
    <div className="flex flex-col  h-screen">
      <div className="hidden md:block">
        <NavigationWebPage />
      </div>
      <div className="md:hidden">
        <NavigationMobile />
      </div>
      <div className="h-full flex flex-col overflow-y-scroll w-full ">
        <div className="h-full w-full flex flex-col ">
          <div className="w-full flex flex-row p-2 lg:p-3 xl:px-16">
            <div
              className={
                showLine1 === true
                  ? "font-medium border-b-2 border-[#5F50A3] cursor-pointer"
                  : "font-medium cursor-pointer"
              }
              onClick={() => {
                setShowLine1(true);
                setShowLine2(false);
              }}
            >
              Requests
            </div>
            <div
              className={
                showLine2 === true
                  ? "font-medium border-b-2 border-[#5F50A3] ml-4 cursor-pointer"
                  : "font-medium ml-4 cursor-pointer"
              }
              onClick={() => {
                setShowLine1(false);
                setShowLine2(true);
              }}
            >
              Confirmed
            </div>
          </div>
          <div className="w-full h-full flex flex-row rounded-xl ">
            <div className="w-1/2 h-full flex flex-col overflow-y-scroll scrollbar-hide  bg-[#B198FF] mx-1 rounded-lg ">
              {requestPodcast &&
                requestPodcast.map((request, index) => {
                  return request.confirmed === "false" && showLine1 === true ? (
                    <div
                      className="w-full p-2 lg:p-3 xl:px-16 font-medium"
                      onClick={() => setCurrPodcast(request)}
                      key={index}
                    >
                      <div
                        className="text-sm md:text-base grid grid-rows-2 grid-cols-2 md:grid-rows-3 md:grid-cols-2 rounded-lg text-black p-1 mb-4 bg-[#f2f4f5] box-shadow-[2px 2px 6px rgba(0, 0, 0, 0.1)] hover:cursor-pointer 
       border-2 hover:border-solid hover:border-[#0063ff] shadow-md rounded-2xl"
                      >
                        <div className="flex flex-col justify-center">
                          Podcast Name
                        </div>
                        <div className="flex flex-col justify-center">
                          {request.podcastname}
                        </div>
                        <div className="flex flex-col justify-center">
                          Buyer Name
                        </div>
                        <div className="flex flex-col justify-center">
                          {request.buyername}
                        </div>
                        <div className="hidden md:flex flex-col justify-center">
                          Preferred Date & Time
                        </div>
                        <div className=" hidden md:flex flex-col justify-center">
                          {request.date} & {request.time}
                        </div>
                      </div>
                    </div>
                  ) : request.confirmed === "true" && showLine2 === true ? (
                    <div
                      className="w-full p-2 lg:p-3 xl:px-16 text-black bg-[#B198FF]  font-medium "
                      onClick={() => setCurrPodcast(request)}
                      key={index}
                    >
                      <div
                        className="text-sm md:text-base grid grid-rows-2 grid-cols-2 md:grid-rows-3 md:grid-cols-2 rounded-lg  p-1 bg-[#f2f4f5] box-shadow-[2px 2px 6px rgba(0, 0, 0, 0.1)] hover:cursor-pointer 
       border-2 hover:border-solid hover:border-[#0063ff] shadow-md rounded-2xl"
                      >
                        <div className="flex flex-col justify-center">
                          Podcast Name
                        </div>
                        <div className="flex flex-col justify-center">
                          {request.podcastname}
                        </div>
                        <div className="flex flex-col justify-center">
                          Buyer Name
                        </div>
                        <div className="flex flex-col justify-center">
                          {request.buyername}
                        </div>
                        <div className="hidden md:flex flex-col justify-center">
                          Preferred Date & Time
                        </div>
                        <div className=" hidden md:flex flex-col justify-center">
                          {request.date} & {request.time}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={index}></div>
                  );
                })}
            </div>
            <div className="w-1/2 h-full flex flex-col justify-center   bg-[#B198FF] mx-1 rounded-lg  ">
              <div className="w-full md:p-5 py-10  h-full ">
                <div
                  className="grid grid-cols-2 grid-rows rounded-lg text-black  p-4 gap-y-5  font-medium bg-[#f2f4f5] box-shadow-[2px 2px 6px rgba(0, 0, 0, 0.1)] hover:cursor-pointer 
                    border-2 hover:border-solid hover:border-[#0063ff] shadow-md rounded-2xl"
                >
                  <div className="flex flex-col justify-center">
                    Podcast Name
                  </div>
                  <div className="flex flex-col justify-center">
                    {currPodcast.podcastname}
                  </div>
                  <div className="flex flex-col justify-center">Buyer Name</div>
                  <div className="flex flex-col justify-center">
                    {currPodcast.buyername}
                  </div>
                  <div className="hidden md:flex flex-col justify-center">
                    Fixed Date & Time
                  </div>
                  <div className=" hidden md:flex flex-col justify-center">
                    {currPodcast.date} & {currPodcast.time}
                  </div>
                  <div className="flex flex-col justify-center">
                    Buyer client
                  </div>
                  <div className="flex flex-col justify-center">
                    {currPodcast.client}
                  </div>
                  <div className="flex flex-col justify-center">Product</div>
                  <div className="flex flex-col justify-center">
                    {currPodcast.product}
                  </div>
                  <div className="flex flex-col justify-center">
                    Target Group
                  </div>
                  <div className="flex flex-col justify-center">
                    {currPodcast.targetgroup}
                  </div>
                  <div className="flex flex-col justify-center">
                    Additional Info on Target Group
                  </div>
                  <div className="flex flex-col justify-center">
                    {currPodcast.targetgroup}
                  </div>
                  <div className="flex flex-col justify-center">
                    Description
                  </div>
                  <div className="flex flex-col justify-center">
                    {currPodcast.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <FooterWebPage />
      </div>
      <div className="md:hidden">
        <FooterMobile />
      </div>
    </div>
  );
};

export default UserCampaignPage;
//  <div className="w-full p-2 lg:p-3 xl:px-16 text-white font-medium">
//    <div className="text-sm md:text-base grid grid-rows-2 grid-cols-2 md:grid-rows-3 md:grid-cols-2 rounded-lg bg-[#e664e1] p-1">
//      <div className="flex flex-col justify-center">Podcast Name</div>
//      <div className="flex flex-col justify-center">P Name</div>
//      <div className="flex flex-col justify-center">Buyer Name</div>
//      <div className="flex flex-col justify-center">B Name</div>
//      <div className="hidden md:flex flex-col justify-center">
//        Preferred Date & Time
//      </div>
//      <div className=" hidden md:flex flex-col justify-center">
//        11-08-2022 & 6:30pm
//      </div>
//    </div>
//  </div>;
