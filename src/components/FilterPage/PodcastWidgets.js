import { func } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

// import EditPodcast from "./EditPodcast.js";
const PodcastWidgets = ({ episodename, podcastname, tags, image }) => {
  return (
    <Link to="/editpodcast">
      <div
        className="flex flex-col h-[150px] w-full bg-[#f2f4f5] box-shadow-[2px 2px 6px rgba(0, 0, 0, 0.1)] hover:cursor-pointer 
       border-2 hover:border-solid hover:border-[#0063ff] shadow-md rounded-2xl relative"
      >
        <img
          className="h-full w-full brightness-50 rounded-2xl object-cover "
          src={`${image}`}
          alt="img-cover"
        ></img>
        <div className=" flex flex-row items-center font-normal w-[] h-full absolute  ">
          {/* src={`data:image/png;base64,${image}`} */}
        </div>
        <div className="top-[50px] flex flex-row justify-center  w-full text-white z-10 absolute text-3xl">
          <div className="opacity-[90%]">{podcastname.toUpperCase()} </div>
          {/* <div className="opacity-[90%]">{episodename}</div> */}
        </div>
        <div className=" flex flex-row justify-end  w-full text-sm md:text-xs text-white overflow-hidden z-10 absolute bottom-2 right-0 ">
          {tags &&
            tags
              .filter((item, index) => index < 7)
              .map((tag, index) => {
                return (
                  <div
                    className="mr-[2%] rounded-lg bg-[#5F50A3] md:text-xs flex flex-row justify-center items-center "
                    key={index}
                  >
                    <span className="p-1">{tag}</span>
                  </div>
                );
              })}
        </div>
      </div>
    </Link>
  );
};

export default PodcastWidgets;
