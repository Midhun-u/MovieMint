import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAppSelector } from '../../store/hooks'
import style from '../../styles/settings/theaterDetails.module.scss'
import {
    CameraIcon,
    Birdhouse as TheaterNameIcon,
    MapPin as LocationIcon
} from 'lucide-react'
import { useContext, useEffect, useId, useRef, useState, type ChangeEvent } from 'react'
import FormInput from '../form/FormInput'
import FormLabel from '../form/FormLabel'
import CheckBoxList from '../ui/CheckBoxList'
import { movieFormats } from '../../utils/movieFormats'
import CheckBox from '../ui/CheckBox'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { ToastProvider } from '../context/providers/ToastProvider'
import { updateTheaterImage } from '../../api/media'
import { updateTheaterApi } from '../../api/theater'
import { useDispatch } from 'react-redux'
import { theaterFailed, theaterRequest, theaterSuccess } from '../../store/theaterSlice'

type Inputs = {
    theaterName: string
    theaterLocation: string
}

const TheaterDetails = () => {

    const { theater } = useAppSelector(state => state.theater)
    const {register, handleSubmit} = useForm<Inputs>()
    const theaterNameId = useId()
    const theaterLocationId = useId()
    const [selectedFormats, setSelectedFormats] = useState<Array<string>>([])
    const [allowCancellation, setAllowCancellation] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string>("")
    const imageRef = useRef<HTMLInputElement | null>(null)
    const toastContext = useContext(ToastProvider)
    const dispatch = useDispatch()

    // Function for updating theater
    const handleUpdateTheater: SubmitHandler<Inputs> = async (data) => {

        dispatch(theaterRequest())

        if(!data.theaterName || !data.theaterLocation){
            toastContext?.triggerToastMessage("Invalid fields", "ERROR")
            return
        }

        if(file){
            const imageResult = await updateTheaterImage(file, theater.id)
            if(imageResult.success){
                toastContext?.triggerToastMessage("Theater image is updated", "SUCCESS")
            }else{
                toastContext?.triggerToastMessage(imageResult.errorMessage, "ERROR")
            }
        }

        const result = await updateTheaterApi(theater.id, {
            theater_name: data.theaterName,
            theater_location: data.theaterLocation,
            formats: selectedFormats,
            allow_cancellation: allowCancellation
        })
        
        if(result.success){
            dispatch(theaterSuccess({
                theater: {
                    ...theater, 
                    theater_name: data.theaterName,
                    theater_location: data.theaterLocation,
                    formats: selectedFormats,
                    allow_cancellation: allowCancellation
                }
            }))
            toastContext?.triggerToastMessage("Theater is updated", "SUCCESS")
        }else{
            dispatch(theaterFailed({errorMessage: result.errorMessage}))
            toastContext?.triggerToastMessage(result.errorMessage, "ERROR")
        }
        
    }

    // Function for storing image
    const handleStoreImage = (files: FileList | null) => {
        if(files?.length){

            const file = files[0]
            const fileSize = 10 * 1024 * 1024 // 10MB

            if(!file.type.includes("image")){
                toastContext?.triggerToastMessage("Invalid file", "ERROR")
                return
            }

            if(file.size > fileSize){
                toastContext?.triggerToastMessage("File size is exceeded", "ERROR")
                return
            }

            setFile(file)
            
            // Creating preview of the file
            setPreview(URL.createObjectURL(file))

        }
    }

    useEffect(() => {
        (() => {
            setSelectedFormats(theater.formats)
            setAllowCancellation(theater.allow_cancellation? theater.allow_cancellation: false)
        })()
    }, [theater])

    return (

        <div className={style.container}>
            {/* Theater logo section */}
            <div className={style['theater-image-container']}>
                <div onClick={() => imageRef.current?.click()} className={style['image-container']}>
                    <img
                        src={preview? preview: theater.theater_image.image_url}
                        className={style['theater-image']}
                    />
                    <div className={style.background}></div>
                    <CameraIcon
                        className={style.icon}
                    />
                    <Input
                        type='file'
                        hidden
                        ref={imageRef}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleStoreImage(event.target.files)}
                    />
                </div>
                <div className={style['details']}>
                    <span>Theater Logo</span>
                    <p>PNG, JPG, JPEG. Max size 10MB.</p>
                </div>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit(handleUpdateTheater)} className={style.form}>
                {/* Theater name */}
                <FormInput
                    id={theaterNameId}
                    Icon={TheaterNameIcon}
                    inputFieldName='theaterName'
                    inputType='input'
                    labelTitle='Theater Name'
                    minLength={3}
                    maxLength={25}
                    register={register}
                    placeholder='Enter your theater name'
                    defaultValue={theater.theater_name}
                />
                {/* Theater location */}
                <FormInput
                    id={theaterLocationId}
                    Icon={LocationIcon}
                    inputFieldName='theaterLocation'
                    inputType='input'
                    labelTitle='Theater Location'
                    minLength={5}
                    maxLength={100}
                    placeholder='Enter you theater location'
                    defaultValue={theater.theater_location}
                    register={register}
                />
                {/* Theater supported formats */}
                <div className={style['form-fields']}>
                    <FormLabel
                        title='Formats'
                    />
                    <CheckBoxList
                        values={movieFormats}
                        checkedValues={theater.formats}
                        selectedLimit={0}
                        setValues={setSelectedFormats}
                        className={style.formats} 
                    />
                </div>
                <div className={style['form-fields']}>
                    <FormLabel
                        title='Allow Cancellation'
                    />
                    <CheckBox
                        value='Allow'
                        checkedValue={allowCancellation? "Allow": undefined}
                        onUnmarkChecked={() => setAllowCancellation(true)}
                        onMarkChecked={() => setAllowCancellation(false)}
                    />
                </div>
                <Button
                    title='Save Changes'
                    className={style['update-button']}
                />
            </form>
        </div>

    )

}

export default TheaterDetails