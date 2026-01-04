import React, { ChangeEvent, ForwardRefExoticComponent, InputHTMLAttributes, RefAttributes } from "react"
import { Input } from "../ui/input"
import { LucideProps } from "lucide-react"

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement>{
    Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    className?: string
    type: "text" | "password" | "email"
    onChange: (event: ChangeEvent<HTMLInputElement>) => unknown
}


const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({
    Icon,  
    className, 
    type, 
    ...props
}, ref) => {

    return (

        <div className="w-full relative flex items-center">
            {
                Icon
                ?
                <Icon
                    size={21}
                    strokeWidth={1.5}
                    className="stroke-disable-color absolute left-2 "
                />
                :
                null
            }
            <Input
                ref={ref}
                type={type}
                className={` ${className} text-sm border-[1.6px] h-10 border-background-color focus-visible:border-primary-color pl-9 w-full transition-all duration-200 bg-foreground-color`}
                {...props}
            />
        </div>

    )
})

export default FormInput