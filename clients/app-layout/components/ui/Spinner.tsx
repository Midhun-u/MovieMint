import {
    Loader as SpinnerIcon
} from 'lucide-react'

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
        className={`${color === "black"? "stroke-black": "stroke-white"} animate-spin`}
    />

  )
}

export default Spinner