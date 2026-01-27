interface WarningMessageProps{
    message: string
}

const WarningMessage = ({message}: WarningMessageProps) => {

  return (

    <p className="w-full mt-2 text-xs font-medium text-error-foreground-color">
        {message}
    </p>

  )
}

export default WarningMessage