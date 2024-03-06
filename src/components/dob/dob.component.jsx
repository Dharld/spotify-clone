import { useEffect, useState } from "react";
import Select from "../select/select.component";
import Input from "../input/input.component";
import exclamationIcon from "../../assets/icons/exclamation-red.png";
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

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [dayError, setDayError] = useState("");
  const [dayBlur, setDayBlur] = useState(false);
  const [yearError, setYearError] = useState("");
  const [yearBlur, setYearBlur] = useState(false);
  const [year, setYear] = useState("");

  useEffect(() => {
    setDayError(
      dayValidation.test(day) || !dayBlur
        ? ""
        : "Please enter the day of your birth date by entering a number between 1 and 31."
    );
  }, [day]);

  useEffect(() => {
    setYearError(
      yearValidation.test(year) || !yearBlur
        ? ""
        : "Please enter a birth year between 1900 and the current Year."
    );
  }, [year]);

  const dayValidation = {
    test: (num) => num > 0 && num < 32,
  };

  const yearValidation = {
    test: (num) => num >= 1900 && num < new Date().getFullYear(),
  };

  const handleDayChange = (e) => {
    const isNumber = (value) => {
      return isNaN(value) === false;
    };
    const value = e.target.value;
    value.length < 3 && isNumber(+value) && setDay(e.target.value);
  };

  const handleYearChange = (e) => {
    const isNumber = (value) => {
      return isNaN(value) === false;
    };
    const value = e.target.value;
    value.length <= 4 && isNumber(+value) && setYear(e.target.value);
  };
  return (
    <div className="dob">
      <div className="dob-label">Date of Birth</div>
      <div className="sub-label">Enter your date of birth</div>
      <div className="dob-wrapper">
        <Select
          label="Month"
          items={months}
          name="month"
          handleChange={(month) => setMonth(month)}
        />
        <div className="dob-input-wrapper wrapper-day">
          <Input
            placeholder="dd"
            handleChange={(e) => {
              handleDayChange(e);
              setDayBlur(true);
            }}
            value={day}
            validation={dayValidation}
            showError={false}
          />
        </div>
        <div className="dob-input-wrapper wrapper-year">
          <Input
            placeholder="yyyy"
            handleChange={(e) => {
              handleYearChange(e);
              setYearBlur(true);
            }}
            validation={yearValidation}
            value={year}
            showError={false}
          />
        </div>
      </div>
      <div className="errors">
        {dayError && (
          <div className="error">
            <img src={exclamationIcon} className="error-img" alt="" />
            <div>{dayError}</div>
          </div>
        )}
        {yearError && (
          <div className="error">
            <img src={exclamationIcon} className="error-img" alt="" />
            <div>{yearError}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DOB;
