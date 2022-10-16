import React, { useState } from "react";
const App = ()=>{
  return(
    <>
    <section>
    <div class="bg-[url('/public/buyerDashboard.png')] w-full h-screen">
      <div className="flex flex-row justify-between font-medium text-white mt-3 pl-10 ">
        <div className=" w-[20%]  pt-4 flex flex-row justify-start">
          <div className="w-full flex flex-row justify-center pr-8 lg:pr-16 xl:pr-32">
            <img className="  " src="../logo.png" alt="logo" />
          </div>
        </div>
        <div className=" w-[80%] flex flex-col  justify-center text-white ">
          <div className="flex flex-row justify-around  rounded-l-3xl bg-[#5F50A3] py-1 ">
            <div className="flex flex-col justify-center md:p-4 md:pl-4 md:h-3">
              Home
            </div>
            <div className="flex flex-col justify-center md:p-4 md:pl-4 md:h-3">
              My Campaigns
            </div>

            <div className="flex flex-col justify-center md:p-4 md:pl-0 md:h-3">
              Messages
            </div>
            <div className="flex flex-col justify-center md:p-4 md:pl-4 md:h-3">
              User Info
            </div>
            <div
              className={"flex flex-col justify-center md:p-4 md:pl-4 md:h-3"}
            >
              Calendar
            </div>
            <div
              className="flex flex-col justify-center md:p-4 md:pl-4 md:h-3 cursor-pointer"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-start font-bold text-black pl-16 pt-20 text-6xl">
        Find and listen in your
      </div>
      <div className="flex flex-row justify-start font-bold text-black pl-16 pt-6 text-6xl">
        favourite podcasts!
      </div>
      <div className="flex flex-row justify-start  text-black pl-16 pt-20 text-l">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </div>
      <div className="flex flex-row justify-start  text-black pl-16  text-l">
        Lorem Ipsum has been the industry's standard dummy text ever that has
      </div>
      <div className="flex flex-row justify-start  text-black pl-16  text-l">

      </div>
      <div className="flex flex-row justify-start text-black pl-16  text-l">
        since the 1500s, when an unknown printer took a galley of type and scrambled
      </div>
      <div className="flex flex-row justify-start text-black pl-16  text-l">
        it to make a type specimen book. It has survived not only five centuries,
      </div>
      <div className="flex flex-row justify-start text-black pl-16  text-l">
        but also the leap into electronic typesetting, remaining essentially unchanged
      </div>
      <div className="flex flex-row justify-start">
      <button className="rounded-none bg-black ml-16 mt-20 font-small text-white p-3 ">
        Browse podcasts  -{">"}</button>
      </div>
   
        </div>
        </section>

    <section>
      <div class="bg-[url('/public/section21.jpg')] bg-right bg-no-repeat bg-[#dadbd9] h-80 w-full ">
        <div className="flex flex-row justify-start font-bold text-black pl-16 pt-5 text-4xl">
        #1 Trending
        </div>
        <div className="flex flex-row justify-start font-semibold text-black pl-16 pt-4 text-3xl">
        Parental as Anything
        </div>
        <div className="flex flex-row justify-start  text-black pl-16 pt-8 text-l">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </div>
      <div className="flex flex-row justify-start  text-black pl-16  text-l">
        Lorem Ipsum has been the industry's standard dummy text ever that has
      </div>
      <div className="flex flex-row justify-start text-black pl-16  text-l">
        since the 1500s, when an unknown printer took a galley of type and scrambled
      </div>
      <div className="flex flex-row justify-start">
      <button className="rounded-none bg-black ml-16 mt-8 text-white p-2">
        See more -{">"}</button>
      </div>
     </div> 
  </section>
  <section>
  <div className="flex flex-row font-semibold justify-start text-black pl-16 pt-7 text-xl">
        Top picks of the day!
      </div>
      <div className="flex flex-row">
  <div className="w-full flex flex-col m-2 p-10">
            <img className="  " src="../podcast1.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col  m-2 p-10">
            <img className="  " src="../podcast2.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col m-2 p-10">
            <img className="  " src="../podcast3.png" alt="logo" />
          </div>
          <div className="w-full flex flex-col m-2 p-10">
            <img className="  " src="../podcast4.png" alt="logo" />
          </div>
          </div>
    
  </section>
  <section>
  <div className="p-[2%] bg-black text-white flex flex-row   justify-evenly items-center md:visible">
      <div>About</div>
      <div>Request Access</div>
      <div>Contact</div>
      <div>Privacy Policy</div>
      <div>Links</div>
      <div>T&C</div>
      <div>Other Links</div>
    </div>
  </section>



  </>
     

   
  )
}


export default App;