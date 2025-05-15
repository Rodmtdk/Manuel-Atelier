"use client"

export function Tabs({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export function TabsList({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export function TabsTrigger({ children, ...props }) {
  return <button {...props}>{children}</button>
}

export function TabsContent({ children, ...props }) {
  return <div {...props}>{children}</div>
}
