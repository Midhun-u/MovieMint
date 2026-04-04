import { useCallback, useEffect, useState } from 'react'
import style from '../../styles/dashboard/dashboardLogs.module.scss'
import DashboardLogsCard from './DashboardLogsCard'
import {
    TicketIcon,
    BanknoteArrowUp as RevenueIcon,
    Book as BookingsIcon
} from 'lucide-react'
import { getLogsApi } from '../../api/bookings'
import { formatNumber } from '../../utils/formatNumber'

const DashboardLogs = () => {

    const [logs, setLogs] = useState<{
        currentBookingsCount: number
        totalBookingsCount: number
        totalCurrentPrice: number
    }>({
        totalBookingsCount: 0,
        totalCurrentPrice: 0,
        currentBookingsCount: 0
    })

    // Function for fetching theater logs
    const handleFetchTheaterLogs = useCallback(async () => {
        const result = await getLogsApi()
        if(result.success){
            setLogs(pre => {
                return {...pre, 
                    currentBookingsCount: result.currentBookingsCount,
                    totalBookingsCount: result.totalBookingsCount,
                    totalCurrentPrice: result.totalCurrentPrice
                }
            })
        }
    }, [])

    useEffect(() => {
        (() => {
            handleFetchTheaterLogs()
        })()
    }, [handleFetchTheaterLogs])

    return (

        <div className={style.container}>
            <DashboardLogsCard
                title="Today's Bookings"
                Icon={TicketIcon}
                data={formatNumber(logs.currentBookingsCount)}
            />
            <DashboardLogsCard
                title="Today's Revenue"
                Icon={RevenueIcon}
                data={`₹${formatNumber(logs.totalCurrentPrice)}`}
            />
            <DashboardLogsCard
                title="Total Bookings"
                Icon={BookingsIcon}
                data={formatNumber(logs.totalBookingsCount)}
            />
        </div>

    )

}

export default DashboardLogs