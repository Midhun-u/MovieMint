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

interface FormProps {
    formType: "SIGN" | "LOGIN"
}

const Form = ({ formType }: FormProps) => {

    const [currentTabValue, setCurrentTabValue] = useState<"USER" | "ADMIN" | "THEATER_OWNER">("USER")
    const firstnameId = useId()
    const lastnameId = useId()
    const emailId = useId()
    const passwordId = useId()

    return (

        <form className="w-full ">
            {/* Tab navigation section */}
            <AuthTab
                currentTabValue={currentTabValue}
                setCurrentTabValue={setCurrentTabValue}
            />
            {/* Input section */}
            <div className="mt-10 overflow-x-hidden flex flex-col gap-5">
                {/* Name section */}
                <Activity mode={formType === "SIGN" ? "visible" : "hidden"}>
                    <div className="flex gap-3 w-full overflow-x-hidden">
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
                    />
                </div>
                {/* Terms and condition section */}
                <div className="flex gap-2 mt-3 items-start">
                    <Checkbox
                        className="border-2 border-disable-color"
                    />
                    <div className="flex flex-col justify-start">
                        <span className="font-medium text-xs">Accept Terms and Condition</span>
                        <p className="text-xs mt-1 text-disable-color">
                            By signing in, you acknowledge that you are providing accurate account information and consent to its secure storage and use for authentication purposes. Your data will remain protected under our privacy and security policies, and will not be shared without your permission.
                        </p>
                    </div>
                </div>
            </div>
        </form>

    )
}

export default Form