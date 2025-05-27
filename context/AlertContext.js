"use client"
import { createContext, useContext, useState } from "react"

const AlertContext = createContext()

export const AlertProvider = ({children}) => {
    
    const [Alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500);
  }

  return(
    <AlertContext.Provider value={{Alert, showAlert}}>
        {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
    const context = useContext(AlertContext)
    if (!context) {
        throw new Error("useAlert must be used within a ContextProvider")
    }
    return context
}
