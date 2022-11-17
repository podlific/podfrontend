import React from "react";
import FooterMobile from "../Mobile/FooterMobile";
import NavigationMobile from "../Mobile/NavigationMobile";
import FooterWebPage from "../WebPage/FooterWebPage";
import NavigationWebPage from "../WebPage/NavigationWebPage";
import { FaUserTie } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


const UserInfo = ({ userInfo }) => {
  // console.log(userInfo);
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="hidden md:block ">
        <NavigationWebPage />
      </div>

      <div className="md:hidden">
        <NavigationMobile />
      </div>
    <div className="ml-[10%] w-[80%] md:grid grid-cols-2 mt-[1%]">
      <div className=" ">
        <img
              className=" rounded-full w-[45%] ml-[25%] "
              src="./ellipse4.png"
              alt="icon"
            />
            {/* <div className="grid grid-cols-2 w-[50%] ml-[25%]"> */}
              
            <div className="flex justify-center ml-[-5%]" >

                  <div className="m-1"><FaUserTie /></div><div className="font-semibold">{userInfo?.name}</div>

              </div>
            <div className="flex justify-center  ml-[-5%]" >

                  <div className="m-1 "><MdEmail  /></div><div className="font-semibold">{userInfo?.email}</div>

              </div>
           
      </div>
      <div className="md:h-full mb-[1%] ">
            
          <div className="grid grid-rows-5 text-[18px] md:text-[23px] font-bold space-y-2 mt-2 ">
            <div >
              Name : {userInfo?.name}
            </div>
            <div>
              Email : {userInfo?.email}
            </div>
            <div>
              Usertype : {userInfo?.usertype}
            </div>
            <div>
              Company Name : {userInfo?.companyname}
            </div>
            {/* <div>
              Phone No. : {userInfo?.phoneno}
            </div> */}
              <div className="grid grid-cols-3 align-middle ">
                <div className="mt-2 mb-1">Phone No. : </div>
                <div className="grid col-span-2 w-fit ">
                  <EditText showEditButton defaultValue={userInfo?.phoneno}/>
                </div>
      
     
    </div>

           

          </div>



        </div>
    </div>
      

      <div className="hidden md:block">
        <FooterWebPage />
      </div>
      <div className="md:hidden">
        <FooterMobile />
      </div>
    </div>
  );
};

export default UserInfo;
