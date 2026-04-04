const BookingsSkeleton = () => {

    return (
        <div className="flex p-5 w-full bg-foreground-color border border-foreground-theme-color/15 rounded-[10px] gap-2.5">
            <div className="w-30 h-37.5 bg-foreground-theme-color/15"></div>
            <div className="flex flex-col gap-2.5 w-full">
                <div className="w-[50%] h-3.75 bg-foreground-theme-color/15"></div>
                <div className="w-[50%] h-2.5 bg-foreground-theme-color/15"></div>
                <div className="w-[50%] h-2.5 bg-foreground-theme-color/15"></div>
                <div className="w-[50%] h-2.5 bg-foreground-theme-color/15"></div>
                <hr className="border border-foreground-theme-color/10" />
                <div className="w-[50%] h-2.5 bg-foreground-theme-color/15"></div>
            </div>
        </div>
    )

}

export default BookingsSkeleton