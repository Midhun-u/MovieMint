import {
    Loader as SpinnerIcon
} from 'lucide-react'
import style from '../../styles/ui/spinner.module.scss'

interface SpinnerProps{
    size: number,
    color: "white" | "black"
}

const Spinner = ({
    size = 20,
    color
}: SpinnerProps) => {

  return (

    <SpinnerIcon
        size={size}
        className={style.spinner}
        style={{color: color}}
    />

  )
}

export default Spinner