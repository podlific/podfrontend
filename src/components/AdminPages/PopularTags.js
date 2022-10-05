import React from "react";

export default function PopularTags({ a }) {
  a.sort((a, b) => {
    return b.tagcount - a.tagcount;
  });
  return (
    <div
      style={{
        border: " 1px solid rgba(0, 0, 0, 0.4)",
        background:
          " linear-gradient(110.43deg, rgba(95, 80, 163, 0.5) -538.07%, rgba(95, 80, 163, 0) 116.23%)",
      }}
      className="w-[100%]  bg-gray-200 p-1 overflow-auto  "
    >
      <div className="underline underline-offset-8 decoration-1 font-bold text-center mb-8">
        Popular Tags
      </div>

      <div className="flex flex-wrap overflow-auto">
        {a.map((element) => {
          return (
            <div className="h-50 border-0 rounded text-center bg-white font-semibold m-2 ">
              <p className="m-1.5">{element.tagname}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
