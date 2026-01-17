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
        {children}
    </>

  )
}

export default MainPagesLayout