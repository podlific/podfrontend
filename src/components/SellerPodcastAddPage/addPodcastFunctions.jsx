export const TagDropDownFunction = () => {};
export const myTimeout = (setShowTagSuggestions) => {
  setTimeout(() => {
    setShowTagSuggestions(false);
  }, 1500);
  clearTimeout(myTimeout);
};
