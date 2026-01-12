'use client'

import { useContext, useId, useState } from "react"
import AuthTab from "./AuthTab"
import { Activity } from "react"
import {
    UserIcon,
    Mail as EmailIcon,
    KeySquare as AdminKeyIcon
} from 'lucide-react'
import FormInput from "./FormInput"
import Label from "./Label"
import PasswordInput from "./PasswordInput"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import Image from "next/image"
import { assets } from "@/public/assets/assets"
import Link from "next/link"
import { Role } from "@/types/Role"
import PasswordStrengthIndicator from "./PasswordStrengthIndicator"
import WarningMessage from "./WarningMessage"
import { SubmitHandler, useForm } from 'react-hook-form'
import { emailRegex } from "@/utils/emailRegex"
import { googleLoginApi, googleSignApi, loginApi, signApi } from "@/api/auth"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { authFailed, authRequest, authSuccess } from "@/store/authSlice"
import SubmitButton from "./SubmitButton"
import { ToastProvider } from "../context/ToastMessage"
import { useRouter } from 'next/navigation'
import { signInWithPopup } from 'firebase/auth'
import { firebaseAuth, googleProvider } from "@/lib/firebase"
import { FormType } from "@/types/formType"

interface FormProps {
    formType: FormType
}

type Inputs = {
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
    adminKey: string
}

