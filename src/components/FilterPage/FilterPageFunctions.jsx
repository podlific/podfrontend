export const TagSortingFucntion = (
  tagsSet,
  setArr,
  overAllPodcastList,
  setListofPodcast
) => {
  let tempArr = [];
  //   console.log(overAllPodcastList);
  //   tagsSet.forEach((ele) => {
  //     console.log(ele);
  //   });
  let check = false;
  for (let i = 0; i < overAllPodcastList.length; i++) {
    for (let j = 0; j < overAllPodcastList[i].tags.length; j++) {
      if (tagsSet.has(overAllPodcastList[i].tags[j])) {
        check = true;
        tempArr.push(overAllPodcastList[i]);
        break;
      }
    }
  }
  //   console.log(tempArr);
  if (!check) {
    setListofPodcast(overAllPodcastList);
  } else {
    setListofPodcast(tempArr);
  }
};
