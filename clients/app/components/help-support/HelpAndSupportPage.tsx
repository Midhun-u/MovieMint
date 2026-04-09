import {
    ChevronLeft as BackIcon
} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import FAQsList from './FAQsList'

interface HelpAndSupportPageProps {
    setSelectedPagedName: Dispatch<SetStateAction<string>>
}

const HelpAndSupportPage = ({ setSelectedPagedName }: HelpAndSupportPageProps) => {

    return (
        <div className="max-[700px]:p-0 p-5 flex flex-col gap-5 max-h-125 overflow-scroll">
            <div className="flex gap-1.25">
                <BackIcon
                    className="max-[700px]:block hidden cursor-pointer"
                    onClick={() => setSelectedPagedName("")}
                />
                <div>
                    <h2 className="font-semibold text-[1rem]">Frequently Asked Questions</h2>
                    <p className="text-[0.9rem] text-foreground-theme-color/50 font-medium">Quick answers to common questions.</p>
                </div>
            </div>
            <FAQsList
            />
        </div>
    )

}

export default HelpAndSupportPage