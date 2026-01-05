'use client'

import { FormEvent, useEffect, useId, useState } from "react"
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
import { signApi } from "@/api/signApi"

interface FormProps {
    formType: "SIGN" | "LOGIN",
}

type FormDetails = {
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
    adminKey: string
    role: Role
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
    const [formDetails, setFormDetails] = useState<FormDetails>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        adminKey: "",
        role: "USER"
    })

    useEffect(() => {
        setFormDetails({ ...formDetails, role: currentTabValue })
    }, [currentTabValue])

    // Function for submitting form
    const submitForm = async (event: FormEvent) => {

        event.preventDefault()
        const result = await signApi(formDetails)
        console.log(result)

    }

    return (

        <form
            className="w-full"
            onSubmit={submitForm}
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
                                name="firstname"
                                onChange={(event) => setFormDetails({ ...formDetails, firstname: event.target.value })}
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
                                name="lastname"
                                onChange={(event) => setFormDetails({ ...formDetails, lastname: event.target.value })}
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
                        name="email"
                        onChange={(event) => setFormDetails({ ...formDetails, email: event.target.value })}
                    />
                </div>
                {/* Password section */}
                <div className="w-full">
                    <Label
                        labelId={passwordId}
                        labelTitle="Create New Password"
                    />
                    <PasswordInput
                        name="password"
                        passwordId={passwordId}
                        placeholder="Create new password"
                        onChange={(event) => setFormDetails({ ...formDetails, password: event.target.value })}
                    />
                    <PasswordStrengthIndicator
                        password={formDetails.password}
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
                        onChange={(event) => {
                            setFormDetails({ ...formDetails, confirmPassword: event.target.value })
                        }}
                    />
                    <Activity
                        mode={
                            (formDetails.password === formDetails.confirmPassword)
                                ? "hidden"
                                :
                                (
                                    formDetails.password.length
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
                            onChange={(event) => setFormDetails({ ...formDetails, adminKey: event.target.value })}
                            Icon={AdminKeyIcon}
                            placeholder="Enter admin key"
                            name="adminKey"
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
                    <Button
                        type="submit"
                        className="w-full bg-primary-color active:bg-primary-accent-color hover:bg-primary-color"
                        disabled={!acceptTerms}
                    >
                        <span className="text-dark-foreground-color">Sign In</span>
                    </Button>
                </div>
                <Activity mode={currentTabValue !== "ADMIN"? "visible": "hidden"}>
                    <div className="flex gap-2 justify-center w-full items-center">
                        <hr className="w-full border border-disable-color/30" />
                        <span>OR</span>
                        <hr className="w-full border border-disable-color/30" />
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <Button
                            className="w-full bg-foreground-color border border-disable-color/20"
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