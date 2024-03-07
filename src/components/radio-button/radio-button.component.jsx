/* eslint-disable react/prop-types */
import "./radio-button.styles.scss";

const RadioButton = ({ value, label, handleChangeRadio, name }, i) => (
  <div className="radio-button-wrapper" key={i}>
    <input
      type="radio"
      id={value}
      name={name}
      value={value}
      onChange={handleChangeRadio}
    />
    <label htmlFor="M">{label}</label>
  </div>
);

export default RadioButton;
