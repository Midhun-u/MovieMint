import { forwardRef, InputHTMLAttributes, Ref, useState } from "react"
import FormInput from "./FormInput"
import {
    Lock as PasswordIcon,
    Eye as ShowPasswordIcon,
    EyeClosedIcon as HidePasswordIcon
} from 'lucide-react'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement>{
    passwordId?: string
}

const PasswordInput = ({
    passwordId,
    ...props
}: PasswordInputProps, ref: Ref<HTMLInputElement>) => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const iconClassName = "absolute right-4 stroke-primary-accent-color cursor-pointer"

  return (

    <div className="w-full relative flex items-center overflow-hidden">
        <FormInput
            id={passwordId}
            Icon={PasswordIcon}
            className="pr-12"
            ref={ref}
            {...props}
            type={showPassword? "text": "password"}
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

export default forwardRef<HTMLInputElement, PasswordInputProps>(PasswordInput)