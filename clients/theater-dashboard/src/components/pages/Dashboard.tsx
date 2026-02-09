import style from '../../styles/pages/dashboard.module.scss'
import DashboardLogs from '../dashboard/DashboardLogs'

const Dashboard = () => {

    return (

        <div className={style.container}>
            {/* Dashboard logs */}
            <div className={style['dashboard-logs-container']}>
                <h1 className={style.title}>Performance Overview</h1>
                <p className={style.about}>Real-time insights for today's theatre operations and bookings.</p>
                <DashboardLogs
                />
            </div>

        </div>

    )

}

export default Dashboard