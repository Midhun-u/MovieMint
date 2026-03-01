import { useCallback, useEffect, useState, useMemo } from "react";
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
import SelectedMovieDetails from "./SelectedMovieDetails";

const ShowDetails = () => {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const { movie, loading } = useAppSelector((state) => state.movie);
  const { theme } = useAppSelector((state) => state.theme);
  const date = useMemo(() => new Date(), []);
  const totalDaysInCurrentMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();
  const [selectedDateDetails, setSelectedDateDetails] = useState<{
    day: number;
    time: {
      hour: number;
      minutes: number;
    };
  }>({ day: date.getDate() + 1, time: { hour: 8, minutes: 0 } });
  const [availableTimes, setAvailableTimes] = useState<
    Array<{ hour: number; minutes: number }>
  >([]);

  // Function for fetching movie details
  const handleGetMovieDetails = useCallback(async () => {
    dispatch(movieRequest());
    const result = await getMovieApi(movieId as string);
    if (result.success) {
      dispatch(movieSuccess({ movie: result.movie, movies: [] }));
    } else {
      dispatch(movieFailed({ errorMessage: result.errorMessage }));
    }
  }, [movieId, dispatch]);

  // Function for getting available times
  const handleGetAvailableTime = useCallback(() => {
    const availableTimes = [];
    if (movie) {
      const roundedMovieDuration = Math.ceil(
        parseFloat(`${movie.duration.hour}.${movie.duration.minutes}`),
      );
      console.log("Total movie duration: ", roundedMovieDuration)

      // Pushing 8:00 AM to 10:00 PM times
      for (let i = 1; i <= Math.ceil(22 / roundedMovieDuration); i++){
        // 
      }
    }
    

    setAvailableTimes(availableTimes);
  }, [movie]);

  useEffect(() => {
    if (movieId) {
      handleGetMovieDetails();
    }
  }, [handleGetMovieDetails, movieId]);

  useEffect(() => {
    (() => {
      handleGetAvailableTime();
    })();
  }, [handleGetAvailableTime]);

  return movie ? (
    <div className={style.container}>
      <SelectedMovieDetails />
      <div className={style["date-container"]}>
        <div className={style.month}>
          <p>{date.toLocaleString("en-US", { month: "short" })}</p>
        </div>
        <div className={style.dates}>
          {Array(5)
            .fill("")
            .map((_, index) =>
              date.getDate() + index + 1 <= totalDaysInCurrentMonth ? (
                <div
                  className={
                    selectedDateDetails?.day === date.getDate() + index + 1
                      ? style["active-day"]
                      : style["day"]
                  }
                  onClick={() => {
                    setSelectedDateDetails((pre) => {
                      if (pre) {
                        return { ...pre, day: date.getDate() + index + 1 };
                      } else {
                        return null;
                      }
                    });
                  }}
                  key={index}
                >
                  <p>{date.getDate() + index + 1}</p>
                  <p>
                    {new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() + index + 1,
                    ).toLocaleString("en-US", { weekday: "short" })}
                  </p>
                </div>
              ) : null,
            )}
        </div>
      </div>
      <div className={style["time-container"]}>
        {availableTimes.map((time, index) => (
          <div
            key={index}
            className={
              selectedDateDetails?.time?.hour === time.hour &&
              selectedDateDetails.time?.minutes === time.minutes
                ? style["active-time"]
                : style.time
            }
          >
            <span>
              {time.hour > 12 ? time.hour - 12 : time.hour}:
              {time.minutes.toString().padStart(2, "0")}
            </span>
            {time.hour >= 12 ? <span> PM</span> : <span> AM</span>}
          </div>
        ))}
      </div>
    </div>
  ) : loading ? (
    <div className={style["spinner-container"]}>
      <Spinner size={25} color={theme === "dark" ? "white" : "black"} />
    </div>
  ) : (
    <NoResult />
  );
};

export default ShowDetails;
