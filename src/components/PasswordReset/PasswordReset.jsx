import React, { useState } from "react";
import { FiKey } from "react-icons/fi";
import api from "../../config/axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [changeColor, setChangeColor] = useState(false);
  const [active, setActive] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (newPassword.length < 8 || confirmedPassword.length < 8) {
      setChangeColor(true);
      return;
    }
    if (newPassword !== confirmedPassword) {
      setChangeColor(false);
      setActive(true);
      return;
    }
    setActive(false);
    try {
      let data = {
        token: id,
        password: confirmedPassword,
      };
      let info = await api.post("/api/setnewpassword", data);
      // console.log(info);
      if (info.status === 200) {
        toast.success(info.data.message);
      } else {
        toast.error(info.data.message);
      }
      navigate("/login");
    } catch (err) {
      // console.log(err);
      toast.error(err.response.data.message);
      return;
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <div className=" w-10/12 md:w-1/3 h-4/5 flex flex-col items-center">
        <div className="p-3 rounded-full bg-[#F8F5FE]">
          <div className="p-2 rounded-full bg-[#F4EBFE]">
            <FiKey size={38} color={"#7E61BC"} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Set new password</h2>
        </div>
        <div className="w-11/12 md:w-2/3 flex-nowrap text-center p-1">
          <p>
            You password must unique and contain combination of different
            letters.
          </p>
        </div>
        <div className="w-11/12 md:w-2/3 p-1">
          <h5 className="text-base font-semibold">Password</h5>
          <input
            type="password"
            value={newPassword}
            className="w-full p-1 py-2 rounded-lg border-2 border-[#d7d6d6] outline-none indent-2 mt-1"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            placeholder="Type here"
          />
          <h6
            className={
              changeColor === false
                ? "pl-1 text-sm text-[#8d8d8d] font-normal"
                : "pl-1 text-sm text-[#ff3535] font-normal"
            }
          >
            Must be atleast 8 charaters.
          </h6>
        </div>
        <div className="w-11/12 md:w-2/3 p-1">
          <h5 className="text-base font-semibold">Confirm password</h5>
          <input
            type="password"
            value={confirmedPassword}
            className="w-full p-1 py-2 rounded-lg border-2 border-[#d7d6d6] outline-none indent-2 mt-1"
            onChange={(e) => {
              setConfirmedPassword(e.target.value);
            }}
            placeholder="Type here"
          />
          <h5
            className={
              active === false
                ? "hidden"
                : "pl-1 text-sm text-[#ff3535] font-normal"
            }
          >
            Confirmed password should be same as new password.
          </h5>
        </div>
        <div className="w-11/12 md:w-2/3">
          <button
            className="w-full py-3 rounded-lg mt-4 bg-[#5F50A3] text-white font-semibold "
            onClick={() => {
              handleSubmit();
            }}
          >
            Reset password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
