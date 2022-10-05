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
  // //console.log(b, "check passing val");
  if (tagname === null || tagname.length === 0) {
    toast.error("Please add something ");
    return;
  }
  let data = {
    tagname: tagname,
    podcastid: podcastID,
  };
  try {
    // //console.log(data, "tagtest");
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
  setTagArray,
  setnewtagname,
  sellername,
  setsellername
) => {
  // if (tagname === null || tagname.length === 0) {
  //   toast.error("Please add something ");
  //   return;
  // }

  let data = {
    sellername: sellername,
    oldtagname: oldtagname,
    newtagname: newtagname,
    podcastid: podcastID,
  };
  try {
    // //console.log(data, "tagtest");
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
      setnewtagname("");
      setsellername("");
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
    // //console.log(data, "tagtest");
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
const addModifyTag = async (
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
    // //console.log(data, "tagtest");
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
  const [selectModify, setSelectModify] = useState("");
  const [currPodcast, setCurrPodcast] = useState("");
  const [newtagname, setnewtagname] = useState("");
  const [sellername, setsellername] = useState("");
  // //console.log(b);
  // const [showModal, setShow] = useState(false);

  // const handleClose = () => setShow(false);

  // const handleShow = () => setShow(true);
  // const inputRef = useRef(null);

  // //console.log(tagsArray, "array");
  useEffect(() => {
    setTagArray(b);
  }, [b]);
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const inputRef = useRef(null);

  const handleShow = () => setShow(true);
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
                {item.sellername}
              </div>
              <div className="flex flex-col justify-center">
                {/* <input
                  className="mt-[20%] w-[100%] text-center border-b-4 bg-gray-300"
                  defaultValue={item.tag}
                  onChange={(e) => {
                    let tempArray = tagsArray;
                    // //console.log(tempArray, tagsArray);
                    tempArray[ind]["tag"] = e.target.value;
                    // setTagArray(tempArray);
                  }}
                /> */}
                {item?.tag}
              </div>

              <div className="grid grid-rows-3 text-center">
                <Button
                  className="bg-purple-500 w-[80%] ml-3 mb-1 rounded-xl text-white"
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
                  className="bg-gray-400 w-[80%] ml-3 mb-1 rounded-xl text-white"
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
                <Button
                  className="bg-gray-500 w-[80%] ml-3 mb-1 rounded-xl text-white"
                  // onClick={handleShow}
                  onClick={() => {
                    setSelectModify(tagsArray[ind]["tag"]);
                    setCurrPodcast(tagsArray[ind]["podcastID"]);
                    setsellername(item.sellername);
                    handleShow();
                  }}
                >
                  <p className="m-1">Modify</p>
                </Button>
              </div>
            </div>

            <Modal
              className="absolute inset-0 text-center w-[80%] lg:w-[30%] h-[30%] ml-[10%] lg:ml-[34%] mt-[15%]  bg-gray-300 min-h-[200px] rounded-xl"
              show={showModal}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title className="mt-3 font-bold">
                  Modify Tags
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="h-[15%] mb-10">
                <input
                  className="mt-[2%] w-[50%]  text-center  bg-gray-300"
                  value={selectModify}
                  onChange={(e) => {
                    let tempArray = tagsArray;
                    // //console.log(tempArray, tagsArray);
                    tempArray[ind]["tag"] = e.target.value;
                    // setTagArray(tempArray);
                  }}
                />
                <input
                  className="mt-[2%] w-[48%] rounded-xl mr-[2%]  text-center  bg-gray-100"
                  value={newtagname}
                  placeholder="New tagname"
                  onChange={(e) => {
                    let tempArray = tagsArray;
                    // //console.log(tempArray, tagsArray);
                    // tempArray[ind]["tag"] = e.target.value;
                    setnewtagname(e.target.value);

                    // setTagArray(tempArray);
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  className="bg-gray-600 text-white font-semibold rounded-xl mr-4"
                  onClick={handleClose}
                >
                  <div className="m-2 ml-5 mr-5">Close</div>
                </Button>
                <Button
                  variant="secondary"
                  className="bg-purple-600 text-white font-semibold rounded-xl"
                  onClick={() => {
                    handleClose();

                    addupdatedtag(
                      selectModify,
                      newtagname,
                      currPodcast,
                      setAdminTags,
                      setRequestedTags,
                      b,
                      setTagArray,
                      setnewtagname,
                      sellername,
                      setsellername
                    );
                  }}
                >
                  <div className="m-2 ml-5 mr-5">Submit</div>
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      })}
    </div>
  );
}
