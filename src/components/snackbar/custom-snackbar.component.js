import React, {useState, useRef} from 'react';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from "@mui/icons-material/Close";
import { Transition } from "react-transition-group";
import "./custom-snackbar.styles.scss"


const CustomSnackbar = ({ open, message, handleClose, title, styles }) => {
  
  const [exited, setExited] = useState(true);
  const nodeRef = useRef(null);
  
  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };


  return (
      
        <Transition timeout={{ enter: 400, exit: 400}} in={open}  unmountOnExit onEnter={handleOnEnter} appear onExited={handleOnExited} nodeRef={nodeRef}>
          {status => {
            return (
              <Snackbar open={status === "entered"}>
                <div className={`snackbar-wrapper`} ref={nodeRef}>
                  <div className={`snackbar-message ${styles} transition-${status}`}>
                    <div className="snackbar-title">{title}</div>
                    <div className="snackbar-description">
                      { message }
                    </div>
                    <CloseIcon onClick={handleClose} className="snackbar-close-icon" />
                  </div>
                </div>
              </Snackbar>
              
            )
          }}
        </Transition>
    
  );
};

export default CustomSnackbar;
