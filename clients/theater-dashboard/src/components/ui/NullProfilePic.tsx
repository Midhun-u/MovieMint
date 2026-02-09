import {
    UserIcon
} from 'lucide-react'
import style from '../../styles/ui/nullProfilePic.module.scss'

const NullProfilePic = () => {

    return (
        <div className={style.container}>
            <UserIcon
                size={23}
                strokeWidth={1.5}
            />
        </div>
    )

}

export default NullProfilePic