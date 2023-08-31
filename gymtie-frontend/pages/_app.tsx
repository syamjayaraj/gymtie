import '../styles/globals.css'
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppContext from "../AppContext";
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState("")

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userDataObject = localStorage.getItem('userData');
      setUserData(JSON.parse(userDataObject))
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        state: {
          userData: userData
        },
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
