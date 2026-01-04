'use client'

import { useId, useState } from "react"
import AuthTab from "./AuthTab"
import { Activity } from "react"
import {
    UserIcon,
    Mail as EmailIcon
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

interface FormProps {
    formType: "SIGN" | "LOGIN"
}

type UserDetails = {
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
    role: Role
}

const Form = ({ formType }: FormProps) => {

    const [currentTabValue, setCurrentTabValue] = useState<Role>("USER")
    const firstnameId = useId()
    const lastnameId = useId()
    const emailId = useId()
    const passwordId = useId()
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
    const [userDetails, setUserDetails] = useState<UserDetails>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: currentTabValue
    })

    return (

        <form className="w-full">
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
                                onChange={(event) => setUserDetails({...userDetails, firstname: event.target.value})}
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
                                onChange={(event) => setUserDetails({...userDetails, lastname: event.target.value})}
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
                        onChange={(event) => setUserDetails({...userDetails, email: event.target.value})}
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
                        onChange={(event) => setUserDetails({...userDetails, password: event.target.value})}
                    />
                </div>
                <div>
                    <Label
                        labelId={passwordId}
                        labelTitle="Confirm New Password"
                    />
                    <PasswordInput
                        passwordId={passwordId}
                        placeholder="Confirm new password"
                        onChange={(event) => setUserDetails({...userDetails, confirmPassword: event.target.value})}
                    />
                </div>
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
                        className="w-full bg-primary-color active:bg-primary-accent-color hover:bg-primary-color"
                        disabled={!acceptTerms}
                    >
                        <span className="text-dark-foreground-color">Sign In</span>
                    </Button>
                </div>
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
                {/* Login navigation */}
                <p className="text-sm flex gap-2 w-full justify-center mt-2 font-medium">
                    Already have an account? <Link href={"/login"} className="text-primary-color">Login</Link>
                </p>
            </div>
        </form>

    )
}

export default Form