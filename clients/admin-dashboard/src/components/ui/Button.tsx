import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
    title: string,
    className?: string,
    children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ title, className, children, ...props }, ref) => {

    return (
        <button
            className={className}
            ref={ref}
            {...props}
        >
            {title}
            {children}
        </button>
    )

})

export default Button