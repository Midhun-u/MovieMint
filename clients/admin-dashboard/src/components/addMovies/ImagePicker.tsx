import {
    UploadIcon,
} from 'lucide-react'
import style from '../../styles/addMovies/imagePicker.module.scss'
import Label from '../form/FormLabel'
import { useContext, useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import { ToastProvider } from '../context/ToastMessage'

interface ImagePicker {
    labelTitle: string
    title: string
    mode: "portrait" | "landscape"
    setFile: Dispatch<SetStateAction<File | null>>
}

const ImagePicker = ({ labelTitle, title, mode, setFile }: ImagePicker) => {

    const imageRef = useRef<HTMLInputElement | null>(null)
    const toastContext = useContext(ToastProvider)
    const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>('')

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
                setPreviewImage(fileReader.result)
            }

            setFile(file)

        }

    }

    return (
        <div
            className={style['image-picker-container']}
            onClick={() => imageRef.current?.click()}
        >
            <Label title={labelTitle} />
            <div
                className={
                    mode === "portrait" ?
                        (
                            previewImage
                                ?
                                style['preview-image-portrait']
                                :
                                style['image-picker-portrait']
                        )
                        :
                        previewImage
                        ?
                        style['preview-image-landscape']
                        :
                        style['image-picker-landscape']}
            >
                {
                    previewImage
                        ?
                        <div className={style['image-container']}>
                            <img className={style['image']} src={previewImage as string} />
                        </div>
                        :
                        <>
                            <UploadIcon
                                size={23}
                                strokeWidth={1.5}
                                className={style['icon']}
                            />
                            <p>{title}</p>
                        </>
                }
            </div>
            <input
                type='file'
                hidden
                ref={imageRef}
                onChange={handleStoreImage}
            />
        </div>
    )

}

export default ImagePicker