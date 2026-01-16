'use client'

import { LucidReactIconType } from "@/types/lucidReact"
import { Button } from "../ui/button"
import FormInput from "./FormInput"
import Label from "./Label"
import Spinner from "../ui/Spinner"
import BackButton from "./BackButton"
import {useForm } from "react-hook-form"
import { BaseSyntheticEvent } from "react"

type OneInputFieldFormProps = {
    id: string
    inputFieldType: "email" | "password" | "number" | "text"
    labelText: string
    Icon: LucidReactIconType
    placeholder: string
    loading: boolean
    ariaInvalid: "true" | "false"
    formSubmitFunction: (data: any, event?: BaseSyntheticEvent<object, any, any> | undefined) => unknown
    backNavigationUrl: string
    primaryButtonTitle: string
}

const OneInputFieldForm =  ({id, labelText, inputFieldType, placeholder, formSubmitFunction, Icon, loading, ariaInvalid, backNavigationUrl, primaryButtonTitle, ...props}: OneInputFieldFormProps) => {

    const {handleSubmit, register} = useForm()

    return (

        <form onSubmit={handleSubmit(formSubmitFunction)} className="w-full flex flex-col gap-5 py-3 mt-10">
            {/* Input section */}
            <div className="w-full flex flex-col">
                <Label
                    labelTitle={labelText}
                    labelId={id}
                />
                <FormInput
                    id={id}
                    {...register("email", {
                        required: true
                    })}
                    type={inputFieldType}
                    placeholder={placeholder}
                    Icon={Icon}
                    aria-invalid={ariaInvalid}
                />
            </div>
            {/* Button section */}
            <div className='w-full flex flex-col gap-2'>
                <Button
                    className='text-dark-foreground-color'
                    disabled={loading}
                >
                    {
                        loading
                            ?
                            <Spinner
                                size={20}
                                color='black'
                            />
                            :
                            <span>{primaryButtonTitle}</span>
                    }
                </Button>
                <BackButton
                    loading={loading}
                    navigationUrl={backNavigationUrl}
                />
            </div>
        </form>


    )
}

export default OneInputFieldForm