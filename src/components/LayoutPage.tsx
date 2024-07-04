import { ReactNode } from "react"
import Title from "./Title"

type LayoutPageProps = {
  title: string
  children: ReactNode
}

export default function LayoutPage({ title, children }: LayoutPageProps) {
  return (
    <div
      className={`
            flex flex-col w-1/3 bg-white text-gray-800 rounded-lg shadow-lg 
          `}
    >
      <Title>{title}</Title>
      <div
        className={`
                    p-6 
                `}
      >
        {children}
      </div>
    </div>
  )
}
