import { useCallback, useEffect, useState, useMemo, useId } from "react";
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
import FormInput from "../form/FormInput";
import { Banknote as PriceIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../ui/Button";

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
  }>({ day: date.getDate() + 1, time: { hour: 4, minutes: 0 } });
  const [availableTimes, setAvailableTimes] = useState<
    Array<{ hour: number; minutes: number }>
  >([]);
  const priceId = useId();
  const {register, handleSubmit} = useForm<{price: number}>()

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
    const availableTimes = [{ hour: 4, minutes: 0 }];
    if (movie) {
      const roundedMovieDuration = Math.ceil(
        parseFloat(`${movie.duration.hour}.${movie.duration.minutes}`),
      );

      // Pushing 4:00 AM to 6:00 PM times
      for (let i = 1; i <= Math.ceil(24 / roundedMovieDuration); i++) {
        const nextShowStartTimeHour =
          availableTimes[i - 1].hour + roundedMovieDuration;

        const nextShowStartTimeMinutes =
          availableTimes[i - 1].minutes + movie.duration.minutes;

        // Checking if next show time is less than 6:00 PM
        if (nextShowStartTimeHour <= 18) {
          availableTimes.push({
            hour:
              nextShowStartTimeMinutes > 60
                ? nextShowStartTimeHour + 1
                : nextShowStartTimeHour,
            minutes:
              nextShowStartTimeMinutes > 60
                ? nextShowStartTimeMinutes - 60
                : nextShowStartTimeMinutes,
          });
        } else {
          break;
        }
      }
    }

    setAvailableTimes(availableTimes);
  }, [movie]);
  
  // Function for submitting form 
  const handleSubmitForm: SubmitHandler<{price: number}> = (data) => {
    console.log(data)
  }

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
                      return { ...pre, day: date.getDate() + index + 1 };
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
      <form onSubmit={handleSubmit(handleSubmitForm)} className={style.form}>
        <FormInput
          Icon={PriceIcon}
          inputFieldName="price"
          inputType="input"
          labelTitle="Price"
          id={priceId}
          minLength={1}
          maxLength={3}
          register={register}
          type="number"
          placeholder="Enter show price"
        />
        <Button
          title="Submit"
          className={style['submit-button']}
          type="submit"
        />
      </form>
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
