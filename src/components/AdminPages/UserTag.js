import React from "react";
import api from "../../config/axios";
import { Modal, Button } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
// import ReqModal from "./ReqModal";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
// import { addnewtag } from "../../../../podbackend/controllers/admin-controller";
const addNewUserTag = async (
  tagname,
  podcastID,
  removeele,
  setRemoveele,
  setAdminTags,
  setRequestedTags,
  requestedTags,
  setTagArray
) => {
  for (var i = 0; i < removeele.length; i++) {
    if (removeele[i]["tag"] === tagname) {
      removeele.splice(i, 1);
    }
  }
  setRemoveele(removeele);
  // console.log(b, "check passing val");
  if (tagname === null || tagname.length === 0) {
    toast.error("Please add something ");
    return;
  }
  let data = {
    tagname: tagname,
    podcastid: podcastID,
  };
  try {
    // console.log(data, "tagtest");
    let info = await api.post("/api/addnewtagbyuser", data);
    if (info) {
      setAdminTags((oldArray) => [
        ...oldArray,
        { tagname: tagname, tagcount: 1 },
      ]);
      let tempArr = [];
      for (let i = 0; i < requestedTags.length; i++) {
        if (requestedTags[i].tag !== tagname) {
          tempArr.push(requestedTags[i]);
        }
      }
      setRequestedTags(tempArr);
      setTagArray(tempArr);

      toast.success(" Tag added successfully");
    }
  } catch (err) {
    toast.error("Unable to add,try again");
    return;
  }
};
const addupdatedtag = async (
  oldtagname,
  newtagname,
  podcastID,
  setAdminTags,
  setRequestedTags,
  requestedTags,
  setTagArray
) => {
  // if (tagname === null || tagname.length === 0) {
  //   toast.error("Please add something ");
  //   return;
  // }
  let data = {
    oldtagname: oldtagname,
    newtagname: newtagname,
    podcastid: podcastID,
  };
  try {
    // console.log(data, "tagtest");
    let info = await api.post("/api/addmodifiedtag", data);
    if (info) {
      setAdminTags((oldArray) => [
        ...oldArray,
        { tagname: newtagname, tagcount: 1 },
      ]);
      let tempArr = [];
      for (let i = 0; i < requestedTags.length; i++) {
        if (requestedTags[i].tag !== oldtagname) {
          tempArr.push(requestedTags[i]);
        }
      }
      setRequestedTags(tempArr);
      setTagArray(tempArr);
      toast.success(" Tag added successfully");
    }
  } catch (err) {
    toast.error("Unable to add,try again");
    return;
  }
};
const deleteNewUserTag = async (
  tagname,
  podcastID,
  setRequestedTags,
  requestedTags,
  setTagArray
) => {
  if (tagname === null || tagname.length === 0) {
    toast.error("Please add something ");
    return;
  }
  let data = {
    tagname: tagname,
    podcastid: podcastID,
  };
  try {
    // console.log(data, "tagtest");
    let info = await api.post("/api/deletetagbyadmin", data);
    if (info) {
      let tempArr = [];
      for (let i = 0; i < requestedTags.length; i++) {
        if (requestedTags[i].tag !== tagname) {
          tempArr.push(requestedTags[i]);
        }
      }
      setRequestedTags(tempArr);
      setTagArray(tempArr);
      toast.success(" data deleted successfully");
    }
  } catch (err) {
    toast.error("Unable to Add,try again");
    return;
  }
};
export default function UserTag({ b, setAdminTags, setRequestedTags }) {
  const [tagsArray, setTagArray] = useState(b);
  const [checkchange, setCheckChange] = useState(false);
  const [removeele, setRemoveele] = useState(b);
  // console.log(b);
  // const [showModal, setShow] = useState(false);

  // const handleClose = () => setShow(false);

  // const handleShow = () => setShow(true);
  // const inputRef = useRef(null);

  // console.log(tagsArray, "array");
  useEffect(() => {
    setTagArray(b);
  }, [b]);

  return (
    <div
      style={{
        border: " 1px solid rgba(0, 0, 0, 0.4)",
        background:
          " linear-gradient(110.43deg, rgba(95, 80, 163, 0.5) -538.07%, rgba(95, 80, 163, 0) 116.23%)",
      }}
      className="w-[100%]  bg-gray-200 p-1 overflow-auto "
    >
      <div className="underline underline-offset-8 decoration-1 font-bold text-center mb-5">
        Requests
      </div>
      <div className="text-center grid grid-cols-3 mb-3">
        <div>Seller Name</div>
        <div className="grid grid-cols-10">
          <div className=" col-span-9">Tag Name</div>
          <div className="col-span-1">
            <BiEdit className="mt-2" />
          </div>
        </div>
        <div>Actions</div>
      </div>
      {tagsArray.map((item, ind) => {
        return (
          <div key={ind}>
            <div className="grid grid-cols-3 mb-2 text-center rounded  bg-gray-300  border-2 justify-between ">
              <div className="flex flex-col justify-center">
                {item?.sellername}
              </div>
              <div className="flex flex-col justify-center">
                {/* <input
                  className="mt-[20%] w-[100%] text-center border-b-4 bg-gray-300"
                  defaultValue={item.tag}
                  onChange={(e) => {
                    let tempArray = tagsArray;
                    // console.log(tempArray, tagsArray);
                    tempArray[ind]["tag"] = e.target.value;
                    // setTagArray(tempArray);
                  }}
                /> */}
                {item?.tag}
              </div>

              <div className="grid grid-rows-2 text-center">
                <Button
                  className="bg-purple-500 w-[80%] ml-3 mb-1 rounded-xl"
                  onClick={() => {
                    addNewUserTag(
                      tagsArray[ind]["tag"],
                      tagsArray[ind]["podcastID"],
                      removeele,
                      setRemoveele,
                      setAdminTags,
                      setRequestedTags,
                      b,
                      setTagArray
                    );
                  }}
                >
                  <p className="m-1">Add</p>
                </Button>
                <Button
                  className="bg-gray-500 w-[80%] ml-3 rounded-xl "
                  onClick={() => {
                    deleteNewUserTag(
                      tagsArray[ind]["tag"],
                      tagsArray[ind]["podcastID"],
                      setRequestedTags,
                      b,
                      setTagArray
                    );
                  }}
                >
                  <p className="m-1">Delete</p>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
