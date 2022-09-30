export const convertDate = (currDate) => {
  let splitTime = currDate.split("/");
  if (splitTime[1] < 10) {
    splitTime[1] = "0" + splitTime[1];
  }
  if (splitTime[0] < 10) {
    splitTime[0] = "0" + splitTime[0];
  }
  splitTime = splitTime[2] + "-" + splitTime[0] + "-" + splitTime[1];
  return splitTime;
};
export const splitTime = (currDate) => {
  let splitTime = currDate.split("/");
  if (splitTime[1] < 10) {
    splitTime[1] = "0" + splitTime[1];
  }
  if (splitTime[0] < 10) {
    splitTime[0] = "0" + splitTime[0];
  }
  splitTime = splitTime[2] + "-" + splitTime[1] + "-" + splitTime[0];
  return splitTime;
};
export const addOneDayToDate = (currDate) => {
  let newTime = new Date(currDate).getTime();
  let finalTime = new Date(newTime + 60 * 60 * 24 * 1000).toLocaleDateString();
  return finalTime;
};
