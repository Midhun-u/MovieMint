import { Activity, useCallback, useEffect, useState } from 'react'
import { Progress } from '../ui/progress'

interface PasswordStrengthIndicatorProps {
    password: string
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {

    const hasLower = /[a-z]/.test(password) // For checking if password contains lower characters 
    const hasUpper = /[A-Z]/.test(password) // For checking if password contains upper characters
    const hasNumber = /[0-9]/.test(password) // For checking if password contains numbers
    const hasSpecialCharacters = /[^A-Za-z0-9]/.test(password) // For checking if password contains special characters
    const [progressDetails, setProgressDetails] = useState<{
        strength: "weak" | "medium" | "strong" | null,
        progress: number
    }>()

    //Function setting progress details
    const handleSetProgressDetails = useCallback(() => {

        if (password.length <= 0) {
            setProgressDetails({
                strength: null,
                progress: 0
            })
            return
        }

        if (password.length <= 6) {
            setProgressDetails({
                strength: "weak",
                progress: 100 / 4
            })
        }

        if (password.length > 6 &&
            ((hasLower && hasUpper) ||
                (hasLower && hasNumber) ||
                (hasLower && hasSpecialCharacters))) {
            setProgressDetails({
                strength: "medium",
                progress: 100 / 2
            })
        }

        if (password.length > 6 &&
            hasLower &&
            hasUpper &&
            hasNumber &&
            hasSpecialCharacters
        ) {
            setProgressDetails({
                strength: "strong",
                progress: 100
            })
        }

    }, [hasLower, hasNumber, hasSpecialCharacters, hasUpper, password.length])

    useEffect(() => {

        (() => {
            handleSetProgressDetails()
        })()

    }, [password, handleSetProgressDetails])

    return (

        <div className='mt-2 w-full flex flex-col items-center'>
            <Progress
                className={`rounded-sm ${progressDetails?.strength === "weak" ? "bg-error-foreground-color" : (progressDetails?.strength === "medium" ? "bg-yellow-400" : "bg-primary-color")}`}
                value={progressDetails?.progress}
            />
            <Activity mode={password.length ? "visible" : "hidden"}>
                <span className='w-full flex justify-center mt-2 text-xs font-medium'>
                    Password is {progressDetails?.strength}
                </span>
            </Activity>
        </div>

    )
}

export default PasswordStrengthIndicator