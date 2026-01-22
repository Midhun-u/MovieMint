import Button from '../components/ui/Button'
import { assets } from '../assets/assets'
import style from '../styles/pages/pageNotFound.module.scss'

const PageNotFound = () => {

    return (

        <div className={style.container}>
            <img
                src={assets.pageNotFound}
                className={style.image}
            />
            <Button
                title='Go To Dashboard'
                className={style['nav-button']}
            />
        </div>

    )

}

export default PageNotFound