import style from '../../styles/pages/currentShows.module.scss'
import PageDetails from '../ui/PageDetails'

const CurrentShows = () => {

    return (
        <div className={style.container}>
            <PageDetails
                title='Current Shows'
                about='You can see the shows which are currently showing at your theater'
                backButton={false}
            />
        </div>
    )

}

export default CurrentShows