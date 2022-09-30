import React from "react";
import FooterMobile from "../Mobile/FooterMobile";
import NavigationMobile from "../Mobile/NavigationMobile";
import FooterWebPage from "../WebPage/FooterWebPage";
import NavigationWebPage from "../WebPage/NavigationWebPage";

const UserInfo = ({ userInfo }) => {
  // console.log(userInfo);
  return (

    <div className="h-screen flex flex-col justify-between">
      <div className="hidden md:block ">
        <NavigationWebPage />
      </div>
      <div className="md:hidden">
        <NavigationMobile />
      </div>


      <div className="h-full  flex flex-col items-center ">

        <img
          className="fixed rounded-full w-[380px] h-[380px] top-[160px] left-[130px] "
          src="./profile.jpg"
          alt="icon"
        />
        {/* width: 825px;
        height: 0px;
        left: 553px;
        top: 1000px; */}

        <div className="background-[#E2E2E2F2] w-[825px] h-[0px] left-[553px] top-[1000px]">
        </div>



        <div className="w-3/6 ml-80 flex flex-col gap-5 p-3 mt-8 text-[23px]">

          <div className="flex flex-row  w-full justify-right">


            <div className="w-1/2 h-[50px] border-b-2 border-gray-200  m-auto flex flex-col justify-center font-bold ">
              Name
            </div>
            <div className="w-1/2 h-[50px]  border-b-2 border-gray-200 m-auto flex flex-col justify-center font-semibold ">
              {userInfo?.name}

            </div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="w-1/2 h-[50px] border-b-2 border-gray-200  m-auto flex flex-col justify-center font-bold">
              Email
            </div>
            <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-semibold ">
              {userInfo?.email}
            </div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="w-1/2 h-[50px] border-b-2 border-gray-200  m-auto flex flex-col justify-center font-bold">
              Usertype
            </div>
            <div className="w-1/2 h-[50px] border-b-2 border-gray-200  m-auto flex flex-col justify-center font-semibold ">
              {userInfo?.usertype}
            </div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="w-1/2 h-[50px] border-b-2 border-gray-200  m-auto flex flex-col justify-center font-bold ">
              Company Name
            </div>
            <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-semibold ">
              {userInfo?.companyname}
            </div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-bold">
              Phone No
            </div>
            <div className="w-1/2 h-[50px]  border-b-2 border-gray-200 m-auto flex flex-col justify-center font-semibold ">
              {userInfo?.phoneno}
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

export default UserInfo;
