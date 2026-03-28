import { ToastProvider } from "@/components/context/providers/ToastProvider"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/ui/Spinner"
import { useAppSelector } from "@/store/hooks"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import Image from "next/image"
import { Dispatch, FormEvent, SetStateAction, useContext, useState } from "react"

interface PaymentFormProps {
    amount: number
    setShowPaymentScreen: Dispatch<SetStateAction<boolean>>
}

const PaymentForm = ({ amount, setShowPaymentScreen }: PaymentFormProps) => {

    const stripe = useStripe()
    const elements = useElements()
    const { movie } = useAppSelector(state => state.movie)
    const [loading, setLoading] = useState<boolean>(false)
    const toastContext = useContext(ToastProvider)

    // Function for submitting payment
    const handleSubmitPayment = async (event: FormEvent) => {
        event.preventDefault()

        if (!stripe || !elements) return

        setLoading(true)
        const paymentResult = await stripe.confirmPayment({
            elements: elements,
            confirmParams: {},
            redirect: "if_required"
        })

        if(paymentResult.error){
            toastContext?.triggerToastMessage("Couldn't complete payment", "ERROR")
        }else if(paymentResult.paymentIntent.status === "succeeded"){
            
        }
        
        setLoading(false)
    }

    return (
        movie
            ?
            <form
                onSubmit={handleSubmitPayment}
                className="z-10 max-[600px]:w-[95%] w-112.5 flex flex-col gap-2.5 top-50 absolute bg-foreground-color border border-foreground-theme-color/15 rounded-[10px] p-5"
            >
                <div className="flex gap-2.5">
                    {
                        movie.poster.image_url
                            ?
                            <Image
                                src={movie.poster.image_url}
                                alt="Movie poster"
                                width={1000}
                                height={1000}
                                className="w-20 aspect-2/3 rounded-[5px]"
                            />
                            :
                            null
                    }
                    <div className="flex flex-col">
                        <span className="text-[0.9rem] font-bold">{movie.title}</span>
                        <span className="text-[1.1rem] font-medium text-foreground-theme-color/50">&#x20b9;{amount}</span>
                    </div>
                </div>
                <PaymentElement
                />
                <Button
                    size={"sm"}
                    disabled={loading}
                >
                    {
                        loading
                            ?
                            <Spinner
                                color="black"
                                size={18}
                            />
                            :
                            <>Pay &#x20b9;{amount}</>
                    }
                </Button>
                <Button
                    className="bg-foreground-color border border-foreground-theme-color/15 hover:bg-background-color"
                    size={"sm"}
                    onClick={() => setShowPaymentScreen(false)}
                    disabled={loading}
                >
                    <>Cancel</>
                </Button>
            </form>
            :
            null
    )

}

export default PaymentForm