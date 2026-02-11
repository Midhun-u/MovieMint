import { AuthFormType } from '@/types/authFormType'
import { Button } from '../ui/button'
import Spinner from '../ui/Spinner'

interface SubmitButtonProps {
    loading: boolean,
    acceptTerms: boolean,
    formType: AuthFormType
}

const SubmitButton = ({loading, acceptTerms, formType}: SubmitButtonProps) => {

    return (

        <Button
            type="submit"
            className="w-full bg-primary-color active:bg-primary-accent-color hover:bg-primary-accent-color"
            disabled={!acceptTerms && formType === "SIGN" || loading}
        >
            {
                loading
                    ?
                    <Spinner
                        size={20}
                        color="black"
                    />
                    :
                    <span className="text-dark-foreground-color">
                        {
                            formType === "LOGIN"
                            ?
                            <>Login</>
                            :
                            <>Sign In</>
                        }
                    </span>
            }
        </Button>

    )
}

export default SubmitButton