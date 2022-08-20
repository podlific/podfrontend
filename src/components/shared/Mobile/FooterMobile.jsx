import React from "react";

const FooterMobile = () => {
  return (
    <div className=" grid grid-cols-3 grid-rows-1 font-semibold text-[#ADADAD] bg-[#D9D9D97A] md:hidden p-2 pt-3">
      <div className=" flex flex-row justify-center">
        <div className="grid grid-rows-3 justify-center items-center gap-4">
          <div className="  flex flex-row items-center ">About Us</div>
          <div className="  flex flex-row items-center ">Contact</div>
          <div className="  flex flex-row items-center ">Privacy Policy</div>
        </div>
      </div>
      <div className=" flex flex-row justify-center ">
        <div className="grid grid-rows-3 justify-center items-center  gap-4">
          <div className="  flex flex-row justify-center">Request</div>
          <div className="  flex flex-row justify-center">Contact</div>
          <div className="  flex flex-row justify-center  ">Privacy Policy</div>
        </div>
      </div>
      <div className=" flex flex-row justify-center gap-4 ">
        <div className="flex flex-row  ">T&C</div>
      </div>
      
    </div>
  );
};

export default FooterMobile;
