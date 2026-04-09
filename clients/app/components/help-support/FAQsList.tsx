import { faqs } from "../../utils/faqs"
import {
    ChevronDown as DownArrowIcon
} from 'lucide-react'
import { useState } from "react"

const FAQsList = () => {

    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0)
    
    return (
        <ul className="flex flex-col gap-2.5">
            {
                faqs.map((faq, index) => (
                    <li
                        key={index}
                        className="h-max list-none flex flex-col gap-2.5"
                    >
                        <span
                            className="relative text-[0.9rem] font-medium bg-foreground-color p-2.5 pr-10 rounded-[5px] border border-foreground-theme-color/15 cursor-pointer flex items-center"
                            onClick={() => {
                                if (selectedQuestionIndex === (index + 1)) {
                                    setSelectedQuestionIndex(0)
                                } else {
                                    setSelectedQuestionIndex(index + 1)
                                }
                            }}
                        >
                            {faq.question}
                            <DownArrowIcon
                                className={`absolute right-3 ${selectedQuestionIndex === index + 1 ? "rotate-180" : "rotate-0"} transition-all duration-200`}
                                strokeWidth={1.8}
                            />
                        </span>
                        <p className={`text-sm font-medium text-foreground-theme-color/50 ${selectedQuestionIndex === index + 1? "py-1.25 px-2.5 h-max": "h-0"} overflow-hidden transition-all duration-200`}>{faq.answer}</p>
                    </li> 
                ))
            }
        </ul>
    )

}

export default FAQsList