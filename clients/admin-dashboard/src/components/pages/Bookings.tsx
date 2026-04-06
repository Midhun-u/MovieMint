import BookingsList from "../bookings/BookingsList"
import PageDetails from "../ui/PageDetails"
import style from '../../styles/pages/bookings.module.scss'

const Bookings = () => {

    return (
        <div className={style['container']}>
            <PageDetails
                title="Bookings"
                about="You can see the complete bookings of your shows."
                backButton={false}
            />
            <BookingsList
            />
        </div>
    )

}

export default Bookings