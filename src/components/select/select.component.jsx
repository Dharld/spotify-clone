/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./select.styles.scss";

export default function Select({
  label,
  name = "",
  value = "",
  handleChange,
  validation,
  items,
  state,
}) {
  const [isEmpty, setIsEmpty] = useState(value === "");
  const [error, setError] = useState(false);
  const [val, setVal] = useState(value);
  const [open, setOpen] = useState(false);

  const selectRef = useRef(null);

  useEffect(() => {
    setIsEmpty(value === "");
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    // Add event listener to detect clicks outside of select element
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="select-wrapper" ref={selectRef}>
      <div
        className={`select ${isEmpty ? "" : "not-empty"} ${
          !error ? "" : "has-error"
        } ${state === "error" ? "has-error" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <select name={name} id={name} key={name} value={val} readOnly></select>
        <input
          type="text"
          className="input-select"
          value={val === "" ? label : val}
          readOnly
        />
        {open && (
          <div className="dropdown-list">
            <div className={`dropdown-list-item`}>
              <div className="label">{label}</div>
              {items &&
                items.map((item, i) => (
                  <div
                    className="dropdown-list-item-label"
                    key={i}
                    onClick={() => {
                      setVal(item);
                      handleChange && handleChange(item);
                    }}
                  >
                    <span className="dropdown-list-item-label-text">
                      {" "}
                      {item}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      {error && <div className="error-message">{validation.errorMessage}</div>}
    </div>
  );
}
