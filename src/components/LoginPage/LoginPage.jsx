import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import {
  setUserName,
  setUniqueID,
  setUserType,
} from "../../store/activateSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const LoginPage = ({ setUserInfo }) => {
  let navigate = useNavigate();
  const curruser = useSelector((state) => state.activate.unique_id);
  const currtype = useSelector((state) => state.activate.usertype);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    navigate("/");
  };
  const handleForgetPassword = () => {
    navigate("/resetmail");
  };
  const handleClickSumbit = async (e) => {
    e.preventDefault();
    user.username = user.username.trim();
    user.password = user.password.trim();
    try {
      let res = await api.post("/api/login", user);
      if (res) {
        toast.success("Login successful");
      }

      dispatch(setUserName({ username: res.data.user.username }));
      dispatch(setUniqueID({ unique_id: res.data.user.unique_id }));
      dispatch(setUserType({ usertype: res.data.user.usertype }));
      setUserInfo(res.data.user);

      if (res.data.user.usertype === "admin") {
        navigate("../admindashboard");
      }
      if (res.data.user.usertype === "seller") {
        navigate("../sellerdashboard");
      }
      if (res.data.user.usertype === "buyer") {
        navigate("../buyerdashboard");
      }

      // navigate("../buyerdashboard");
    } catch (error) {
      console.log(error);
      toast.error("Unable to login, try again");
      return;
    }
  };
  useEffect(() => {
    if (curruser.unique_id !== "" || curruser.unique_id !== undefined) {
      if (currtype.usertype === "buyer") {
        navigate("../buyerdashboard");
      }
      if (currtype.usertype === "seller") {
        navigate("../sellerdashboard");
      }
      if (currtype.usertype === "admin") {
        navigate("../admindashboard");
      }
    }
  }, []);
  return (
    <div className="flex flex-col  items-center h-screen">
      <div className="py-4 w-full pl-6 h-[15%] md:h-[16%]">
        <img src="./logo.png" className="h-full" alt="logo" />
      </div>
      <div className="w-full flex flex-row justify-center h-full bg-[#e2dafa] rounded-tl-full md:rounded-br-full ">
        <div className="w-5/6 md:w-6/12 lg:w-4/12 flex flex-col mt-16 md:mt-16 ">
          <div className="text-2xl font-semibold p-1">Welcome back !</div>
          <div className="text-sm font-normal p-1 text-[#8b8a8a]">
            Welcome back! Please enter your details
          </div>
          <div className="flex flex-col py-1">
            <h4 className="p-1 font-medium">Email</h4>
            <input
              className="w-full p-2 border-2 border-[#d7d6d6] outline-none rounded-lg"
              type="email"
              placeholder="Enter your email"
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-col py-1">
            <h4 className="p-1 font-medium">Password</h4>
            <input
              className="w-full p-2 border-2 border-[#d7d6d6] outline-none rounded-lg"
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row justify-end text-sm font-medium text-[#5F50A3] py-1">
            <button
              className="pl-1 text-[#5F50A3] font-semibold"
              onClick={() => {
                handleForgetPassword();
              }}
            >
              Forgot password
            </button>
          </div>
          <div className="w-full py-3">
            <button
              className="w-full p-2 bg-[#5F50A3] hover:bg-[#B198FF] transition ease-in-out delay-100 rounded-lg  font-medium text-white"
              onClick={(e) => {
                handleClickSumbit(e);
              }}
            >
              Sign in
            </button>
          </div>
          <div className="flex flex-row justify-center text-[#8b8a8a]">
            Don't have an account?{" "}
            <button
              className="pl-1 text-[#5F50A3] font-semibold"
              onClick={() => {
                handleClick();
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
