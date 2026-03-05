import { useAppSelector } from '../../store/hooks'
import style from '../../styles/settings/theaterDetails.module.scss'

const TheaterDetails = () => {

    const { theater } = useAppSelector(state => state.theater)

    return (

        <div className={style.container}>
            {/* Theater logo section */}
            <div className={style['theater-image-container']}>
                <div className={style['image-container']}>
                    <img
                        src={theater.theater_image.image_url}
                        className={style['theater-image']}
                    />
                </div>
                <div className={style['details']}>
                    <span>Theater Logo</span>
                    <p>PNG, JPG, JPEG. Max size 10MB.</p>
                </div>
            </div>
        </div>

    )

}

export default TheaterDetails