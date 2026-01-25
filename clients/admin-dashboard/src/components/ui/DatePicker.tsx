import { useEffect, useState } from 'react'
import style from '../../styles/ui/datePicker.module.scss'
import {
    ChevronLeft as LeftArrowIcon,
    ChevronRight as RightArrowIcon
} from 'lucide-react'

interface DatePickerProps {
    showTimePicker: boolean
    onClickOnDay: ({ }: { day: number, month: number, year: number }) => void
}

const DatePicker = ({ showTimePicker, onClickOnDay }: DatePickerProps) => {

    const weeks = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    const [days, setDays] = useState<Array<null | number>>([])
    const [dateDetails, setDateDetails] = useState<{
        day: number,
        year: number,
        month: number
    }>({
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    const [timeDetails, setTimeDetails] = useState<Array<{
        hour: number,
        minute: number
    }>>([])

    // Function for setting total days
    const handleSetCalendarDates = () => {

        // Getting total days of a month
        const currentDays = new Date(dateDetails.year, dateDetails.month, 0).getDate()

        // Getting Week day or week which the first day starts of a month
        const week = new Date(dateDetails.year, dateDetails.month, 1).getDay()

        const calendarDays = []

        for (let i = 1; i <= week; i++) {
            // Pushing null value to the total days of a month until the first day of the month starts
            calendarDays.push(null)
        }

        for (let i = 1; i <= currentDays; i++) {
            // Pushing total days in a month
            calendarDays.push(i)
        }

        setDays(calendarDays)

    }

    // Function for incrementing month
    const handleIncrementMonth = () => {


        if (dateDetails.month === 11) {
            setDateDetails({ ...dateDetails, month: 0 })
        } else {
            setDateDetails({ ...dateDetails, month: 11 })
        }

        setDateDetails({...dateDetails, month: dateDetails.month + 1})
        const monthName = new Date(dateDetails.year, dateDetails.month).toLocaleString("en-US", { month: "short" })

        // Incrementing year
        if (monthName === "Dec") {
            console.log(dateDetails)
            setDateDetails({ ...dateDetails, year: dateDetails.year + 1 })
        }

    }

    // Function for decrementing month
    const handleDecrementMonth = () => {

        if (dateDetails.month === 0) {
            setDateDetails({ ...dateDetails, month: 11 })
        } else {
            setDateDetails({ ...dateDetails, month: 0 })
        }

        setDateDetails({...dateDetails, month: dateDetails.month - 1})
        const monthName = new Date(dateDetails.year, dateDetails.month).toLocaleString("en-US", { month: "short" })

        // Incrementing year
        if (monthName === "Dec") {
            setDateDetails({ ...dateDetails, year: dateDetails.year - 1 })
        }

    }

    // Function for getting available time
    const handleGetAvailableTime = () => {



    }

    // Function for running when click specific day
    const handleOnClick = (day: number) => {

        onClickOnDay({ day: day, month: dateDetails.month, year: dateDetails.year })

    }

    useEffect(() => {
        handleSetCalendarDates()
        handleGetAvailableTime()
    }, [dateDetails.month, dateDetails.year])

    return (

        <div className={style.container}>
            <div className={style['top-bar']}>
                <div
                    className={style['icon-container']}
                    onClick={handleDecrementMonth}
                >
                    <LeftArrowIcon
                        size={20}
                        strokeWidth={1.6}
                        className={style['icon']}
                    />
                </div>
                <span>
                    {new Date(dateDetails.year, dateDetails.month).toLocaleString("en-US", { month: "long" })} {dateDetails.year}
                </span>
                <div
                    className={style['icon-container']}
                    onClick={handleIncrementMonth}
                >
                    <RightArrowIcon
                        size={20}
                        strokeWidth={1.6}
                        className={style['icon']}
                    />
                </div>
            </div>
            <div className={style['weeks-container']}>
                {
                    weeks.map((week, index) => (
                        <span key={index} className={style.week}>{week}</span>
                    ))
                }
            </div>
            <div className={style['days-container']}>
                {
                    days.map((day, index) => (
                        day
                            ?
                            <span onClick={() => handleOnClick(day)} className={style.day} key={index}>{day}</span>
                            :
                            <span className={style['disable-day']} key={index}></span>
                    ))
                }
            </div>
            {
                showTimePicker
                    ?
                    <div className={style['time-container']}>

                    </div>
                    :
                    null
            }
        </div>

    )
}

export default DatePicker