const Form = ({ formType }: FormProps) => {

    const firstnameId = useId()
    const lastnameId = useId()
    const emailId = useId()
    const passwordId = useId()
    const confirmPasswordId = useId()
    const adminKeyId = useId()
    const [currentTabValue, setCurrentTabValue] = useState<Role>("USER")
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
    const [passwordDetails, setPasswordDetails] = useState<{
        password: string,
        confirmPassword: string
    }>({
        password: "",
        confirmPassword: ""
    })
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>()
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(state => state.auth)
    const toastContext = useContext(ToastProvider)
    const router = useRouter()


    // Function for submitting sign form
    const submitSignForm: SubmitHandler<Inputs> = async (data) => {

        if (passwordDetails.password !== passwordDetails.confirmPassword) {
            toastContext?.triggerToastMessage("Password is not matching", "ERROR")
            return
        }

        dispatch(authRequest())
        const result = await signApi({ ...data, role: currentTabValue, adminKey: data.adminKey ? data.adminKey : "" })

        if (result.success) {

            dispatch(authSuccess({ user: result.user, authToken: result.authToken }))

            toastContext?.triggerToastMessage(result.message, "SUCCESS")
            router.push("/")


        } else {

            dispatch(authFailed({ errorMessage: result.error }))
            toastContext?.triggerToastMessage(result.error, "ERROR")

        }

    }

    // Function for submitting login form
    const submitLoginForm: SubmitHandler<Inputs> = async (data) => {

        if (!data.password.trim()) {
            toastContext?.triggerToastMessage("Fill Password", 'ERROR')
            return
        }

        dispatch(authRequest())

        const result = await loginApi({
            email: data.email,
            password: data.password,
            role: currentTabValue,
            adminKey: data.adminKey ? data.adminKey : ""
        })

        if (result.success) {

            dispatch(authSuccess({ user: result.user, authToken: result.authToken }))
            toastContext?.triggerToastMessage("Login Success", 'SUCCESS')

        } else {
            toastContext?.triggerToastMessage(result.error, 'ERROR')
            dispatch(authFailed({ errorMessage: result.error }))
        }

    }

    // Function for google signing
    const googleSignAuth = async () => {

        try {

            dispatch(authRequest())

            const googleAuthResult = await signInWithPopup(firebaseAuth, googleProvider)

            if (googleAuthResult.user) {

                const [firstname, lastname] = googleAuthResult.user.displayName?.split(" ") as Array<string>

                const result = await googleSignApi({
                    firstname: firstname,
                    lastname: lastname,
                    profilePic: googleAuthResult.user.photoURL as string,
                    email: googleAuthResult.user.email as string,
                    role: currentTabValue
                })

                if (result.success) {

                    dispatch(authSuccess({ user: result.user, authToken: result.authToken }))
                    toastContext?.triggerToastMessage(result.message, "SUCCESS")
                    router.push("/")

                } else {
                    dispatch(authFailed({ errorMessage: result.error }))
                    toastContext?.triggerToastMessage(result.error, "ERROR")
                }

            } else {
                dispatch(authFailed({ errorMessage: "Something went wrong" }))
            }

        } catch (error: any) {
            toastContext?.triggerToastMessage("Something went wrong", "ERROR")
            console.log(error.message)
        }

    }

    // Function for google login
    const googleLoginAuth = async () => {

        try {

            dispatch(authRequest())

            const googleAuthResult = await signInWithPopup(firebaseAuth, googleProvider)

            if (googleAuthResult.user) {

                const result = await googleLoginApi({
                    email: googleAuthResult.user.email as string
                })

                if (result.success) {

                    toastContext?.triggerToastMessage(result.message, "ERROR")
                    dispatch(authSuccess({ user: result.user, authToken: result.authToken }))

                } else {

                    toastContext?.triggerToastMessage(result.error, "ERROR")
                    dispatch(authFailed({ errorMessage: result.error }))

                }

            } else {
                dispatch(authFailed({ errorMessage: "Something went wrong" }))
            }

        } catch (error: any) {
            toastContext?.triggerToastMessage("Something went wrong", "ERROR")
            console.log(error.message)
        }

    }

    return (

        <form
            className="w-full"
            method="post"
            onSubmit={handleSubmit(formType === "SIGN" ? submitSignForm : submitLoginForm)}
        >
            {/* Tab navigation section */}
            <AuthTab
                currentTabValue={currentTabValue}
                setCurrentTabValue={setCurrentTabValue}
            />
            {/* Input section */}
            <div className="mt-10 overflow-x-hidden flex flex-col gap-5">
                {/* Name section */}
                {
                    formType === "SIGN"
                        ?
                        <div className="flex flex-col sm:flex-row gap-3 w-full overflow-x-hidden">
                            <div className="w-full">
                                <Label
                                    labelId={firstnameId}
                                    labelTitle="Firstname"
                                />
                                <FormInput
                                    id={firstnameId}
                                    placeholder="Enter your firstname"
                                    Icon={UserIcon}
                                    type="text"
                                    {...register("firstname", {
                                        required: formType === "SIGN" ? "Firstname is required" : false,
                                        minLength: { value: 3, message: "Firstname should be alteast 3 letters" },
                                        maxLength: { value: 15, message: "Firstname should be below 15 letters or 15 letters" }
                                    })}
                                    aria-invalid={formErrors.firstname ? "true" : "false"}
                                    autoComplete="name"
                                />
                            </div>
                            <div className="w-full">
                                <Label
                                    labelId={lastnameId}
                                    labelTitle="Lastname"
                                />
                                <FormInput
                                    id={lastnameId}
                                    placeholder="Enter your lastname"
                                    Icon={UserIcon}
                                    type="text"
                                    {...register("lastname", {
                                        required: formType === "SIGN" ? "Lastname is required" : false,
                                        minLength: { value: 1, message: "Lastname should be alteast 3 letters" },
                                        maxLength: { value: 10, message: "Lastname should be below 15 letters or 15 letters" }
                                    })}
                                    aria-invalid={formErrors.lastname ? "true" : "false"}
                                    autoComplete="name"
                                />
                            </div>
                        </div>
                        :
                        null
                }
                {/* Email section */}
                <div className="w-full">
                    <Label
                        labelId={emailId}
                        labelTitle="Email Address"
                    />
                    <FormInput
                        placeholder="Enter your email address"
                        id={emailId}
                        Icon={EmailIcon}
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: emailRegex
                        })}
                        aria-invalid={formErrors.email ? "true" : "false"}
                        autoComplete="email"
                    />
                </div>
                {/* Password section */}
                <div className="w-full">
                    <Label
                        labelId={passwordId}
                        labelTitle={formType === "SIGN" ? "Create New Password" : "Password"}
                    />
                    <PasswordInput
                        passwordId={passwordId}
                        placeholder={formType === "SIGN" ? "Create new password" : "Enter your password"}
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password should be atleast 6 letters or above" },
                            maxLength: { value: 50, message: "Password should be less than or equal to 20 letters" }
                        })}
                        onChange={(event) => setPasswordDetails({ ...passwordDetails, password: event.target.value })}
                        aria-invalid={formErrors.password ? "true" : "false"}
                        autoComplete="new-password"
                    />
                    {
                        formType === "SIGN"
                            ?
                            <PasswordStrengthIndicator
                                password={passwordDetails.password}
                            />
                            :
                            null
                    }
                </div>
                {
                    formType === "SIGN"
                        ?
                        <div>
                            <Label
                                labelId={confirmPasswordId}
                                labelTitle="Confirm New Password"
                            />
                            <PasswordInput
                                passwordId={confirmPasswordId}
                                placeholder="Confirm new password"
                                {...register("confirmPassword", {
                                    required: formType === "SIGN" ? "Password should be confirmed" : false,
                                    minLength: { value: 6, message: "Password should be atleast 6 letters or above" },
                                    maxLength: { value: 20, message: "Password should be less than or equal to 20 letters" }
                                })}
                                onChange={(event) => setPasswordDetails({ ...passwordDetails, confirmPassword: event.target.value })}
                                aria-invalid={formErrors.confirmPassword ? "true" : 'false'}
                                autoComplete="current-password"
                            />
                            <Activity
                                mode={
                                    (passwordDetails.password === passwordDetails.confirmPassword)
                                        ? "hidden"
                                        :
                                        (
                                            passwordDetails.password.length
                                                ?
                                                "visible"
                                                :
                                                "hidden"
                                        )
                                }
                            >
                                <WarningMessage
                                    message="Password is not matching"
                                />
                            </Activity>
                        </div>
                        :
                        null
                }
                <Activity mode={currentTabValue === "ADMIN" ? "visible" : "hidden"}>
                    <div className="w-full">
                        <Label
                            labelId={adminKeyId}
                            labelTitle="Admin Key"
                        />
                        <FormInput
                            type="text"
                            Icon={AdminKeyIcon}
                            placeholder="Enter admin key"
                            {...register("adminKey", {
                                required: currentTabValue === "ADMIN" ? "Admin key is required" : false,
                                maxLength: { value: 50, message: "Admin key should be less than or equal to 50 letters" },
                                minLength: { value: 10, message: "Admin key should be alteast 10 letters" }
                            })}
                            aria-invalid={formErrors.adminKey ? "true" : "false"}
                        />
                    </div>
                </Activity>
                {/* Terms and condition section */}
                <Activity mode={formType === "LOGIN" ? "hidden" : "visible"}>
                    <div className="flex gap-2 mt-3 items-start">
                        <Checkbox
                            className="border-2 border-disable-color"
                            onClick={() => setAcceptTerms(!acceptTerms)}
                        />
                        <div className="flex flex-col justify-start">
                            <span className="font-medium text-xs">Accept Terms and Condition</span>
                            <p className="text-xs mt-1 text-disable-color">
                                By signing in, you acknowledge that you are providing accurate account information and consent to its secure storage and use for authentication purposes. Your data will remain protected under our privacy and security policies, and will not be shared without your permission.
                            </p>
                        </div>
                    </div>
                </Activity>
                {/* Button section */}
                <div className="flex w-full justify-center items-center">
                    <SubmitButton
                        acceptTerms={acceptTerms}
                        loading={loading}
                        formType={formType}
                    />
                </div>
                <Activity mode={currentTabValue !== "ADMIN" ? "visible" : "hidden"}>
                    <div className="flex gap-2 justify-center w-full items-center">
                        <hr className="w-full border border-disable-color/30" />
                        <span>OR</span>
                        <hr className="w-full border border-disable-color/30" />
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <Button
                            type="button"
                            className="w-full bg-foreground-color border border-disable-color/20"
                            disabled={loading}
                            onClick={() => formType === "SIGN" ? googleSignAuth() : googleLoginAuth()}
                        >
                            <Image src={assets.googleIcon} width={18} height={18} alt="google-sign-icon" />
                            <span className="text-dark-foreground-color">
                                {
                                    formType === "SIGN"
                                        ?
                                        <>Sign With Google</>
                                        :
                                        <>Logn With Google</>
                                }
                            </span>
                        </Button>
                    </div>
                </Activity>

                {/* Login navigation */}
                <p className="text-sm flex gap-2 w-full justify-center mt-2 font-medium">
                    {
                        formType === "SIGN"
                            ?
                            <>
                                Already have an account?
                            </>
                            :
                            <>
                                Don't have an account?
                            </>
                    }
                    <Link href={formType === "SIGN" ? "/login" : "/sign"} className="text-primary-color">
                        {
                            formType === "SIGN"
                                ?
                                <>
                                    Login
                                </>
                                :
                                <>
                                    Create Account
                                </>
                        }
                    </Link>
                </p>
            </div>
        </form>

    )
}

export default Form