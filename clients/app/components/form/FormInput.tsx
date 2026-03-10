import { forwardRef, InputHTMLAttributes, Ref } from "react"
import { Input } from "../ui/input"
import { LucidReactIconType } from "@/types/lucidReact"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    Icon?: LucidReactIconType
    className?: string
    type: "text" | "password" | "email" | "number"
}


const FormInput = ({
    Icon,
    className,
    type,
    ...props
}: FormInputProps, ref: Ref<HTMLInputElement>) => {

    return (

        <div className="w-full relative flex items-center">
            {
                Icon
                    ?
                    <Icon
                        size={21}
                        strokeWidth={1.5}
                        className="stroke-foreground-theme-color/50 absolute left-2 "
                    />
                    :
                    null
            }
            <Input
                ref={ref}
                type={type}
                className={` ${className} text-sm border-[1.5px] border-disable-color/20 h-10 focus-visible:border-primary-color pl-9 w-full transition-all duration-200 bg-foreground-color text-foreground-theme-color`}
                {...props}
            />
        </div>

    )
}

export default forwardRef<HTMLInputElement, FormInputProps>(FormInput)