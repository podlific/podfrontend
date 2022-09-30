import React from "react";

const Progressbar = ({ progress, tagname }) => {
  const Parentdiv = {
    // height: height,
    width: "50%",
    backgroundColor: "white",
    borderRadius: "10px",
    // margin: 50,
    marginBottom: 5,
    // marginLeft: 50,
  };

  const Childdiv = {
    height: "100%",
    marginBottom: "3px",
    marginTop: "2px",
    width: `${progress}%`,
    // border: "2px",
    border: "1px solid rgba(177, 152, 255, 0.29)",

    borderRadius: "6px",
    // background: "#6a3093" /* fallback for old browsers */,
    background:
      "linear-gradient(90deg, #B198FF -255.99%, rgba(177, 152, 255, 0) 128.48%)" /* Chrome 10-25, Safari 5.1-6 */,
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    // borderRadius: 40,
    textAlign: "left",
  };

  const progresstext = {
    padding: 1,
    color: "black",
    // fontWeight: 900,
    marginLeft: "5px",
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${tagname}`}</span>
      </div>
    </div>
  );
};

export default Progressbar;
