import React from "react";

const PodcastWidgetMobile = ({ episodename, podcastname, tags, image }) => {
  return (
    <div
      className=" md:hidden flex flex-col md:p-4 mt-2 lg:p-1 xl:p-4  h-full bg-[#f2f4f5] box-shadow-[2px 2px 6px rgba(0, 0, 0, 0.1)] hover:cursor-pointer 
       border-2 hover:border-solid hover:border-[#0063ff] shadow-md rounded-2xl"
    >
      <div className=" flex flex-row items-center ">
        {/* src={`data:image/png;base64,${image}`} */}
        <img
          className="h-16 w-16 p-2 rounded-2xl "
          src={`${image}`}
          alt="img-cover"
        ></img>
        <div className="text-sm">
          <div className="opacity-[90%]">{podcastname} </div>
          <div className="opacity-[90%]">{episodename}</div>
        </div>
      </div>
      <div className=" pb-2 -mt-1 flex flex-row justify-end rounded-b-2xl p-1 pr-[3%] text-sm text-[9px] text-white">
        {tags &&
          tags.map((items, index) => {
            return (
              <div
                className="mr-[2%] rounded-lg bg-[#5F50A3] text-[10px] flex flex-row justify-center items-center "
                key={index}
              >
                <span className="p-1">{items}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PodcastWidgetMobile;
