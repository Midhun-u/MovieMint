import DashboardLogs from "../dashboard/DashboardLogs";
import MovieCard from "../movies/MovieCard";
import style from "../../styles/pages/dashboard.module.scss";
import { Trash as DeleteIcon } from "lucide-react";
import PageDetails from "../ui/PageDetails";
import { Activity, useCallback, useEffect } from "react";
import {
  getAllBannersApi,
  getMovieDashboardLogsApi,
  removeBannerApi,
} from "../../api/movie";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  bannerFailed,
  bannerRequest,
  bannerSuccess,
} from "../../store/bannerSlice";
import NoResult from "../ui/NoResult";
import MovieSkeleton from "../movies/MovieSkeleton";
import { getTheaterDashboardLogs } from "../../api/theater";
import {
  dashboardFailed,
  dashboardRequest,
  dashboardSuccess,
} from "../../store/dashboardSlice";

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

  // Function for deleting banner
  const handleDeleteBanner = async (id: string) => {
    dispatch(bannerRequest());

    const result = await removeBannerApi(id);
    if (result.success) {
      dispatch(
        bannerSuccess({
          banners: banners.filter((banner) => banner._id !== id),
        }),
      );
    } else {
      dispatch(bannerFailed({ errorMessage: result.errorMessage }));
    }
  };

  // Function for getting dashboard logs
  const handleGetDashboardLogs = useCallback(async () => {
    dispatch(dashboardRequest());
    const [movieDashboardResult, theaterDashboardResult] = await Promise.all([
      getMovieDashboardLogsApi(),
      getTheaterDashboardLogs(),
    ]);

    if (movieDashboardResult.success || theaterDashboardResult.success) {
      
      dispatch(
        dashboardSuccess({
          pendingMovies: movieDashboardResult?.pendingMoviesCount || 0,
          todayBookings: 0,
          pendingTheaters: theaterDashboardResult?.pendingTheatersCount || 0,
          totalBookings: 0,
          totalTheaters: theaterDashboardResult?.availableTheatersCount || 0,
        }),
      );
    } else {
      dispatch(
        dashboardFailed({
          errorMessage:
            movieDashboardResult?.errorMessage ||
            theaterDashboardResult?.errorMessage,
        }),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    handleFetchBanners();
    handleGetDashboardLogs();
  }, [handleFetchBanners, handleGetDashboardLogs]);

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
            <div className={style["movie-card"]} key={banner._id}>
              <MovieCard
                poster={banner.movie.poster.image_url}
                title={banner.movie.title}
                categories={banner.movie.categories}
                certificate={banner.movie.certificate}
                language={banner.movie.language}
                status={banner.movie.status}
              />
              {loading ? (
                <div className={style["delete-icon-container"]}>
                  <DeleteIcon
                    size={22}
                    strokeWidth={1.7}
                    className={style["disable-delete-icon"]}
                  />
                </div>
              ) : (
                <div
                  onClick={() => handleDeleteBanner(banner._id)}
                  className={style["delete-icon-container"]}
                >
                  <DeleteIcon
                    size={22}
                    strokeWidth={1.7}
                    className={style["delete-icon"]}
                  />
                </div>
              )}
            </div>
          ))}
          <Activity mode={loading ? "visible" : "hidden"}>
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <MovieSkeleton key={index} />
              ))}
          </Activity>
        </div>
        {!banners.length ? <NoResult /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
