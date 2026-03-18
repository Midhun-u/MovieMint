import { useAppSelector } from "../../store/hooks";
import style from "../../styles/theaters/theaterList.module.scss";
import {
  MapPin as LocationIcon,
  Calendar as DateIcon,
  Armchair as SeatIcon,
} from "lucide-react";
import { convertIsoDateToNormalFormat } from "../../utils/convertIsoDateToNoramlFormat";
import NoResult from "../ui/NoResult";
import Button from "../ui/Button";
import { useNavigate } from "react-router";
import TheaterSkeleton from "../theaterRequests/TheaterSkeleton";
import { Activity } from "react";
import NullProfilePic from "../ui/NullProfilePic";

const TheaterList = () => {
  const { theaters, loading } = useAppSelector((state) => state.theater);
  const navigate = useNavigate();

  return theaters.length || loading ? (
    <>
      <div className={style.container}>
        {theaters.map((theater) => (
          <div key={theater.id} className={style.card}>
            {/* Status */}
            <span
              className={
                theater.status === "AVAILABLE"
                  ? style["available-status"]
                  : style["not-available-status"]
              }
            >
              {theater.status === "AVAILABLE" ? (
                <>Available</>
              ) : (
                <>Not Available</>
              )}
            </span>
            {/* Theater logo */}
            <img
              loading="lazy"
              className={style.image}
              src={theater.theater_image.image_url}
            />
            {/* Theater name */}
            <h1>{theater.theater_name}</h1>
            {/* Theater other details */}
            <div className={style["theater-details-container"]}>
              {/* Theater location */}
              <div className={style["theater-details"]}>
                <LocationIcon className={style.icon} size={18} />
                <p>{theater.theater_location}</p>
              </div>
              {/* Theater registered date */}
              <div className={style["theater-details"]}>
                <DateIcon className={style.icon} size={18} />
                <p>{convertIsoDateToNormalFormat(theater.createdAt)}</p>
              </div>
              {/* Theater total seats */}
              <div className={style["theater-details"]}>
                <SeatIcon className={style.icon} size={18} />
                <p>
                  {theater.layout_number *
                    theater.sets_number *
                    theater.rows_number *
                    theater.seats_number}{" "}
                  seats
                </p>
              </div>
              {/* Theater owner details */}
              <div className={style["theater-owner-details"]}>
                {/* Theater owner image */}
                {
                  theater.theater_owner?.profile_image?.image_url
                  ?
                  <img
                    loading="lazy"
                    src={theater.theater_owner.profile_image.image_url}
                  />
                  :
                  <NullProfilePic
                  />
                }
                <div className={style["details"]}>
                  <p>
                    {theater.theater_owner.firstname +
                      " " +
                      theater.theater_owner.lastname}
                  </p>
                  <p>{theater.theater_owner.email}</p>
                </div>
              </div>
              <Button
                className={style["details-button"]}
                onClick={() => navigate(`/admin/theaters/${theater.id}`)}
                title="See Details"
              />
            </div>
          </div>
        ))}
        <Activity mode={loading ? "visible" : "hidden"}>
          <TheaterSkeleton showOwnerUISkeleton />
        </Activity>
      </div>
    </>
  ) : (
    <NoResult />
  );
};

export default TheaterList;
