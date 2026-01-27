interface LabelProps{
    labelId?: string
    labelTitle: string
}

const Label = ({labelId, labelTitle}: LabelProps) => {

  return (

    <label 
        htmlFor={labelId}
        className='font-medium text-sm text-foreground-theme-color'
    >
        {labelTitle}
    </label>

  )
}

export default Label