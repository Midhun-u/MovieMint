import { useEffect } from 'react'
import { getTheaterApi } from './api/theater'
import style from './App.module.scss'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Router from './Router'
import { useAppDispatch } from './store/hooks'
import { useLocation } from 'react-router'
import { theaterFailed, theaterRequest, theaterSuccess } from './store/theaterSlice'

const App = () => {

  const dispatch = useAppDispatch()
  const pathname = useLocation().pathname

  // Function for getting theater
  const handleGetTheater = async () => {

    dispatch(theaterRequest())

    const result = await getTheaterApi()
    
    if (result.success) {
      dispatch(theaterSuccess({theater: result.theater}))
    }else{
      dispatch(theaterFailed({errorMessage: result.errorMessage}))
    }

  }

  useEffect(() => {
    handleGetTheater()
  }, [pathname])

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