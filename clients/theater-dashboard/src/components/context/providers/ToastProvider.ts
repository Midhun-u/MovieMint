import {createContext} from 'react'

export type ToastType = "SUCCESS" | "ERROR";
type ContextType = {
  triggerToastMessage: (message: string, type: ToastType) => void;
} | null;

export const ToastProvider = createContext<ContextType>(null);
