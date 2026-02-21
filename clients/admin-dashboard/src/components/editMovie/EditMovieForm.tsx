import { useForm } from 'react-hook-form'
import style from '../../styles/editMovie/editMovieForm.module.scss'
import FormInput from '../form/FormInput'
import {
    Film as MovieTitleIcon,
    Link2 as MovieTrailerIcon,
    X as CloseIcon
} from 'lucide-react'
import ImagePicker from '../addMovies/ImagePicker'
import { useContext, useEffect, useState } from 'react'
import FormLabel from '../form/FormLabel'
import CheckBoxList from '../ui/CheckBoxList'
import { movieCategories } from '../../utils/movieCategories'
import { movieFormats } from '../../utils/movieFormats'
import { useNavigate, useParams } from 'react-router'
import { getMovieApi, updateMovieApi } from '../../api/movie'
import type { MovieData } from '@/types/movie'
import NoResult from '../ui/NoResult'
import ShowTrailer from '../addMovies/ShowTrailer'
import Button from '../ui/Button'
import Radio from '../ui/Radio'
import { updateMovieImageApi } from '../../api/media'
import { ToastProvider } from '../context/providers/ToastProvider'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { movieFailed, movieRequest } from '../../store/movieSlice'

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
    const [status, setStatus] = useState<string>("")
    const [movieDetails, setMovieDetails] = useState<MovieData | null>(null)
    const [showPoster, setShowPoster] = useState<boolean>(true)
    const [showBanner, setShowBanner] = useState<boolean>(true)
    const toastContext = useContext(ToastProvider)
    const dispatch = useAppDispatch()
    const {loading} = useAppSelector(state => state.movie)
    const navigate = useNavigate()

    // Function for fetching movie details
    const handleFetchMovieDetails = async () => {

        const result = await getMovieApi(movieId as string)
        if (result.success) {
            setMovieDetails(result.movie)
            setCategories(result.movie.categories)
            setFormats(result.movie.formats)
            setStatus(result.movie.status)
        }

    }

    // Function for submitting form
    const submitForm = async (data: Inputs) => {

        let posterResult: any = {}
        let bannerResult: any = {}

        dispatch(movieRequest())

        if (poster) {
            posterResult = await updateMovieImageApi("poster", movieId as string, poster)
        } else if (banner) {
            bannerResult = await updateMovieImageApi("banner", movieId as string, banner)
        }

        const movieResult = await updateMovieApi(movieId as string, {
            title: data.title,
            trailer: data.trailer,
            categories: categories,
            formats: formats,
            status: status
        })

        dispatch(movieFailed({}))

        if(movieResult.success || posterResult.success || bannerResult.success){
            toastContext?.triggerToastMessage("Movie is updated", "SUCCESS")
            navigate("/admin/movies")
        }else{
            toastContext?.triggerToastMessage("Movie couldn't update", 'ERROR')
        }

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
                        movieDetails?.poster && showPoster
                            ?
                            <div className={style['image-container']}>
                                <img
                                    src={movieDetails.poster.image_url}
                                    className={style.poster}
                                    loading='lazy'
                                />
                                <div
                                    className={style['icon-container']}
                                    onClick={() => setShowPoster(false)}
                                >
                                    <CloseIcon
                                        className={style.icon}
                                        size={22}
                                    />
                                </div>
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
                        movieDetails.banner && showBanner
                            ?
                            <div className={style['image-container']}>
                                <img
                                    src={movieDetails.banner.image_url}
                                    className={style.banner}
                                    loading='lazy'
                                />
                                <div
                                    className={style['icon-container']}
                                    onClick={() => setShowBanner(false)}
                                >
                                    <CloseIcon
                                        className={style.icon}
                                        size={22}
                                    />
                                </div>
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
                {/* Movie status */}
                <div className={style['checkbox-container']}>
                    <FormLabel
                        title='Status'
                    />
                    <Radio
                        values={[
                            {
                                title: "Showing",
                                value: "SHOWING"
                            },
                            {
                                title: "Not Showing",
                                value: "NOT_SHOWING"
                            }
                        ]}
                        selectedValue={status}
                        onClick={(value) => setStatus(value.value)}
                        className={style['radio']}
                    />
                </div>
                <Button
                    title='Update'
                    className={style['update-button']}
                    type='submit'
                    loading={loading}
                    loadingSpinnerColor="black"
                    spinnerSize={17}
                />
            </form>
            :
            <NoResult
            />

    )

}

export default EditMovieForm