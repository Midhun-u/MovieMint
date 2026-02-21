import { useAppSelector } from '../../store/hooks'
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
  
  const {pendingMovies, todayBookings, pendingTheaters, totalBookings, totalTheaters} = useAppSelector(state => state.dashboard)

    return (

        <div className={style.container}>
            <DashboardLogCard
                title="Today's Bookings"
                Icon={TicketIcon}
                data={todayBookings}
            />
             <DashboardLogCard
                title="Upcoming Movies"
                Icon={DateIcon}
                data={pendingMovies}
            />
             <DashboardLogCard
                title="Total Bookings"
                Icon={BookingsIcon}
                data={totalBookings}
            />
             <DashboardLogCard
                title="Total Theaters"
                Icon={TheaterIcon}
                data={totalTheaters}
            />
             <DashboardLogCard
                title="Total Theater Requests"
                Icon={TheaterRequestsIcon}
                data={pendingTheaters}
            />
        </div>

    )

}

export default DashboardLogs