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
      <section className="w-full flex justify-center">
        <section className="w-full overflow-x-scroll">
          {children}
        </section>
      </section>
    </>

  )
}

export default MainPagesLayout