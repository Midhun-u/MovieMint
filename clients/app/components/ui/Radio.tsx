import { Activity, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Checkbox } from './checkbox'
import Spinner from './Spinner'
import { useAppSelector } from '@/store/hooks'
import useObserver from '../hooks/useObserver'

interface RadioProps {
    values: Array<{ title: string, value: string }>
    selectedValue: string
    className?: string
    setValue: Dispatch<SetStateAction<string>> | null
}

const Radio = ({ values, className, selectedValue, setValue }: RadioProps) => {

    const [pagination, setPagination] = useState<{ page: number, limit: number }>({
        page: 1,
        limit: 20
    })
    const [limitedValues, setLimitedValues] = useState<Array<{ title: string, value: string }>>([])
    const { theme } = useAppSelector(state => state.theme)
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })

    useEffect(() => {
        (() => {
            setLimitedValues((pre) => {
                return [...pre, ...values.slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit)]
            })
        })()
    }, [values, pagination.page, pagination.limit])

    useEffect(() => {
        (() => {
            if (isIntersecting) {
                setPagination(pre => {
                    return { ...pre, page: pre.page + 1 }
                })
            }
        })()
    }, [isIntersecting])

    return (

        <div className={className}>
            {
                limitedValues.map((value, index) => (
                    <div
                        className={`flex ${index !== 0 ? "mt-1.25" : ""} gap-2 items-center text-sm font-medium`}
                        key={index}
                        onClick={() => {
                            if (setValue) {
                                setValue(value.value)
                            }
                        }}
                    >
                        <div
                            className="flex items-center justify-center w-3.75 h-3.75 bg-foreground-color border rounded-xs cursor-pointer"
                        >
                            <Checkbox
                                checked={selectedValue === value.value}
                            />
                        </div>
                        <span>{value.title}</span>
                    </div>
                ))
            }

            <Activity mode={limitedValues.length < values.length ? "visible" : "hidden"}>
                <div ref={ref} className='w-full flex justify-center mt-1'>
                    <Spinner
                        color={theme === "dark" ? "white" : "black"}
                        size={15}
                    />
                </div>
            </Activity>
        </div>

    )

}

export default Radio