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
const BuyerDashboard = ({
  contacts,
  setContacts,
  adminInfo,
  userInfo,
  ListofPodcast,
  setListofPodcast,
  overAllPodcastList,
  setOverAllPodcastList,
}) => {
  //   console.log(ListofPodcast, "contacts.....");
  //   const navigate = useNavigate();
  //   const user = useSelector((state) => state.activate.unique_id);
  //   const usertype = useSelector((state) => state.activate.usertype);
  //   useEffect(() => {
  //     if (user.unique_id === "" || user.unique_id === undefined) {
  //       navigate("/login");
  //     }
  //     if (usertype.usertype === "admin") {
  //       navigate("/admindashboard");
  //     }
  //   }, []);

  //   const data = {
  //     currUserId: user.unique_id,
  //   };
  //   useEffect(() => {
  //     async function getcontacts() {
  //       const cont = await api.post("/api/getconnected", data);
  //       if (cont) {
  //         if (cont !== contacts) {
  //           setContacts(cont.data);
  //         }
  //       }
  //     }

  //     if (user.unique_id !== "" || user.unique_id !== undefined) {
  //       getcontacts();
  //     }
  //   }, []);
  //   return (
  //     <>
  //       <section>
  //         <div class="bg-[url('/public/buyerDashboard.png')] w-full h-screen">
  //           <div className="w-full relative">
  //             <div className=" fixed  z-10 w-full bg-white md:hidden">
  //               <NavigationMobile />
  //             </div>
  //           </div>
  //           <div className="hidden md:flex flex-row w-full">
  //             <NavigationWebPage />
  //           </div>
  //           <div className="flex flex-row justify-start font-bold text-black pl-16 pt-20 text-6xl">
  //             Find and listen in your
  //           </div>
  //           <div className="flex flex-row justify-start font-bold text-black pl-16 pt-6 text-6xl">
  //             favourite podcasts!
  //           </div>
  //           <div className="sm:flex flex-row sm:justify-start lg:hidden">
  //             <button className="sm:rounded-none sm:bg-black  sm:mt-20 sm:ml-20 sm:font-small sm:text-white sm:p-3">
  //               Browse podcasts -{">"}
  //             </button>
  //           </div>
  //           <div className="flex flex-row justify-start  text-black pl-16 pt-20 text-l sm:invisible md:visible lg:visible">
  //             Lorem Ipsum is simply dummy text of the printing and typesetting
  //             industry.
  //           </div>
  //           <div className="flex flex-row justify-start  text-black pl-16  text-l sm:invisible md:visible lg:visible">
  //             Lorem Ipsum has been the industry's standard dummy text ever that
  //             has
  //           </div>
  //           <div className="flex flex-row justify-start  text-black pl-16  text-l"></div>
  //           <div className="flex flex-row justify-start text-black pl-16  text-l sm:invisible md:visible lg:visible">
  //             since the 1500s, when an unknown printer took a galley of type and
  //             scrambled
  //           </div>
  //           <div className="flex flex-row justify-start text-black pl-16  text-l sm:invisible md:visible lg:visible">
  //             it to make a type specimen book. It has survived not only five
  //             centuries,
  //           </div>
  //           <div className="flex flex-row justify-start text-black pl-16  text-l sm:invisible md:visible lg:visible">
  //             but also the leap into electronic typesetting, remaining essentially
  //             unchanged
  //           </div>
  //           <div className="sm:hidden lg:visible lg:flex lg:flex-row lg:justify-start">
  //             <Link to="/podcast">
  //               <button className="lg:rounded-none lg:bg-black lg:ml-16 lg:mt-20 lg:font-small lg:text-white lg:p-3">
  //                 Browse podcasts -{">"}
  //               </button>
  //             </Link>
  //           </div>
  //         </div>
  //       </section>

  //       <section>
  //         <div className="bg-[#dadbd9]">
  //           <div class="bg-[url('/public/section21.jpg')] bg-right bg-no-repeat bg-[#dadbd9] h-80 w-full sm:invisible md:invisible lg:visible">
  //             <div className="flex flex-row justify-start font-bold text-black pl-16 pt-5 text-4xl visible">
  //               #1 Trending
  //             </div>
  //             <div className="flex flex-row justify-start font-semibold text-black pl-16 pt-4 text-3xl visible">
  //               Parental as Anything
  //             </div>
  //             <div className="flex flex-row justify-start  text-black pl-16 pt-8 text-l visible">
  //               Lorem Ipsum is simply dummy text of the printing and typesetting
  //               industry.
  //             </div>
  //             <div className="flex flex-row justify-start  text-black pl-16  text-l visible">
  //               Lorem Ipsum has been the industry's standard dummy text ever that
  //               has
  //             </div>
  //             <div className="flex flex-row justify-start text-black pl-16  text-l visible">
  //               since the 1500s, when an unknown printer took a galley of type and
  //               scrambled
  //             </div>
  //             <div className="flex flex-row justify-start ">
  //               <button className="rounded-none bg-black ml-16 mt-8 text-white p-2">
  //                 See more -{">"}
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //       <section>
  //         <div className="flex flex-row font-semibold justify-start text-black pl-16 pt-7 text-xl">
  //           Top picks of the day!
  //         </div>
  //         <div className="flex flex-row">
  //           <div className="w-full flex flex-col lg:m-2 lg:p-10 visible sm:pt-2 sm:m-3">
  //             <img className="  " src="../podcast1.png" alt="logo" />
  //           </div>
  //           <div className="w-full flex flex-col lg:m-2 lg:p-10 visible sm:pt-2 sm:m-3 ">
  //             <img className="  " src="../podcast2.png" alt="logo" />
  //           </div>
  //           <div className="w-full flex flex-col m-2 p-10 sm:hidden md:visible lg:visible">
  //             <img className="  " src="../podcast3.png" alt="logo" />
  //           </div>
  //           <div className="w-full flex flex-col m-2 p-10 sm:invisible md:visible lg:visible">
  //             <img className="  " src="../podcast4.png" alt="logo" />
  //           </div>
  //         </div>
  //       </section>
  //       <section>
  //         <div className="flex flex-row font-semibold justify-start text-black pl-16 pt-7 text-xl">
  //           Recently Uploaded
  //         </div>
  //         <div className="flex flex-row">
  //           <div className="w-full flex flex-col lg:m-2 lg:p-10 visible sm:pt-2 sm:m-3">
  //             <img className="  " src="../podcast1.png" alt="logo" />
  //           </div>
  //           <div className="w-full flex flex-col lg:m-2 lg:p-10 visible sm:pt-2 sm:m-3 ">
  //             <img className="  " src="../podcast2.png" alt="logo" />
  //           </div>
  //           <div className="w-full flex flex-col m-2 p-10 sm:hidden md:visible lg:visible">
  //             <img className="  " src="../podcast3.png" alt="logo" />
  //           </div>
  //           <div className="w-full flex flex-col m-2 p-10 sm:invisible md:visible lg:visible">
  //             <img className="  " src="../podcast4.png" alt="logo" />
  //           </div>
  //         </div>
  //       </section>
  //       <section>
  //         <div className="hidden md:block">
  //           <FooterWebPage />
  //         </div>
  //         <div className="block md:hidden">
  //           <FooterMobile />
  //         </div>
  //       </section>
  //     </>
  //   );
  // };

  // export default BuyerDashboard;
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
    <>
      <section>
        <div class="bg-[url('/public/buyerDashboard.png')] w-full h-screen">
          <div className="w-full relative">
            <div className=" fixed  z-10 w-full bg-white md:hidden">
              <NavigationMobile />
            </div>
          </div>
          <div className="hidden md:flex flex-row w-full">
            <NavigationWebPage />
          </div>
          <div className="flex flex-row justify-start font-bold text-black pl-16 pt-20 text-6xl">
            Find and listen in your
          </div>
          <div className="flex flex-row justify-start font-bold text-black pl-16 pt-6 text-6xl">
            favourite podcasts!
          </div>
          <div className="sm:flex flex-row sm:justify-start lg:hidden">
            <button className="sm:rounded-none sm:bg-black  sm:mt-20 sm:ml-20 sm:font-small sm:text-white sm:p-3">
              Browse podcasts -{">"}
            </button>
          </div>
          <div className="flex flex-row justify-start font-semibold text-black pl-16 pt-20 text-xl sm:invisible md:visible lg:visible">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry and lorem.
          </div>
          <div className="flex flex-row justify-start font-semibold text-black pl-16  text-xl sm:invisible md:visible lg:visible">
            Lorem Ipsum has been the industry's standard dummy text ever that
            has gallery of type
          </div>
          <div className="flex flex-row justify-start  text-black pl-16  text-l"></div>
          <div className="flex flex-row justify-start font-semibold text-xl text-black pl-16  text-l sm:invisible md:visible lg:visible">
            since the 1500s, when an unknown printer took a galley of type and
            scrambled and
          </div>
          <div className="flex flex-row justify-start font-semibold text-xl text-black pl-16  text-l sm:invisible md:visible lg:visible">
            it to make a type specimen book. It has survived not only five
            centuries,
          </div>
          <div className="flex flex-row font-semibold justify-start text-xl text-black pl-16 mb-10 text-l sm:invisible md:visible lg:visible">
            but also the leap into electronic typesetting, remaining essentially
            unchanged and has
          </div>
          <div className="sm:hidden lg:visible lg:flex lg:flex-row lg:justify-start">
            <Link to="/podcast">
              <button className="lg:rounded-none lg:bg-black lg:ml-16  lg:font-small lg:text-white lg:p-3">
                Browse podcasts -{">"}
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-[#dadbd9]">
          <div class="bg-[url('/public/section21.jpg')] bg-right bg-no-repeat bg-[#dadbd9] h-80 w-full sm:invisible md:invisible lg:visible">
            <div className="flex flex-row justify-start font-bold text-black pl-16 pt-5 text-4xl visible">
              #1 Trending
            </div>
            <div className="flex flex-row justify-start font-semibold text-black pl-16 pt-4 text-3xl visible">
              Parental as Anything
            </div>
            <div className="flex flex-row justify-start  text-black pl-16 pt-8 text-l visible">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
            <div className="flex flex-row justify-start  text-black pl-16  text-l visible">
              Lorem Ipsum has been the industry's standard dummy text ever that
              has
            </div>
            <div className="flex flex-row justify-start text-black pl-16  text-l visible">
              since the 1500s, when an unknown printer took a galley of type and
              scrambled
            </div>
            <div className="flex flex-row justify-start ">
              <Link to="/podcast">
                <button className="rounded-none bg-black ml-16 mt-8 text-white p-2">
                  See more -{">"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-row font-semibold justify-start text-black pl-16 pt-7 text-2xl">
          Top picks of the day!
        </div>
        <div className="flex flex-row">
          <div className="w-full flex flex-col lg:m-2 lg:p-10 sm:pt-2 sm:m-3">
            <img className="  " src="../podcast1.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col lg:m-2 lg:p-10  sm:pt-2 sm:m-3 ">
            <img className="  " src="../podcast2.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col m-2 p-10 hidden lg:block">
            <img className="  " src="../podcast3.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col m-2 p-10 hidden lg:block">
            <img className="  " src="../podcast4.png" alt="logo" />
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-row font-semibold justify-start text-black pl-16 pt-7 text-2xl">
          Best episodes of the week!
        </div>
        <div className="flex flex-row">
          <div className="w-full flex flex-col lg:m-2 lg:p-10  sm:pt-2 sm:m-3">
            <img className="  " src="../podcast5.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col lg:m-2 lg:p-10 sm:pt-2 sm:m-3 ">
            <img className="  " src="../podcast6.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col m-2 p-10 hidden lg:block">
            <img className="  " src="../podcast7.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col m-2 p-10 hidden lg:block">
            <img className="  " src="../podcast8.png" alt="logo" />
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-row font-semibold justify-start text-black pl-16 pt-7 text-2xl">
          Hindi Podcast!
        </div>
        <div className="flex flex-row">
          <div className="w-full flex flex-col lg:m-2 lg:p-10 visible sm:pt-2 sm:m-3">
            <img className="  " src="../podcast9.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col lg:m-2 lg:p-10 visible sm:pt-2 sm:m-3 ">
            <img className="  " src="../podcast10.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col m-2 p-10 hidden lg:block">
            <img className="  " src="../podcast11.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col m-2 p-10 hidden lg:block">
            <img className="  " src="../podcast7.png" alt="logo" />
          </div>
        </div>
      </section>
      <section>
        <div className="hidden md:block">
          <FooterWebPage />
        </div>
        <div className="block md:hidden">
          <FooterMobile />
        </div>
      </section>
    </>
  );
};

export default BuyerDashboard;
