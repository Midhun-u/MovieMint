'use client'

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Image from "next/image"
import {
    Camera as ProfilePictureIcon
} from 'lucide-react'
import { useId, useRef } from "react"
import { Input } from "@/components/ui/input"
import { SubmitHandler, useForm } from "react-hook-form"
import FormInput from "@/components/form/FormInput"
import {
    UserIcon,
    Mail as EmailIcon
} from 'lucide-react'
import Label from "@/components/form/Label"
import { Button } from "@/components/ui/button"
import { authFailed, authRequest, authSuccess } from "@/store/authSlice"
import { updateUserDetailsApi } from "@/api/auth"
import Spinner from "../ui/Spinner"

type Inputs = {
    firstname: string
    lastname: string
}

const formInputContainerClass = "w-[70%] max-[700px]:w-full"

const ProfileForm = () => {

    const { user, loading } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const imageRef = useRef<HTMLInputElement | null>(null)
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>()
    const firstnameId = useId()
    const lastnameId = useId()
    const emailId = useId()

    // Function for updating user details
    const handleUpdateUserDetails: SubmitHandler<Inputs> = async (data) => {

        const authToken = localStorage.getItem('authToken')
        if (!authToken || !data.firstname) return

        dispatch(authRequest())

        const result = await updateUserDetailsApi({
            firstname: data.firstname,
            lastname: data.lastname
        }, authToken)

        if (result.success) {
            dispatch(authSuccess({ user: { ...user, firstname: data.firstname, lastname: data.lastname } }))
        } else {
            dispatch(authFailed({ errorMessage: result.error }))
        }

    }

    return (
        user
            ?
            <div className="mt-2.5 flex flex-col gap-5">
                <div className="flex gap-2.5 items-center">
                    <div onClick={() => imageRef.current?.click()} className="relative flex justify-center items-center cursor-pointer">
                        <Image
                            src={user.profile_image.image_url}
                            alt="Profile image"
                            width={100}
                            height={100}
                            className="w-20 h-auto rounded-[10px] aspect-square"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-foreground-color opacity-[0.4]"></div>
                        <ProfilePictureIcon
                            className="absolute"
                            strokeWidth={1.7}
                        />
                        <Input
                            type="file"
                            ref={imageRef}
                            hidden
                        />
                    </div>
                    <div>
                        <h2 className="text-[0.9rem] font-medium">Profile Picture</h2>
                        <p className="text-[0.8rem] font-medium text-foreground-theme-color/50">PNG, JPG, JPEG. Max size 10MB.</p>
                    </div>
                </div>
                <form
                    className="mt-2.5 w-full flex flex-col gap-2.5"
                    onSubmit={handleSubmit(handleUpdateUserDetails)}
                >
                    <div className={formInputContainerClass}>
                        <Label
                            labelTitle="Firstname"
                            labelId={firstnameId}
                        />
                        <FormInput
                            type="text"
                            Icon={UserIcon}
                            placeholder="Enter your firstname"
                            id={firstnameId}
                            defaultValue={user.firstname}
                            {...register("firstname", {
                                required: true,
                                minLength: 3,
                                maxLength: 15
                            })}
                            aria-invalid={formErrors.firstname ? "true" : "false"}
                        />
                    </div>
                    <div className={formInputContainerClass}>
                        <Label
                            labelTitle="Lastname"
                            labelId={lastnameId}
                        />
                        <FormInput
                            type="text"
                            Icon={UserIcon}
                            placeholder="Enter your lastname"
                            id={lastnameId}
                            defaultValue={user.lastname}
                            {...register("lastname", {
                                required: true,
                                maxLength: 10
                            })}
                            aria-invalid={formErrors.lastname ? "true" : "false"}
                        />
                    </div>
                    <div className={formInputContainerClass}>
                        <Label
                            labelTitle="Email"
                            labelId={emailId}
                        />
                        <FormInput
                            type="email"
                            Icon={EmailIcon}
                            id={emailId}
                            readOnly
                            value={user?.email}
                        />
                    </div>
                    <hr className="border border-foreground-theme-color/5 mt-2" />
                    <div className="mt-2.5 w-full flex flex-wrap max-[700px]:justify-start justify-end gap-2.5">
                        <Button
                            type="button"
                            className="max-[500px]:w-full bg-foreground-color text-foreground-theme-color hover:bg-background-color border border-foreground-theme-color/15"
                            disabled={loading}
                        >
                            <>Cancel Changes</>
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="max-[500px]:w-full"
                        >
                            {
                                loading
                                    ?
                                    <Spinner
                                        size={18}
                                        color="black"
                                    />
                                    :
                                    <>Save Changes</>
                            }
                        </Button>
                    </div>
                </form>
            </div>
            :
            null
    )

}

export default ProfileForm