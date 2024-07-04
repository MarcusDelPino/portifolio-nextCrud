import { ReactNode } from "react"

type ButtonProps = {
  color?: "green" | "blue" | "gray"
  stateNow?: () => void
  children: ReactNode
}

export default function ButtonPage({ children, color, stateNow }: ButtonProps) {
  const colorTW = color ?? "gray"
  
  return (
    <button
      onClick={stateNow}
      className={`bg-gradient-to-r from-${colorTW}-400 to-${colorTW}-700 py-2 px-4 rounded-lg 
                    text-white shadow-md shadow-black/50
            `}
    >
      {children}
    </button>
  )
}
