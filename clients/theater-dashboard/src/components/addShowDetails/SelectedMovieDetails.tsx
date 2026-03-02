import { useAppSelector } from "../../store/hooks";
import style from "../../styles/addShowDetails/selectedMovieDetails.module.scss";
import {
  Drama as CategoryIcon,
  Grid3x2 as CertificateIcon,
  Languages as LanguageIcon,
  Tv as FormatIcon,
  Clock as DurationIcon
} from "lucide-react";

const SelectedMovieDetails = () => {
  const { movie } = useAppSelector((state) => state.movie);

  return (
    <div className={style.container}>
      {/* Movie poster */}
      <img className={style.poster} src={movie?.poster.image_url} />
      {/* Movie details */}
      <div className={style["movie-details"]}>
        {/* Title */}
        <h1 className={style.title}>{movie?.title}</h1>
        {/* Movie categories */}
        <div className={style.details}>
          <CategoryIcon size={19} className={style.icon} />
          <p>{movie?.categories.join(", ")}</p>
        </div>
        {/* Other details */}
        <div className={style['details-container']}>
          {/* Movie certificate */}
          <div className={style.details}>
            <CertificateIcon size={19} className={style.icon} />
            <p>{movie?.certificate}</p>
          </div>
          {/* Movie language */}
          <div className={style.details}>
            <LanguageIcon size={19} className={style.icon} />
            <p>{movie?.language}</p>
          </div>
          {/* Movie formats */}
          <div className={style.details}>
            <FormatIcon size={19} className={style.icon} />
            <p>{movie?.formats.join(", ")}</p>
          </div>
          {/* Movie duration */}
          <div className={style.details}>
            <DurationIcon
              size={19}
              className={style.icon}
            />
            <p>{movie?.duration.hour}H { movie?.duration.minutes }M</p>
          </div>
          <p className={style.status}>
            Available
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectedMovieDetails;
