import {updateNotificationApi } from '@/api/notification'
import {
    CircleCheckBig as SuccessIcon,
    TriangleAlert as ErrorIcon,
    Trash as DeleteIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface NotificationCardProps {
    id: string
    success: boolean
    title: string
    message: string
    isRead: boolean
    metadata: Record<string, any>
    onClickOnDelete: (id: string) => void
}

const NotificationCard = ({ success, title = "", message = "", isRead = false, id, metadata, onClickOnDelete }: NotificationCardProps) => {

    const router = useRouter()

    // Function for navigation
    const handleNavigate = async () => {

        const authToken = localStorage.getItem('authToken')
        if (!authToken) return

        if (metadata?.action === "check_movie" && metadata?.movie_id) {
            router.push(`/movies/details/${metadata.movie_id}`)
        }

        if (!isRead) {
            await updateNotificationApi(id, {
                is_read: true
            }, authToken)
        }
    }

    return (

        <div
            className={`w-full cursor-pointer p-2.5 ${isRead ? "bg-background-color" : "bg-foreground-color"} rounded-[5px] flex flex-col gap-2.5 border border-foreground-theme-color/15`}
            onClick={handleNavigate}
        >
            <div className="flex gap-2.5 relative items-center">
                <div className={`p-1 ${success ? "bg-success-background-color" : "bg-error-background-color"} rounded-[5px]`}>
                    {
                        success
                            ?
                            <SuccessIcon
                                size={20}
                                className={`stroke-success-foreground-color`}
                                strokeWidth={1.7}
                            />
                            :
                            <ErrorIcon
                                size={20}
                                className={`stroke-error-foreground-color`}
                                strokeWidth={1.7}
                            />
                    }
                </div>
                <span className='text-sm font-medium overflow-hidden max-h-10 max-w-[85%]'>
                    {title}
                </span>
                <div onClick={(event) => {
                    event.stopPropagation()
                    onClickOnDelete(id)
                }} className={`absolute ${isRead ? "bg-backgroud-color" : "bg-foreground-color"} p-1 right-0 rounded-[5px] hover:bg-background-color cursor-pointer`}>
                    <DeleteIcon
                        size={20}
                        className='stroke-error-foreground-color'
                        strokeWidth={1.7}
                    />
                </div>
            </div>
            <p className='text-xs max-w-full max-h-8 overflow-hidden'>
                {message}
            </p>
        </div>

    )

}

export default NotificationCard