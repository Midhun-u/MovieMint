'use client'

import { Activity, createContext, ReactNode, useEffect, useRef, useState } from 'react'
import {
  BadgeCheck as SuccessIcon,
  OctagonAlert as ErrorIcon
} from 'lucide-react'
import { LucidReactIconType } from '@/types/lucidReact'

type ToastType = "SUCCESS" | "ERROR"
type ToastStrokeColor = "stroke-primary-color" | "stroke-error-foreground-color"
type ContextType = {
  triggerToastMessage: (message: string, type: ToastType) => void
} | null

export const ToastProvider = createContext<ContextType>(null)

const ToastMessage = ({ children }: { children: ReactNode }) => {

  const [messageDetails, setMessageDetails] = useState<{
    message: string,
    type: ToastType,
    strokeColor: ToastStrokeColor
  }>({
    message: "",
    type: "SUCCESS",
    strokeColor: "stroke-primary-color"
  })
  const [showToastMessage, setShowToastMessage] = useState<boolean>(false)
  const toastRef = useRef<HTMLDivElement>(null)
  const [ToastIcon, setToastIcon] = useState<LucidReactIconType>(SuccessIcon)

  // Function for triggering toast message
  const triggerToastMessage = (message: string, type: ToastType) => {

    setShowToastMessage(true)

    switch (type) {

      case "SUCCESS":
        setToastIcon(SuccessIcon)
        setMessageDetails({ ...messageDetails, strokeColor: "stroke-primary-color", message: message, type: type })
        break

      case "ERROR":
        setToastIcon(ErrorIcon)
        setMessageDetails({ ...messageDetails, strokeColor: "stroke-error-foreground-color", message: message, type: type })
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
      {children}
      <Activity mode={showToastMessage ? "visible" : "hidden"}>
        <div
          ref={toastRef}
          className='fixed transition-all duration-200 -top-15 w-full h-auto p-2 flex justify-center'
        >
          <div
            className={`px-5 py-3 bg-foreground-color flex gap-2 items-center rounded-lg border ${messageDetails.type === "SUCCESS" ? 'border-primary-color/40' : 'border-error-foreground-color/40'}`}
          >
            <ToastIcon
              size={22}
              className={`${messageDetails.strokeColor}`}
            />

            <h3
              className='text-sm font-medium'
            >
              {messageDetails.message}
            </h3>
          </div>
        </div>
      </Activity>
    </ToastProvider.Provider>

  )
}

export default ToastMessage