import DashboardLogs from '../dashboard/DashboardLogs'
import MovieCard from '../ui/MovieCard'
import style from '../../styles/pages/dashboard.module.scss'
import {
    Trash as DeleteIcon,
    Plus as AddIcon
} from 'lucide-react'

const Dashboard = () => {

    return (

        <div className={style.container}>
            {/* Performance overview or dashboard logs */}
            <div className={style['dashboard-logs']}>
                <h1 className={style.heading}>Performance Overview</h1>
                <p className={style.about}>View the overview of bookings, upcoming movies and more .</p>
                <DashboardLogs />
            </div>
            {/* Movie banner section */}
            <div className={style['movie-banner-section']}>
                <h1 className={style.heading}>Banner Movies</h1>
                <p className={style.about}>View, edit and manage banner movies</p>
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