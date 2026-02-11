import style from './App.module.scss'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Router from './Router'

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