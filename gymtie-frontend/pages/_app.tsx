import "../styles/globals.css";
import "../styles/timeline.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "node_modules/bootstrap-icons/font/bootstrap-icons.css";

import AppContext from "../AppContext";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDataObject = localStorage.getItem("userData");
      setUserData(JSON.parse(userDataObject));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        state: {
          userData: userData,
        },
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
      <ToastContainer />
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
