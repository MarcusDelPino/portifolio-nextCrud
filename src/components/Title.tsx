import { ReactNode } from "react"
import { Roboto } from "next/font/google"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
})

type TituloProps = {
    children: ReactNode
}

export default function Title({children} : TituloProps) {
  return (
    
    <div className={`
        flex flex-col justify-center
    `}>
        <h1 className={`px-7 py-2 text-4xl font-light ${roboto.className}`}>
            {children}
        </h1>
        <hr className={` border-2 border-indigo-700`}/>
    </div>
  )
}
