import Button from '../components/ui/Button'
import { assets } from '../assets/assets'
import style from '../styles/pages/pageNotFound.module.scss'
import { useNavigate } from 'react-router'

const PageNotFound = () => {

    const navigation = useNavigate()

    return (

        <div className={style.container}>
            <img
                src={assets.pageNotFound}
                className={style.image}
            />
            <div className={style['page-details']}>
                <h1 className={style.heading}>Not Found</h1>
                <p className={style.about}>We couldn't find the page you were looking for.</p>
            </div>
            <Button
                title='Go To Dashboard'
                className={style['nav-button']}
                onClick={() => navigation("/")}
            />
        </div>

    )

}

export default PageNotFound