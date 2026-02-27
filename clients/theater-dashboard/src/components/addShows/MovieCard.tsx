import style from "../../styles/addShows/movieCard.module.scss";

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

  return (
    <div className={style.container}>
      {/* Movie poster section */}
      <div className={style["image-container"]}>
        <img src={poster} className={style["movie-poster"]} />
      </div>
      {/* Movie details section */}
      <div className={style["movie-details"]}>
        {/* Movie title */}
        <h2 className={style["movie-title"]}>{title}</h2>
        {/* Movie certificate and language */}
        <p className={style["movie-other-details"]}>
          {certificate} | {language}
        </p>
        {/* Movie categories */}
        <p className={style["movie-category"]}>{sortedCategories.join(", ")}</p>
        {status ? (
          <p
            className={
              status === "SHOWING"
                ? style["status-showing"]
                : status === "NOT_SHOWING"
                  ? style["status-not-showing"]
                  : style["status-pending"]
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
