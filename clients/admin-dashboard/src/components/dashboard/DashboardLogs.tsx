import style from '../../styles/dashboard/dashboardLogs.module.scss'
import DashboardLogCard from './DashboardLogCard'
import {
    TicketIcon,
    Calendar as DateIcon,
    Book as BookingsIcon,
    TheaterIcon,
    PlusCircle as TheaterRequestsIcon
} from 'lucide-react'

const DashboardLogs = () => {

    return (

        <div className={style.container}>
            <DashboardLogCard
                title="Today's Bookings"
                Icon={TicketIcon}
                data={0}
            />
             <DashboardLogCard
                title="Upcoming Movies"
                Icon={DateIcon}
                data={0}
            />
             <DashboardLogCard
                title="Total Bookings"
                Icon={BookingsIcon}
                data={0}
            />
             <DashboardLogCard
                title="Total Theaters"
                Icon={TheaterIcon}
                data={0}
            />
             <DashboardLogCard
                title="Total Theater Requests"
                Icon={TheaterRequestsIcon}
                data={0}
            />
        </div>

    )

}

export default DashboardLogs