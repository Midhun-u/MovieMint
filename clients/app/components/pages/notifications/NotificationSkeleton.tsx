const NotificationSkeleton = () => {

    return (

        <div className="w-full p-2.5 h-23 bg-foreground-color border border-foreground-theme-color/15 rounded-[5px] flex flex-col gap-2.5">
            <div className="w-full flex gap-2.5 items-center">
                <div className="w-8 h-8 rounded-[5px] bg-foreground-theme-color/10"></div>
                <div className="h-3 w-[70%] bg-foreground-theme-color/10 rounded-[3px]"></div>
            </div>
            <div className="w-[90%] h-7 bg-foreground-theme-color/10 rounded-[3px]"></div>
        </div>
        
    )

}

export default NotificationSkeleton