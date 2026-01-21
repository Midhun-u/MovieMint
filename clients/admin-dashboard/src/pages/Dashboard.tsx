import DashboardLogs from '../components/dashboard/DashboardLogs'
import style from '../styles/pages/dashboard.module.scss'

const Dashboard = () => {

    return (

        <div className={style.container}>
            {/* Performance overview or dashboard logs */}
            <div className={style['dashboard-logs']}>
                <h1 className={style.heading}>Performance Overview</h1>
                <p className={style.about}>View the overview of bookings, upcoming movies and more .</p>
                <DashboardLogs />
            </div>
        </div>

    )

}

export default Dashboard