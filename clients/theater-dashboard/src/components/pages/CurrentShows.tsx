import style from '../../styles/pages/currentShows.module.scss'
import CurrentShowList from '../currentShows/CurrentShowList'
import PageDetails from '../ui/PageDetails'

const CurrentShows = () => {

    return (
        <div className={style.container}>
            {/* Page details */}
            <PageDetails
                title='Current Shows'
                about='You can see the shows which are currently showing at your theater'
                backButton={false}
            />
            {/* Show list */}
            <CurrentShowList
            />
        </div>
    )

}

export default CurrentShows