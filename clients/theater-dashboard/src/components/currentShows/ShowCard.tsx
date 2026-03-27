import style from '../../styles/currentShows/showCard.module.scss'
import {
    Drama as CategoryIcon,
    Calendar as DateIcon,
    Clock as TimeIcon,
} from 'lucide-react'
import { convertIsoDateToNormalFormat } from '../../utils/convertIsoDateToNoramlFormat'
import { useNavigate } from 'react-router'

interface ShowCardProps {
    id: string
    moviePoster: string
    movieTitle: string
    movieCategories: Array<string>
    movieId: string
    createdAt: string
    showTime: {
        hour: number
        minutes: number
        month: number
        day: number
        year: number
    }
    status: "SHOWING" | "NOT_SHOWING"
}

const ShowCard = ({ moviePoster, movieId, movieTitle, movieCategories, createdAt, showTime, status, id}: ShowCardProps) => {

    const date = new Date(showTime.year, showTime.month, showTime.day)
    const navigate = useNavigate()

    return (
        <>
            <div onClick={() => navigate(`edit/${id}/${movieId}`)} className={style.container}>
                {/* Movie poster */}
                <img
                    src={moviePoster}
                    alt='Movie poster'
                />
                {/* Show details */}
                <div className={style['details-container']}>
                    <h1 className={style.title}>{movieTitle}</h1>
                    <div className={style.details}>
                        <CategoryIcon
                            size={18}
                            className={style.icon}
                        />
                        <p>{movieCategories.join(", ")}</p>
                    </div>
                    <div className={style.details}>
                        <DateIcon
                            size={18}
                            className={style.icon}
                        />
                        <p>{convertIsoDateToNormalFormat(createdAt)}</p>
                    </div>
                    <div className={style.details}>
                        <DateIcon
                            size={18}
                            className={style.icon}
                        />
                        <p>{date.toLocaleString("en-US", { month: "short" })} {date.getDate()}, {date.getFullYear()}</p>
                    </div>
                    <div className={style.details}>
                        <TimeIcon
                            size={18}
                            className={style.icon}
                        />
                        <p>{showTime.hour >= 12 ? (showTime.hour - 12).toString().padStart(2, "0") : showTime.hour.toString().padStart(2, "0")}:{showTime.minutes.toString().padStart(2, "0")} {showTime.hour >= 12 ? "PM" : "AM"}</p>
                    </div>
                </div>
                <p className={status === "SHOWING"? style['showing-status']: style['not-showing-status']}>
                    {
                        status === "SHOWING"
                            ?
                            <>Showing</>
                            :
                            <>Not Showing</>
                    }
                </p>
            </div>
        </>
    )
}

export default ShowCard