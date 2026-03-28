import Image from "next/image"
import {
    Star as RatingsIcon,
} from 'lucide-react'
import NullProfilePic from "@/components/ui/NullProfilePic"

interface RateCardProps {
    userImage: string
    userName: string
    userRate: number
    userComment: string
    createdAt: string
}

interface RateDetails {
    userImage: string
    createdAt: string
    userRate: number
    userName: string
}

const RateDetails = ({ userImage, createdAt, userRate, userName }: RateDetails) => {

    const date = new Date(createdAt)

    return (
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
                        <NullProfilePic
                        />
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
    )
}

const RateCard = ({ userImage, userName, userRate, userComment, createdAt }: RateCardProps) => {

    return (

        <>
            <div
                className={`p-4 h-full overflow-hidden bg-foreground-color w-full flex flex-col gap-2.5 rounded-md border border-foreground-theme-color/15`}
            >
                <RateDetails
                    userRate={userRate}
                    userImage={userImage}
                    createdAt={createdAt}
                    userName={userName}
                />
                {/* Comment */}
                <p className={`text-[0.9rem] h-full overflow-hidden`}>
                    {userComment}
                </p>
            </div>
        </>

    )

}

export default RateCard