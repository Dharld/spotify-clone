/* eslint-disable react/prop-types */
import { CustomScroll } from "react-custom-scroll";
import "./custom-scrollbar.styles.scss";

const CustomScrollbar = ({ children }) => {
  return <CustomScroll heightRelativeToParent="100%">{children}</CustomScroll>;
};

export default CustomScrollbar;
