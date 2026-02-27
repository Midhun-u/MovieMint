import { forwardRef, type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLElement>{
    className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({className, ...props}, ref) => {

    return (
        <input
            className={className}
            {...props}
            ref={ref}
        />
    )

})

export default Input