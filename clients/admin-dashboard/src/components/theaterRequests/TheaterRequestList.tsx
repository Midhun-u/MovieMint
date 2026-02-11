import { Activity, useEffect, useState } from 'react'
import style from '../../styles/theaterRequests/theaterRequestList.module.scss'
import Button from '../ui/Button'
import {
    Calendar as DateIcon,
    MapPinIcon as LocationIcon,
    Armchair as SeatIcon,
    X as CloseIcon
} from 'lucide-react'
import DatePicker from '../ui/DatePicker'
import { getTheaterRequestsApi } from '../../api/theater'
import { convertIsoDateToNormalFormat } from '../../utils/convertIsoDateToNoramlFormat'
import Spinner from '../ui/Spinner'
import useObserver from '../hooks/useObserver'

type TheaterRequests = {
    id: string
    theater_name: string
    theater_location: string
    layout_number: number
    sets_number: number
    rows_number: number
    seats_number: number
    status: "PENDING"
    theater_owner: {
        id: string
        firstname: string
        lastname: string
        email: string
        profile_image: {
            id: string
            image_url: string
        }
        role: "THEATER_OWNER"
    }
    theater_image: {
        id: string
        image_url: string
    }
    createdAt: string
}

const TheaterRequestList = () => {

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [pagination, setPagination] = useState<{
        page: number,
        limit: number,
        totalCount: number
    }>({
        page: 1,
        limit: 10,
        totalCount: 0
    })
    const [theatersRequests, setTheatersRequests] = useState<Array<TheaterRequests>>([])
    const { ref, isIntersecting } = useObserver<HTMLDivElement>({ threshold: 0.5 })
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    // Function for getting theater requests
    const handleGetTheaterRequests = async () => {

        const result = await getTheaterRequestsApi(pagination.page, pagination.limit, new Date())
        if (result.success) {

            setTheatersRequests((pre) => {
                return pagination.page === 1 ? [...result.theaters] : [...pre, ...result.theaters]
            })

            if (result.totalCount) {
                setPagination({ ...pagination, totalCount: result.totalCount })
            }

        }

    }

    useEffect(() => {
        handleGetTheaterRequests()
    }, [pagination.page, selectedDate])

    useEffect(() => {

        if (!isIntersecting) return

        setPagination((pre) => {
            return { ...pre, page: pre.page + 1 }
        })

    }, [isIntersecting])

    return (

        <div className={style.container}>
            {/* Date picker */}
            <div className={style['date-picker-container']}>
                <Button
                    className={style['date-picker-button']}
                    onClick={() => setShowDatePicker(!showDatePicker)}
                >
                    <DateIcon
                        size={20}
                        strokeWidth={1.5}
                        className={style.icon}
                    />
                    <span>Select Date</span>
                </Button>
                <Activity mode={showDatePicker ? "visible" : "hidden"}>
                    <div className={style['date-picker']}>
                        <DatePicker
                            showTimePicker={false}
                            clickOnDay={(dateDetails) => {
                                setSelectedDate(new Date(dateDetails.year, dateDetails.month, dateDetails.day))
                                setShowDatePicker(false)
                            }}
                            selectedDate={selectedDate ? selectedDate : new Date()}
                        />
                    </div>
                </Activity>
                <Activity mode={selectedDate? "visible": "hidden"}>
                    <div onClick={() => setSelectedDate(null)} className={style['date']}>
                        <span>{convertIsoDateToNormalFormat(selectedDate? selectedDate.toString(): "")}</span>
                        <CloseIcon
                            size={18}
                            className={style.icon}
                        />
                    </div>
                </Activity>
            </div>
            {/* Theater requests list */}
            <div className={style['list']}>
                {
                    theatersRequests.map((theaterRequest) => (

                        <div
                            key={theaterRequest.id}
                            className={style['theater-details-container']}
                        >
                            <p className={style.status}>
                                Pending Review
                            </p>
                            {/* Theater image */}
                            <img
                                src={theaterRequest.theater_image.image_url}
                                className={style['theater-image']}
                            />
                            <div className={style['theater-details']}>
                                {/* Theater title */}
                                <h1>{theaterRequest.theater_name}</h1>
                                {/* Theater location */}
                                <div className={style.details}>
                                    <LocationIcon
                                        size={18}
                                        className={style.icon}
                                    />
                                    <p>{theaterRequest.theater_location}</p>
                                </div>
                                {/* Theater request date */}
                                <div className={style.details}>
                                    <DateIcon
                                        size={18}
                                        className={style.icon}
                                    />
                                    <p>{convertIsoDateToNormalFormat(theaterRequest.createdAt)}</p>
                                </div>
                                {/* Theater total seats */}
                                <div className={style.details}>
                                    <SeatIcon
                                        size={18}
                                        className={style.icon}
                                    />
                                    <p>{theaterRequest.layout_number * theaterRequest.sets_number * theaterRequest.rows_number * theaterRequest.seats_number} seats</p>
                                </div>
                                <div className={style['button-container']}>
                                    <Button
                                        title='Refuse'
                                        className={style['button']}
                                    />
                                    <Button
                                        title='Approve'
                                        className={style['button']}
                                    />
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
            {
                pagination.page * pagination.limit < pagination.totalCount
                    ?
                    <div ref={ref} className={style['loading-container']}>
                        <Spinner
                            color='black'
                            size={22}
                        />
                    </div>
                    :
                    null
            }
        </div >

    )

}

export default TheaterRequestList