import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement>{
    title: string,
    className?: string,
    children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({title, className, children}: ButtonProps) => {

    return (
        <button className={className}>
            {title}
            {children}
        </button>
    )

})

export default Button