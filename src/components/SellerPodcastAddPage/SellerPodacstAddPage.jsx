import React, { useEffect, useState } from "react";
import FooterWebPage from "../shared/WebPage/FooterWebPage";
import FooterMobile from "../shared/Mobile/FooterMobile";
import NavigationWebPage from "../shared/WebPage/NavigationWebPage";
import NavigationMobile from "../shared/Mobile/NavigationMobile";
import { useSelector } from "react-redux";
import { MdGroups } from "react-icons/md";
import { HiPhotograph } from "react-icons/hi";
import { AiFillPlusSquare, AiFillCloseCircle } from "react-icons/ai";
import { ImPriceTags } from "react-icons/im";
import { BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import toast from "react-hot-toast";
import storage from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const SellerPodcastAddPage = ({ userInfo }) => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.activate.unique_id);
  const usertype = useSelector((state) => state.activate.usertype);
  const userName = useSelector((state) => state.activate.username);
  const [averageListener, setAverageListener] = useState("NA");
  const [averageEpisodeLength, setAverageEpisodeLength] = useState("NA");
  const [averageLTR, setAverageLTR] = useState("NA");
  const [releaseFrequency, setReleaseFrequency] = useState("NA");
  const [addedEpisode, setAddedEpisode] = useState(null);
  const [episodeList, setEpisodeList] = useState([]);
  const [podcastName, setPodcastName] = useState("");
  const [description, setDescription] = useState("");
  const [episodeName, setEpisdeName] = useState("");
  const [themes, setThemes] = useState([]);
  const [tags, setTags] = useState([]);
  const [groups, setGroups] = useState([]);
  const [themeVal, setThemeVal] = useState("");
  const [tagVal, setTagVal] = useState("");
  const [groupVal, setGroupVal] = useState("");
  const [podcastThumbnail, setPodcastThumbnail] = useState(null);
  const [podcastPreview, setPodcastPreview] = useState();
  const [showImage, setShowImage] = useState(false);
  const [link, setLink] = useState("");
  const episodes = [
    {
      id: 1,
      epi_no: "EP 01",
      epi_name: "OVERCAST Name of Episode",
      epi_duration: "23:45",
    },
    {
      id: 2,
      epi_no: "EP 01",
      epi_name: "OVERCAST Name of Episode",
      epi_duration: "23:45",
    },
    {
      id: 3,
      epi_no: "EP 01",
      epi_name: "OVERCAST Name of Episode",
      epi_duration: "23:45",
    },
    {
      id: 4,
      epi_no: "EP 01",
      epi_name: "OVERCAST Name of Episode",
      epi_duration: "23:45",
    },
    {
      id: 5,
      epi_no: "EP 01",
      epi_name: "OVERCAST Name of Episode",
      epi_duration: "23:45",
    },
  ];

  const data = {
    image: link,
    sellerId: user.unique_id,
    sellerUserName: userName.username,
    sellername: userInfo.name,
    episodeName: episodeName,
    podcastName: podcastName,
    tags: JSON.stringify(tags),
    theme: JSON.stringify(themes),
    groups: JSON.stringify(groups),
    episodes: JSON.stringify(episodes),
    description: description,
    averageListener: averageListener,
    averageEpisodeLength: averageEpisodeLength,
    averageLTR: averageLTR,
    releaseFrequency: releaseFrequency,
  };
  const handleSubmit = async () => {
    if (
      podcastThumbnail === null ||
      podcastName === "" ||
      episodeName === "" ||
      description === "" ||
      tags.length === 0 ||
      themes.length === 0 ||
      groups.length === 0 ||
      averageListener === "NA" ||
      setAverageEpisodeLength === "NA" ||
      averageLTR === "NA" ||
      releaseFrequency === "NA"
    ) {
      toast.error("Fill all fields");
      return;
    }
    const storageRef = ref(storage, `/files/${podcastThumbnail.name}`);
    const uploadTask = uploadBytesResumable(storageRef, podcastThumbnail);
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        // setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          data.image = url;
          try {
            await api.post("/api/addnewpodcast", data, {
              headers: {
                "content-type": "multipart/form-data",
              },
            });
            toast("Please refesh to see updates");
            toast.success("New podcast added successfully");
            navigate("../sellerfilterpage");
          } catch (err) {
            toast.error("Unable to add new podcast");
            navigate("../sellerfilterpage");
          }
        });
      }
    );
  };
  useEffect(() => {
    if (usertype.usertype === "admin") {
      navigate("/admindashboard");
    }
  }, []);
  useEffect(() => {
    if (addedEpisode) {
      let newList = [...episodeList, addedEpisode];
      setEpisodeList(newList);
    }
  }, [addedEpisode]);

  useEffect(() => {
    if (podcastThumbnail) {
      let objectUrl;
      const size = (podcastThumbnail.size / 1024 / 1024).toFixed(2);
      // console.log(size);

      if (size > 1) {
        toast.error("The image size must be less than 1Mb");
        setShowImage(false);
        return;
      } else {
        const objectUrl = URL.createObjectURL(podcastThumbnail);
        setShowImage(true);
        setPodcastPreview(objectUrl);
      }
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [podcastThumbnail]);

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="hidden md:block">
        <NavigationWebPage />
      </div>
      <div className=" md:hidden">
        <NavigationMobile />
      </div>
      <div className="h-full flex flex-col  px-10 lg:px-16 xl:px-28   overflow-y-scroll">
        <div className="flex flex-col md:flex-row  justify-center w-full py-4 ">
          <div className=" w-full ">
            <div className="w-full flex flex-col md:w-4/5 ">
              <div className="py-1">
                <span className="font-semibold text-[#343C44]">
                  Name of the Podcast
                </span>
              </div>
              <div className="py-1 w-full">
                <input
                  className=" w-full md:w-4/6 rounded-md bg-[#FBFBFB] border-[1px] border-[#D6E4EC] pl-3 p-1"
                  placeholder="Type Name "
                  value={podcastName}
                  onChange={(e) => setPodcastName(e.target.value)}
                ></input>
              </div>
              <div className="py-1">
                <span className="font-semibold text-[#343C44]">
                  Episode Name
                </span>
              </div>
              <div className="py-1 w-full">
                <input
                  className=" w-full md:w-4/6 rounded-md bg-[#FBFBFB] border-[1px] border-[#D6E4EC] pl-3 p-1"
                  placeholder="Type Episode Name "
                  value={episodeName}
                  onChange={(e) => setEpisdeName(e.target.value)}
                ></input>
              </div>
              <div className="py-1">
                <span className="font-semibold text-[#343C44]">
                  Description
                </span>
              </div>
              <div className="w-full py-1">
                <textarea
                  className=" w-full md:w-4/6 h-24 rounded-md border-[1px] border-[#D6E4EC] pl-3"
                  placeholder="Type Here "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className=" flex flex-col md:justify-end  ">
            {podcastThumbnail && showImage ? (
              <div className=" h-[200px] md:h-[250px] md:w-[350px] xl:w-[500px]  flex flex-col items-center justify-center  border-2 border-[#D6E4EC] rounded-lg relative ">
                <img
                  className="object-cover h-full w-full"
                  src={podcastPreview}
                  alt="imagepreview"
                />
                <div
                  className="absolute top-1 right-1"
                  onClick={() => setPodcastThumbnail(null)}
                >
                  <AiFillCloseCircle color="red" size={25} />
                </div>
              </div>
            ) : (
              <label htmlFor="pod1">
                <div className="w-full h-[200px] md:h-[250px] md:w-[350px] xl:w-[500px] flex flex-col items-center justify-center  border-2 border-[#D6E4EC] rounded-lg ">
                  <BsUpload size={50} />
                </div>
              </label>
            )}
            <input
              className="hidden"
              type="file"
              name="podcast-img"
              id="pod1"
              onChange={(e) => {
                setPodcastThumbnail(e.target.files[0]);
              }}
              accept="image/*"
            />
          </div>
        </div>
        <div className=" flex flex-col md:flex-row  justify-between py-4">
          <div className=" w-full md:w-1/2 h-full flex flex-col justify-between items-start ">
            <div className="w-full h-full lg:w-[90%] flex flex-row flex-wrap">
              <div className="w-full h-full p-2 shadow-md shadow-zinc-400 rounded-lg">
                <div className="flex flex-row p-2 items-center">
                  <HiPhotograph size={22} />
                  <span className="ml-2 font-semibold text-[#343C44]">
                    Themes of show
                  </span>
                </div>
                <div className="p-2 flex flex-wrap ">
                  {themes &&
                    themes.map((theme, index) => {
                      return (
                        <span className="p-1 pl-2 m-1 pr-2 rounded-xl bg-[#B198FF] text-white">
                          {theme}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="w-full pt-2 flex flex-row items-center  md:justify-start">
              <div className="pt-1">
                <input
                  className="rounded-md bg-[#FBFBFB] border-[1px] border-[#D6E4EC] pl-3 p-1"
                  placeholder="Type Theme tag"
                  value={themeVal}
                  onChange={(e) => setThemeVal(e.target.value)}
                />
              </div>
              <AiFillPlusSquare
                className="pl-3 rounded-md"
                size={50}
                color={"#B198FF"}
                radius={10}
                onClick={() => {
                  setThemes((oldArray) => [...oldArray, themeVal]);
                  setThemeVal("");
                }}
              />
            </div>
          </div>

          <div className=" w-full md:w-1/2 flex flex-col items-center justify-between">
            <div className=" w-full h-full lg:w-[80%] flex flex-row flex-wrap">
              <div className="w-full h-full p-2 shadow-md shadow-zinc-400 rounded-lg">
                <div className="flex  flex-row p-2 items-center">
                  <ImPriceTags size={22} />
                  <span className="ml-2 font-semibold text-[#343C44]">
                    Related Tags
                  </span>
                </div>
                <div className="p-2 flex flex-wrap ">
                  {tags &&
                    tags.map((tag, index) => {
                      return (
                        <span className="p-1 pl-2 m-1 pr-2 rounded-xl bg-[#B198FF] text-white">
                          {tag}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="w-full  pt-2 flex flex-row items-center md:justify-center">
              <div className="pt-1">
                <input
                  className="rounded-md bg-[#FBFBFB] border-[1px] border-[#D6E4EC] pl-3 p-1"
                  placeholder="Type Theme tag"
                  value={tagVal}
                  onChange={(e) => setTagVal(e.target.value)}
                />
              </div>
              <AiFillPlusSquare
                className="pl-3 rounded-md"
                size={50}
                color={"#B198FF"}
                radius={10}
                onClick={() => {
                  setTags((oldArray) => [...oldArray, tagVal]);
                  setTagVal("");
                }}
              />
            </div>
          </div>
          <div className=" w-full md:w-1/2 flex flex-col items-end justify-between">
            <div className=" w-full h-full lg:w-[80%] flex flex-row flex-wrap">
              <div className="w-full h-full p-2 shadow-md shadow-zinc-400 rounded-lg">
                <div className="flex flex-row p-2 items-center">
                  <MdGroups size={22} />
                  <span className="ml-2 font-semibold text-[#343C44]">
                    Target Groups
                  </span>
                </div>
                <div className="p-2 flex flex-wrap ">
                  {groups &&
                    groups.map((tag, index) => {
                      return (
                        <span
                          className="p-1 pl-2 m-1 pr-2 rounded-xl bg-[#B198FF] text-white"
                          key={index}
                        >
                          {tag}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="w-full pt-2 flex flex-row items-center md:justify-end">
              <div className="pt-1">
                <input
                  className="rounded-md bg-[#FBFBFB] border-[1px] border-[#D6E4EC] pl-3 p-1"
                  placeholder="Type Group tag"
                  value={groupVal}
                  onChange={(e) => setGroupVal(e.target.value)}
                />
              </div>
              <AiFillPlusSquare
                className="pl-3 rounded-md"
                size={50}
                color={"#B198FF"}
                radius={10}
                onClick={() => {
                  setGroups((oldArray) => [...oldArray, groupVal]);
                  setGroupVal("");
                }}
              />
            </div>
          </div>
        </div>
        {/* <div className="flex flex-row w-full "> */}
        <div className=" flex flex-col md:flex-row  justify-between bg-[#FFFFFF] rounded-md py-4  ">
          <div className="flex flex-col md:flex-row justify-between w-full">
            <div className="flex flex-col p-3  ">
              <span className="md:text-sm font-semibold">Average Listners</span>
              {/* <span className="md:text-2xl font-semibold">156,890</span> */}
              <input
                className="w-32 h-8 p-2 md:text-2xl font-semibold outline-none"
                type="text"
                value={averageListener}
                onChange={(e) => setAverageListener(e.target.value)}
                name="average"
                id="av"
              />
              <div className="flex flex-row md:text-sm items-center font-semibold">
                <span>
                  <img className="" src="./icons/g4.png" alt="g4" />
                </span>
                <span className="text-[#2DF595]">+33.7% </span>
                <span className="text-[#999999] ml-1"> vs last week</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="h-[65%] border-r border-[#C4C4C4]"></div>
            </div>
            <div className="flex flex-col p-3 xl:pr-7 ">
              <span className="md:text-sm font-semibold">
                Average Episode Length
              </span>
              <input
                className="w-36 h-8 p-2 md:text-2xl font-semibold outline-none"
                type="text"
                value={averageEpisodeLength}
                onChange={(e) => setAverageEpisodeLength(e.target.value)}
                name="average"
                id="av"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="h-[65%] border-r border-[#C4C4C4]"></div>
            </div>
            <div className="flex flex-col p-3 xl:pr-7 xl:mr-6 lg:px-10">
              <span className="md:text-sm font-semibold">Average LTR</span>
              <input
                className="w-36 h-8 p-2 md:text-2xl font-semibold outline-none"
                type="text"
                value={averageLTR}
                onChange={(e) => setAverageLTR(e.target.value)}
                name="average"
                id="av"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="h-[65%] border-r border-[#C4C4C4]"></div>
            </div>
            <div className="flex flex-col p-3 xl:pr-16 lg:px-10">
              <span className="md:text-sm font-semibold ">
                Release Frequency
              </span>
              <input
                className="w-36 h-8 p-2 md:text-2xl font-semibold outline-none"
                type="text"
                value={releaseFrequency}
                onChange={(e) => setReleaseFrequency(e.target.value)}
                name="average"
                id="av"
              />
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className="flex flex-row justify-between w-full py-4">
          <div className="flex flex-col ">
            <div className="py-1 hidden">
              <span className="font-semibold text-[#343C44]">Name</span>
            </div>
            <div className="py-1 w-full hidden">
              <input
                className="w-full rounded-md bg-[#FBFBFB] border-[1px] border-[#D6E4EC] pl-3 p-1"
                placeholder="Type Name "
              ></input>
            </div>
          </div>
          <div className="w-2/3 flex flex-col pl-10  ">
            <div className="py-1">
              <span className="font-semibold text-[#343C44] hidden">Email</span>
            </div>
            <div className="py-1 w-1/2 hidden">
              <input
                className="w-3/6 rounded-md bg-[#FBFBFB] border-[1px] border-[#D6E4EC] pl-3 p-1"
                placeholder="Type Email "
              ></input>
            </div>
          </div>
          <div className="flex flex-row items-end ">
            <button
              className="px-5 p-1 rounded-2xl  bg-[#B198FF] text-white font-semibold"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <FooterMobile />
      </div>
      <div className="hidden md:block">
        <FooterWebPage />
      </div>
    </div>
  );
};

export default SellerPodcastAddPage;
