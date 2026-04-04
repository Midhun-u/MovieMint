import style from '../../styles/bookings/bookingSkeleton.module.scss'

const BookingsSkeleton = () => {

    return (
        <div className={style['container']}>
            <div className={style['image-ui']}></div>
            <div className={style['details-ui-container']}>
                <div className={style['details-ui']}></div>
                <div className={style['details-ui']}></div>
                <div className={style['details-ui']}></div>
                <div className={style['details-ui']}></div>
                <hr />
                <div className={style['details-ui']}></div>
            </div>
        </div>
    )

}

export default BookingsSkeleton