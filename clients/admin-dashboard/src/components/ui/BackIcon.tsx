import {
    ArrowLeft as BackIcon
} from 'lucide-react'
import { useNavigate } from 'react-router'
import style from '../../styles/ui/backIconUi.module.scss'

interface BackIconUIProps {
    navigationUrl: string
}

const BackIconUI = ({ navigationUrl }: BackIconUIProps) => {

    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(navigationUrl)}
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