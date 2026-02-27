import { useNavigate } from 'react-router'
import { assets } from '../../assets/assets'
import style from '../../styles/ui/noResult.module.scss'
import Button from './Button'

const NoResult = () => {

    const navigate = useNavigate()

    return (

        <div className={style.container}>
            <img
                src={assets.noResult}
                className={style.image}
            />
            <p>
                No items found.
                We couldn't find any items matching your current view. Try Again
            </p>
            <Button
                title='Refresh Page'
                className={style['button']}
                onClick={() => navigate(0)}
            />
        </div>

    )
}

export default NoResult