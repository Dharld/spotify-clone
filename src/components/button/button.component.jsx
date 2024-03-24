/* eslint-disable react/prop-types */
import "./button.styles.scss";

export default function Button({
  label,
  onClick,
  type,
  style = "primary",
  disabled,
  loading,
  icon,
}) {
  return (
    <button
      type={type}
      className={`button ${style}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="content">
          {icon && <img src={icon} alt="" />}
          <span>{label}</span>
        </div>
      )}
    </button>
  );
}
