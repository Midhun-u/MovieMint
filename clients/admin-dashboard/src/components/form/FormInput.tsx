import Input from "../ui/Input"
import FormLabel from "./FormLabel"
import style from '../../styles/form/formInput.module.scss'
import type { LucideReactIconType } from "@/types/lucideReactType"
import TextArea from "../ui/TextArea"
import type { UseFormRegister } from "react-hook-form"
import { forwardRef, type InputHTMLAttributes } from "react"

interface FormInputProps extends InputHTMLAttributes<HTMLElement> {
    labelTitle: string
    id?: string
    inputPlaceholder?: string
    Icon: LucideReactIconType
    inputType: "input" | "textarea"
    register: UseFormRegister<any>
    inputFieldName: string
    minLength: number
    maxLength: number
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ labelTitle, id, inputPlaceholder, inputType, Icon, register, inputFieldName, maxLength, minLength, ...props }, ref) => {

    return (
        <div className={style.container}>
            <FormLabel
                title={labelTitle}
                id={id}
            />
            <div className={style['input-section']}>
                <Icon
                    className={inputType === "input" ? style['input-icon'] : style['textarea-icon']}
                    size={22}
                    strokeWidth={1.5}
                />
                {
                    inputType === "input"
                        ?
                        <Input
                            placeholder={inputPlaceholder}
                            className={style.input}
                            type="text"
                            id={id}
                            {...register(inputFieldName, {
                                required: true,
                                minLength: minLength,
                                maxLength: maxLength,
                            })}
                            {...props}
                        />
                        :
                        <TextArea
                            className={style.textarea}
                            placeholder={inputPlaceholder}
                            id={id}
                            {...register(inputFieldName, {
                                required: true,
                                minLength: minLength,
                                maxLength: maxLength
                            })}
                            {...props}
                        />
                }
            </div>
        </div>
    )

})

export default FormInput