"use client";
import { createContext, useState, useEffect } from "react";

export const FeedbackContext = createContext({
  alert: {
    message: "",
    type: "",
    link: "",
    linkText: "",
    handleClick: () => {},
    active: false,
  },
  setAlert: (obj) => {},
});
// Used to manage alerts and notifications all over the application
export const FeedbackContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    link: "",
    linkText: "",
    handleClick: () => {},
  });
  const contextValue = {
    alert: alert,
    setAlert: setAlert,
  };

  useEffect(() => {
    if (alert.active) {
      setTimeout(() => {
        // Hide the alert after 3 seconds
        setAlert({ active: false, type: "", message: "" });
      }, 3000);
    }
  }, [alert]);

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
    </FeedbackContext.Provider>
  );
};
