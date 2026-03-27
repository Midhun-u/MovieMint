import Image from "next/image"

interface ShowCardProps {
    theaterImage: string
    theaterName: string
    allowCancellation: boolean
    shows: Array<{
        _id: string
        price: number
        day: number
        hour: number
        minutes: number
        year: number
        month: number
    }>
    onClickShow: (id: string) => void
}

const ShowCard = ({ theaterImage, theaterName, allowCancellation, shows, onClickShow }: ShowCardProps) => {

    return (

        <div className="w-full flex flex-col gap-5">
            <div className="flex gap-2.5 items-center">
                {
                    theaterImage
                        ?
                        <Image
                            src={theaterImage}
                            alt={`${theaterName} image`}
                            width={1000}
                            height={1000}
                            className="w-20 rounded-[10px] aspect-square"
                        />
                        :
                        null
                }
                <div className="flex flex-col">
                    <span className="text-[0.9rem] font-semibold max-h-11 w-full sm:w-80 overflow-hidden">{theaterName}</span>
                    <p className="text-[0.7rem] font-medium text-foreground-theme-color/50">
                        {
                            allowCancellation
                                ?
                                <>
                                    Allow Cancellation
                                </>
                                :
                                <>
                                    Not Allow Cancellation
                                </>
                        }
                    </p>
                </div>
            </div>
            <div className="w-full flex gap-2.5 overflow-x-scroll">
                {
                    shows.map((show) => (
                        <div
                            onClick={() => onClickShow(show._id)}
                            key={show._id}
                            className="flex cursor-pointer flex-col justify-center items-center shrink-0 py-2 px-2 bg-foreground-color w-40 border border-foreground-theme-color/15 rounded-[10px]"
                        >
                            <p className="text-sm font-semibold">
                                {show?.hour <= 12 ? show.hour : show?.hour - 12}:{show.minutes.toString().padStart(2, "0")} {show.hour < 12? "AM": "PM"}
                            </p>
                            <p className="text-[0.8rem] text-foreground-theme-color/70">
                                &#x20b9;{show.price}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ShowCard