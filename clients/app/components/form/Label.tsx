interface LabelProps {
  labelId?: string
  labelTitle: string
}

const Label = ({ labelId, labelTitle }: LabelProps) => {

  return (

    labelId
      ?
      <label
        htmlFor={labelId}
        className='font-medium text-sm text-foreground-theme-color'
      >
        {labelTitle}
      </label>
      :
      <span
        className='font-medium text-sm text-foreground-theme-color'
      >
        {labelTitle}
      </span>

  )
}

export default Label