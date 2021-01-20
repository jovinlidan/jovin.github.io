import React from "react";
import { Link } from "react-router-dom";
const AddNew = (props) => {
  const { to } = props;
  return (
    <Link to={to} style={{ textDecoration: "none", color: "White" }}>
      <button className="btn btn-primary mt-1 mb-2">New Movie</button>
    </Link>
  );
};

export default AddNew;
