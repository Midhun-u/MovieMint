import style from '../../styles/form/label.module.scss'

interface Label {
    title: string,
    id?: string
}

const Label = ({ title, id }: Label) => {

    return (
        <label
            htmlFor={id}
            className={style.label}
        >
            {title}
        </label>
    )

}

export default Label