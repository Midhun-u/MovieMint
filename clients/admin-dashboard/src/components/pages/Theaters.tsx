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
  theaterFailed,
  theaterSuccess,
} from "../../store/theaterSlice";
import TheaterList from "../theaters/TheaterList";
import useObserver from "../hooks/useObserver";

const Theaters = () => {
  const [status, setStatus] = useState<string>("");
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 1,
  });
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.theater);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { isIntersecting, ref } = useObserver<HTMLDivElement>({
    threshold: 0.5,
  });

  // Function fetching theaters
  const handleFetchTheaters = useCallback(
    async (theaterName: string = "") => {
      const result = await getTheatersApi(
        pagination.page,
        pagination.limit,
        theaterName,
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
    },
    [pagination.page, pagination.limit, dispatch],
  );

  // Function for searching theater
  const debounceSearch = useCallback(
    (searchQuery: string) => {  
      setTimeout(() => {
        handleFetchTheaters(searchQuery);
      }, 500);
    },
    [handleFetchTheaters],
  );

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    debounceSearch(event.target.value);
  };

  useEffect(() => {
    (() => {
      handleFetchTheaters();
    })();
  }, [handleFetchTheaters, pagination.page]);

  useEffect(() => {
    if (!isIntersecting || loading || !hasMore) return;

    (() => {
      setPagination((pre) => {
        return { ...pre, page: pre.page + 1 };
      });
    })();
  }, [isIntersecting, loading, hasMore]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

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
      <Activity mode={hasMore ? "visible" : "hidden"}>
        <div ref={ref}></div>
      </Activity>
    </div>
  );
};

export default Theaters;
