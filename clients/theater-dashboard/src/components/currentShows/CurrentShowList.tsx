import { Activity, useCallback, useEffect, useState } from 'react'
import style from '../../styles/currentShows/currentShowList.module.scss'
import TabBar from '../layout/TabBar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getShowsApi } from '../../api/show'
import useObserver from '../hooks/useObserver'
import { clearState, incrementPage, showFailed, showRequest, showSuccess } from '../../store/showSlice'
import ShowCard from './ShowCard'
import NoResult from '../ui/NoResult'
import ShowSkeleton from './ShowSkeleton'

const CurrentShowList = () => {

    const [status, setStatus] = useState<string>("")
    const { theater } = useAppSelector(state => state.theater)
    const { pagination, shows, loading } = useAppSelector(state => state.show)
    const dispatch = useAppDispatch()
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })

    // Function for getting shows
    const handleGetShows = useCallback(async () => {

        dispatch(showRequest())
        const result = await getShowsApi(theater.id, pagination.page, pagination.limit, status)

        if (result.success) {

            dispatch(showSuccess({ shows: result.shows, page: pagination.page }))

            if (result?.shows?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

        } else {
            dispatch(showFailed({ errorMessage: result.errorMessage }))
        }


    }, [pagination.page, pagination.limit, theater.id, dispatch, status])

    useEffect(() => {
        (() => {
            handleGetShows()
        })()
    }, [handleGetShows, dispatch, pagination.page])

    useEffect(() => {
        if (!isIntersecting || loading || !hasMore) return;

        (() => {
            dispatch(incrementPage())
        })();
    }, [isIntersecting, hasMore, loading, dispatch])

    useEffect(() => {
        return () => {
            dispatch(clearState())
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(clearState())
    }, [status, dispatch])

    return (
        <>
            <div
                className={style.container}
            >
                <TabBar
                    values={[
                        {
                            title: "All",
                            value: ""
                        },
                        {
                            title: "Showing",
                            value: "SHOWING"
                        },
                        {
                            title: "Not Showing",
                            value: "NOT_SHOWING"
                        }
                    ]}
                    setValue={setStatus}
                    activeValue={status}
                />
                <div className={style.list}>
                    {
                        shows.map((show) => (
                            <ShowCard
                                key={show._id}
                                id={show._id}
                                moviePoster={show.movie.poster.image_url}
                                movieTitle={show.movie.title}
                                movieCategories={show.movie.categories}
                                createdAt={show.createdAt}
                                showTime={{ ...show.show_time, startDay: show.show_time.start_day }}
                                status={show.status}
                                movieId={show.movie_id}
                            />
                        ))
                    }
                    <Activity mode={loading ? "visible" : "hidden"}>
                        <ShowSkeleton
                        />
                    </Activity>
                </div>
                <Activity mode={hasMore ? "visible" : "hidden"}>
                    <div ref={ref}></div>
                </Activity>
            </div>
            {
                !shows.length
                    ?
                    <NoResult
                    />
                    :
                    null
            }
        </>
    )
}

export default CurrentShowList