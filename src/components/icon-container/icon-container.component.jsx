/* eslint-disable react/prop-types */
import "./icon-container.styles.scss";
import IconSVG from "../icon-svg/icon-svg.component";

const IconContainer = ({ name }) => {
  return (
    <div className="icon-container" role="button">
      <IconSVG name={name} active={true} />
    </div>
  );
};

export default IconContainer;
