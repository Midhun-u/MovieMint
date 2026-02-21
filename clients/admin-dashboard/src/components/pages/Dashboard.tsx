import DashboardLogs from "../dashboard/DashboardLogs";
import MovieCard from "../movies/MovieCard";
import style from "../../styles/pages/dashboard.module.scss";
import { Trash as DeleteIcon } from "lucide-react";
import PageDetails from "../ui/PageDetails";
import { useCallback, useEffect } from "react";
import { getAllBannersApi } from "../../api/movie";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  bannerFailed,
  bannerRequest,
  bannerSuccess,
} from "../../store/bannerSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { loading, banners } = useAppSelector((state) => state.banner);

  // Function for fetching banners
  const handleFetchBanners = useCallback(async () => {
    dispatch(bannerRequest());
    const result = await getAllBannersApi();

    if (result.success) {
      dispatch(bannerSuccess({ banners: result.banners }));
    } else {
      dispatch(bannerFailed({ errorMessage: result.errorMessage }));
    }
  }, [dispatch]);

  useEffect(() => {
    handleFetchBanners();
  }, [handleFetchBanners]);

  return (
    <div className={style.container}>
      {/* Performance overview or dashboard logs */}
      <div className={style["dashboard-logs"]}>
        <PageDetails
          title="Performance Overview"
          about="View the overview of bookings, upcoming movies and more ."
          backButton={false}
        />
        <DashboardLogs />
      </div>
      {/* Movie banner section */}
      <div className={style["movie-banner-section"]}>
        <PageDetails
          title="Banner Movies"
          about="View, edit and manage banner movies"
          backButton={false}
        />
        <div className={style["movies-card-container"]}>
          {banners.map((banner) => (
            <div
              className={style["movie-card"]}
              key={banner._id}
            >
              <MovieCard
                poster={banner.movie.poster.image_url}
                title={banner.movie.title}
                categories={banner.movie.categories}
                certificate={banner.movie.certificate}
                language={banner.movie.language}
              />
              <div className={style["delete-icon-container"]}>
                <DeleteIcon
                  size={22}
                  strokeWidth={1.7}
                  className={style["delete-icon"]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
