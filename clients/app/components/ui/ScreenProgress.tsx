import React from "react"

interface ScreenProgressProps{
    currentScreen: number
    totalScreen: number
}

const ScreenProgress = ({currentScreen = 1, totalScreen = 2}: ScreenProgressProps) => {

    return (

        <div className="w-full flex justify-center">
            <div className="w-[85%] sm:w-[70%] md:w-[60%] flex justify-between items-center gap-2">
                {
                    Array(totalScreen).fill('').map((_, index) => (
                        <React.Fragment key={index}>
                            {
                                index !== 0
                                    ?
                                    <div className={`border border-foreground-theme-color/30 w-full ${index + 1 <= currentScreen? "border-primary-color/70": ""} `}></div>
                                    :
                                    null
                            }
                            <div
                                className={``}
                            >
                                <div className="p-1 w-6 h-6 rounded-full border text-xs font-medium flex justify-center items-center bg-foreground-color border-foreground-theme-color/20">
                                    {index + 1}
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>

    )

}

export default ScreenProgress