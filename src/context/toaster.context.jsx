/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

const ToasterContext = createContext();

export const useToast = () => useContext(ToasterContext);

export const ToasterProvider = ({ children }) => {
  const successToast = (message) => {
    toast.success(message, {
      duration: 5000000,
    });
  };

  const errorToast = (message) => {
    toast.error(message);
  };

  return (
    <ToasterContext.Provider value={{ successToast, errorToast }}>
      <Toaster position="top-right" />
      {children}
    </ToasterContext.Provider>
  );
};
