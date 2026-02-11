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
            className='bg-foreground-color hover:bg-background-color border border-disable-color/20'
            onClick={() => router.push(navigationUrl)}
            disabled={loading}
        >
            <BackIcon
                className='stroke-foreground-theme-color'
                size={20}
            />
            <span>Back</span>
        </Button>

    )
}

export default BackButton