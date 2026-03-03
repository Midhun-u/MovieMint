import {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useId,
  useContext,
} from "react";
import style from "../../styles/addShowDetails/showDetails.module.scss";
import { getMovieApi } from "../../api/movie";
import { useNavigate, useParams } from "react-router";
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
import { ToastProvider } from "../context/providers/ToastProvider";
import { createShowApi } from "../../api/show";
import FormLabel from "../form/FormLabel";
import { showFailed, showRequest, showSuccess } from "../../store/showSlice";

const ShowDetails = () => {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const { movie, loading: movieLoading } = useAppSelector(
    (state) => state.movie,
  );
  const {loading: showLoading} = useAppSelector(state => state.show)
  const { theme } = useAppSelector((state) => state.theme);
  const { theater } = useAppSelector((state) => state.theater);
  const date = useMemo(() => new Date(), []);
  const totalDaysInCurrentMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();
  const [selectedDay, setSelectedDay] = useState<number>(date.getDate() + 1);
  const [selectedTimes, setSelectedTime] = useState<
    Array<{ hour: number, minutes: number }>
  >([{ hour: 4, minutes: 0 }]);
  const [availableTimes, setAvailableTimes] = useState<
    Array<{ hour: number, minutes: number }>
  >([]);
  const priceId = useId();
  const { register, handleSubmit } = useForm<{ price: string }>();
  const toastContext = useContext(ToastProvider);
  const navigate = useNavigate()

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

  // Function for storing times
  const handleStoreTimes = (time: { hour: number; minutes: number }) => {
    const isTimeSelected = selectedTimes.some(
      (selectedTime) =>
        selectedTime.hour === time.hour &&
        selectedTime.minutes === time.minutes,
    );

    if (isTimeSelected) {
      const filteredSelectedTimes = selectedTimes.filter(
        (selectedTime) =>
          selectedTime.hour !== time.hour &&
          selectedTime.minutes !== time.minutes,
      );
      setSelectedTime(filteredSelectedTimes);
    } else {
      setSelectedTime((pre) => [...pre, time]);
    }
  };

  // Function for submitting form
  const handleSubmitForm: SubmitHandler<{ price: string }> = async (data) => {
    const priceNumber = parseInt(data.price || "0");

    if (!movie) {
      return;
    }

    if (!priceNumber) {
      return toastContext?.triggerToastMessage(
        "Enter the proper show price",
        "ERROR",
      );
    }

    if (!selectedDay || !selectedTimes.length) {
      toastContext?.triggerToastMessage("Select proper day and time", "ERROR");
      return;
    }

    dispatch(showRequest())
    const showsResult = await Promise.all(
      selectedTimes.map(async (selectedTime) => {

        const result = await createShowApi({
          theaterId: theater.id,
          movieId: movie._id as string,
          price: priceNumber,
          hour: selectedTime.hour,
          minutes: selectedTime.minutes,
          startDay: selectedDay,
        });

        if(result.success){
          return {success: true, show: result.show}
        }else{
          return {success: false, show: {}, errorMessage: result.errorMessage}
        }
        
      }) || [],
    );

    // Checking if any result failed
    if(showsResult.some((result) => !result.success)){
      dispatch(showFailed({errorMessage: showsResult.find((result) => result.errorMessage)}))
      toastContext?.triggerToastMessage("Couldn't create shows", "ERROR")
    }else{

      dispatch(showSuccess({shows: showsResult.map((result) => result.show)}))
      toastContext?.triggerToastMessage("Shows are created", "SUCCESS")

      navigate(-1)
    }

  };

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
        <div className={style["section-title"]}>
          <FormLabel title="Starting Day" />
        </div>
        <div className={style["date-details"]}>
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
                      selectedDay === date.getDate() + index + 1
                        ? style["active-day"]
                        : style["day"]
                    }
                    onClick={() => setSelectedDay(date.getDate() + index + 1)}
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
      </div>
      <div className={style["time-container"]}>
        <div className={style["section-title"]}>
          <FormLabel title="Available Times" />
        </div>
        <div className={style.times}>
          {availableTimes.map((time, index) => (
            <div
              key={index}
              className={
                selectedTimes.some(
                  (selectedTime) =>
                    selectedTime.hour === time.hour &&
                    selectedTime.minutes === time.minutes,
                )
                  ? style["active-time"]
                  : style.time
              }
              onClick={() => handleStoreTimes(time)}
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
      <form onSubmit={handleSubmit(handleSubmitForm)} className={style.form}>
        <FormInput
          Icon={PriceIcon}
          inputFieldName="price"
          inputType="input"
          labelTitle="Price"
          id={priceId}
          minLength={1}
          maxLength={4}
          register={register}
          type="number"
          placeholder="Enter show price"
        />
        <Button
          title="Submit"
          className={style["submit-button"]}
          type="submit"
          loading={showLoading}
          disabled={showLoading}
        />
      </form>
    </div>
  ) : movieLoading ? (
    <div className={style["spinner-container"]}>
      <Spinner size={25} color={theme === "dark" ? "white" : "black"} />
    </div>
  ) : (
    <NoResult />
  );
};

export default ShowDetails;
