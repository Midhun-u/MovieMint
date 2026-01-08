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
import { signApi } from "@/api/signApi"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { authFailed, authRequest, authSuccess } from "@/store/authSlice"
import SubmitButton from "./SubmitButton"
import { ToastProvider } from "../context/ToastMessage"
import {useRouter} from 'next/navigation'
import {signInWithPopup} from 'firebase/auth'
import { firebaseAuth, googleProvider } from "@/lib/firebase"

interface FormProps {
    formType: "SIGN" | "LOGIN",
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
    const {loading} = useAppSelector(state => state.auth)
    const toastContext = useContext(ToastProvider)
    const router = useRouter()
    

    // Function for submitting form
    const submitForm: SubmitHandler<Inputs> = async (data) => {

        if(passwordDetails.password !== passwordDetails.confirmPassword){
            toastContext?.triggerToastMessage("Password is not matching", "ERROR")
            return
        }

        dispatch(authRequest())
        const result = await signApi({ ...data, role: currentTabValue, adminKey: data.adminKey ? data.adminKey : "" })
        
        if(result.success){

            dispatch(authSuccess({user: result.user, authToken: result.authToken}))

            toastContext?.triggerToastMessage(result.message, "SUCCESS")
            router.push("/")


        }else{

            dispatch(authFailed({errorMessage: result.error}))
            toastContext?.triggerToastMessage(result.error, "ERROR")

        }

    }

    // Function for google authentication
    const googleAuth = async () => {

        try {
            
            const result = await signInWithPopup(firebaseAuth, googleProvider)
            console.log(result.user)

        } catch (error: any) {
            toastContext?.triggerToastMessage("Something went wrong", "ERROR")
            console.error(error)
        }

    }

    return (

        <form
            className="w-full"
            method="post"
            onSubmit={handleSubmit(submitForm)}
        >
            {/* Tab navigation section */}
            <AuthTab
                currentTabValue={currentTabValue}
                setCurrentTabValue={setCurrentTabValue}
            />
            {/* Input section */}
            <div className="mt-10 overflow-x-hidden flex flex-col gap-5">
                {/* Name section */}
                <Activity mode={formType === "SIGN" ? "visible" : "hidden"}>
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
                                    required: "Firstname is required",
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
                                    required: "Lastname is required",
                                    minLength: { value: 1, message: "Lastname should be alteast 3 letters" },
                                    maxLength: { value: 10, message: "Lastname should be below 15 letters or 15 letters" }
                                })}
                                aria-invalid={formErrors.lastname ? "true" : "false"}
                                autoComplete="name"
                            />
                        </div>
                    </div>
                </Activity>
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
                        labelTitle="Create New Password"
                    />
                    <PasswordInput
                        passwordId={passwordId}
                        placeholder="Create new password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password should be atleast 6 letters or above" },
                            maxLength: { value: 50, message: "Password should be less than or equal to 20 letters" }
                        })}
                        onChange={(event) => setPasswordDetails({ ...passwordDetails, password: event.target.value })}
                        aria-invalid={formErrors.password ? "true" : "false"}
                        autoComplete="new-password"
                    />
                    <PasswordStrengthIndicator
                        password={passwordDetails.password}
                    />
                </div>
                <div>
                    <Label
                        labelId={confirmPasswordId}
                        labelTitle="Confirm New Password"
                    />
                    <PasswordInput
                        passwordId={confirmPasswordId}
                        placeholder="Confirm new password"
                        {...register("confirmPassword", {
                            required: "Password should be confirmed",
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
                {/* Button section */}
                <div className="flex w-full justify-center items-center">
                    <SubmitButton 
                        acceptTerms={acceptTerms}
                        loading={loading}
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
                            onClick={() => googleAuth()}
                        >
                            <Image src={assets.googleIcon} width={18} height={18} alt="google-sign-icon" />
                            <span className="text-dark-foreground-color">Sign With Google</span>
                        </Button>
                    </div>
                </Activity>

                {/* Login navigation */}
                <p className="text-sm flex gap-2 w-full justify-center mt-2 font-medium">
                    Already have an account? <Link href={"/login"} className="text-primary-color">Login</Link>
                </p>
            </div>
        </form>

    )
}

export default Form