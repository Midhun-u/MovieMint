import { forwardRef, type TextareaHTMLAttributes } from "react"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLElement>{
    className: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({className, ...props}, ref) => {

    return (
        <textarea
            ref={ref}
            className={className}
            {...props}
        />
    )

})

export default TextArea