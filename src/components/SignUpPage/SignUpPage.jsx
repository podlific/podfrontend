import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import {
  setUserName,
  setUniqueID,
  setUserType,
} from "../../store/activateSlice";
import { setAuth } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const SignUpPage = () => {
  const currtype = useSelector((state) => state.activate.usertype);
  const curruser = useSelector((state) => state.activate.unique_id);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [user, setUser] = useState({
    username: "",
    usertype: "",
    password: "",
  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  async function handleClickSumbit(e) {
    e.preventDefault();
    try {
      let res = await api.post("/api/signup", user);
      dispatch(setUserName({ username: res.data.user.username }));
      dispatch(setUniqueID({ unique_id: res.data.user._id }));
      dispatch(setUserType({ usertype: res.data.user.usertype }));
      dispatch(setAuth({ user: res.data.username }));

      if (res.data.user.usertype === "admin") {
        navigate("../admindashboard", { replace: true });
      }
      if (res.data.user.usertype === "seller") {
        navigate("../sellerdashboard", { replace: true });
      }
      if (res.data.user.usertype === "buyer") {
        navigate("../buyerdashboard", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (curruser.unique_id !== "" || curruser.unique_id !== undefined) {
      if (currtype.usertype === "buyer") {
        navigate("../buyerdashboard", { replace: true });
      }
      if (currtype.usertype === "seller") {
        navigate("../sellerdashboard");
      }
    }
  }, []);
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col basis-full md:basis-1/2">
        <div className="h-1/3 flex flex-col content-center  ">
          <img
            className=" w-16 h-16 ml-7 mt-5 place-self-start overflow-y-hidden md:ml-10 md:mt-12 md:h-20 md:w-20 lg:ml-28"
            src="./logo.png"
            alt="login-logo"
          />
        </div>
        <div className="h-1/3 flex flex-col justify-center">
          <div className=" w-4/5  ml-7 -mt-16 md:ml-10 p-3 sm:-mt-2 md:-mt-5  lg:mt-12   lg:w-4/6 lg:ml-28 ">
            <input
              className="w-full"
              name="username"
              type="text"
              placeholder="Username"
              onChange={(e) => handleChange(e)}
            />
            <div className="">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className=" relative  w-4/5 ml-7 md:ml-10 p-3 lg:w-4/6 lg:ml-28">
            <input
              className="w-full"
              name="usertype"
              type="text"
              placeholder="User Type"
              onChange={(e) => handleChange(e)}
            />
            <div className="">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className=" relative  w-4/5 ml-7 md:ml-10 p-3 lg:w-4/6 lg:ml-28">
            <input
              className="w-full"
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
            <div className="">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <img
              className="absolute top-5 right-3 h-3 w-5"
              src="./Vector.png"
              alt="icon1"
            />
          </div>
          <div className=" w-4/5 ml-7 md:ml-10 p-2 lg:w-3/5 flex justify-center lg:ml-28">
            <button
              className="font-medium text-[#FFFFFF] bg-[#7800F073] hover:bg-[#7800F0] transition ease-in-out delay-100 rounded-[18px] w-3/5  md:rounded-[22px]  md:w-2/6 md:p-2  "
              onClick={handleClickSumbit}
            >
              Sign Up
            </button>
          </div>
          <div className=" w-4/5 ml-7 md:ml-10 p-2 lg:w-3/5 flex flex-col justify-center text-center lg:ml-28">
            <span className="text-[#7800F0] font-medium">
              Forgot Password ?
            </span>
            <div className=" flex justify-center ">
              <div className=" w-32 :w-34 border-t border-[#7800F0]"></div>
            </div>
          </div>
        </div>
        <div className="h-1/3 flex flex-row overflow-hidden text-[#00000045] font-semibold">
          <div className=" basis-3/6 md:basis-1/3 flex justify-center">
            <div className="w-full h-full flex flex-col justify-center items-center ">
              <div className="w flex flex-col justify-center  text-left">
                <span className="mb-2 text-   md:mb-4 ">About Us</span>
                <span className="mb-2 text-  md:mb-4 ">Contact</span>
                <span className="mb-0 text-sm  md:mb-0 ">Privacy Policy</span>
              </div>
            </div>
          </div>
          <div className=" basis-2/6 md:basis-1/3 flex justify-center">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="w flex flex-col justify-center  text-left">
                <span className=" mb-2 mt-4  text-sm md:mb-4 md:mt-0">
                  Request Access
                </span>
                <span className=" mb-2 text-sm md:mb-4">Other Links</span>
                <span className=" mb-0 text-sm md:mb-0">Other Links</span>
              </div>
            </div>
          </div>
          <div className=" basis-1/6 md:basis-1/3 flex justify-center">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="w flex flex-col justify-center  text-left">
                <span className="mb-20 mt-5 text-sm md:mb-20 md:mt-2 ">
                  T&C
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden basis-1/3 md:basis-1/2 md:block ">
        <div className="h-screen w-full relative ">
          <img
            className="h-screen w-full"
            src="./loginImg1.png"
            alt="loginImg"
          />
          <img
            className="h-screen w-full absolute top-0"
            src="./loginImg2.png"
            alt="loginImg"
          />
          <p className="absolute bottom-16 text-[10px] mx-3 md:bottom-20 md:mx-16 md:text-sm text-[#FFFFFF]  ">
            Dummy text about podform. Quick Introductionary. is simply dummy
            text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries
          </p>
          <p className="absolute text-[8px] mx-1 bottom-9 right-2 md:text-[8px] md:mx-4 text-[#FFFFFF]">
            PODFORM 2022 © All Rights Reserved{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
