import { useId, useState } from 'react'
import style from '../../styles/addMovies/addMovieForm.module.scss'
import FormInput from '../form/FormInput'
import {
    Film as MovieIcon,
    TextQuote as SubheadingIcon,
    TextAlignStart as SynopsisIcon,
    LanguagesIcon as LanguageIcon,
    Grid3x2 as CertificateIcon
} from 'lucide-react'
import ImagePicker from './ImagePicker'
import ListItems from './ListItems'
import Iso6391 from 'iso-639-1'
import { movieCertificates } from '../../utils/movieCertificates'
import Label from '../form/Label'
import { movieCategories } from '../../utils/movieCategories'
import CheckBoxList from './CheckBoxList'

const AddMovieForm = () => {

    const titleId = useId()
    const subheadingId = useId()
    const synopsisId = useId()
    const languages = Iso6391.getAllCodes().map(code => Iso6391.getName(code))
    const [language, setLanguage] = useState<string>('')
    const [certificate, setCertificate] = useState<string>('')
    const [categories, setCategories] = useState<Array<string>>([])

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
            />
            {/* Movie Banner */}
            <ImagePicker
                labelTitle='Movie Banner'
                title='Upload Movie Banner'
                mode='landscape'
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
                <Label
                    title='Movie Category'
                />
                <CheckBoxList
                    values={movieCategories}
                    setValues={setCategories}
                    checkedValues={categories}
                />
            </div>
        </form>

    )

}

export default AddMovieForm