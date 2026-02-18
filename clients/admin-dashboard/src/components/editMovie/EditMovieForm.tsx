import { useForm } from 'react-hook-form'
import style from '../../styles/editMovie/editMovieForm.module.scss'
import FormInput from '../form/FormInput'
import {
    Film as MovieTitleIcon,
    Link2 as MovieTrailerIcon
} from 'lucide-react'
import ImagePicker from '../addMovies/ImagePicker'
import { useEffect, useState } from 'react'
import FormLabel from '../form/FormLabel'
import CheckBoxList from '../ui/CheckBoxList'
import { movieCategories } from '../../utils/movieCategories'
import { movieFormats } from '../../utils/movieFormats'
import { useParams } from 'react-router'
import { getMovieApi } from '../../api/movie'
import type { MovieData } from '@/types/movie'
import NoResult from '../ui/NoResult'
import ShowTrailer from '../addMovies/ShowTrailer'
import Button from '../ui/Button'

type Inputs = {
    title: string
    trailer: string
}

const EditMovieForm = () => {

    const { movieId } = useParams()
    const { handleSubmit, register } = useForm<Inputs>()
    const [poster, setPoster] = useState<File | null>(null)
    const [banner, setBanner] = useState<File | null>(null)
    const [categories, setCategories] = useState<Array<string>>([])
    const [formats, setFormats] = useState<Array<string>>([])
    const [movieDetails, setMovieDetails] = useState<MovieData | null>(null)

    // Function for fetching movie details
    const handleFetchMovieDetails = async () => {

        const result = await getMovieApi(movieId as string)
        if (result.success) {
            setMovieDetails(result.movie)
            setCategories(result.movie.categories)
            setFormats(result.movie.formats)
        }

    }

    // Function for submitting form
    const submitForm = (data: Inputs) => {
        console.log(data)
    }

    useEffect(() => {
        if (movieId) {
            handleFetchMovieDetails()
        }
    }, [movieId])

    return (

        movieDetails
            ?
            <form onSubmit={handleSubmit(submitForm)} className={style.container}>
                {/* Movie title */}
                <div className={style['form-input']}>
                    <FormInput
                        Icon={MovieTitleIcon}
                        inputFieldName='title'
                        inputType='input'
                        labelTitle='Movie Title'
                        minLength={3}
                        maxLength={50}
                        register={register}
                        placeholder='Enter movie title'
                        defaultValue={movieDetails.title}

                    />
                </div>
                {/* Movie poster */}
                <div className={style.poster}>
                    {
                        movieDetails?.poster
                            ?
                            <div>
                                <img
                                    src={movieDetails.poster.image_url}
                                    className={style.poster}
                                />
                            </div>
                            :
                            <ImagePicker
                                setFile={setPoster}
                                labelTitle='Movie Poster'
                                mode='portrait'
                                title='Upload Movie Poster'
                            />
                    }
                </div>
                {/* Movie Banner */}
                <div className={style.banner}>
                    {
                        movieDetails.banner
                            ?
                            <div>
                                <img
                                    src={movieDetails.banner.image_url}
                                    className={style.banner}
                                />
                            </div>
                            :
                            <ImagePicker
                                setFile={setBanner}
                                labelTitle='Movie Banner'
                                mode='landscape'
                                title='Upload Movie Banner'
                            />

                    }
                </div>
                {/* Movie Trailer */}
                <div className={style['form-input']}>
                    <FormInput
                        Icon={MovieTrailerIcon}
                        inputFieldName='trailer'
                        inputType='input'
                        labelTitle='Movie Trailer'
                        minLength={5}
                        maxLength={500}
                        register={register}
                        placeholder='Enter Movie Trailer URL'
                        defaultValue={movieDetails.movie_trailer}
                    />
                    <ShowTrailer
                        trailerUrl={movieDetails.movie_trailer}
                    />
                </div>
                {/* Movie Categories */}
                <div className={style['checkbox-container']}>
                    <FormLabel
                        title='Movie Categories'
                    />
                    <CheckBoxList
                        values={movieCategories}
                        checkedValues={categories}
                        selectedLimit={4}
                        setValues={setCategories}
                        className={style['checkbox-list']}
                    />
                </div>
                {/* Movie Formats */}
                <div className={style['checkbox-container']}>
                    <FormLabel
                        title='Movie Formats'
                    />
                    <CheckBoxList
                        values={movieFormats}
                        checkedValues={formats}
                        selectedLimit={0}
                        setValues={setFormats}
                        className={style['checkbox-list']}
                    />
                </div>
                <Button
                    title='Update'
                    className={style['update-button']}
                    type='submit'
                />
            </form>
            :
            <NoResult
            />

    )

}

export default EditMovieForm