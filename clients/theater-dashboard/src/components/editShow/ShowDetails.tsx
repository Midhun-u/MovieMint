import { useParams } from "react-router"
import { useAppDispatch } from "../../store/hooks"
import { movieFailed, movieRequest, movieSuccess } from "../../store/movieSlice"
import { getMovieApi } from "../../api/movie"
import { useCallback, useEffect, useState } from "react"
import SelectedMovieDetails from "../addShowDetails/SelectedMovieDetails"
import style from '../../styles/editShow/showDetails.module.scss'
import FormLabel from "../form/FormLabel"
import Radio from "../ui/Radio"
import Button from "../ui/Button"
import { showFailed, showRequest, showSuccess } from "../../store/showSlice"
import { getShowApi } from "../../api/show"

type Status = "SHOWING" | "NOT_SHOWING"

const ShowDetails = () => {

    const { showId, movieId } = useParams()
    const dispatch = useAppDispatch()
    const [status, setStatus] = useState<Status | null>(null)

    // Function for fetching movie
    const handleFetchMovie = useCallback(async () => {

        dispatch(movieRequest())

        const result = await getMovieApi(movieId as string)
        if (result.success) {
            dispatch(movieSuccess({ movie: result.movie }))
        } else {
            dispatch(movieFailed({ errorMessage: result.errorMessage }))
        }

    }, [movieId, dispatch])

    // Function for fetching show
    const handleFetchShow = useCallback(async () => {

        dispatch(showRequest())

        const result = await getShowApi(showId as string)
        if (result.success) {
            setStatus(result.show.status)
            dispatch(showSuccess({ show: result.movie }))
        } else {
            dispatch(showFailed({ errorMessage: result.errorMessage }))
        }

    }, [dispatch, showId])

    useEffect(() => {
        (() => {
            handleFetchMovie()
            handleFetchShow()
        })()
    }, [handleFetchMovie, movieId, handleFetchShow, showId])

    return (

        <div className={style.container}>
            <SelectedMovieDetails
            />
            <div className={style['field-container']}>
                <FormLabel
                    title="Status"
                />
                <div>
                    <Radio
                        values={[
                            {
                                title: "Showing",
                                value: "SHOWING"
                            },
                            {
                                title: "Not Showing",
                                value: "NOT_SHOWING"
                            }
                        ]}
                        className={style['radio-container']}
                        selectedValue={status as string}
                        onClick={(value) => setStatus(value.value as Status)}
                    />
                </div>
            </div>
            <Button
                title="Update Show"
                className={style['update-button']}

            />
        </div>

    )

}

export default ShowDetails