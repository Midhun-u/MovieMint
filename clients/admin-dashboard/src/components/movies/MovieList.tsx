import { Activity, useEffect, useState, type ChangeEvent } from "react";
import style from "../../styles/movies/movieList.module.scss";
import { getMoviesApi } from "../../api/movie";
import SearchBarInput from "../ui/SearchBar";
import MovieFilter from "./MovieFilter";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearState,
  incrementPage,
  movieFailed,
  movieRequest,
  movieSuccess,
} from "../../store/movieSlice";
import MovieCard from "./MovieCard";
import MovieSkeleton from "./MovieSkeleton";
import useObserver from "../hooks/useObserver";
import NoResult from "../ui/NoResult";
import { SquarePen as EditIcon } from "lucide-react";
import { useNavigate } from "react-router";
import MovieDetails from "./MoveDetails";

const MovieList = () => {
  const { loading, movies, pagination } = useAppSelector(
    (state) => state.movie,
  );
  const dispatch = useAppDispatch();
  const { isIntersecting, ref } = useObserver<HTMLDivElement>({
    threshold: 0.5,
  });
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    [],
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedFormats, setSelectedFormats] = useState<Array<string>>([]);
  const [showMovieScreenDetails, setShowMovieScreenDetails] = useState<{
    showScreen: boolean;
    movieId: string;
  }>({
    showScreen: false,
    movieId: "",
  });
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Function for fetching movies
  const handleFetchMovies = async (searchQuery: string = "") => {
    dispatch(movieRequest());
    const result = await getMoviesApi(
      pagination.page,
      pagination.limit,
      searchQuery,
      selectedCategories,
      selectedFormats,
      selectedLanguage,
    );

    if (result.success) {
      dispatch(movieSuccess({ movies: result.movies, page: pagination.page }));

      if (result.movies?.length < pagination.limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } else {
      dispatch(movieFailed({ errorMessage: result.errorMessage }));
    }
  };

  // Function for searching movies which has debouncing feature
  const debounceSearch = (searchQuery: string) => {
    setTimeout(() => {
      handleFetchMovies(searchQuery);
    }, 500);
  };

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debounceSearch(event.target.value);
  };

  useEffect(() => {
    if (!isIntersecting || loading || !hasMore) return;

    (() => {
      dispatch(incrementPage());
    })();
  }, [isIntersecting, hasMore, loading]);

  useEffect(() => {
    (() => {
      handleFetchMovies();
    })();

    return () => {
      dispatch(movieSuccess({ movies: [] }));
    };
  }, [pagination.page]);

  useEffect(() => {
    (() => {
      dispatch(clearState());
    })();
  }, [searchQuery, selectedCategories, selectedFormats, selectedLanguage]);

  return (
    <div className={style.container}>
      <div className={style["search-container"]}>
        <SearchBarInput onChange={handleChangeEvent} />
        <MovieFilter
          setSelectedCategories={setSelectedCategories}
          setSelectedFormats={setSelectedFormats}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>
      {movies.length ? (
        <>
          {/* List of movies */}
          <div className={style["list"]}>
            {movies.map((movie) => (
              <div
                className={style["movie-card-container"]}
                key={movie._id}
                onClick={() =>
                  setShowMovieScreenDetails({
                    showScreen: true,
                    movieId: movie._id,
                  })
                }
              >
                <MovieCard
                  title={movie.title}
                  poster={movie.poster.image_url}
                  categories={movie.categories}
                  certificate={movie.certificate}
                  language={movie.language}
                  status={movie.status}
                />
                <div
                  className={style["movie-edit"]}
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`edit/${movie._id}`);
                  }}
                >
                  <EditIcon size={22} strokeWidth={1.5} />
                </div>
              </div>
            ))}
            <Activity mode={loading ? "visible" : "hidden"}>
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <MovieSkeleton key={index} />
                ))}
            </Activity>
            <Activity mode={hasMore ? "visible" : "hidden"}>
              <div ref={ref}></div>
            </Activity>
          </div>
          <Activity
            mode={showMovieScreenDetails.showScreen ? "visible" : "hidden"}
          >
            <div className={style["movie-details-container"]}>
              <div className={style.background}></div>
              <MovieDetails
                movieId={showMovieScreenDetails.movieId}
                onClickOnClose={() =>
                  setShowMovieScreenDetails({ movieId: "", showScreen: false })
                }
              />
            </div>
          </Activity>
        </>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

export default MovieList;
