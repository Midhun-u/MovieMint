import { assets } from "../../assets/assets"
import style from '../../styles/theaterDetails/theaterSeatLayout.module.scss'

interface TheaterSeatLayoutProps {
    layoutNumber: number
    setsNumber: number
    rowsNumber: number
    seatNumber: number
}

const TheaterSeatLayout = ({layoutNumber = 0, setsNumber = 0, rowsNumber = 0, seatNumber = 0 }: TheaterSeatLayoutProps) => {

    return (

        <div className={style.container}>
            {/* Theater Screen */}
            <div className={style['image-container']}>
                <img
                    src={assets.theaterScreen}
                    alt="Theater screen"
                />
            </div>
            {/* Seat section */}
            <div className={style['seat-section']}>
                {
                    // Layouts
                    Array(layoutNumber).fill(null).map((_, layoutIndex) => (

                        <div
                            key={layoutIndex}
                        >
                            <div className={style.layout}>
                                {
                                    // Sets
                                    Array(setsNumber).fill(null).map((_, setIndex) => (

                                        <div
                                            key={setIndex}
                                            className={style.sets}
                                        >
                                            {
                                                // Rows
                                                Array(rowsNumber).fill(null).map((_, rowIndex) => (

                                                    <div
                                                        className={style.rows}
                                                        key={rowIndex}
                                                    >
                                                        {
                                                            Array(seatNumber).fill(null).map((_, seatIndex) => (

                                                                <div
                                                                    key={seatIndex}
                                                                    className={style.seat}
                                                                >
                                                                    {`S${seatIndex + 1}`}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    )

}

export default TheaterSeatLayout