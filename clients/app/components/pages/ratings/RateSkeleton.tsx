const RateSkeleton = () => {

    return (

        <div className="w-full p-4 h-35 bg-foreground-color border border-foreground-theme-color/15 rounded-md flex flex-col gap-2.5">
            <div className="flex gap-1.25 items-center">
                <div className="w-8 h-8 bg-foreground-theme-color/10 rounded-full"></div>
                <div className="w-[70%] h-5 bg-foreground-theme-color/10 "></div>
            </div>
            <div className="w-full h-20 bg-foreground-theme-color/10"></div>
        </div>

    )

}

export default RateSkeleton