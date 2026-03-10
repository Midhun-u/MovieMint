import { forwardRef, InputHTMLAttributes, Ref } from "react"
import { Input } from "./input"
import {
    SearchIcon
} from 'lucide-react'

const SearchBar = ({...props}, ref: Ref<HTMLInputElement>) => {
    return (
        <div className="w-auto relative flex items-center">
            <SearchIcon
                className="absolute left-2 text-disable-color"
                size={20}
            />
            <Input
                className="border bg-foreground-color border-foreground-theme-color/15 pl-10 text-sm focus:border-primary-color"
                placeholder="Search by movies"
                ref={ref}
                {...props}
            />
        </div>
    )
}

export default forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLElement>>(SearchBar)