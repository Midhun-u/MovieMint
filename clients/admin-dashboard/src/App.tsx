import Header from "./components/layout/Header"
import Sidebar from "./components/layout/Sidebar"
import Router from "./Router"
import style from './app.module.scss'

const App = () => {

  return (

    <>
      <Header />
      <section className={style.container}>
        <Sidebar />
        <Router />
      </section>
    </>

  )

}

export default App