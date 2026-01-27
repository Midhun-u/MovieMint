import style from '../../styles/ui/dateShowBar.module.scss'
import {
    CalendarIcon
} from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

interface DateShowBarProps {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    setShowDatePicker: Dispatch<SetStateAction<boolean>>
}

const DateShowBar = ({ year, month, day, hour, minute, setShowDatePicker }: DateShowBarProps) => {

    const monthName = new Date(year, month).toLocaleString("en-US", { month: "long" })

    return (
        <div
            onClick={() => setShowDatePicker((showDatePicker) => !showDatePicker)}
            className={style.container}
        >
            <CalendarIcon
                className={style.icon}
                size={22}
                strokeWidth={1.5}
            />
            <span className={style.date}>
                {monthName} {day}, {year} 
                {
                    hour && minute
                    ?
                    <>
                    &nbsp;-&nbsp; 
                    {hour >= 12? hour - 12: hour}:{minute} {hour >= 12? "PM": "AM"}
                    </>
                    :
                    null
                }
            </span>
        </div>
    )

}

export default DateShowBar