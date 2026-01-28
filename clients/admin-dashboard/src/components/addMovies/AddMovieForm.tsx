import { Activity, useId, useState } from 'react'
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
    Plus as AddIcon
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
    const [releaseDate, setReleaseDate] = useState<{
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number
    }>({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        hour: 0,
        minute: 0
    })
    const [movieType, setMovieType] = useState<"LIVE_ACTION" | "ANIMATED">("LIVE_ACTION")
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

    return (

        <form className={style.container}>
            {/* Movie title */}
            <FormInput
                labelTitle='Movie Title'
                id={titleId}
                inputPlaceholder='Enter movie title'
                Icon={MovieIcon}
                inputType='input'
            />
            {/* Movie subheading */}
            <FormInput
                labelTitle='Movie Subheading'
                id={subheadingId}
                inputPlaceholder='Enter movie subheading'
                Icon={SubheadingIcon}
                inputType='textarea'
            />
            {/* Movie synopsis */}
            <FormInput
                labelTitle='Movie Synopsis'
                id={synopsisId}
                inputPlaceholder='Enter movie synopsis'
                Icon={SynopsisIcon}
                inputType='textarea'
            />
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
            <FormInput
                labelTitle='Movie Trailer'
                inputType='input'
                id={movieTrailer}
                inputPlaceholder='Enter URL'
                Icon={URLIcon}
            />
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
                            placeholder='Enter hour'
                            type='number'
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
                            placeholder='Enter minutes'
                            type='number'
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
                            placeholder='Enter seconds'
                            type='number'
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
            <Activity mode={movieType === "LIVE_ACTION"? "visible": "hidden"}>
                <div className={style['crew-container']}>
                    <FormLabel
                        title='Movie Casts & Crew'
                    />
                    <div className={style['list']}>
                        <div className={style['add-cast-container']}>
                            <AddIcon
                                size={23}
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                </div>
            </Activity>
        </form>

    )

}

export default AddMovieForm