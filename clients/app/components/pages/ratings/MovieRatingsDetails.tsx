import { useAppSelector } from '@/store/hooks'
import { movieRatingsConvertor } from '@/utils/movieRatingsConvertor'
import { ratingsTimer } from '@/utils/ratingsTrimer'
import {
    Star as RatingsIcon,
    Users as PeopleIcon
} from 'lucide-react'

const MovieRatingsDetails = () => {

    const {movie} = useAppSelector(state => state.movie)

    return (
        <div className='w-full flex max-[350px]:justify-center'>
            <div className="bg-foreground-color border border-foreground-theme-color/15 p-2.5 px-3 rounded-sm w-max flex gap-2.5 items-center">
                {/* Rounded ratings */}
                <div className="flex gap-1.25 items-center w-max">
                    <span className="max-[300px]:text-3xl font-semibold text-4xl">{ratingsTimer(movie?.ratingsDetails.averageRatings || 0)}</span>
                    <div className='flex flex-col'>
                        <RatingsIcon
                            size={13}
                            className='fill-yellow-400 stroke-yellow-400'
                        />
                        <span className='text-[11px] text-foreground-theme-color/50 font-medium w-max'>Out of 10</span>
                    </div>
                </div>
                <span className='h-full text-disable-color flex items-center'> | </span>
                {/* Total ratings */}
                <div className='flex gap-1.25 items-center w-max'>
                    <PeopleIcon
                        size={30}
                        strokeWidth={1.5}
                        className='text-disable-color max-[300px]:size-7'
                    />
                    <div className='flex flex-col'>
                        <span className='text-sm font-semibold'>{movieRatingsConvertor(movie?.ratingsDetails.totalRatings || 0)}</span>
                        <span className='text-[11px] font-medium text-disable-color'>Total Ratings</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MovieRatingsDetails