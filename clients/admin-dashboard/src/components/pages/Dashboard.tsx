import DashboardLogs from '../dashboard/DashboardLogs'
import MovieCard from '../ui/MovieCard'
import style from '../../styles/pages/dashboard.module.scss'
import {
    Trash as DeleteIcon,
    Plus as AddIcon
} from 'lucide-react'
import PageDetails from '../ui/PageDetails'

const Dashboard = () => {

    return (

        <div className={style.container}>
            {/* Performance overview or dashboard logs */}
            <div className={style['dashboard-logs']}>
                <PageDetails
                    title='Performance Overview'
                    about='View the overview of bookings, upcoming movies and more .'
                    backButton={false}
                />
                <DashboardLogs />
            </div>
            {/* Movie banner section */}
            <div className={style['movie-banner-section']}>
                <PageDetails
                    title='Banner Movies'
                    about='View, edit and manage banner movies'
                    backButton={false}
                />
                <div className={style['movies-card-container']}>
                    <div className={style['movie-card']}>
                        <MovieCard
                        />
                        <div className={style['delete-icon-container']}>
                            <DeleteIcon
                                size={22}
                                strokeWidth={1.7}
                                className={style['delete-icon']}
                            />
                        </div>
                    </div>
                    <div className={style['movie-card']}>
                        <MovieCard
                        />
                        <div className={style['delete-icon-container']}>
                            <DeleteIcon
                                size={22}
                                strokeWidth={1.7}
                                className={style['delete-icon']}
                            />
                        </div>
                    </div>
                    <div className={style['movie-card']}>
                        <MovieCard
                        />
                        <div className={style['delete-icon-container']}>
                            <DeleteIcon
                                size={22}
                                strokeWidth={1.7}
                                className={style['delete-icon']}
                            />
                        </div>
                    </div>
                </div>
                <div className={style['banner-add-section']}>
                    <AddIcon
                        size={23}
                        strokeWidth={1.8}
                    />
                </div>
            </div>
        </div>

    )

}

export default Dashboard