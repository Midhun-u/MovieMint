import { SubmitHandler, useForm } from "react-hook-form"
import Label from "../form/Label"
import PasswordInput from "../form/PasswordInput"
import { Button } from "../ui/button"
import { useContext, useEffect, useId, useState } from "react"
import PasswordStrengthIndicator from "../form/PasswordStrengthIndicator"
import { changePasswordApi } from "@/api/auth"
import { ToastProvider } from "../context/providers/ToastProvider"
import Spinner from "../ui/Spinner"

type Inputs = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

const PasswordForm = () => {

    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>()
    const currentPasswordId = useId()
    const newPasswordId = useId()
    const confirmPasswordId = useId()
    const [password, setPassword] = useState<string>("")
    const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false)
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const toastContext = useContext(ToastProvider)

    // Function for changing user password
    const handleChangeUserPassword: SubmitHandler<Inputs> = async (data) => {

        const authToken = localStorage.getItem("authToken")
        if (!data.newPassword || !data.currentPassword || !authToken) return

        setLoading(true)
        const result = await changePasswordApi(data.currentPassword, data.newPassword, authToken)
        if (result.success) {
            toastContext?.triggerToastMessage("Password is changed", "SUCCESS")
        } else {
            toastContext?.triggerToastMessage(result.error, "ERROR")
        }

        setLoading(false)

    }

    useEffect(() => {
        (() => {
            if (password.trim() === confirmPassword.trim()) {
                setIsPasswordCorrect(true)
            }else{
                setIsPasswordCorrect(false)
            }
        })()
    }, [password, confirmPassword])

    return (
        <form onSubmit={handleSubmit(handleChangeUserPassword)} className="flex flex-col gap-2.5 w-[70%] max-[700px]:w-full">
            <div>
                <Label
                    labelTitle="Current Password"
                    labelId={currentPasswordId}
                />
                <PasswordInput
                    type="password"
                    placeholder="Enter your current password"
                    id={currentPasswordId}
                    {...register("currentPassword", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password should be atleast 6 letters or above" },
                        maxLength: { value: 50, message: "Password should be less than or equal to 20 letters" }
                    })}
                    aria-invalid={formErrors.currentPassword ? "true" : "false"}
                />
            </div>
            <div>
                <Label
                    labelTitle="New Password"
                    labelId={newPasswordId}
                />
                <PasswordInput
                    type="password"
                    placeholder="Enter new password"
                    id={newPasswordId}
                    {...register("newPassword", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password should be atleast 6 letters or above" },
                        maxLength: { value: 50, message: "Password should be less than or equal to 20 letters" }
                    })}
                    aria-invalid={formErrors.newPassword ? "true" : "false"}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <PasswordStrengthIndicator
                    password={password}
                />
            </div>
            <div>
                <Label
                    labelTitle="Confirm New Password"
                    labelId={confirmPasswordId}
                />
                <PasswordInput
                    type="password"
                    placeholder="Confirm your new password"
                    id={confirmPasswordId}
                    {...register("confirmPassword", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password should be atleast 6 letters or above" },
                        maxLength: { value: 50, message: "Password should be less than or equal to 20 letters" }
                    })}
                    aria-invalid={formErrors.confirmPassword ? "true" : "false"}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
            </div>
            <hr className="border border-foreground-theme-color/5 mt-2" />
            <Button
                type="submit"
                size={"sm"}
                disabled={!isPasswordCorrect || loading}
            >
                {
                    loading
                        ?
                        <Spinner
                            color="black"
                            size={18}
                        />
                        :
                        <>Change Password</>
                }
            </Button>
        </form>
    )

}

export default PasswordForm