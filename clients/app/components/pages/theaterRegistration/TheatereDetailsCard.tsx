import { TheaterDetails } from "@/types/theater"
import Image from "next/image"
import {
    MapPin as LocationIcon,
    Calendar as DateIcon,
    LayoutPanelTop as LayoutIcon,
    TableCellsMerge as SetsIcon,
    Grid2X2 as RowsIcon,
    Armchair as SeatIcon,
    BanknoteArrowDownIcon as CancellationIcon,
    Tv as FormatsIcon
} from 'lucide-react'
import { convertIsoDateToNormalFormat } from "@/utils/convertIsoDateToNoramlFormat"

interface TheaterDetailsCardProps {
    theaterDetails: TheaterDetails
}

const TheaterDetailsCard = ({ theaterDetails }: TheaterDetailsCardProps) => {

    const detailsContainerClass = "flex items-center gap-[8px]"
    const iconClass = "stroke-foreground-theme-color/50 shrink-0"
    const textClass = "text-xs font-medium text-foreground-theme-color/60"

    return (
        <div
            className="relative flex flex-col gap-3 w-full sm:w-112.5 p-7 bg-foreground-color border border-foreground-theme-color/20 rounded-md"
        >
            {/* Status section */}
            <p
                className={`${theaterDetails.status === "PENDING" ? "bg-warn-background-color text-warn-foreground-color" : "bg-success-background-color text-success-foreground-color"} rounded-sm text-xs font-medium absolute top-3 right-3 py-1 px-2`}
            >
                {
                    theaterDetails.status === "PENDING"
                        ?
                        <>
                            Pending Review
                        </>
                        :
                        <>
                            Available
                        </>
                }
            </p>

            {/* Theater image section */}
            <div className="mt-4">
                {
                    theaterDetails?.theater_image?.image_url
                        ?
                        <Image
                            src={theaterDetails.theater_image.image_url}
                            alt="Theater logo"
                            width={85}
                            height={85}
                            className="rounded-md aspect-square"
                        />
                        :
                        null
                }
            </div>
            {/* Details section */}
            <div className="flex flex-col gap-2">
                {/* Theater title */}
                <h1 className="text-md font-medium">
                    {theaterDetails.theater_name}
                </h1>
                {/* Theater location */}
                <div className={detailsContainerClass}>
                    <LocationIcon
                        size={21}
                        className={iconClass}
                    />
                    <p className={textClass}>{theaterDetails.theater_location}</p>
                </div>
                {/* Theater registered date */}
                <div className={detailsContainerClass}>
                    <DateIcon
                        size={21}
                        className={iconClass}
                    />
                    <p className={textClass}>{convertIsoDateToNormalFormat(theaterDetails.createdAt)}</p>
                </div>
                <div className={detailsContainerClass}>
                    <FormatsIcon
                        size={21}
                        className={iconClass}
                    />
                    <p className={textClass}>{theaterDetails.formats.join(", ")}</p>
                </div>
                {/* Theater layout */}
                <div className={detailsContainerClass}>
                    <LayoutIcon
                        size={21}
                        className={iconClass}
                    />
                    <p className={textClass}>{theaterDetails.layout_number} Layout</p>
                </div>
                {/* Theater sets in layout */}
                <div className={detailsContainerClass}>
                    <SetsIcon
                        size={21}
                        className={iconClass}
                    />
                    <p className={textClass}>{theaterDetails.sets_number} Sets</p>
                </div>
                {/* Theater Rows in sets */}
                <div className={detailsContainerClass}>
                    <RowsIcon
                        size={21}
                        className={iconClass}
                    />
                    <p className={textClass}>{theaterDetails.rows_number} Rows</p>
                </div>
                {/* Theater seats in row */}
                <div className={detailsContainerClass}>
                    <SeatIcon
                        size={21}
                        className={iconClass}
                    />
                    <p className={textClass}>{theaterDetails.seats_number} Seats</p>
                </div>
                {/* Cancellation */}
                <div className={detailsContainerClass}>
                    <CancellationIcon
                        size={21}
                        className={iconClass}
                    />
                    <p className={textClass}>
                        {
                            theaterDetails.allow_cancellation
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
        </div>
    )

}

export default TheaterDetailsCard