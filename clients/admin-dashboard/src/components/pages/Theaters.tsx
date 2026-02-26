import PageDetails from "../ui/PageDetails";
import style from "../../styles/pages/theaters.module.scss";
import SearchBarInput from "../ui/SearchBar";
import {
  Activity,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from "react";
import TabBar from "../layout/TabBar";
import { getTheatersApi } from "../../api/theater";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearState,
  incrementPage,
  theaterFailed,
  theaterRequest,
  theaterSuccess,
} from "../../store/theaterSlice";
import TheaterList from "../theaters/TheaterList";
import useObserver from "../hooks/useObserver";

const Theaters = () => {
  const [status, setStatus] = useState<string>("");
  const dispatch = useAppDispatch();
  const { loading, pagination } = useAppSelector((state) => state.theater);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { isIntersecting, ref } = useObserver<HTMLDivElement>({
    threshold: 0.5,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Function fetching theaters
  const handleFetchTheaters = useCallback(
    async () => {
      dispatch(theaterRequest());
      const result = await getTheatersApi(
        pagination.page,
        pagination.limit,
        searchQuery,
        status,
      );
      if (result.success) {
        dispatch(
          theaterSuccess({
            theaters: result.theaters,
            page: pagination.page,
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
    },
    [pagination.page, pagination.limit, dispatch, searchQuery, status],
  );

  // Function for storing search query with debouncing feature
  function debounce<
    Type extends (event: ChangeEvent<HTMLInputElement>) => void,
  >(fn: Type, delay: number) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      let timer: ReturnType<typeof setTimeout> | null = null;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(event);
      }, delay);
    };
  }
  const handleChangeEvent = debounce((event) => {
    setSearchQuery(event.target.value);
  }, 500);

  useEffect(() => {
    (() => {
      handleFetchTheaters();
    })();
  }, [handleFetchTheaters, pagination.page]);

  useEffect(() => {
    if (!isIntersecting || loading || !hasMore) return;

    (() => {
      dispatch(incrementPage());
    })();
  }, [isIntersecting, loading, hasMore, dispatch]);

  useEffect(() => {
    (() => {
      dispatch(clearState());
    })();
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, searchQuery, status]);

  return (
    <div className={style.container}>
      {/* Page details */}
      <PageDetails
        title="Theaters"
        about="This section allows to see the theaters which are approved"
        backButton={false}
      />
      {/* Search Bar  */}
      <div className={style["search-bar-container"]}>
        <SearchBarInput onChange={handleChangeEvent} />
      </div>
      {/* Tab bar */}
      <TabBar
        values={[
          {
            title: "All",
            value: "",
          },
          {
            title: "Available",
            value: "AVAILABLE",
          },
          {
            title: "Not Available",
            value: "NOT_AVAILABLE",
          },
        ]}
        activeValue={status}
        setValue={setStatus}
      />
      {/* Theaters List */}
      <div className={style["list-container"]}>
        <TheaterList />
      </div>
      <Activity mode={hasMore || !loading ? "visible" : "hidden"}>
        <div ref={ref}></div>
      </Activity>
    </div>
  );
};

export default Theaters;
