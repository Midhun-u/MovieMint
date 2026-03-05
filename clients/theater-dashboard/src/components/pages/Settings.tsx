import style from '../../styles/pages/settings.module.scss'
import TheaterDetails from '../settings/TheaterDetails'
import PageDetails from '../ui/PageDetails'

const Settings = () => {

    return (
        <div className={style.container}>
            {/* Page details */}
            <PageDetails
                title='Settings'
                about='You can change or edit theater settings.'
                backButton={false} 
            />
            {/* Theater details */}
            <TheaterDetails
            />
        </div>
    )

}

export default Settings