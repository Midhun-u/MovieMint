import { useEffect, useState, useCallback } from "react";
import style from "../../styles/addShows/movieDetails.module.scss";
import type { MovieData } from "../../types/movie";
import Button from "../ui/Button";
import { getMovieApi } from "../../api/movie";
import { Drama as CategoryIcon, Tv as FormatsIcon } from "lucide-react";

interface MovieDetails {
  movieId: string;
  onClickOnClose: () => void;
}

const MovieDetails = ({ movieId, onClickOnClose }: MovieDetails) => {
  const [movieDetails, setMovieDetails] = useState<MovieData | null>(null);

  // Function for fetching movie details
  const handleFetchMovieDetails = useCallback(async () => {
    const result = await getMovieApi(movieId);
    if (result.success) {
      setMovieDetails(result.movie);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      (() => {
        handleFetchMovieDetails();
      })();
    }

    return () => {
      setMovieDetails(null);
    };
  }, [handleFetchMovieDetails, movieId]);

  return movieDetails ? (
    <div className={style.container}>
      {/* Movie banner */}
      <img src={movieDetails.banner.image_url} className={style.banner} />
      {/* Movie details */}
      <div className={style.details}>
        <h1>{movieDetails.title}</h1>
        <p>{movieDetails.synopsis}</p>
        <div className={style['other-details-container']}>
          <div className={style["other-details"]}>
            <CategoryIcon size={20} />
            {movieDetails.categories.join(", ")}
          </div>
          <div className={style["other-details"]}>
            <FormatsIcon size={20} />
            {movieDetails.formats.join(", ")}
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className={style["button-container"]}>
        <Button title="Close" onClick={onClickOnClose} />
      </div>
    </div>
  ) : null;
};

export default MovieDetails;
