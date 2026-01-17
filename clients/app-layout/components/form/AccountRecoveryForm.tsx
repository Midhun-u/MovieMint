'use client'

import { LucidReactIconType } from "@/types/lucidReact"
import { Button } from "../ui/button"
import FormInput from "./FormInput"
import Label from "./Label"
import Spinner from "../ui/Spinner"
import BackButton from "./BackButton"
import { FieldValues, RegisterOptions, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { BaseSyntheticEvent, useState } from "react"
import PasswordInput from "./PasswordInput"
import PasswordStrengthIndicator from "./PasswordStrengthIndicator"

type AccountRecoveryFormProps = {
    id: string
    inputFieldType: "email" | "password" | "number" | "text"
    labelText: string
    Icon?: LucidReactIconType
    placeholder: string
    loading: boolean
    ariaInvalid: "true" | "false"
    handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
    formSubmitFunction: (data: any, event?: BaseSyntheticEvent<object, any, any> | undefined) => unknown
    register: UseFormRegister<any>
    backNavigationUrl: string
    primaryButtonTitle: string
    inputFieldName: string
    rules: RegisterOptions<any, string>
}

const AccountRecoveryForm = ({ id, labelText, inputFieldType, inputFieldName, placeholder, rules, formSubmitFunction, handleSubmit, register, Icon, loading, ariaInvalid, backNavigationUrl, primaryButtonTitle }: AccountRecoveryFormProps) => {

    const [password, setPassword] = useState<string>("")

    return (

        <form onSubmit={handleSubmit(formSubmitFunction)} className="w-full flex flex-col gap-5 py-3 mt-10">
            {/* Input section */}
            <div className="w-full flex flex-col">
                <Label
                    labelTitle={labelText}
                    labelId={id}
                />
                {
                    inputFieldType === "password"
                        ?
                        <div>
                            <PasswordInput
                                placeholder={placeholder}
                                aria-invalid={ariaInvalid}
                                {...register(inputFieldName, rules)}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <PasswordStrengthIndicator
                                password={password}
                            />
                        </div>
                        :
                        <FormInput
                            {...register(inputFieldName, rules)}
                            id={id}
                            type={inputFieldType}
                            placeholder={placeholder}
                            Icon={Icon}
                            aria-invalid={ariaInvalid}
                        />
                }
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

export default AccountRecoveryForm