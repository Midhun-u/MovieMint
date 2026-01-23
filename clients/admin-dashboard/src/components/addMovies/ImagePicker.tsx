import { UploadIcon } from 'lucide-react'
import style from '../../styles/addMovies/imagePicker.module.scss'
import Label from '../form/Label'

interface ImagePicker {
    labelTitle: string
    title: string
    mode: "portrait" | "landscape"
}

const ImagePicker = ({ labelTitle, title, mode }: ImagePicker) => {

    return (
        <div className={style['image-picker-container']}>
            <Label title={labelTitle} />
            <div
                className={mode === "portrait"? style['image-picker-portrait']: style['image-picker-landscape']}
            >
                <UploadIcon
                    size={23}
                    strokeWidth={1.5}
                    className={style['icon']}
                />
                <p>{title}</p>
            </div>
        </div>
    )

}

export default ImagePicker