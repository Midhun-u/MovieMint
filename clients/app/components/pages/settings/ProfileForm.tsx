'use client'

import { useAppSelector } from "@/store/hooks"
import Image from "next/image"
import {
    Camera as ProfilePictureIcon
} from 'lucide-react'
import { useId, useRef } from "react"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import FormInput from "@/components/form/FormInput"
import {
    UserIcon,
    Mail as EmailIcon
} from 'lucide-react'
import Label from "@/components/form/Label"
import { Button } from "@/components/ui/button"

type Inputs = {
    firstname: string
    lastname: string
}

const formInputContainerClass = "w-[60%]"

const ProfileForm = () => {

    const { user } = useAppSelector(state => state.auth)
    const imageRef = useRef<HTMLInputElement | null>(null)
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm<Inputs>()
    const firstnameId = useId()
    const lastnameId = useId()
    const emailId = useId()

    return (
        user
            ?
            <div className="mt-2.5 flex flex-col gap-5 overflow-scroll">
                <div className="flex gap-2.5 items-center">
                    <div onClick={() => imageRef.current?.click()} className="relative flex justify-center items-center cursor-pointer">
                        <Image
                            src={user.profile_image.image_url}
                            alt="Profile image"
                            width={100}
                            height={100}
                            className="w-20 h-auto rounded-[10px] aspect-square"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-foreground-color opacity-[0.3]"></div>
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
                    <hr className="border mt-2" />
                    <div className="mt-2.5 w-full flex justify-end gap-2.5">
                        <Button className="bg-foreground-color hover:bg-background-color border border-foreground-theme-color/15">
                            <>Cancel Changes</>
                        </Button>
                        <Button>
                            <>Save Changes</>
                        </Button>
                    </div>
                </form>
            </div>
            :
            null
    )

}

export default ProfileForm