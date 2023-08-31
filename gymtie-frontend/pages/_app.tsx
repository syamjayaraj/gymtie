import '../styles/globals.css'
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
