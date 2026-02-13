import AddMovieForm from '../addMovies/AddMovieForm'
import style from '../../styles/pages/addMovies.module.scss'
import PageDetails from '../ui/PageDetails'

const AddMovies = () => {

    return (

        <div className={style.container}>
            {/* Page details */}
            <PageDetails
                title='Add Movie'
                about='This section allows administrators to add and manage movie details'
                backButton={false}
            />
            {/* Form section */}
            <AddMovieForm
            />
        </div>

    )

}

export default AddMovies