import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import style from "../../styles/pages/theaterDetails.module.scss";
import TheaterDetailsCard from "../theaterDetails/TheaterDetailsCard";
import TheaterSeatLayout from "../theaterDetails/TheaterSeatLayout";
import type { Theater } from "../../types/theater";
import {
  approveTheaterApi,
  deleteTheaterApi,
  getTheaterDetailsApi,
} from "../../api/theater";
import { useNavigate, useParams } from "react-router";
import Spinner from "../ui/Spinner";
import { useAppSelector } from "../../store/hooks";
import Button from "../ui/Button";
import { ToastProvider } from "../context/providers/ToastProvider";
import { deleteTheaterImageApi } from "../../api/media";
import NoResult from "../ui/NoResult";
import PageDetails from "../ui/PageDetails";

const TheaterDetails = () => {
  const [theaterDetails, setTheaterDetails] = useState<Theater | null>(null);
  const { theaterId } = useParams();
  const { theme } = useAppSelector((state) => state.theme);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const toastContext = useContext(ToastProvider);
  const navigate = useNavigate();

  // Function for fetching theater details
  const handleGetTheaterDetails = useCallback(async () => {
    const result = await getTheaterDetailsApi(theaterId as string);
    if (result.success) {
      setTheaterDetails(result.theater);
    }
  }, [theaterId])

  const handleApproveTheaterRequest = async () => {
    if (!theaterDetails) return;

    setApproveLoading(true);
    const result = await approveTheaterApi(theaterDetails.id);

    if (result.success) {
      toastContext?.triggerToastMessage("Theater is approved", "SUCCESS");
      navigate("/admin/theater-requests");
    } else {
      toastContext?.triggerToastMessage("Theater couldn't approve", "ERROR");
    }

    setApproveLoading(false);
  };

  // Function for deleting theater request
  const handleDeleteTheaterRequest = async () => {
    if (!theaterDetails) return;

    setDeleteLoading(true);
    const theaterResult = await deleteTheaterApi(theaterDetails.id);

    if (theaterResult.success) {
      const imageResult = await deleteTheaterImageApi(theaterDetails.id);

      if (imageResult.success) {
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

    setDeleteLoading(false);
  };

  useEffect(() => {
    (() => {
      if (!theaterId) return;
      handleGetTheaterDetails();
    })();
  }, [theaterId, handleGetTheaterDetails]);

  return (
    <div className={style.container}>
      {/* Page Details */}
      <div className={style["page-details"]}>
        <PageDetails
          title="Theater Details"
          about="This section allows to see the theater details which provided by theater owner"
          backButton
          navigationUrl="/admin/theater-requests"
        />
      </div>
      {/* Details */}
      {theaterDetails ? (
        <>
          <Suspense
            fallback={
              <Spinner color={theme === "dark" ? "white" : "black"} size={25} />
            }
          >
            <div className={style.details}>
              <TheaterDetailsCard theaterDetails={theaterDetails} />
              <TheaterSeatLayout
                layoutNumber={theaterDetails.layout_number || 0}
                setsNumber={theaterDetails.sets_number || 0}
                rowsNumber={theaterDetails.rows_number || 0}
                seatNumber={theaterDetails.seats_number || 0}
              />
            </div>
          </Suspense>
          <div className={style["button-container"]}>
            <Button
              className={style["approve-button"]}
              disabled={deleteLoading || approveLoading ? true : false}
              onClick={() => handleApproveTheaterRequest()}
            >
              {approveLoading ? (
                <Spinner
                  color={theme === "dark" ? "white" : "black"}
                  size={18}
                />
              ) : (
                <>Approve</>
              )}
            </Button>
            <Button
              className={style["refuse-button"]}
              disabled={deleteLoading || approveLoading ? true : false}
              onClick={() => handleDeleteTheaterRequest()}
            >
              {deleteLoading ? (
                <Spinner
                  color={theme === "dark" ? "white" : "black"}
                  size={18}
                />
              ) : (
                <>Refuse</>
              )}
            </Button>
          </div>
        </>
      ) : (
        <NoResult />
      )}
    </div>
  );
};

export default TheaterDetails;
