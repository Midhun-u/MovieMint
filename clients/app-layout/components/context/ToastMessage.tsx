import { Activity, createContext, ReactNode, useState } from 'react'

type ToastType = "SUCCESS" | "ERROR" | "WARNING"

const ToastMessage = ({children}: {children: ReactNode}) => {

    const ToastProvider = createContext(null)
    const [messageDetails, setMessageDetails] = useState<{
        message: string,
        type: ToastType
    }>({
        message: "",
        type: "SUCCESS"
    })
    const [showToastMessage, setShowToastMessage] = useState<boolean>(false)

    // Function for triggering toast message
    const triggerToastMessage = (message: string, type: ToastType) => {

        setShowToastMessage(true)
        setMessageDetails({...messageDetails, message: message, type: type})

    }

  return (

    <ToastProvider.Provider value={null}>
       {children}
       <Activity mode={showToastMessage? "visible": "hidden"}>
            <div>Toast</div>
       </Activity>
    </ToastProvider.Provider>

  )
}

export default ToastMessage