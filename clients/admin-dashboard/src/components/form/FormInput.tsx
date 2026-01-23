import Input from "../ui/Input"
import Label from "./Label"
import style from '../../styles/form/formInput.module.scss'
import type { LucideReactIconType } from "@/types/lucideReactType"
import TextArea from "../ui/TextArea"

interface FormInputProps {
    labelTitle: string
    id?: string
    inputPlaceholder?: string
    Icon: LucideReactIconType
    inputType: "input" | "textarea"
}

const FormInput = ({ labelTitle, id, inputPlaceholder, inputType, Icon }: FormInputProps) => {

    return (
        <div className={style.container}>
            <Label
                title={labelTitle}
                id={id}
            />
            <div className={style['input-section']}>
                <Icon
                    className={inputType === "input"? style['input-icon']: style['textarea-icon']}
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
                        />
                        :
                        <TextArea
                            className={style.textarea}
                            placeholder={inputPlaceholder}
                            id={id}
                        />
                }
            </div>
        </div>
    )

}

export default FormInput