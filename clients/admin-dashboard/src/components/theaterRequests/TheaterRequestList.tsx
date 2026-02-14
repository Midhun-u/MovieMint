import { Activity, useContext, useEffect, useOptimistic, useState, useTransition } from 'react'
import style from '../../styles/theaterRequests/theaterRequestList.module.scss'
import Button from '../ui/Button'
import {
    Calendar as DateIcon,
    MapPinIcon as LocationIcon,
    Armchair as SeatIcon,
} from 'lucide-react'
import { approveTheaterApi, deleteTheaterApi, getTheaterRequestsApi } from '../../api/theater'
import { convertIsoDateToNormalFormat } from '../../utils/convertIsoDateToNoramlFormat'
import useObserver from '../hooks/useObserver'
import { useNavigate } from 'react-router'
import { ToastProvider } from '../context/ToastMessage'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { theaterFailed, theaterRequest, theaterSuccess } from '../../store/theatersRequestSlice'
import TheaterRequestSkeleton from './TheaterRequestSkeleton'
import { deleteTheaterImageApi } from '../../api/media'
import Spinner from '../ui/Spinner'
import NoResult from '../ui/NoResult'


const TheaterRequestList = () => {

    const [pagination, setPagination] = useState<{
        page: number,
        limit: number,
    }>({
        page: 1,
        limit: 10,
    })
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { loading, theatersRequests } = useAppSelector(state => state.theaterRequestReducer)
    const { theme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const { ref, isIntersecting } = useObserver<HTMLDivElement>({ threshold: 0.5 })
    const navigate = useNavigate()
    const toastContext = useContext(ToastProvider)
    const [optimisticTheatersRequests, setOptimisticTheaterRequests] = useOptimistic(theatersRequests)
    const [isPending, startTransition] = useTransition()
    const [approveLoadingDetails, setApproveLoadingDetails] = useState<{
        loading: boolean
        theaterId: string
    }>({
        loading: false,
        theaterId: ""
    })
    const [deleteLoadingDetails, setDeleteLoadingDetails] = useState<{ loading: boolean, theaterId: string }>({
        loading: false,
        theaterId: ""
    })


    // Function for getting theater requests
    const handleGetTheaterRequests = async () => {

        dispatch(theaterRequest())

        const result = await getTheaterRequestsApi(pagination.page, pagination.limit)
        if (result.success) {

            const theaterRequestList = pagination.page === 1 || theatersRequests.length <= 0 ? [...result.theaters] : [...theatersRequests, ...result.theaters]
            dispatch(theaterSuccess({ theatersRequests: theaterRequestList }))

            if (result.theaters?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

        } else {
            dispatch(theaterFailed({ errorMessage: result.error }))
        }


    }

    // Function for approving theater request
    const handleApproveTheaterRequest = async (event: React.MouseEvent<HTMLElement, MouseEvent>, theaterId: string) => {

        // For stopping parent click event
        event.stopPropagation()

        setApproveLoadingDetails({
            loading: true,
            theaterId: theaterId
        })
        const result = await approveTheaterApi(theaterId)

        if (result.success) {

            startTransition(() => {
                setOptimisticTheaterRequests((pre) => {

                    const filteredTheaterRequests = pre.filter((theater) => theater.id !== theaterId)
                    return filteredTheaterRequests

                })
            })
            toastContext?.triggerToastMessage("Theater is approved", "SUCCESS")

        } else {
            toastContext?.triggerToastMessage("Theater couldn't approve", "ERROR")
        }

        setApproveLoadingDetails({
            loading: false,
            theaterId: ""
        })

    }

    // Function for deleting theater request
    const handleDeleteTheaterRequest = async (event: React.MouseEvent<HTMLElement, MouseEvent>, theaterId: string) => {

        // For stopping parent click event
        event.stopPropagation()

        setDeleteLoadingDetails({
            loading: true,
            theaterId: theaterId
        })
        const theaterResult = await deleteTheaterApi(theaterId)

        if (theaterResult.success) {

            const imageResult = await deleteTheaterImageApi(theaterId)

            if (imageResult.success) {
                toastContext?.triggerToastMessage("Theater request is refused", "SUCCESS")
            } else {
                toastContext?.triggerToastMessage("Theater request is couldn't refuse", "ERROR")
            }

        } else {
            toastContext?.triggerToastMessage("Theater request is couldn't refuse", "ERROR")
        }

        setDeleteLoadingDetails({
            loading: false,
            theaterId: ""
        })

    }


    useEffect(() => {
        handleGetTheaterRequests()
    }, [pagination.page])

    useEffect(() => {

        if (!isIntersecting || loading || !hasMore) return

        setPagination((pre) => {
            return { ...pre, page: pre.page + 1 }
        })

    }, [isIntersecting, loading, hasMore])
    console.log(optimisticTheatersRequests)

    return (

        optimisticTheatersRequests.length
            ?
            <div className={style.container}>
                {/* Theater requests list */}
                <div className={style['list']}>
                    {
                        optimisticTheatersRequests.map((theaterRequest) => (

                            <div
                                key={theaterRequest.id}
                                className={style['theater-details-container']}
                                onClick={() => navigate(`/admin/theater-requests/${theaterRequest.id}`)}
                            >
                                <p className={style.status}>
                                    Pending Review
                                </p>
                                {/* Theater image */}
                                <img
                                    src={theaterRequest.theater_image.image_url}
                                    className={style['theater-image']}
                                    loading='lazy'
                                />
                                <div className={style['theater-details']}>
                                    {/* Theater title */}
                                    <h1>{theaterRequest.theater_name}</h1>
                                    {/* Theater location */}
                                    <div className={style.details}>
                                        <LocationIcon
                                            size={18}
                                            className={style.icon}
                                        />
                                        <p>{theaterRequest.theater_location}</p>
                                    </div>
                                    {/* Theater request date */}
                                    <div className={style.details}>
                                        <DateIcon
                                            size={18}
                                            className={style.icon}
                                        />
                                        <p>{convertIsoDateToNormalFormat(theaterRequest.createdAt)}</p>
                                    </div>
                                    {/* Theater total seats */}
                                    <div className={style.details}>
                                        <SeatIcon
                                            size={18}
                                            className={style.icon}
                                        />
                                        <p>{theaterRequest.layout_number * theaterRequest.sets_number * theaterRequest.rows_number * theaterRequest.seats_number} seats</p>
                                    </div>
                                    <div className={style['button-container']}>
                                        <Button
                                            className={style['button']}
                                            onClick={(event) => handleDeleteTheaterRequest(event, theaterRequest.id)}
                                            disabled={approveLoadingDetails.loading || deleteLoadingDetails.loading ? true : false}
                                        >
                                            {
                                                deleteLoadingDetails.loading && deleteLoadingDetails.theaterId === theaterRequest.id
                                                    ?
                                                    <Spinner
                                                        color={theme === "dark" ? "white" : "black"}
                                                        size={13}
                                                    />
                                                    :
                                                    <>
                                                        Refuse
                                                    </>

                                            }
                                        </Button>
                                        <Button
                                            className={style['button']}
                                            disabled={approveLoadingDetails.loading || deleteLoadingDetails.loading ? true : false}
                                            onClick={(event) => handleApproveTheaterRequest(event, theaterRequest.id)}
                                        >
                                            {
                                                approveLoadingDetails.loading && approveLoadingDetails.theaterId === theaterRequest.id
                                                    ?
                                                    <Spinner
                                                        color={theme === "dark" ? "white" : "black"}
                                                        size={13}
                                                    />
                                                    :
                                                    <>
                                                        Approve
                                                    </>

                                            }
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>
                <Activity mode={loading ? "visible" : "hidden"}>
                    <TheaterRequestSkeleton
                    />
                </Activity>
                <Activity mode={hasMore ? "visible" : "hidden"}>
                    <div ref={ref}></div>
                </Activity>
            </div>
            :
            <NoResult
            />

    )

}

export default TheaterRequestList