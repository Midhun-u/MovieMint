import { useNavigate, useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { movieFailed, movieRequest, movieSuccess } from "../../store/movieSlice"
import { getMovieApi } from "../../api/movie"
import { useCallback, useContext, useEffect, useId, useState } from "react"
import SelectedMovieDetails from "../addShowDetails/SelectedMovieDetails"
import style from '../../styles/editShow/showDetails.module.scss'
import FormLabel from "../form/FormLabel"
import Radio from "../ui/Radio"
import Button from "../ui/Button"
import { showFailed, showRequest, showSuccess } from "../../store/showSlice"
import { getShowApi, updateShowApi } from "../../api/show"
import NoResult from "../ui/NoResult"
import { ToastProvider } from "../context/providers/ToastProvider"
import {
    Banknote as PriceIcon
} from 'lucide-react'
import FormInput from "../form/FormInput"
import { useForm, type SubmitHandler } from "react-hook-form"

type Status = "SHOWING" | "NOT_SHOWING"
type Inputs = {
    price: string
}

const ShowDetails = () => {

    const { showId, movieId } = useParams()
    const dispatch = useAppDispatch()
    const [status, setStatus] = useState<Status | null>(null)
    const { show, loading } = useAppSelector(state => state.show)
    const navigate = useNavigate()
    const toastContext = useContext(ToastProvider)
    const priceId = useId()
    const { register, handleSubmit } = useForm<Inputs>()

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
            dispatch(showSuccess({ show: result.show }))
        } else {
            dispatch(showFailed({ errorMessage: result.errorMessage }))
        }

    }, [dispatch, showId])

    // Function for updating show
    const handleUpdateShow: SubmitHandler<Inputs> = async (data) => {

        const priceNumber = parseInt(data.price)

        const priceCondition = priceNumber? {price: priceNumber}: {}

        dispatch(showRequest())
        const result = await updateShowApi(showId as string, { status: status, ...priceCondition })

        if (result.success) {
            dispatch(showSuccess({ show: result.show }))
            toastContext?.triggerToastMessage("Show is updated", "SUCCESS")
            navigate(-1)
        } else {
            dispatch(showFailed({ error: result.errorMessage }))
        }

    }

    useEffect(() => {
        (() => {
            handleFetchMovie()
            handleFetchShow()
        })()
    }, [handleFetchMovie, movieId, handleFetchShow, showId])

    return (

        show
            ?
            <div className={style.container}>
                <SelectedMovieDetails
                />
                <form onSubmit={handleSubmit(handleUpdateShow)}>
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
                    <div className={style['field-container']}>
                        <FormInput
                            id={priceId}
                            Icon={PriceIcon}
                            inputFieldName="price"
                            inputType="input"
                            labelTitle="Price"
                            minLength={1}
                            maxLength={5}
                            register={register}
                            defaultValue={show.price}
                            placeholder="Enter show price"
                        />
                    </div>
                    <Button
                        title="Update Show"
                        className={style['update-button']}
                        loading={loading}
                        spinnerSize={17}
                        loadingSpinnerColor="black"
                        type="submit"
                    />
                </form>
            </div>
            :
            <NoResult
            />

    )

}

export default ShowDetails