import { Activity, type ReactNode, useEffect, useRef, useState } from 'react'
import {
  CircleCheckBig as SuccessIcon,
  OctagonAlert as ErrorIcon
} from 'lucide-react'
import type { LucideReactIconType } from '../../../types/lucideReactType'
import style from '../../../styles/context/toastMessage.module.scss'
import { type ToastType, ToastProvider } from '../providers/ToastProvider'

const ToastMessage = ({ children }: { children: ReactNode }) => {

  const [messageDetails, setMessageDetails] = useState<{
    message: string,
    type: ToastType,
  }>({
    message: "",
    type: "SUCCESS",
  })
  const [showToastMessage, setShowToastMessage] = useState<boolean>(false)
  const toastRef = useRef<HTMLDivElement>(null)
  const [ToastIcon, setToastIcon] = useState<LucideReactIconType>(SuccessIcon)

  // Function for triggering toast message
  const triggerToastMessage = (message: string, type: ToastType) => {

    setShowToastMessage(true)

    switch (type) {

      case "SUCCESS":
        setToastIcon(SuccessIcon)
        setMessageDetails({ ...messageDetails, message: message, type: type })
        break

      case "ERROR":
        setToastIcon(ErrorIcon)
        setMessageDetails({ ...messageDetails, message: message, type: type })
        break

    }

    setTimeout(() => {
      setShowToastMessage(false)
    }, 3000)

  }

  useEffect(() => {

    if (!showToastMessage) return

    if (toastRef.current) {
      toastRef.current.style.top = `${0}px`
    }

  }, [showToastMessage])

  return (

    <ToastProvider.Provider value={{
      triggerToastMessage: triggerToastMessage
    }}>
      <Activity mode={showToastMessage ? "visible" : "hidden"}>
        <div
          ref={toastRef}
          className={style['container']}
        >
          <div
            className={messageDetails.type === "ERROR" ? style['error-toast-message'] : style['toast-message']}
          >
            <ToastIcon
              size={22}
              className={style.icon}
            />

            <h3
              className={style['text']}
            >
              {messageDetails.message}
            </h3>
          </div>
        </div>
      </Activity>
      {children}
    </ToastProvider.Provider>

  )
}

export default ToastMessage