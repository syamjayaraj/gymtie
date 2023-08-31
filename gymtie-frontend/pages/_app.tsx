import '../styles/globals.css'
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import AppContext from "../AppContext";
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState("")
  useEffect(() => {
    const userDataObject = localStorage.getItem('userData');
    setUserData(JSON.parse(userDataObject))
  }, [])
  return (
    <AppContext.Provider
      value={{
        state: {
          userData: userData
        },
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
