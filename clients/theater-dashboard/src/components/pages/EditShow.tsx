import style from '../../styles/pages/editShow.module.scss'
import ShowDetails from '../editShow/ShowDetails'
import PageDetails from '../ui/PageDetails'

const EditShow = () => {

    return (

        <div className={style.container}>
            {/* Page details */}
            <PageDetails
                title='Edit Show'
                about='This section allows to update the show'
                backButton
            />
            {/* Show details */}
            <ShowDetails
            />
        </div>

    )

}

export default EditShow