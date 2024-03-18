/* eslint-disable react/prop-types */
import "./recent.styles.scss";

const Recent = ({ src, label }) => {
  return (
    <div className="recent">
      <div className="img">
        <img src={src} alt="" />
      </div>
      <div className="text">{label}</div>
      <div className="play-button"></div>
    </div>
  );
};

export default Recent;
