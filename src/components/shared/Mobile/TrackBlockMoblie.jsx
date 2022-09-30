import React from "react";

const TrackBlockMoblie = () => {
  return (
    <div className=" rounded-xl flex flex-col justify-center bg-[#5F50A3] mx-[10%] text-white">
      <div className="flex flex-row justify-center p-[7%]">
        <img className="h-28 w-28   rounded-md " src="./img-cover.png" alt="" />
      </div>
      <div className="  mb-2">
        <div className="flex flex-row justify-center text-xs font-bold tracking-wide">
          Episode Title
        </div>
        <div className="flex flex-row justify-center text-xs tracking-wide">
          Podcast Name{" "}
        </div>
      </div>
    </div>
  );
};

export default TrackBlockMoblie;
