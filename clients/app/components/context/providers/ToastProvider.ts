import { createContext } from "react"
import { ToastType } from "../components/ToastMessage"

type ContextType = {
    triggerToastMessage: (message: string, type: ToastType) => void
} | null

export const ToastProvider = createContext<ContextType>(null)