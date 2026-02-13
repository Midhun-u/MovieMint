import type { Theater } from "../../types/theater"
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
import { convertIsoDateToNormalFormat } from "../../utils/convertIsoDateToNoramlFormat"
import style from '../../styles/theaterDetails/theaterDetailsCard.module.scss'

interface TheaterDetailsCardProps {
    theaterDetails: Theater
}

const TheaterDetailsCard = ({ theaterDetails }: TheaterDetailsCardProps) => {

    return (
        <div
            className={style.container}
        >
            {/* Status section */}
            <p
                className={style.status}
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
            <div className={style['image-container']}>
                <img
                    src={theaterDetails.theater_image.image_url}
                    alt="Theater logo"
                    width={85}
                    height={85}
                />
            </div>
            {/* Details section */}
            <div className={style['details-container']}>
                {/* Theater title */}
                <h1 className={style.name}>
                    {theaterDetails.theater_name}
                </h1>
                {/* Theater location */}
                <div className={style.details}>
                    <LocationIcon
                        size={21}
                        className={style.icon}
                    />
                    <p className={style.text}>{theaterDetails.theater_location}</p>
                </div>
                {/* Theater supported formats */}
                <div className={style.details}>
                    <FormatsIcon
                        size={21}
                        className={style.icon}
                    />
                    <p className={style.text}>{theaterDetails.formats.join(", ")}</p>
                </div>
                {/* Theater registered date */}
                <div className={style.details}>
                    <DateIcon
                        size={21}
                        className={style.icon}
                    />
                    <p className={style.text}>{convertIsoDateToNormalFormat(theaterDetails.createdAt)}</p>
                </div>
                {/* Theater layout */}
                <div className={style.details}>
                    <LayoutIcon
                        size={21}
                        className={style.icon}
                    />
                    <p className={style.text}>{theaterDetails.layout_number} Layout</p>
                </div>
                {/* Theater sets in layout */}
                <div className={style.details}>
                    <SetsIcon
                        size={21}
                        className={style.icon}
                    />
                    <p className={style.text}>{theaterDetails.sets_number} Sets</p>
                </div>
                {/* Theater Rows in sets */}
                <div className={style.details}>
                    <RowsIcon
                        size={21}
                        className={style.icon}
                    />
                    <p className={style.text}>{theaterDetails.rows_number} Rows</p>
                </div>
                {/* Theater seats in row */}
                <div className={style.details}>
                    <SeatIcon
                        size={21}
                        className={style.icon}
                    />
                    <p className={style.text}>{theaterDetails.seats_number} Seats</p>
                </div>
                {/* Cancellation */}
                <div className={style.details}>
                    <CancellationIcon
                        size={21}
                        className={style.icon}
                    />
                    <p className={style.text}>
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