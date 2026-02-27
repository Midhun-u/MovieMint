import { useCallback, useEffect } from "react";
import style from "../../styles/addShowDetails/showDetails.module.scss";
import { getMovieApi } from "../../api/movie";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  movieFailed,
  movieRequest,
  movieSuccess,
} from "../../store/movieSlice";
import NoResult from "../ui/NoResult";
import Spinner from "../ui/Spinner";

const ShowDetails = () => {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const { movie, loading } = useAppSelector((state) => state.movie);
  const {theme} = useAppSelector(state => state.theme)

  // Function for fetching movie details
  const handleGetMovieDetails = useCallback(async () => {
    dispatch(movieRequest());
    const result = await getMovieApi(movieId as string);
    if (result.success) {
      dispatch(movieSuccess({ movie: result.movie }));
    } else {
      dispatch(movieFailed({ errorMessage: result.errorMessage }));
    }
  }, [movieId, dispatch]);

  useEffect(() => {
    if (movieId) {
      handleGetMovieDetails();
    }
  }, [handleGetMovieDetails, movieId]);

  return movie ? (
    <div className={style.container}>
      Hello world
    </div>
  ) : loading ? (
    <div className={style['spinner-container']}>
      <Spinner size={25} color={theme === "dark"? "white": "black"} />
    </div>
  ) : (
    <NoResult />
  );
};

export default ShowDetails;
