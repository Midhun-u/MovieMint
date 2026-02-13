import style from '../../styles/pages/theaterRequests.module.scss'
import TheaterRequestList from '../theaterRequests/TheaterRequestList'
import PageDetails from '../ui/PageDetails'

const TheaterRequests = () => {

    return (
        <div className={style.container}>
            {/* Page Details */}
                <PageDetails
                    title='Theater Requests'
                    about='This section allows to see the requests of theaters which are made by theater owners'
                    backButton={false}
                />
            
            {/* List of theater request */}
            <div className={style['list-container']}>
                <TheaterRequestList
                />
            </div>
        </div>
    )

}

export default TheaterRequests