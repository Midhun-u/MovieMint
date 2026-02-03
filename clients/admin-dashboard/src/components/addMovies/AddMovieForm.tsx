import { Activity, useContext, useId, useState, type ChangeEvent } from 'react'
import style from '../../styles/addMovies/addMovieForm.module.scss'
import FormInput from '../form/FormInput'
import {
    Film as MovieIcon,
    TextQuote as SubheadingIcon,
    TextAlignStart as SynopsisIcon,
    LanguagesIcon as LanguageIcon,
    Grid3x2 as CertificateIcon,
    Paperclip as URLIcon,
    TimerIcon,
    Plus as AddIcon,
    EditIcon
} from 'lucide-react'
import ImagePicker from './ImagePicker'
import ListItems from './ListItems'
import Iso6391 from 'iso-639-1'
import { movieCertificates } from '../../utils/movieCertificates'
import FormLabel from '../form/FormLabel'
import { movieCategories } from '../../utils/movieCategories'
import CheckBoxList from './CheckBoxList'
import DateShowBar from '../ui/DateShowBar'
import DatePicker from '../ui/DatePicker'
import Input from '../ui/Input'
import Radio from '../ui/Radio'
import { useForm, type SubmitHandler } from 'react-hook-form'
import Button from '../ui/Button'
import AddCrewForm from './AddCrewForm'
import { ToastProvider } from '../context/ToastMessage'
import ShowTrailer from './ShowTrailer'
import { youtubeEmbedUrlRegex } from '../../utils/youtubeEmbedUrlRegex'
import { addMovieApi, deleteMovieApi } from '../../api/movie'
import { convertToNumber } from '../../utils/convertToNumber'
import { deleteActorImageApi, deleteMovieImageApi, uploadActorImageApi, uploadMovieImageApi } from '../../api/media'


type Inputs = {
    title: string
    subheading: string
    synopsis: string
    trailerUrl: string
    durationHour: number
    durationMinutes: number
    durationSeconds: number
}

type ReleaseDate = {
    year: number
    month: number
    day: number
    hour: number
    minute: number
}

type Crews = Array<{
    name: string
    image: File
    preview: string
    id: string
}>

type CrewDetails = {
    name: string
    image: File
    preview: string
    id: string
}

