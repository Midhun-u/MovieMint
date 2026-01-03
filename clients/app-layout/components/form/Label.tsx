import React from 'react'

interface LabelProps{
    labelId?: string,
    labelTitle: string
}

const Label = ({labelId, labelTitle}: LabelProps) => {

  return (

    <label 
        htmlFor={labelId}
        className='font-medium text-sm'
    >
        {labelTitle}
    </label>

  )
}

export default Label