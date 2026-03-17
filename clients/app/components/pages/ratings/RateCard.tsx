import Image from "next/image"
import {
    Star as RatingsIcon
} from 'lucide-react'

interface RateCardProps {
    userImage: string,
    userName: string,
    userRate: number,
    userComment: string,
    createdAt: string
}

const RateCard = ({ userImage, userName, userRate, userComment, createdAt }: RateCardProps) => {

    const date = new Date(createdAt)

    return (

        <div className="p-4 max-h-40 overflow-hidden bg-foreground-color w-full flex flex-col gap-2.5 rounded-md border border-foreground-theme-color/15">
            <div className="w-full flex justify-between gap-2.5 items-center">
                {/* User details */}
                <div className="flex gap-2 items-center">
                    {/* User image */}
                    {
                        userImage
                            ?
                            <Image
                                src={userImage}
                                alt="User image"
                                width={1000}
                                height={1000}
                                className="w-8 h-8 aspect-square rounded-full "
                            />
                            :
                            null
                    }
                    {/* User name */}
                    <span className="text-[0.8rem] font-medium max-w-50 max-h-5 overflow-hidden break-all">{userName}</span>
                    <span className="text-[0.8rem] text-disable-color">
                        {
                            date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
                        }
                    </span>
                </div>
                {/* User rate */}
                <div className="flex gap-1.25 items-center">
                    <RatingsIcon
                        size={15}
                        className="fill-yellow-400 stroke-yellow-400"
                    />
                    <span className="text-[0.8rem] font-medium">{userRate}/10</span>
                </div>
            </div>
            {/* Comment */}
            <p className="text-[0.9rem] ">
                {userComment}
            </p>
        </div>

    )

}

export default RateCard