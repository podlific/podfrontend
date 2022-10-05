import api from "../../config/axios";
import toast from "react-hot-toast";
export const RemoveRequestFunction = async (
  request,
  setRequestPodcast,
  requestPodcast
) => {
  let info;
  try {
    info = await api.post("/api/deleterequest", request);
    let tempArr = [];
    let data = requestPodcast;
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].sellerid === request.sellerid &&
        data[i].buyerid === request.buyerid &&
        data[i].date === request.date &&
        data[i].time === request.time &&
        data[i].podcastid === request.podcastid &&
        data[i].podcastname === request.podcastname
      ) {
      } else {
        tempArr.push(data[i]);
      }
    }
    setRequestPodcast(tempArr);
    toast.success("Request updated successfully");
  } catch (err) {
    toast.error("Unable to update request");
  }
  return;
};