const AddMovieForm = () => {

    const titleId = useId()
    const subheadingId = useId()
    const synopsisId = useId()
    const movieTrailer = useId()
    const languages = Iso6391.getAllCodes().map(code => Iso6391.getName(code))
    const [poster, setPoster] = useState<File | null>(null)
    const [banner, setBanner] = useState<File | null>(null)
    const [language, setLanguage] = useState<string>('')
    const [certificate, setCertificate] = useState<string>('')
    const [categories, setCategories] = useState<Array<string>>([])
    const [releaseDate, setReleaseDate] = useState<ReleaseDate>({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        hour: 0,
        minute: 0
    })
    const [movieType, setMovieType] = useState<"LIVE_ACTION" | "ANIMATED">("LIVE_ACTION")
    const [movieTrailerUrl, setMovieTrailerUrl] = useState<string>('')
    const [crews, setCrews] = useState<Crews>([])
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [showCrewScreen, setShowCrewScreen] = useState<boolean>(false)
    const [selectedCrew, setSelectedCrew] = useState<{
        name: string
        image: File
        preview: string
        id: string
    } | null>(null)
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>()
    const toastContext = useContext(ToastProvider)

    // Function for editing crew details
    const handleEditCrewDetails = (editedDetails: CrewDetails) => {

        const editedCrewDetails = crews.map((crew) => {
            if (crew.id === editedDetails.id) {
                return {
                    name: editedDetails.name,
                    image: editedDetails.image,
                    preview: editedDetails.preview,
                    id: editedDetails.id
                }
            } else {
                return crew
            }
        })

        setCrews(editedCrewDetails)
        setSelectedCrew(null)

    }

    // Function for removing crew details
    const handleRemoveCrewDetails = (removedCrewDetails: CrewDetails) => {

        if (!removedCrewDetails) return

        const filteredCrews = crews.filter((crew) => crew.id !== removedCrewDetails.id)
        setCrews(filteredCrews)

    }

    // Function for submitting form
    const handleSubmitForm: SubmitHandler<Inputs> = async (data) => {

        if (
            !poster ||
            !banner ||
            !language ||
            !certificate ||
            !categories.length ||
            !movieType
        ) {
            toastContext?.triggerToastMessage("All fields are required", "ERROR")
            return
        }

        if (
            categories.length > 5 ||
            !youtubeEmbedUrlRegex.test(data.trailerUrl)

        ) {
            toastContext?.triggerToastMessage("Invalid fields", "ERROR")
            return
        }

        if (movieType === "LIVE_ACTION") {
            if (crews.length < 1) return toastContext?.triggerToastMessage("Invalid fields", "ERROR")
        }

        // If release date is today then checking if the time is correct
        if (
            releaseDate.month === new Date().getMonth() &&
            releaseDate.year === new Date().getFullYear() &&
            releaseDate.day === new Date().getDate()
        ) {
            if (releaseDate.hour <= new Date().getHours() && releaseDate.minute <= releaseDate.minute) {
                toastContext?.triggerToastMessage("Invalid release time", "ERROR")
                return
            }
        }

        const movieResult = await addMovieApi({
            title: data.title,
            subheading: data.subheading,
            synopsis: data.synopsis,
            categories: categories,
            certificate: certificate,
            duration: {
                hour: convertToNumber(data.durationHour),
                minutes: convertToNumber(data.durationMinutes),
                seconds: convertToNumber(data.durationSeconds)
            },
            language: language,
            releaseDate: new Date(releaseDate.year, releaseDate.month, releaseDate.day, releaseDate.hour, releaseDate.minute),
            trailer: movieTrailerUrl,
            type: movieType,
            actors: movieType === "LIVE_ACTION" ? crews : []
        })

        if (movieResult.success && movieResult.movie) {

            const [posterResult, bannerResult] = await Promise.all([
                uploadMovieImageApi(poster, movieResult.movie._id, "poster"),
                uploadMovieImageApi(banner, movieResult.movie._id, "banner"),
            ])

            // Uploading actors image
            const actorResult = await Promise.all(crews.map(async (crew) => {

                const actorImageResult = await uploadActorImageApi({
                    actorId: crew.id,
                    actorImage: crew.image,
                    movieId: movieResult.movie._id
                })

                if (actorImageResult.success) {
                    return { success: true }
                } else {
                    return { success: false }
                }

            }) || [])

            // Checking if all actors images are uploaded
            const isNotActorImageUploaded = actorResult.some((result) => {
                if (!result.success) return true
            })

            if (!posterResult.success || !bannerResult.success || isNotActorImageUploaded) {

                // Deleting all images of this movie because some images didn't upload
                await Promise.all([
                    deleteMovieImageApi(movieResult.movie._id, "poster"),
                    deleteMovieImageApi(movieResult.movie._id, "banner"),
                    deleteActorImageApi(movieResult.movie._id)
                ])

                // Deleting movie because some failed response from images
                await deleteMovieApi(movieResult.movie._id)
                
            }

        } else {
            toastContext?.triggerToastMessage("Movie couldn't upload", "ERROR")
            return
        }

    }

    return (

        <form onSubmit={handleSubmit(handleSubmitForm)} className={style.container}>
            {/* Movie title */}
            <div className={style['form-field']}>
                <FormInput
                    labelTitle='Movie Title'
                    id={titleId}
                    inputPlaceholder='Enter movie title'
                    Icon={MovieIcon}
                    inputType='input'
                    register={register}
                    inputFieldName='title'
                    minLength={3}
                    maxLength={20}
                    aria-invalid={formErrors.title ? "true" : "false"}
                />
            </div>
            {/* Movie subheading */}
            <div className={style['form-field']}>
                <FormInput
                    labelTitle='Movie Subheading'
                    id={subheadingId}
                    inputPlaceholder='Enter movie subheading'
                    Icon={SubheadingIcon}
                    inputType='textarea'
                    register={register}
                    inputFieldName='subheading'
                    minLength={5}
                    maxLength={50}
                />
            </div>
            {/* Movie synopsis */}
            <div className={style['form-field']}>
                <FormInput
                    labelTitle='Movie Synopsis'
                    id={synopsisId}
                    inputPlaceholder='Enter movie synopsis'
                    Icon={SynopsisIcon}
                    inputType='textarea'
                    register={register}
                    inputFieldName='synopsis'
                    minLength={10}
                    maxLength={250}
                />
            </div>
            {/* Movie poster */}
            <ImagePicker
                labelTitle='Movie Poster'
                title='Upload Movie Poster'
                mode='portrait'
                setFile={setPoster}
            />
            {/* Movie Banner */}
            <ImagePicker
                labelTitle='Movie Banner'
                title='Upload Movie Banner'
                mode='landscape'
                setFile={setBanner}
            />
            {/* Movie language */}
            <ListItems
                labelTitle='Movie Language'
                Icon={LanguageIcon}
                values={languages}
                value={language}
                setValue={setLanguage}
            />
            {/* Movie certificate */}
            <ListItems
                labelTitle='Movie Certificate'
                Icon={CertificateIcon}
                values={movieCertificates}
                value={certificate}
                setValue={setCertificate}
            />
            {/* Movie category */}
            <div className={style['category-container']}>
                <FormLabel
                    title='Movie Category'
                />
                <CheckBoxList
                    values={movieCategories}
                    setValues={setCategories}
                    checkedValues={categories}
                />
            </div>
            {/* Movie Release date */}
            <div className={style['release-date-container']}>
                <FormLabel
                    title='Movie Release Date'
                />
                <DateShowBar
                    year={releaseDate.year}
                    month={releaseDate.month}
                    day={releaseDate.day}
                    setShowDatePicker={setShowDatePicker}
                    hour={releaseDate.hour}
                    minute={releaseDate.minute}
                />
                <Activity mode={showDatePicker ? "visible" : "hidden"}>
                    <DatePicker
                        showTimePicker
                        clickOnDay={(dateDetails) =>
                            setReleaseDate({ ...releaseDate, day: dateDetails.day, month: dateDetails.month, year: dateDetails.year })
                        }
                        clickOnTime={(timeDetails) =>
                            setReleaseDate({ ...releaseDate, hour: timeDetails.hour, minute: timeDetails.minute })
                        }
                    />
                </Activity>
            </div>
            {/* Movie trailer */}
            <div className={style['form-field']}>
                <FormInput
                    labelTitle='Movie Trailer'
                    inputType='input'
                    id={movieTrailer}
                    inputPlaceholder='Enter URL'
                    Icon={URLIcon}
                    register={register}
                    inputFieldName='trailerUrl'
                    minLength={5}
                    maxLength={500}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setMovieTrailerUrl(event.target.value)}

                />
                <ShowTrailer
                    trailerUrl={movieTrailerUrl}
                />
            </div>
            {/* Movie duration */}
            <div className={style['duration-container']}>
                <FormLabel
                    title='Movie Duration'
                />
                <div className={style['input-section-container']}>
                    <div className={style['input-section']}>
                        <TimerIcon
                            size={22}
                            strokeWidth={1.5}
                            className={style.icon}
                        />
                        <Input
                            className={style['input']}
                            placeholder='Enter movie duration hour'
                            type='number'
                            {...register("durationHour", {
                                required: true
                            })}
                        />
                    </div>
                    <div className={style['input-section']}>
                        <TimerIcon
                            size={22}
                            strokeWidth={1.5}
                            className={style.icon}
                        />
                        <Input
                            className={style['input']}
                            placeholder='Enter movie duration minutes'
                            type='number'
                            {...register("durationMinutes", {
                                required: true
                            })}
                        />
                    </div>
                    <div className={style['input-section']}>
                        <TimerIcon
                            size={22}
                            strokeWidth={1.5}
                            className={style.icon}
                        />
                        <Input
                            className={style['input']}
                            placeholder='Enter movie duration seconds'
                            type='number'
                            {...register("durationSeconds", {
                                required: true
                            })}
                        />
                    </div>
                </div>
            </div>
            {/* Movie type */}
            <div className={style['type-container']}>
                <FormLabel
                    title='Movie Type'
                />
                <div className={style['checkbox-container']}>
                    <Radio
                        values={[
                            {
                                title: "Live Action",
                                value: "LIVE_ACTION"
                            },
                            {
                                title: "Animated",
                                value: "ANIMATED"
                            },
                        ]}
                        selectedValue={movieType}
                        onClick={(value) => setMovieType(value.value as "LIVE_ACTION" | "ANIMATED")}
                    />
                </div>
            </div>
            {/* Movie casts and crew */}
            <Activity mode={movieType === "LIVE_ACTION" ? "visible" : "hidden"}>
                <div className={style['crew-container']}>
                    <FormLabel
                        title='Movie Casts & Crew'
                    />
                    <div className={style['list']}>
                        {
                            crews.map((crewDetails, index) => (

                                <div onClick={() => {
                                    setSelectedCrew({ ...crewDetails, id: crewDetails.id })
                                    setShowCrewScreen(true)
                                }}
                                    className={style['crew-details']}
                                    key={index}
                                >
                                    <div className={style['image-container']}>
                                        <EditIcon
                                            size={20}
                                            className={style.icon}
                                            strokeWidth={1.5}
                                        />
                                        <img
                                            src={crewDetails.preview}
                                        />
                                    </div>
                                    <span>{crewDetails.name}</span>
                                </div>

                            ))
                        }
                        <Activity mode={crews.length <= 4 ? "visible" : "hidden"}>
                            <div onClick={() => setShowCrewScreen(true)} className={style['add-cast-container']}>
                                <AddIcon
                                    size={23}
                                    strokeWidth={1.5}
                                />
                            </div>
                        </Activity>
                    </div>
                    <Activity mode={showCrewScreen ? "visible" : "hidden"}>
                        <AddCrewForm
                            setShowCrewForm={setShowCrewScreen}
                            submit={(actorName, actorImage, preview) => {
                                return setCrews((pre) => [...pre, { name: actorName, image: actorImage, preview: preview, id: crypto.randomUUID() }])
                            }}
                            selectedValue={selectedCrew}
                            setSelectedValue={setSelectedCrew}
                            onEdit={handleEditCrewDetails}
                            onRemove={handleRemoveCrewDetails}
                        />
                    </Activity>
                </div>
            </Activity>
            {/* Submit button */}
            <Button
                title='Add Movie'
                type='submit'
                className={style['submit-button']}
            />
        </form>

    )

}

export default AddMovieForm