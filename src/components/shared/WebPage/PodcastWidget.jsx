import React from "react";

const PodcastWidget = ({ episodename, podcastname, tags, image }) => {
  return (
    <div
      className="flex flex-col h-full bg-[#f2f4f5] box-shadow-[2px 2px 6px rgba(0, 0, 0, 0.1)] hover:cursor-pointer 
       border-2 hover:border-solid hover:border-[#0063ff] shadow-md rounded-2xl "
    >
      <div className=" flex flex-row items-center   font-normal  ">
        <img
          className="h-20 w-20 p-2 rounded-2xl "
          src={`data:image/png;base64,${image}`}
          alt="img-cover"
        ></img>
        <div className=" inline-block m-2">
          <div className="opacity-[90%]">{podcastname} </div>
          <div className="opacity-[90%]">{episodename}</div>
        </div>
      </div>
      <div className=" pb-2 -mt-1 flex flex-row justify-end  p-1 pr-[3%] text-sm md:text-xs text-white  ">
        {tags &&
          tags.map((tag, index) => {
            return (
              <div
                className="mr-[2%]   rounded-lg bg-[#5F50A3] md:text-xs flex flex-row justify-center items-center "
                key={index}
              >
                <span className="p-1">{tag}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PodcastWidget;
