import AddMovieForm from '../components/addMovies/AddMovieForm'
import style from '../styles/pages/addMovies.module.scss'

const AddMovies = () => {

    return (

        <div className={style.container}>
            {/* Page details */}
            <div className={style['page-details']}>
                <h1 className={style.heading}>Add Movie</h1>
                <p className={style.about}>This section allows administrators to add and manage movie details that will be used for scheduling shows and displaying information to users.</p>
            </div>
            {/* Form section */}
            <AddMovieForm
            />
        </div>

    )

}

export default AddMovies