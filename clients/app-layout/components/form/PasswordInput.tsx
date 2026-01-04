import { ChangeEvent, useState } from "react"
import FormInput from "./FormInput"
import {
    Lock as PasswordIcon,
    Eye as ShowPasswordIcon,
    EyeClosedIcon as HidePasswordIcon
} from 'lucide-react'

interface PasswordInputProps{
    passwordId?: string
    placeholder?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => unknown
}

const PasswordInput = ({passwordId, placeholder, onChange}: PasswordInputProps) => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const iconClassName = "absolute right-4 stroke-primary-accent-color cursor-pointer"

  return (

    <div className="w-full relative flex items-center overflow-hidden">
        <FormInput
            id={passwordId}
            placeholder={placeholder}
            Icon={PasswordIcon}
            className="pr-12"
            type={showPassword? "text": "password"}
            onChange={onChange}
        />
        {
            showPassword
            ?
            <HidePasswordIcon 
                strokeWidth={1.5}
                size={21}
                className={iconClassName}
                onClick={() => setShowPassword(false)}
            />
            :
            <ShowPasswordIcon
                strokeWidth={1.5}
                size={21}
                className={iconClassName}
                onClick={() => setShowPassword(true)}
            />
        }
    </div>

  )
}

export default PasswordInput