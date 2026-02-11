import {forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import Spinner from "./Spinner"

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
    title?: string,
    className?: string,
    children?: ReactNode,
    loading?: boolean,
    loadingSpinnerColor?: "white" | "black"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ title, className, children, loading, loadingSpinnerColor, ...props }, ref) => {

    return (
        <button
            className={className}
            ref={ref}
            {...props}
            disabled={loading}
        >
            {
                loading
                    ?
                    <Spinner
                        size={20}
                        color={loadingSpinnerColor ? loadingSpinnerColor : "black"}
                    />
                    :
                    <>
                        { title }
                        {children}
                    </>
            }
        </button>
    )

})

export default Button