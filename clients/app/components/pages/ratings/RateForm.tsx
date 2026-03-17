import { addRateApi, updateRateApi } from "@/api/rate"
import { ToastProvider } from "@/components/context/providers/ToastProvider"
import FormInput from "@/components/form/FormInput"
import Label from "@/components/form/Label"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/ui/Spinner"
import { useAppSelector } from "@/store/hooks"
import { rateFailed, rateRequst, rateSuccess } from "@/store/rateSlice"
import {
    Star as RatingsIcon,
    MessageSquare as CommentIcon,
    SendHorizonal as SubmitIcon
} from 'lucide-react'
import { useParams } from "next/navigation"
import { Dispatch, SetStateAction, useContext, useId } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

interface RateFormProps{
    editRate: boolean,
    setEditRate: Dispatch<SetStateAction<boolean>>
}

type Inputs = {
    rate: number
    comment: string,
}

const RateForm = ({editRate, setEditRate}: RateFormProps) => {

    const rateId = useId()
    const commentId = useId()
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>()
    const { movieId } = useParams()
    const dispatch = useDispatch()
    const { loading, rate } = useAppSelector(state => state.rate)
    const {movie} = useAppSelector(state => state.movie)
    const toastContext = useContext(ToastProvider)

    // Function for adding rate
    const handleAddRate: SubmitHandler<Inputs> = async (data) => {

        const authToken = localStorage.getItem("authToken")
        if (!authToken || !data.rate || movie?.status !== "SHOWING") return

        dispatch(rateRequst())

        const result = await addRateApi({
            movieId: movieId as string,
            rate: data.rate as number,
            comment: data.comment,
            authToken: authToken
        })

        if (result.success) {
            dispatch(rateSuccess({ rate: result.rate }))
            toastContext?.triggerToastMessage("Successfully rated", "SUCCESS")
        } else {
            toastContext?.triggerToastMessage(result.error, "ERROR")
            dispatch(rateFailed({ errorMessage: result.error }))
        }

    }

    // Function for updating rate
    const handleUpdateRate: SubmitHandler<Inputs> = async (data) => {

        const authToken = localStorage.getItem('authToken')
        if(!data.rate || !data.comment || !authToken || !rate) return

        dispatch(rateRequst())

        const result = await updateRateApi(rate.id, {rate: data.rate, comment: data.comment}, authToken)
        if(result.success){
            setEditRate(false)
            toastContext?.triggerToastMessage(result.message, "SUCCESS")
            dispatch(rateSuccess({rate: {...rate, rate: data.rate, comment: data.comment}}))
        }else{
            toastContext?.triggerToastMessage(result.error, "ERROR")
            dispatch(rateFailed({errorMessage: result.error}))
        }

    }

    return (
        <form
            className="max-[600px]:w-full w-md flex flex-col gap-3"
            onSubmit={handleSubmit(editRate? handleUpdateRate: handleAddRate)}
        >
            {/* Rate */}
            <div className="flex flex-col gap-1.25">
                <Label
                    labelId={rateId}
                    labelTitle="Rate"
                />
                <FormInput
                    type="number"
                    Icon={RatingsIcon}
                    id={rateId}
                    placeholder="Enter your rate (1 - 10)"
                    {...register("rate", {
                        minLength: 1,
                        maxLength: 3,
                        valueAsNumber: true
                    })}
                    aria-invalid={formErrors.rate ? "true" : "false"}
                    defaultValue={rate?.rate}
                />
            </div>
            {/* Comment */}
            <div className="flex flex-col gap-1.25">
                <Label
                    labelTitle="Comment"
                    labelId={commentId}
                />
                <FormInput
                    type="text"
                    Icon={CommentIcon}
                    placeholder="Enter your comment"
                    {...register("comment", {
                        minLength: 3,
                        maxLength: 350,
                    })}
                    aria-invalid={formErrors.comment ? "true" : "false"}
                    defaultValue={rate?.comment}
                />
            </div>
            <Button
                disabled={loading}
            >
                {
                    loading
                        ?
                        <Spinner
                            size={18}
                            color="black"
                        />
                        :
                        <>
                            <SubmitIcon
                                strokeWidth={1.7}
                            />
                            <>{editRate? "Edit Rate": "Submit Rate"}</>
                        </>
                }
            </Button>
        </form>
    )
}

export default RateForm