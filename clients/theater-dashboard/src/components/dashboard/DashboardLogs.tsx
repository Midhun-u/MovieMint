import style from '../../styles/dashboard/dashboardLogs.module.scss'
import DashboardLogsCard from './DashboardLogsCard'
import {
    TicketIcon,
    Calendar as DateIcon,
    Armchair as SeatIcon,
    BanknoteArrowUp as RevenueIcon,
    Book as BookingsIcon
} from 'lucide-react'

const DashboardLogs = () => {

    return (

        <div className={style.container}>
            <DashboardLogsCard
                title="Today's Bookings"
                Icon={TicketIcon}
                data={0}
            />
            <DashboardLogsCard
                title="Upcoming shows"
                Icon={DateIcon}
                data={0}
            />
            <DashboardLogsCard
                title="Seats Filled"
                Icon={SeatIcon}
                data={0}
            />
            <DashboardLogsCard
                title="Today's Revenue"
                Icon={RevenueIcon}
                data={0}
            />
            <DashboardLogsCard
                title="Total Bookings"
                Icon={BookingsIcon}
                data={0}
            />
        </div>

    )

}

export default DashboardLogs