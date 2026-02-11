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
        <div className={style.pages}>
          <Router />
        </div>
      </section>
    </>

  )

}

export default App