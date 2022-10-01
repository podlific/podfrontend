import React, { useEffect, useState } from "react";
import FooterMobile from "../shared/Mobile/FooterMobile";
import NavigationMobile from "../shared/Mobile/NavigationMobile";
import FooterWebPage from "../shared/WebPage/FooterWebPage";
import NavigationWebPage from "../shared/WebPage/NavigationWebPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImBin } from "react-icons/im";
import { AiOutlineEye } from "react-icons/ai";

const UserCampaignPage = ({ requestPodcast, setRequestPodcast }) => {
  console.log(requestPodcast,"aaaaaaa")
  let navigate = useNavigate();
  const [showLine1, setShowLine1] = useState(true);
  const [showLine2, setShowLine2] = useState(false);
  const [showIndex ,setShowIndex]  = useState(null)
  const [showIndex1 ,setShowIndex1]  = useState(null)
  const [currPodcast, setCurrPodcast] = useState({});
  const currtype = useSelector((state) => state.activate.usertype);
  useEffect(() => {
    if (currtype.usertype === "admin") {
      navigate("../admindashboard");
    }
    // console.log(requestPodcast);
  }, []);
  const [requestArray , setRequestArray ] = useState([]);
  const [confirmedArray , setConfirmedArray ] = useState([]);
  useEffect(()=>{
    let tempArray =[] , tempArray1= [];
    requestPodcast.forEach((element)=>{
       if(element.confirmed==="true"){
         tempArray.push(element)
       }
       if(element.confirmed==="false"){
        tempArray1.push(element);
       }
    })
    setRequestArray(tempArray1);
    setConfirmedArray(tempArray)

  },[requestPodcast])
  const [colasp,setColasp]=useState([])
  
  return (
    <div className="flex flex-col  h-screen">
      <div className="hidden md:block">
        <NavigationWebPage />
      </div>
      <div className="md:hidden">
        <NavigationMobile />
      </div>
      <div className="h-full flex flex-col  w-full ">
        <div className="h-full w-[97%] flex flex-col ml-[1.5%] ">
          <div className="w-full flex flex-row p-2 lg:p-3 xl:px-16 ">
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
         
            <div className=" h-full w-full text-center overflow-auto  mx-1 rounded-lg ">
              <div className="grid grid-cols-5 bg-[#F0F0F0] rounded-xl w-[92%] ml-[4%] font-semibold">
                <div className="mt-2 mb-2">Podcast Name</div>
                <div className="mt-2 mb-2">Buyer’s Name</div>
                <div className="mt-2 mb-2">Date From</div>
                <div className="mt-2 mb-2">Date To</div>
                <div className="mt-2 mb-2">Response</div>
                
                
              </div>
    
              {
                showLine1=== true && requestArray && requestArray.map((request, index)=>{
                  return (<div className="grid grid-cols-5 bg-white  text-[#797979] border-2 mt-2 border-[rgba(214, 214, 214, 0.7)] rounded-xl w-[92%] ml-[4%] font-semibold" key={index}>
                <div className="mt-5 mb-5">{request.podcastname}</div>
                <div className="mt-5 mb-5">{request?.buyerusername}</div>
                <div className="mt-5 mb-5">{request.date}</div>
                <div className="mt-5 mb-5">{request.time}</div>
                <div className="mt-5 mb-5">
                  <div className="grid grid-cols-2 text-center">
                    <div className=" ">
                      <AiOutlineEye  className="w-7 h-7 cursor-pointer ml-[60%]"  onClick={() => {
                          if (showIndex === index) {
                            setShowIndex(null);
                          } else if (showIndex !== null) {
                            setShowIndex(index);
                          } else {
                            setShowIndex(index);
                          }
                        }}/>
                    </div>
                    <div  >
                       <ImBin className="w-7 h-7 cursor-pointer"/>
                    </div>
                  </div>
                  
                </div>
                 <div
                      className={
                        showIndex === index
                          ? " "
                          : "hidden"
                      }
                      
                    >
                    <div className=" grid grid-cols-2 w-[500%] bg-gray-200">
                        <div>
                          <div className="font-semibold">PodcastName : </div>
                          <div className="font-semibold">BuyersName : </div>

                          <div className="font-semibold">Buyer Client : </div>
                          <div className="font-semibold">Target Group : </div>
                          <div className="font-semibold">Additional Information onTarget Group : </div>
                          <div className="font-semibold">Description : </div>
                          </div>
                          <div className="overflow-scroll text-left">
                            <div className="font-semibold">{request.podcastname} </div>
                            <div className="font-semibold">{request.buyerusername} </div>
                            <div className="font-semibold">{request.client} </div>
                            <div className="font-semibold">{request.targetgroup} </div>
                            <div className="font-semibold">{request.addtargetgroup} </div>
                            <div className="font-semibold">{request.description} </div>
                          </div>
                        
                      </div>
                      </div>
              </div>)
                })
                
              }
              {showLine2===true && confirmedArray && confirmedArray.map((request,index )=>{
                return (<div className="w-full grid grid-cols-5 bg-white text-[#797979] border-2 mt-2 border-[rgba(214, 214, 214, 0.7)] rounded-xl w-[92%] ml-[4%] font-semibold" key={index}>
                <div className="mt-5 mb-5">{request.podcastname}</div>
                <div className="mt-5 mb-5">{request?.buyerusername}</div>
                <div className="mt-5 mb-5">{request.date}</div>
                <div className="mt-5 mb-5">{request.time}</div>
                <div className="mt-5 mb-5 text-center">
                  <AiOutlineEye className="w-6 h-6 ml-[47%] cursor-pointer"   
                  onClick={() => {
                        if (showIndex === index) {
                          setShowIndex(null);
                        } else if (showIndex !== null) {
                          setShowIndex(index);
                        } else {
                          setShowIndex(index);
                        }
                      }}/>
                </div>
             
                <div
                      className={
                        showIndex === index
                          ? "w-[100%] "
                          : "hidden"
                      }
                    >
                    <div className=" grid grid-cols-2 text-left w-[500%] bg-gray-200">
                        <div>
                          <div className="font-semibold">PodcastName : </div>
                          <div className="font-semibold">BuyersName : </div>
                          <div className="font-semibold">Buyer Client : </div>
                          <div className="font-semibold">Target Group : </div>
                          <div className="font-semibold">Additional Information onTarget Group : </div>
                          <div className="font-semibold">Description : </div>
                          </div>
                          <div className="overflow-scroll ">
                            <div className="font-semibold">{request.podcastname} </div>
                            <div className="font-semibold">{request.buyerusername} </div>
                            <div className="font-semibold">{request.client} </div>
                            <div className="font-semibold">{request.targetgroup} </div>
                            <div className="font-semibold">{request.addtargetgroup} </div>
                            <div className="font-semibold">{request.description} </div>
                          </div>
                        
                      </div>
                  </div>

              </div>
              )})}   
             
            
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
