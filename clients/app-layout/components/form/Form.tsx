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

interface FormProps {
    formType: "SIGN" | "LOGIN"
}

const Form = ({ formType }: FormProps) => {

    const [currentTabValue, setCurrentTabValue] = useState<"USER" | "ADMIN" | "THEATER_OWNER">("USER")
    const firstnameId = useId()
    const lastnameId = useId()
    const emailId = useId()

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
                    />
                </div>
                {/* Password section */}
                <div className="w-full">

                </div>
            </div>
        </form>

    )
}

export default Form