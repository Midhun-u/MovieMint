import style from '../../styles/form/label.module.scss'

interface FormLabelProps {
    title: string,
    id?: string
}

const FormLabel = ({ title, id }: FormLabelProps) => {

    return (
        id
            ?
            <label
                htmlFor={id}
                className={style.label}
            >
                {title}
            </label>
            :
            <span
                className={style.label}
            >
                {title}
            </span>
    )

}

export default FormLabel