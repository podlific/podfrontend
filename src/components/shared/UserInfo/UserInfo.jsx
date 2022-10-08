import React from "react";
import FooterMobile from "../Mobile/FooterMobile";
import NavigationMobile from "../Mobile/NavigationMobile";
import FooterWebPage from "../WebPage/FooterWebPage";
import NavigationWebPage from "../WebPage/NavigationWebPage";
// checking pushes

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
      <div className="h-full flex flex-col ">
        <img
          className=" flex flex-col fixed rounded-full pl-10 mt-20 ml-20 h-1/3 w-1/6"
          src="./profile.png"
          alt="icon"
        />

        <div className="h-full flex flex-col items-center mt-10">

          <div className="w-3/6 ml-40 flex flex-col gap-5 mt-5 text-[20px]">
            <div className="flex flex-row w-full justify-between">
              <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-bold ">
                Name
              </div>
              <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-semibold ">
                {userInfo?.name}
              </div>
            </div>
            <div className="flex flex-row w-full justify-between">
              <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-bold">
                Email
              </div>
              <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-semibold ">
                {userInfo?.email}
              </div>
            </div>
            <div className="flex flex-row w-full justify-between">
              <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-bold">
                Usertype
              </div>
              <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-semibold  ">
                {userInfo?.usertype}
              </div>
            </div>
            <div className="flex flex-row w-full justify-between">
              <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-bold ">
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
              <div className="w-1/2 h-[50px] border-b-2 border-gray-200 m-auto flex flex-col justify-center font-semibold ">
                {userInfo?.phoneno}
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

export default UserInfo;
