import {
    UserIcon
} from 'lucide-react'

interface NullProfilePic{
    className?: string
}

const NullProfilePic = ({className}: NullProfilePic) => {

    return (
        <div className={`${className} bg-background-color p-1 rounded-full border`}>
            <UserIcon
                size={23}
                strokeWidth={1.5}
            />
        </div>
    )

}

export default NullProfilePic