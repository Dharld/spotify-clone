import React from "react";
import Select from "../select/select.component";
import Input from "../input/input.component";
import "./dob.styles.scss";

const DOB = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="dob">
      <div className="dob-label">Date of Birth</div>
      <div className="sub-label">Enter your date of birth</div>
      <div className="dob-wrapper">
        <Select label="Month" items={months} name="month" />
        <Input placeholder="dd" />
        <Input placeholder="yyyy" />
      </div>
    </div>
  );
};

export default DOB;
