"use client"

import type React from "react"

import { useState, useCallback, createContext } from "react"

type ToastType = "default" | "success" | "error" | "warning"

interface ToastState {
  open: boolean
  message: string
  type: ToastType
  duration: number
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void
  dismiss: () => void
  state: ToastState
}

const initialState: ToastState = {
  open: false,
  message: "",
  type: "default",
  duration: 3000,
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ToastState>(initialState)

  const toast = useCallback((message: string, type: ToastType = "default", duration = 3000) => {
    setState({ open: true, message, type, duration })

    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, open: false }))
    }, duration)

    return () => clearTimeout(timer)
  }, [])

  const dismiss = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }))
  }, [])

  return <ToastContext.Provider value={{ toast, dismiss, state }}>{children}</ToastContext.Provider>
}

export function useToast() {
  return {
    toast: (message: any) => {
      console.log(message)
    },
  }
}

export const toast = (message: any) => {
  console.log(message)
}

export type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}
