import { useEffect, useState } from 'react'
import style from '../../styles/ui/datePicker.module.scss'
import {
    ChevronLeft as LeftArrowIcon,
    ChevronRight as RightArrowIcon
} from 'lucide-react'

interface DatePickerProps {
    showTimePicker: boolean
    clickOnDay: (dateDetails: { day: number, month: number, year: number }) => void
    clickOnTime: (timeDetails: { hour: number, minute: number }) => void
}

const DatePicker = ({ showTimePicker, clickOnDay, clickOnTime }: DatePickerProps) => {

    const weeks = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    const [days, setDays] = useState<Array<null | number>>([])
    const [month, setMonth] = useState<number>(new Date().getMonth())
    const [year, setYear] = useState<number>(new Date().getFullYear())
    const [day, setDay] = useState<number>(new Date().getDate())
    const [times, setTimes] = useState<Array<{
        hour: number,
        minute: number
    }>>([])
    const [selectedTime, setSelectedTime] = useState<{ hour: number, minute: number }>()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    // Function for setting total days
    const handleSetCalendarDates = () => {

        // Getting total days of a month
        const currentDays = new Date(year, month, 0).getDate()

        // Getting Week day or week which the first day starts of a month
        const week = new Date(year, month, 1).getDay()

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

        if (month === 11) {
            setMonth(0)
        } else {
            setMonth(month + 1)
        }

        const monthName = new Date(year, month).toLocaleString("en-US", { month: "short" })
        // Incrementing year
        if (monthName === "Dec") {
            setYear(year + 1)
        }

    }

    // Function for decrementing month
    const handleDecrementMonth = () => {

        if (month === 0) {
            setMonth(11)
        } else {
            setMonth(month - 1)
        }

        const monthName = new Date(year, month).toLocaleString("en-US", { month: "short" })

        // Decrementing year
        if (monthName === "Jan") {
            setYear(year - 1)
        }

    }

    // Function for running when click specific day
    const handleClickOnDay = (day: number) => {

        setDay(day)
        clickOnDay({ day: day, month: month, year: year })

    }

    // Function for running when click time
    const handleClickOnTime = (time: { hour: number, minute: number }) => {

        setSelectedTime({ hour: time.hour, minute: time.minute })
        clickOnTime(time)

    }

    // Function for getting available times
    const handleGetAvailableTimes = () => {

        const availableTimes = []
        const currentDate = new Date()

        // Checking if the selected day is today or not
        if (
            currentDate.getDate() === day &&
            currentDate.getMonth() === month &&
            currentDate.getFullYear() === year
        ) {

            const currentHour = currentDate.getHours() // For storing current hour before setting to constant
            currentDate.setHours(22) // Setting hour to constant 8:00PM

            for (let i = currentHour < 8 ? 8 : currentHour; i <= currentDate.getHours(); i++) {

                availableTimes.push({ hour: i, minute: 0 })
                availableTimes.push({ hour: i, minute: 30 })

            }

        } else {

            // Pushing 8:00 AM to 10:00 PM times
            for (let i = 8; i <= 22; i++) {

                availableTimes.push({ hour: i, minute: 0 })
                availableTimes.push({ hour: i, minute: 30 })

            }

        }

        setTimes(availableTimes)

        // Calling callback function which runs when clicked on time for the first render
        clickOnTime(availableTimes[1])

        setSelectedTime(availableTimes[1])

    }

    useEffect(() => {

        handleSetCalendarDates()

        if (showTimePicker) {
            handleGetAvailableTimes()
        }

    }, [month, year, day])

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
                    {new Date(year, month).toLocaleString("en-US", { month: "long" })} {year}
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
                    days.map((calendarDay, index) => (
                        calendarDay
                            ?
                            <span
                                onClick={() => handleClickOnDay(calendarDay)}
                                className={calendarDay === day && year === currentYear && month === currentMonth ? style['selected-day'] : style.day}
                                key={index}
                            >
                                {calendarDay}
                            </span>
                            :

                            <span className={style['disable-day']} key={index}></span>
                    ))
                }
            </div>
            {
                showTimePicker
                    ?
                    <div className={style['time-container']}>
                        {
                            times.map((time, index) => (

                                <span
                                    key={index}
                                    className={selectedTime?.hour === time.hour && selectedTime?.minute === time.minute? style['selected-time']: style.time}
                                    onClick={() => handleClickOnTime(time)}
                                >
                                    {
                                        time.hour >= 12
                                            ?
                                            `${time.hour > 12 ? time.hour - 12 : time.hour}:${time.minute === 30 ? time.minute : `00`} PM`
                                            :
                                            `${time.hour}:${time.minute === 30 ? time.minute : `00`} AM`}
                                </span>
                            ))
                        }
                    </div>
                    :
                    null
            }
        </div>

    )
}

export default DatePicker