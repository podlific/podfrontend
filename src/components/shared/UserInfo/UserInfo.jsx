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
      <div className="h-full flex flex-col items-center ">
        <div className="w-3/6 ml-40 flex flex-col gap-5 mt-5 text-[18px]">
          <div className="flex flex-row w-full justify-between">
            <div className="w-1/2 h-[50px] m-auto flex flex-col justify-center font-semibold ">
              Name
            </div>
            <div className="w-1/2 h-[50px] m-auto flex flex-col justify-center ">
              {userInfo?.name}
            </div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="w-1/2 h-[50px] m-auto flex flex-col justify-center font-semibold">
              Email
            </div>
            <div className="w-1/2 h-[50px] m-auto flex flex-col justify-center ">
              {userInfo?.email}
            </div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="w-1/2 h-[50px] m-auto flex flex-col justify-center font-semibold">
              Usertype
            </div>
            <div className="w-1/2 h-[50px] m-auto flex flex-col justify-center ">
              {userInfo?.usertype}
            </div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="w-1/2 h-[50px] m-auto flex flex-col justify-center font-semibold ">
              Company Name
            </div>
            <div className="w-1/2 h-[50px] m-auto flex flex-col justify-center ">
              {userInfo?.companyname}
            </div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="w-1/2 h-[50px] m-auto flex flex-col justify-center font-semibold">
              Phone No
            </div>
            <div className="w-1/2 h-[50px] m-auto flex flex-col justify-center ">
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
