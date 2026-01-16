"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import {
    ChevronLeft as BackIcon
} from 'lucide-react'

interface BackButtonProps{
    loading: boolean,
    navigationUrl: string
}

const BackButton = ({loading, navigationUrl}: BackButtonProps) => {

    const router = useRouter()

    return (

        <Button
            type='button'
            className='bg-foreground-color border-2 border-disable-color/10 text-dark-foreground-color'
            onClick={() => router.push(navigationUrl)}
            disabled={loading}
        >
            <BackIcon
                className='stroke-dark-foreground-color'
                size={20}
            />
            <span>Back</span>
        </Button>

    )
}

export default BackButton