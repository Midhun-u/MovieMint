import style from '../../styles/pages/editMovie.module.scss'
import EditMovieForm from '../editMovie/EditMovieForm'
import PageDetails from '../ui/PageDetails'

const EditMovie = () => {

    return (

        <div className={style.container}>
            {/* Page details */}
            <PageDetails
                title='Edit Movie'
                about='Update core information, adjust visibility settings, and modify media assets for this entry.'
                backButton
            />
            {/* Movie edit form */}
            <EditMovieForm
            />
        </div>
    )

}

export default EditMovie