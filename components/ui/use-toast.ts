"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"

export type ToastProps = {
  id?: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toasts: ToastProps[]
  addToast: (toast: ToastProps) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: ToastProps) => {
    const id = toast.id || Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return {
    toast: (props: ToastProps) => context.addToast(props),
    dismiss: (id: string) => context.removeToast(id),
    toasts: context.toasts,
  }
}

// Export the toast function directly as required by the error message
export const toast = (props: ToastProps) => {
  // This is a fallback for when the hook is not available (outside of the provider)
  console.warn("Toast used outside of provider, this may not work as expected")

  // Create a simple toast notification that will be shown in the console
  console.log("Toast:", props)

  // In a real implementation, this would need to access the context
  // But for direct usage, we'll return a dummy function
  return {
    id: props.id || Math.random().toString(36).substring(2, 9),
    dismiss: () => {},
  }
}
