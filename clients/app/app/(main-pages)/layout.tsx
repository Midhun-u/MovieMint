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
        <div className="w-full px-3 sm:w-[95%] sm:px-0 md:w-[70%] overflow-x-scroll">
          {children}
        </div>
      </div>
    </>

  )
}

export default MainPagesLayout