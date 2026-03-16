import { addRateApi } from "@/api/rate"
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
import { useId } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

type Inputs = {
    rate: number
    comment: string
}

const RateForm = () => {

    const rateId = useId()
    const commentId = useId()
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>()
    const { movieId } = useParams()
    const dispatch = useDispatch()
    const { loading, rate } = useAppSelector(state => state.rate)

    // Function for adding rate
    const handleAddRate: SubmitHandler<Inputs> = async (data) => {

        if (!data.rate) return

        const authToken = localStorage.getItem("authToken")
        if (!authToken) return

        dispatch(rateRequst())

        const result = await addRateApi({
            movieId: movieId as string,
            rate: data.rate as number,
            comment: data.comment,
            authToken: authToken
        })

        if (result.success) {
            dispatch(rateSuccess({ rate: result.rate }))
        } else {
            dispatch(rateFailed({ errorMessage: result.error }))
        }

    }

    return (
        <form
            className="max-[600px]:w-full w-md flex flex-col gap-3"
            onSubmit={handleSubmit(handleAddRate)}
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
                        minLength: 5,
                        maxLength: 350,
                    })}
                    aria-invalid={formErrors.comment ? "true" : "false"}
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
                            <>Submit Rate</>
                        </>
                }
            </Button>
        </form>
    )
}

export default RateForm