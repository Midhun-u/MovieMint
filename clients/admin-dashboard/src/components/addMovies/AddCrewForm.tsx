import style from '../../styles/addMovies/addCrewForm.module.scss'
import {
    X as CloseIcon,
    UserIcon,
    UploadIcon,
} from 'lucide-react'
import FormLabel from '../form/FormLabel'
import { Activity, useContext, useEffect, useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import Button from '../ui/Button'
import { ToastProvider } from '../context/ToastMessage'

type CrewDetails = {
    name: string
    image: File
    preview: string,
    index: number
}

interface AddCrewFormProps {
    setShowCrewForm: Dispatch<SetStateAction<boolean>>
    submit: (actorName: string, actorImage: File, previewImage: string) => void
    selectedValue?: CrewDetails | null
    onEdit?: (editedDetails: CrewDetails) => void
    setSelectedValue?: Dispatch<SetStateAction<CrewDetails | null>>
    onRemove?: (removedValue: CrewDetails) => void
}

const AddCrewForm = ({ setShowCrewForm, submit, selectedValue, onEdit, setSelectedValue, onRemove }: AddCrewFormProps) => {

    const toastContext = useContext(ToastProvider)
    const [preview, setPreview] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const [actorName, setActorName] = useState<string>('')
    const imageRef = useRef<HTMLInputElement | null>(null)

    // Function for storing image
    const handleStoreImage = (event: ChangeEvent<HTMLInputElement>) => {

        if (event.target.files?.length) {

            const file = event.target.files[0]

            if (!file.type.includes("image")) {
                toastContext?.triggerToastMessage("Invalid File", "ERROR")
                return
            }

            // Making preview of the image
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = async () => {
                setPreview(fileReader.result as string)
            }

            setFile(file)

        }

    }

    // Function for submitting
    const handleSubmit = () => {

        if (!actorName || !file) {
            return
        }

        submit(actorName, file, preview)

        // Removing all values
        setActorName("")
        setFile(null)
        setPreview("")

        setShowCrewForm(false)

    }

    // Function for editing selected details
    const handleEditSelectedDetails = () => {
        
        if(!selectedValue || !file || !onEdit) return 

        const editedDetails = {
            name: actorName,
            image: file,
            preview: preview,
            index: selectedValue.index
        }
        
        onEdit(editedDetails)
        setShowCrewForm(false)

    }

    // Function for removing selected details
    const handleRemoveDetails = () => {

        if(!onRemove || !selectedValue) return

        onRemove(selectedValue)
        setShowCrewForm(false)

    }

    useEffect(() => {

        if(!selectedValue) return

        setFile(selectedValue.image)
        setActorName(selectedValue.name)
        setPreview(selectedValue.preview)

    }, [selectedValue])

    return (

        <div className={style.container}>
            <div className={style.background}></div>
            <div className={style['form-container']}>
                <CloseIcon
                    className={style['close-icon']}
                    size={23}
                    strokeWidth={1.7}
                    onClick={() => {
                        setShowCrewForm(false)
                        setFile(null)
                        setActorName("")
                        setPreview("")
                        if(setSelectedValue)setSelectedValue(null)
                    }}
                />
                <div className={style['form-section']}>
                    <div className={style.form}>
                        <div className={style['input-container']}>
                            <FormLabel
                                title='Actor Name'
                            />
                            <div className={style['input-section']}>
                                <UserIcon
                                    size={22}
                                    strokeWidth={1.5}
                                    className={style['icon']}
                                />
                                <input
                                    type='text'
                                    placeholder='Enter actor name'
                                    className={style.input}
                                    onChange={(event) => setActorName(event.target.value)}
                                    minLength={3}
                                    maxLength={15}
                                    value={actorName}
                                />
                            </div>
                        </div>
                        <div className={style['image-section']}>
                            <FormLabel
                                title='Actor Image'
                            />
                            <div
                                className={preview || selectedValue? style['preview-image-container']: style['image-container']}
                                onClick={() => imageRef.current?.click()}
                            >
                                {
                                    preview || selectedValue?.preview
                                        ?
                                        <div className={style['preview-image']}>
                                            <img
                                                src={selectedValue?.preview? selectedValue.preview: preview}
                                            />
                                        </div>
                                        :
                                        <>
                                            <UploadIcon
                                                size={20}
                                                strokeWidth={1.5}
                                            />
                                            <span>Upload</span>
                                        </>
                                }
                                <input
                                    hidden
                                    type='file'
                                    ref={imageRef}
                                    onChange={handleStoreImage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style['button-container']}>
                        <Button
                            title={selectedValue? "Edit": "Add"}
                            type='button'
                            className={style['add-button']}
                            onClick={selectedValue? handleEditSelectedDetails: handleSubmit}
                        />
                        <Activity mode={selectedValue? "visible": "hidden"}>
                                <Button
                                    title='Remove'
                                    type='button'
                                    className={style['remove-button']}
                                    onClick={handleRemoveDetails}
                                />
                        </Activity>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default AddCrewForm