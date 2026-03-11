import Image from "next/image";

interface MovieCardProps {
    poster: string;
    title: string;
    certificate: string;
    language: string;
    categories: Array<string>;
    status?: "SHOWING" | "NOT_SHOWING" | "PENDING";
}

const MovieCard = ({
    poster,
    title,
    certificate,
    language,
    categories,
    status,
}: MovieCardProps) => {

    const sortedCategories = [...categories].sort();
    const movieDetailsClass = "text-[0.8rem] max-h-4.75 overflow-hidden w-full text-foreground-theme-color/45 font-semibold"


    return (
        <div className="sm:w-47.5 w-40 h-full sm:min-h-80 bg-foreground-color flex flex-col p-2.5 border border-foreground-theme-color/15 rounded-[3px] cursor-pointer shrink-0 relative">
            {/* Movie poster section */}
            <div className="w-full">
                <Image
                    alt={`${title} poster`}
                    src={poster} 
                    className="w-full aspect-2/3"
                    width={500}
                    height={1000}
                />
            </div>
            {/* Movie details section */}
            <div className="flex flex-col w-full h-full mt-2 gap-0.5">
                {/* Movie title */}
                <h2 className="w-full max-h-9.75 overflow-hidden text-[0.85rem] font-bold">{title}</h2>
                {/* Movie certificate and language */}
                <p className={`${movieDetailsClass}`}>
                    {certificate} | {language}
                </p>
                {/* Movie categories */}
                <p className={`${movieDetailsClass}`}>{sortedCategories.join(", ")}</p>
                {status ? (
                    <p
                        className={
                           status === "PENDING"
                           ?
                           "w-max text-[0.7rem] px-1.25"
                           :
                           ""
                        }
                    >
                        {status === "SHOWING" ? (
                            <>Showing</>
                        ) : status === "NOT_SHOWING" ? (
                            <>Not Showing</>
                        ) : (
                            <>Pending</>
                        )}
                    </p>
                ) : null}
            </div>
        </div>
    );
};

export default MovieCard;