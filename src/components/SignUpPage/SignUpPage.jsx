import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  setUserName,
  setUniqueID,
  setUserType,
} from "../../store/activateSlice";
import { setAuth } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const SignUpPage = () => {
  const currtype = useSelector((state) => state.activate.usertype);
  const curruser = useSelector((state) => state.activate.unique_id);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [user, setUser] = useState({
    username: "",
    name: "",
    usertype: "",
    email: "",
    phoneno: "",
    companyname: "",
    description: "",
  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  async function handleClickSumbit(e) {
    e.preventDefault();
    if (
      user.username === "" ||
      user.name === "" ||
      user.usertype === "" ||
      user.email === "" ||
      user.phoneno === "" ||
      user.companyname === "" ||
      user.description === ""
    ) {
      toast.error("Add all fields");
      return;
    }
    try {
      let res = await api.post("/api/addnewuseronrequest", user);
      if (res.status === 200) {
        toast(
          "Wait for admin to accept you request and please keep checking your provided Email",
          { duration: 10000 }
        );
        toast.success("Request sent sucessfully");
      } else {
        toast.error("Unable to send request");
      }
    } catch (error) {}
  }
  useEffect(() => {
    if (curruser.unique_id !== "" || curruser.unique_id !== undefined) {
      if (currtype.usertype === "buyer") {
        navigate("../buyerdashboard", { replace: true });
      }
      if (currtype.usertype === "seller") {
        navigate("../sellerdashboard", { replace: true });
      }
      if (currtype.usertype === "admin") {
        navigate("../admindashboard", { replace: true });
      }
    }
  }, []);
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col justify-center items-center h-full w-full md:w-1/2">
        {/* <div className="h-1/3 flex flex-col pl-10 pt-10 w-full  "></div> */}
        <div className=" flex flex-col justify-center w-3/4">
          <div className="flex flex-row">
            <img className="h-20 w-36" src="./logo.png" alt="login-logo" />
          </div>
          <div className="p-2 ">
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
          <div className="p-2 ">
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
          <div className=" p-2">
            <input
              className="w-full"
              name="name"
              type="text"
              placeholder="Name"
              onChange={(e) => handleChange(e)}
            />
            <div className="">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className="p-2">
            <input
              className="w-full"
              name="email"
              type="text"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
            <div className="">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className=" p-2">
            <input
              className="w-full"
              name="phoneno"
              type="text"
              placeholder="Phone No."
              onChange={(e) => handleChange(e)}
            />
            <div className="">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className="p-2">
            <input
              className="w-full"
              name="companyname"
              type="text"
              placeholder="Company Name"
              onChange={(e) => handleChange(e)}
            />
            <div className="">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className="p-2">
            <textarea
              className="w-full"
              name="description"
              type="text"
              placeholder="Description"
              onChange={(e) => handleChange(e)}
            />
            <div className="">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className="flex flex-row justify-center mt-1 ">
            <button
              className="font-medium text-[#FFFFFF] bg-[#5F50A3] hover:bg-[#B198FF] transition ease-in-out delay-100 rounded-[18px] w-3/5  md:rounded-[22px]  md:w-2/6 md:p-2  "
              onClick={handleClickSumbit}
            >
              Send Request
            </button>
          </div>
          <div className="flex flex-row justify-center p-2 font-medium">OR</div>
          <div className="flex flex-row justify-center ">
            <Link to="/login" className="w-full flex flex-row justify-center">
              <button className="font-medium text-[#FFFFFF] bg-[#5F50A3] hover:bg-[#B198FF] transition ease-in-out delay-100 rounded-[18px] w-3/5  md:rounded-[22px]  md:w-2/6 md:p-2  ">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-1/2 h-screen relative">
        <img src="./loginImg1.png" className="h-screen w-full" alt="login" />
        <img
          className="top-0 absolute h-screen w-full"
          src="./loginImg2.png"
          alt="login"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
