import { useEffect, useState } from "react";
import Select from "../select/select.component";
import Input from "../input/input.component";
import exclamationIcon from "../../assets/icons/exclamation-red.png";
import "./dob.styles.scss";

const DOB = ({ handleChange, handleDOBState }) => {
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
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");
  const [yearBlur, setYearBlur] = useState(false);
  const [dobErrorState, setDobErrorState] = useState({
    month: "",
    day: "",
    year: "",
  });

  const dayValidation = {
    test: (num) => num > 0 && num < 32,
  };

  const yearValidation = {
    test: (num) => num >= 1900 && num < new Date().getFullYear(),
  };

  useEffect(() => {
    if (dayValidation.test(day) || !dayBlur) {
      setDayError("");
      setDobErrorState({ ...dobErrorState, day: "" });
    } else {
      setDobErrorState({ ...dobErrorState, day: "error" });
      setDayError(
        "Please enter the day of your birth date by entering a number between 1 and 31."
      );
      handleDOBState("error");
    }
  }, [day]);

  useEffect(() => {
    if (yearValidation.test(year) || !yearBlur) {
      setYearError("");
      setDobErrorState({ ...dobErrorState, year: "" });
    } else {
      setDobErrorState({ ...dobErrorState, year: "error" });
      setYearError(
        "Please enter the year of your birth date by entering a number between 1900 and 2100."
      );
      handleDOBState("error");
    }
  }, [year]);

  useEffect(() => {
    if (day && year && month) {
      const monthIndex = months.indexOf(month);
      const date = new Date(`${year}-${monthIndex + 1}-${day}`);
      // Function to ensure that the current day is within the month days range
      if (date.getMonth() != monthIndex || !yearValidation.test(year)) {
        setDayError("Please enter a valid birth date");
        setDobErrorState({
          month: "error",
          day: "error",
          year: "error",
        });
        handleDOBState("error");
      } else {
        setDobErrorState({
          month: "",
          day: "",
          year: "",
        });
        setDayError("");
        setYearError("");
        handleChange(
          `${year}-${(monthIndex + 1 + "").padStart(2, "0")}-${day}`
        );
        handleDOBState("valid");
      }
    }
  }, [day, month, year]);

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

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
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
          handleChange={(month) => handleMonthChange(month)}
          state={dobErrorState.month}
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
            showErrorMessage={false}
            state={dobErrorState.day}
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
            showErrorMessage={false}
            state={dobErrorState.year}
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
