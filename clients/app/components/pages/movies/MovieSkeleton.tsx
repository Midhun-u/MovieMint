const MovieSkeleton = () => {

    return (
        <div className="w-47.5 min-h-67.5 flex flex-col p-2.5 border border-foreground-theme-color/15 rounded-xs shrink-0 gap-2.5">
            <div className="w-full aspect-2/3 bg-foreground-theme-color/15"></div>
            <div className="flex flex-col gap-1">
                <div className="w-full h-5 bg-foreground-theme-color/15"></div>
                <div className="w-full h-2.5 bg-foreground-theme-color/15 "></div>
                <div className="w-full h-2.5 bg-foreground-theme-color/15"></div>
            </div>
        </div>
    )

}

export default MovieSkeleton