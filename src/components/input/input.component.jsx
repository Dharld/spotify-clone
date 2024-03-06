/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./input.component.scss";

export default function Input({
  label,
  sublabel,
  name = "",
  type = "text",
  value = "",
  handleChange,
  validation,
  onBlur,
  placeholder,
}) {
  const [isEmpty, setIsEmpty] = useState(value === "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsEmpty(value === "");
  }, [value]);

  const handleBlur = (e) => {
    if (validation && !validation.test(e.target.value)) {
      setError(true);
    } else {
      setError(false);
    }
    onBlur && onBlur(e);
  };

  return (
    <div className="input-wrapper">
      {label && (
        <div htmlFor={name} className="label">
          {label}
        </div>
      )}
      {sublabel && (
        <div htmlFor={name} className="sublabel">
          {sublabel}
        </div>
      )}
      <div
        className={`input ${isEmpty ? "" : "not-empty"} ${
          !error ? "" : "has-error"
        }`}
      >
        <input
          type={type}
          name={name}
          key={name}
          id={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
      </div>
      {error && <div className="error-message">{validation.errorMessage}</div>}
    </div>
  );
}
