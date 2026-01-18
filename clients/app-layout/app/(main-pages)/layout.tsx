import Header from "@/components/layout/Header"
import { ReactNode } from "react"

const MainPagesLayout = ({
  children
}: {
  children: ReactNode
}) => {

  return (

    <>
      <Header />
      <div className="w-full flex justify-center">
        <div className="w-[70%]">
          {children}
        </div>
      </div>
    </>

  )
}

export default MainPagesLayout