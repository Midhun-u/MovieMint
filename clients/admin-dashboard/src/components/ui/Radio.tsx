import { Activity } from 'react'
import style from '../../styles/ui/radio.module.scss'
import {
    CheckIcon
} from 'lucide-react'

interface RadioProps {
    values: Array<{ title: string, value: string }>
    selectedValue: string
    onClick: (value: {title: string, value: string}) => void
    className?: string
}

const Radio = ({ values, selectedValue, onClick, className }: RadioProps) => {

    return (

        <div className={className}>
            {
                values.map((value, index) => (
                    <div
                        className={style['radio']}
                        key={index}
                        onClick={() => onClick(value)}
                    >
                        <div className={selectedValue === value.value? style['selected-check']: style.check}>
                            <Activity
                                mode={selectedValue === value.value? "visible": "hidden"}
                            >
                                <CheckIcon
                                    size={12}
                                    strokeWidth={2}
                                    className={style.icon}
                                />
                            </Activity>
                        </div>
                        <span>{value.title}</span>
                    </div>
                ))
            }
        </div>

    )

}

export default Radio