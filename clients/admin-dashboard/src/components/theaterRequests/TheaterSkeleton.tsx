import style from "../../styles/theaterRequests/theaterSkeleton.module.scss";

interface TheaterSkeletonProps {
  showOwnerUISkeleton?: boolean;
}

const TheaterSkeleton = ({ showOwnerUISkeleton }: TheaterSkeletonProps) => {
  return (
    <>
      {Array(2)
        .fill(null)
        .map((_, index) => (
          <div className={style.details} key={index}>
            <div className={style["image-ui"]}></div>
            <div className={style["title-ui"]}></div>
            <div className={style["other-details-ui"]}>
              <div className={style["detail-ui"]}></div>
              <div className={style["detail-ui"]}></div>
              <div className={style["detail-ui"]}></div>
            </div>
            {showOwnerUISkeleton ? (
              <div className={style["owner-ui"]}>
                <div className={style["owner-image-ui"]}></div>
                <div className={style["details-ui"]}>
                  <div className=""></div>
                  <div className=""></div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
    </>
  );
};

export default TheaterSkeleton;
