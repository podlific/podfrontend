import React, { useState } from "react";

const DropDown = (props) => {
  const [active, setActive] = useState(false);
  function hide(obj) {
    if (active) {
      // var el = document.getElementById(obj);
      // el.style.display = "none";
      // el.style.flex = "flex";
      // el.style.flexDirection = "flex-row";
      // el.style.justifyContent = "space-between";
      setActive(false);
    } else {
      // var p = document.getElementById(obj);
      // p.style.display = "block";
      // p.style.flex = "flex";
      // p.style.flexDirection = "flex-row";
      // p.style.justifyContent = "space-between";
      setActive(true);
    }
  }
  return (
    <div className="w-11/12 bg-white  flex flex-col rounded-md mt-1 border-solid border-b-2 border-[#B555A0]">
      <div
        className="flex flex-row justify-between mx-2 p-2"
        onClick={() => hide(props.id)}
      >
        <span className="font-medium">Name of the Product </span>
        <span className="flex flex-col justify-center">
          <img className="" src="./icons/down.png" alt="icons" />
        </span>
      </div>
      {active && (
        <div
          className=" text-xs p-2 font-semibold  flex flex-row justify-between visible "
          id={props.id}
        >
          <span>NAME OF THE BUYER </span>
          <span>13/03/2021 08:44 AM</span>
        </div>
      )}
    </div>
  );
};

export default DropDown;
