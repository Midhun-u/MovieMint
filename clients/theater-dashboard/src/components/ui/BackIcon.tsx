import {
    ArrowLeft as BackIcon
} from 'lucide-react'
import { useNavigate } from 'react-router'
import style from '../../styles/ui/backIconUi.module.scss'

const BackIconUI = () => {

    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(-1)}
            className={style.container}
        >
            <BackIcon
                strokeWidth={1.8}
                size={25}
            />
        </div>
    )

}

export default BackIconUI