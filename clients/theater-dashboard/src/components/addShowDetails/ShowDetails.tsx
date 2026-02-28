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
  } | null>(null);
  const [availableTimes, setAvailableTimes] = useState<Array<{ hour: number }>>(
    [],
  );

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
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const availableTimes = [];

    if (selectedDateDetails?.day === currentDay) {
      const currentHour = currentDate.getHours(); // For storing current hour before setting to constant
      currentDate.setHours(22); // Setting hour to constant 8:00PM

      for (
        let i = currentHour < 8 ? 8 : currentHour;
        i <= currentDate.getHours();
        i++
      ) {
        availableTimes.push({ hour: i });
      }
    } else {
      for (let i = 8; i <= 22; i++) {
        // Pushing 8:00 AM to 10:00 PM times
        for (let i = 8; i <= 22; i++) {
          availableTimes.push({ hour: i, minute: 0 });
        }
      }
    }
  }, [selectedDateDetails?.day]);

  useEffect(() => {
    if (movieId) {
      handleGetMovieDetails();
    }
  }, [handleGetMovieDetails, movieId]);

  useEffect(() => {
    (() => {
      setSelectedDateDetails({
        day: date.getDate(),
        time: {
          hour: 0,
          minutes: 0,
        },
      });
    })();
  }, [date]);

  useEffect(() => {
    handleGetAvailableTime();
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
              date.getDate() + index <= totalDaysInCurrentMonth ? (
                <div
                  className={
                    selectedDateDetails?.day === date.getDate() + index
                      ? style["active-day"]
                      : style["day"]
                  }
                  key={index}
                >
                  <p>{date.getDate() + index}</p>
                  <p>
                    {new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate() + index,
                    ).toLocaleString("en-US", { weekday: "short" })}
                  </p>
                </div>
              ) : null,
            )}
        </div>
      </div>
      <div className={style["time-container"]}></div>
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
