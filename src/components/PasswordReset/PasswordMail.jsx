import React, { useState } from "react";
// import { FiKey } from "react-icons/fi";
import { GrMail } from "react-icons/gr";
import { TbBrandGmail } from "react-icons/tb";
import api from "../../config/axios";
import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const PasswordMail = () => {
  // let { id } = useParams();
  const navigate = useNavigate();
  let [usermail, setUsermail] = useState("");
  const [active, setActive] = useState(true);
  const handleSubmit = async () => {
    usermail = usermail.trim();
    try {
      let data = {
        mail: usermail,
      };
      let info = await api.post("/resetpassword", data);
      toast.success(info.data.message);
      setUsermail("");
      setActive(false);
    } catch (err) {
      toast.error(err.response.data.message);
      navigate("/");
      return;
    }
  };
  const handleOpenEmail = () => {
    window.location.href =
      "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox";
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <div className=" w-10/12 md:w-1/3 h-4/5 flex flex-col items-center">
        <div className="p-3 rounded-full bg-[#F8F5FE]">
          <div className="p-2 rounded-full bg-[#F4EBFE]">
            {active ? (
              <GrMail size={35} color={"#7E61BC"} />
            ) : (
              <TbBrandGmail size={35} color={"#7E61BC"} />
            )}
          </div>
        </div>
        <div>
          {active ? (
            <h2 className="text-2xl font-semibold">Reset password</h2>
          ) : (
            <h2 className="text-2xl font-semibold">Check your mail</h2>
          )}
        </div>
        <div className="w-11/12 md:w-2/3 flex-nowrap text-center p-1">
          {active ? (
            <p>
              Enter the email associated with your account and we'll send an
              email with instructions to reset your password.
            </p>
          ) : (
            <p>We have sent a password recover instructions to your mail.</p>
          )}
        </div>
        {active && (
          <div className="w-11/12 md:w-2/3 p-1">
            <h5 className="text-base font-semibold">Email address</h5>
            <input
              type="email"
              className="w-full p-1 py-2 rounded-lg border-2 border-[#d7d6d6] outline-none indent-2 mt-1"
              placeholder="Type here"
              value={usermail}
              onChange={(e) => {
                setUsermail(e.target.value);
              }}
            />
          </div>
        )}
        {active && (
          <div className="w-11/12 md:w-2/3">
            <button
              className="w-full py-3 rounded-lg mt-4 bg-[#5F50A3] text-white font-semibold "
              onClick={() => {
                handleSubmit();
              }}
            >
              Send Instructions
            </button>
          </div>
        )}
        {!active && (
          <div className="w-11/12 md:w-2/3">
            <button
              className="w-full py-3 rounded-lg mt-4 bg-[#5F50A3] text-white font-semibold "
              onClick={() => {
                handleOpenEmail();
              }}
            >
              Open email app
            </button>
          </div>
        )}
        {!active && (
          <div className="w-11/12 md:w-2/3 flex-nowrap text-center p-1 mt-5">
            <p>
              Did not receive the email? Check your spam filter, or{" "}
              <button
                className="text-[#4c3c92] hover:underline hover:underline-offset-4 font-medium"
                onClick={() => {
                  setActive(true);
                }}
              >
                try another email address
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordMail;
