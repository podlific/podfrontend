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
    user.email = user.username;
    user.email = user.email.trim();
    user.username = user.username.trim();
    // console.log(user);
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
        setUser({
          username: "",
          name: "",
          usertype: "",
          email: "",
          phoneno: "",
          companyname: "",
          description: "",
        });
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
  const handleChangePage = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center h-screen ">
      <div className="py-4 w-full pl-6 pr-6 h-[15%] md:h-[16%] flex flex-row justify-between ">
        <div className="h-full md:ml-[6%]">
          <img src="./logo.png" className="h-full" alt="logo" />
        </div>
        <div className="hidden md:flex flex-col justify-center mr-[4%]  ">
          <h4
            className="text-sm md:text-base font-semibold cursor-pointer text-[#5F50A3] hover:text-[#B198FF] hover:underline hover:underline-offset-8  transition ease-in-out delay-100"
            onClick={() => {
              handleChangePage();
            }}
          >
            Already signed up ?
          </h4>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between h-full md:rounded-tl-full md:rounded-br-full bg-[#e2dafa] rounded-tl-full ">
        <div className="w-full md:w-1/2 flex flex-row justify-center h-full">
          <div className="w-[85%] md:w-4/6 flex flex-col justify-start md:pt-4">
            <div className="flex flex-col py-1 ">
              <h4 className=" font-medium ">Email</h4>
              <input
                className="w-full p-1 pl-3 border-2 border-[#d7d6d6] outline-none rounded-lg "
                name="username"
                type="email"
                placeholder="Email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col py-1 ">
              <h4 className=" font-medium">Usertype</h4>
              <div className="flex flex-row ">
                <div className="flex flex-row items-center justify-center">
                  <input
                    type="radio"
                    className="accent-[#5F50A3]"
                    name="usertype"
                    value="buyer"
                    onClick={(e) => {
                      handleChange(e);
                    }}
                  />
                  <div className="pl-2">Buyer</div>
                </div>
                <div className="flex flex-row items-center justify-center ml-10">
                  <input
                    type="radio"
                    className="accent-[#5F50A3]"
                    name="usertype"
                    value="seller"
                    onClick={(e) => {
                      handleChange(e);
                    }}
                  />
                  <div className="pl-2">Seller</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col py-1 ">
              <h4 className=" font-medium">Name</h4>
              <input
                className="w-full p-1 pl-3 border-2 border-[#d7d6d6] outline-none rounded-lg "
                name="name"
                type="text"
                placeholder="Name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col py-1 ">
              <h4 className=" font-medium">Phone no.</h4>
              <input
                className="w-full p-1 pl-3 border-2 border-[#d7d6d6] outline-none rounded-lg"
                name="phoneno"
                type="text"
                placeholder="Phone no."
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col py-1">
              <h4 className=" font-medium">Company name</h4>
              <input
                className="w-full p-1 pl-3 border-2 border-[#d7d6d6] outline-none rounded-lg"
                name="companyname"
                type="text"
                placeholder="Company name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col py-1">
              <h4 className=" font-medium">Description</h4>
              <textarea
                className="w-full p-1 pl-3 border-2 border-[#d7d6d6] outline-none rounded-lg"
                name="description"
                type="text"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-row justify-center mt-5 ">
              <button
                className="font-medium  text-[#FFFFFF] bg-[#5F50A3] hover:bg-[#B198FF] transition ease-in-out delay-100 w-full p-1 py-2 rounded-lg  "
                onClick={handleClickSumbit}
              >
                Send Request
              </button>
            </div>
            <div className="flex md:hidden flex-row justify-center mt-2  ">
              <h4
                className="text-sm md:text-base font-semibold cursor-pointer text-[#5F50A3] hover:text-[#B198FF] hover:underline hover:underline-offset-8  transition ease-in-out delay-100"
                onClick={() => {
                  handleChangePage();
                }}
              >
                Already signed up ?
              </h4>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col pt-[10%] w-1/2">
          <div className="flex flex-row justify-center w-full">
            <h2 className="animate-bounce text-7xl">Welcome!</h2>
          </div>
          <div className="flex flex-row justify-center w-full px-3">
            <h4 className="text-2xl text-center">
              Fill the form to become part of our platform.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

//  <div className="p-2 ">
//             <input
//               className="w-full"
//               name="username"
//               type="text"
//               placeholder="Email"
//               onChange={(e) => handleChange(e)}
//             />
//             <div className="">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//           </div>
//
//
//           <div className="p-2 hidden">
//             <input
//               className="w-full"
//               name="email"
//               type="text"
//               placeholder="Email"
//               onChange={(e) => handleChange(e)}
//             />
//             <div className="">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//           </div>
//
//
//
//           <div className="flex flex-row justify-center mt-1 ">
//             <button
//               className="font-medium text-[#FFFFFF] bg-[#5F50A3] hover:bg-[#B198FF] transition ease-in-out delay-100 rounded-[18px] w-3/5  md:rounded-[22px]  md:w-2/6 md:p-2  "
//               onClick={handleClickSumbit}
//             >
//               Send Request
//             </button>
//           </div>
//           <div className="flex flex-row justify-center p-2 font-medium">OR</div>
//           <div className="flex flex-row justify-center ">
//             <Link to="/login" className="w-full flex flex-row justify-center">
//               <button className="font-medium text-[#FFFFFF] bg-[#5F50A3] hover:bg-[#B198FF] transition ease-in-out delay-100 rounded-[18px] w-3/5  md:rounded-[22px]  md:w-2/6 md:p-2  ">
//                 Login
//               </button>
//             </Link>
//           </div>
