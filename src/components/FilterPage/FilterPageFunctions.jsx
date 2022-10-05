export const TagSortingFucntion = (
  tagsSet,
  setArr,
  overAllPodcastList,
  setListofPodcast
) => {
  let tempArr = [];
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
  if (!check) {
    setListofPodcast(overAllPodcastList);
  } else {
    setListofPodcast(tempArr);
  }
};

export const handleClickTag = (event, tag, tagsSet) => {
  let element = event.currentTarget;
  if (element.style.backgroundColor === "rgb(95, 80, 163)") {
    element.style.backgroundColor = "#C2C2C2";
    element.style.color = "rgb(0, 0, 0)";
    tagsSet.delete(tag);
  } else {
    element.style.backgroundColor = "rgb(95, 80, 163)";
    element.style.color = "rgb(255, 255, 255)";
    tagsSet.add(tag);
  }
};

export const hide = (obj, active, setActive, theme, setTheme) => {
  if (obj === "filter-1" && active) {
    let el = document.getElementById(obj);
    el.style.display = "none";
    setActive(false);
  }
  if (obj === "obj" && theme) {
    let el = document.getElementById(obj);
    el.style.display = "none";
    setTheme(false);
  }

  if (obj === "filter-1" && !active) {
    let p = document.getElementById(obj);
    p.style.display = "block";
    setActive(true);
  }
  if (obj === "obj" && !theme) {
    let p = document.getElementById(obj);
    p.style.display = "block";
    setTheme(true);
  }
};

export const onNext = (start, len, setStart, ListofPodcast, setArr, number) => {
  if (start * number > len) {
    return;
  }
  let s = number * start;
  let e = Math.min(len, number * (start + 1));
  setStart(start + 1);
  let brr = [];
  for (let i = s; i < e; i++) {
    brr.push(ListofPodcast[i]);
  }
  setArr(brr);
};

export const onPrev = (start, len, setStart, ListofPodcast, setArr, number) => {
  if (number * (start - 2) < 0) {
    return;
  }
  let s = Math.max(0, number * (start - 2));
  let e = Math.min(Math.abs(number * (start - 1)), len);
  setStart(start - 1);
  let brr = [];
  for (let i = s; i < e; i++) {
    brr.push(ListofPodcast[i]);
  }
  setArr(brr);
};

export const searchFunction = (
  tempArr,
  searchTag,
  tempUserPodcast,
  setListofPodcast,
  setArr,
  setArr2,
  onHandleClick
) => {
  tempArr.forEach((element) => {
    let x = element.podcastName.toLowerCase();
    x = x.search(searchTag.toLowerCase());
    if (x !== -1) {
      tempUserPodcast = [...tempUserPodcast, element];
    }
  });
  setListofPodcast([...tempUserPodcast]);
  let l = tempUserPodcast.length;
  let e = Math.min(l, 9);
  let ee = Math.min(l, 4);
  let cnt = 0;
  let brr = [];
  let brrr = [];
  tempUserPodcast.forEach((element) => {
    if (cnt < e) {
      brr.push(element);
    }
    if (cnt < ee) {
      brrr.push(element);
    }
    cnt++;
  });
  setArr([...brr]);
  setArr2([...brrr]);
  onHandleClick();
};
