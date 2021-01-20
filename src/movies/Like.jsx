import React from "react";

const Like = (props) => {
  let classes = props.liked ? "fas fa-heart" : "far fa-heart";
  let colors = props.liked ? "red" : "black";
  return (
    <i
      style={{ color: colors, cursor: "pointer" }}
      className={classes}
      onClick={props.onClick}
    ></i>
  );
};

export default Like;
