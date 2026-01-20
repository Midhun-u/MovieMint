import {
    UserIcon
} from 'lucide-react'

interface NullProfilePic{
    className?: string
}

const NullProfilePic = ({className}: NullProfilePic) => {

    return (
        <div className={`${className} bg-disable-color/20 p-1 rounded-full `}>
            <UserIcon
                size={23}
                strokeWidth={1.5}
            />
        </div>
    )

}

export default NullProfilePic