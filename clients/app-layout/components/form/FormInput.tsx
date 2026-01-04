import { ForwardRefExoticComponent, RefAttributes } from "react"
import { Input } from "../ui/input"
import { LucideProps } from "lucide-react"

interface FormInputProps {
    id?: string
    Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    placeholder?: string
    className?: string
    type: "text" | "password" | "email"
    
}

const FormInput = ({id, Icon, placeholder, className, type}: FormInputProps) => {

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
                placeholder={placeholder}
                id={id}
                type={type}
                className={` ${className} border-[1.6px] h-10 border-background-color focus-visible:border-primary-color pl-9 w-full transition-all duration-200 bg-foreground-color`}
            />
        </div>

    )
}

export default FormInput