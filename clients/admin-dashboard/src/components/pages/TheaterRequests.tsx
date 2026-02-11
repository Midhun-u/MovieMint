import style from '../../styles/pages/theaterRequests.module.scss'
import TheaterRequestList from '../theaterRequests/TheaterRequestList'

const TheaterRequests = () => {

    return (
        <div className={style.container}>
            {/* Page Details */}
            <div className={style['page-details']}>
                <h1 className={style.title}>Theater Requests</h1>
                <p className={style.about}>This section allows to see the requests of theaters which are made by theater owners</p>
            </div>
            {/* List of theater request */}
            <div className={style['list-container']}>
                <TheaterRequestList
                />
            </div>
        </div>
    )

}

export default TheaterRequests