import {
  Activity,
  useCallback,
  useContext,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import style from "../../styles/theaterRequests/theaterRequestList.module.scss";
import Button from "../ui/Button";
import {
  Calendar as DateIcon,
  MapPinIcon as LocationIcon,
  Armchair as SeatIcon,
} from "lucide-react";
import {
  approveTheaterApi,
  deleteTheaterApi,
  getTheaterRequestsApi,
} from "../../api/theater";
import { convertIsoDateToNormalFormat } from "../../utils/convertIsoDateToNoramlFormat";
import useObserver from "../hooks/useObserver";
import { useNavigate } from "react-router";
import { ToastProvider } from "../context/providers/ToastProvider";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearState,
  incrementPage,
  theaterFailed,
  theaterRequest,
  theaterSuccess,
} from "../../store/theaterSlice";
import TheaterSkeleton from "./TheaterSkeleton";
import { deleteTheaterImageApi } from "../../api/media";
import NoResult from "../ui/NoResult";
import { addNotificationApi } from "../../api/notification";

const TheaterRequestList = () => {
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { loading, theaters, pagination } = useAppSelector(
    (state) => state.theater,
  );
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { ref, isIntersecting } = useObserver<HTMLDivElement>({
    threshold: 0.5,
  });
  const navigate = useNavigate();
  const toastContext = useContext(ToastProvider);
  const [optimisticTheatersRequests, setOptimisticTheaterRequests] =
    useOptimistic(theaters, (state, id: string) => {
      return state.filter((theater) => theater.id !== id);
    });
  const startTransition = useTransition()[1];
  const [approveLoadingDetails, setApproveLoadingDetails] = useState<{
    loading: boolean;
    theaterId: string;
  }>({
    loading: false,
    theaterId: "",
  });
  const [deleteLoadingDetails, setDeleteLoadingDetails] = useState<{
    loading: boolean;
    theaterId: string;
  }>({
    loading: false,
    theaterId: "",
  });

  // Function for getting theater requests
  const handleGetTheaterRequests = useCallback(async () => {
    dispatch(theaterRequest());

    const result = await getTheaterRequestsApi(
      pagination.page,
      pagination.limit,
    );
    if (result.success) {
      dispatch(
        theaterSuccess({
          theaters: result.theaters,
          page: pagination.page,
          filter: false,
        }),
      );

      if (result.theaters?.length < pagination.limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } else {
      dispatch(theaterFailed({ errorMessage: result.errorMessage }));
    }
  }, [dispatch, pagination.limit, pagination.page]);

  // Function for approving theater request
  const handleApproveTheaterRequest = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    theaterId: string,
    ownerId: string
  ) => {
    // For stopping parent click event
    event.stopPropagation();

    setApproveLoadingDetails({
      loading: true,
      theaterId: theaterId,
    });
    const [result] = await Promise.all([
      approveTheaterApi(theaterId),
      addNotificationApi({
        userId: ownerId,
        success: true,
        title: 'Theater request is approved',
        message: "Your request has been approved. You now have full access to your administrative dashboard. You can begin adding screens, scheduling shows, and managing ticket inventory immediately.",
        type: "theater",
        metadata: {
          id: theaterId,
          action: "check_dashboard"
        }
      })
    ])

    if (result.success) {
      startTransition(() => {
        setOptimisticTheaterRequests(theaterId);

        const filteredTheater = theaters.filter(
          (theater) => theater.id !== theaterId,
        );
        dispatch(theaterSuccess({ theaters: filteredTheater, filter: true }));
      });

      toastContext?.triggerToastMessage("Theater is approved", "SUCCESS");
    } else {
      toastContext?.triggerToastMessage("Theater couldn't approve", "ERROR");
    }

    setApproveLoadingDetails({
      loading: false,
      theaterId: "",
    });
  };

  // Function for deleting theater request
  const handleDeleteTheaterRequest = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    theaterId: string,
    ownerId: string
  ) => {
    // For stopping parent click event
    event.stopPropagation();

    setDeleteLoadingDetails({
      loading: true,
      theaterId: theaterId,
    });
    const [theaterResult] = await Promise.all([
      deleteTheaterApi(theaterId),
      addNotificationApi({
        userId: ownerId,
        success: false,
        type: "theater",
        title: "Theater request is refused",
        message: "Your request has been refused. Please check the terms and condition for approving the theater request",
        metadata: {
          id: theaterId,
          action: "check_dashboard"
        }
      })
    ]);

    if (theaterResult.success) {
      const imageResult = await deleteTheaterImageApi(theaterId);

      if (imageResult.success) {
        startTransition(() => {
          setOptimisticTheaterRequests(theaterId);

          const filteredTheater = theaters.filter(
            (theater) => theater.id !== theaterId,
          );
          dispatch(theaterSuccess({ theaters: filteredTheater, filter: true }));
        });

        toastContext?.triggerToastMessage(
          "Theater request is refused",
          "SUCCESS",
        );
      } else {
        toastContext?.triggerToastMessage(
          "Theater request is couldn't refuse",
          "ERROR",
        );
      }
    } else {
      toastContext?.triggerToastMessage(
        "Theater request is couldn't refuse",
        "ERROR",
      );
    }

    setDeleteLoadingDetails({
      loading: false,
      theaterId: "",
    });
  };

  useEffect(() => {
    (() => {
      handleGetTheaterRequests();
    })();

    return () => {
      dispatch(theaterSuccess({ theaters: [] }));
    };
  }, [pagination.page, handleGetTheaterRequests, dispatch]);

  useEffect(() => {
    if (!isIntersecting || loading || !hasMore) return;

    (() => {
      dispatch(incrementPage());
    })();
  }, [isIntersecting, loading, hasMore, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  return optimisticTheatersRequests.length ? (
    <div className={style.container}>
      {/* Theater requests list */}
      <div className={style["list"]}>
        {optimisticTheatersRequests.map((theaterRequest) => (
          <div
            key={theaterRequest.id}
            className={style["theater-details-container"]}
            onClick={() =>
              navigate(`/admin/theater-requests/${theaterRequest.id}`)
            }
          >
            <p className={style.status}>Pending Review</p>
            {/* Theater image */}
            <img
              src={theaterRequest.theater_image.image_url}
              className={style["theater-image"]}
              loading="lazy"
            />
            <div className={style["theater-details"]}>
              {/* Theater title */}
              <h1>{theaterRequest.theater_name}</h1>
              {/* Theater location */}
              <div className={style.details}>
                <LocationIcon size={18} className={style.icon} />
                <p>{theaterRequest.theater_location}</p>
              </div>
              {/* Theater request date */}
              <div className={style.details}>
                <DateIcon size={18} className={style.icon} />
                <p>{convertIsoDateToNormalFormat(theaterRequest.createdAt)}</p>
              </div>
              {/* Theater total seats */}
              <div className={style.details}>
                <SeatIcon size={18} className={style.icon} />
                <p>
                  {theaterRequest.layout_number *
                    theaterRequest.sets_number *
                    theaterRequest.rows_number *
                    theaterRequest.seats_number}{" "}
                  seats
                </p>
              </div>
              <div className={style["button-container"]}>
                <Button
                  className={style["button"]}
                  onClick={(event) =>
                    handleDeleteTheaterRequest(event, theaterRequest.id, theaterRequest.owner_id)
                  }
                  disabled={
                    approveLoadingDetails.loading ||
                      deleteLoadingDetails.loading
                      ? true
                      : false
                  }
                  loading={
                    deleteLoadingDetails.loading &&
                    deleteLoadingDetails.theaterId === theaterRequest.id
                  }
                  loadingSpinnerColor={theme === "dark" ? "white" : "black"}
                  spinnerSize={15}
                  title="Refuse"
                />
                <Button
                  className={style["button"]}
                  disabled={
                    approveLoadingDetails.loading ||
                      deleteLoadingDetails.loading
                      ? true
                      : false
                  }
                  onClick={(event) =>
                    handleApproveTheaterRequest(event, theaterRequest.id, theaterRequest.owner_id)
                  }
                  loading={
                    approveLoadingDetails.loading &&
                    approveLoadingDetails.theaterId === theaterRequest.id
                  }
                  loadingSpinnerColor={"black"}
                  title="Approve"
                  spinnerSize={15}
                />
              </div>
            </div>
          </div>
        ))}
        <Activity mode={loading ? "visible" : "hidden"}>
          <TheaterSkeleton />
        </Activity>
      </div>
      <Activity mode={hasMore ? "visible" : "hidden"}>
        <div ref={ref}></div>
      </Activity>
    </div>
  ) : (
    <NoResult />
  );
};

export default TheaterRequestList;
