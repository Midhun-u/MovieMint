import { useContext, useEffect, useState, useCallback } from "react";
import style from "../../styles/movies/movieDetails.module.scss";
import {
  addBannerApi,
  getBannerApi,
  getMovieApi,
  getTotalBannerCountApi,
  removeBannerApi,
} from "../../api/movie";
import type { MovieData } from "../../types/movie";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  bannerFailed,
  bannerRequest,
  bannerSuccess,
} from "../../store/bannerSlice";
import { ToastProvider } from "../context/providers/ToastProvider";

interface MovieDetails {
  movieId: string;
  onClickOnClose: () => void;
}

const MovieDetails = ({ movieId, onClickOnClose }: MovieDetails) => {
  const [movieDetails, setMovieDetails] = useState<MovieData | null>(null);
  const { loading, banner } = useAppSelector((state) => state.banner);
  const dispatch = useAppDispatch();
  const toastContext = useContext(ToastProvider);

  // Function for fetching movie details
  const handleFetchMovieDetails = useCallback(async () => {
    const result = await getMovieApi(movieId);
    if (result.success) {
      setMovieDetails(result.movie);
    }
  }, [movieId]);

  // Function for fetching banner
  const handleFetchBanner = useCallback(async () => {
    dispatch(bannerRequest());
    const result = await getBannerApi(movieId);

    if (result.success) {
      dispatch(bannerSuccess({ banner: result.banner }));
    } else {
      dispatch(bannerFailed({ errorMessage: result.errorMessage }));
    }
  }, [movieId, dispatch]);

  // Functio for adding banner
  const handleAddBanner = async () => {
    dispatch(bannerRequest());

    const bannerCountResult = await getTotalBannerCountApi();
    if (bannerCountResult.totalCount >= 10) {
      dispatch(bannerFailed({ errorMessage: "The limit is exceeded" }));
      return toastContext?.triggerToastMessage(
        "The limit is exceeded",
        "ERROR",
      );
    }

    const bannerResult = await addBannerApi({ movieId: movieId });

    if (bannerResult.success) {
      dispatch(bannerSuccess({ banner: bannerResult.banner }));
      toastContext?.triggerToastMessage("Movie added to banner", "SUCCESS");
    } else {
      dispatch(bannerFailed({ errorMessage: bannerResult.errorMessage }));
      toastContext?.triggerToastMessage(
        "Movie couldn't add to banner",
        "ERROR",
      );
    }
  };

  // Function for removing banner
  const handleRemoveBanner = async () => {
    if (banner?._id) {
      dispatch(bannerRequest());
      const result = await removeBannerApi(banner._id);

      if (result.success) {
        dispatch(bannerSuccess({ banner: null }));
        toastContext?.triggerToastMessage("Banner is removed", "SUCCESS");
      } else {
        dispatch(bannerFailed({ errorMessage: result.errorMessage }));
        toastContext?.triggerToastMessage("Banner is couldn't delete", "ERROR");
      }
    }
  };

  useEffect(() => {
    if (movieId) {
      const fetchData = async () => {
        await Promise.all([handleFetchMovieDetails(), handleFetchBanner()]);
      }
      fetchData()
    }

    return () => {
      setMovieDetails(null);
      dispatch(bannerSuccess({ banner: null }));
    };
  }, [movieId, handleFetchBanner, handleFetchMovieDetails, dispatch]);

  return movieDetails ? (
    <div className={style.container}>
      {/* Movie banner */}
      <img src={movieDetails.banner.image_url} className={style.banner} />
      {/* Movie details */}
      <div className={style.details}>
        <h1>{movieDetails.title}</h1>
        <p>{movieDetails.synopsis}</p>
      </div>
      {/* Buttons */}
      <div className={style["button-container"]}>
        <Button title="Close" onClick={onClickOnClose} disabled={loading} />
        {banner && banner.movie_id === movieId ? (
          <Button
            title="Remove Banner"
            onClick={() => handleRemoveBanner()}
            loading={loading}
            loadingSpinnerColor="black"
            spinnerSize={18}
          />
        ) : (
          <Button
            title="Add To Banner"
            onClick={() => handleAddBanner()}
            loading={loading}
            loadingSpinnerColor="black"
            spinnerSize={18}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default MovieDetails;
