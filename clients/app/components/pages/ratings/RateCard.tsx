import Image from "next/image"
import {
    Star as RatingsIcon,
} from 'lucide-react'
import NullProfilePic from "@/components/ui/NullProfilePic"
import { useState } from "react"
import {
    X as CloseIcon
} from 'lucide-react'

interface RateCardProps {
    userImage: string,
    userName: string,
    userRate: number,
    userComment: string,
    createdAt: string
}

interface RateDetails {
    userImage: string,
    createdAt: string,
    userRate: number,
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

    const [showComment, setShowComment] = useState<boolean>(false)

    return (

        <>
            <div
                className="p-4 h-full cursor-pointer overflow-hidden bg-foreground-color w-full flex flex-col gap-2.5 rounded-md border border-foreground-theme-color/15"
                onClick={() => setShowComment(true)}
            >
                <RateDetails
                    userRate={userRate}
                    userImage={userImage}
                    createdAt={createdAt}
                    userName={userName}
                />
                {/* Comment */}
                <p className="text-[0.9rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {userComment}
                </p>
            </div>
            {
                showComment
                    ?
                    <div className="w-full flex justify-center h-full absolute top-15 left-0 z-5">
                        <div className="w-full h-full bg-foreground-color opacity-[0.5]"></div>
                        <div className="fixed max-[600px]:w-[95%] w-125 p-5 rounded-sm top-40 bg-foreground-color border border-foreground-theme-color/15 flex flex-col gap-5 pt-12">
                            <div
                                onClick={() => setShowComment(false)}
                                className="p-1 rounded-full hover:bg-foreground-theme-color/10 cursor-pointer w-min absolute top-3 right-3"
                            >
                                <CloseIcon
                                    size={22}
                                    strokeWidth={1.8}
                                />
                            </div>
                            <RateDetails
                                userImage={userImage}
                                createdAt={createdAt}
                                userName={userName}
                                userRate={userRate}
                            />
                            <p className="text-[0.9rem] h-70 overflow-scroll">
                                {userComment}
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ut perferendis veniam, provident ea quasi consequuntur inventore excepturi sapiente fugit vel beatae modi perspiciatis ratione, accusamus quam laborum minus voluptatem.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus pariatur, labore omnis autem molestiae accusantium excepturi esse iusto qui quam optio nisi dolore distinctio ipsum dolores consequuntur? Fugiat, quasi saepe.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque molestiae fugiat iusto unde alias accusamus aperiam ratione in quo cupiditate obcaecati dolorum numquam distinctio rerum animi aliquam, provident error facere!
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius illo numquam consequuntur alias, deleniti iusto maxime laborum repellat id atque accusantium totam placeat consectetur magnam? Facere iusto impedit libero quaerat!
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum nesciunt, nisi inventore cum, exercitationem iure reiciendis ratione dignissimos maxime ad impedit magni omnis, ipsam unde minus sit ipsum suscipit deserunt.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit tenetur libero iure iusto dolorum in ut minus quae provident magnam explicabo dolor architecto eaque ab rem, ipsum pariatur exercitationem quas!
                            </p>
                        </div>
                    </div>
                    :
                    null
            }
        </>

    )

}

export default RateCard