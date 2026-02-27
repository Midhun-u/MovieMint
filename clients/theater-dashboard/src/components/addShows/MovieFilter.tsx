import {
  Activity,
  useEffect,
  useState,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from "react";
import style from "../../styles/addShows/movieFilter.module.scss";
import {
  Settings2 as FilterIcon,
  ChevronDown as DownArrowIcon,
  X as CloseIcon,
  ChevronLeft as BackIcon,
} from "lucide-react";
import MovieGenre from "./MovieGenre";
import MovieFormats from "./MovieFormats";
import MovieLanguage from "./MovieLanguage";
import Button from "../ui/Button";
import { FilterProvider } from "../context/providers/FilterContext";

interface MovieFilterProps {
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  setSelectedFormats: Dispatch<SetStateAction<Array<string>>>;
  setSelectedCategories: Dispatch<SetStateAction<Array<string>>>;
}

const MovieFilter = ({
  setSelectedCategories,
  setSelectedFormats,
  setSelectedLanguage,
}: MovieFilterProps) => {
  const [showFilterScreen, setShowFilterScreen] = useState<boolean>(false);
  const [ScreenDetails, setScreenDetails] = useState<{
    title: string;
    Screen: () => JSX.Element | null;
  }>({
    title: "",
    Screen: () => null,
  });
  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("");
  const [categories, setCategories] = useState<Array<string>>([]);
  const [formats, setFormats] = useState<Array<string>>([]);

  // Function for setting screen
  const handleSetScreen = (title: string, screen: () => JSX.Element) => {
    setScreenDetails({ title: title, Screen: screen });
    setShowScreen(true);
  };

  // Function for clearing all filteres
  const handleClearAllFilteres = () => {
    setSelectedCategories([]);
    setCategories([]);
    setSelectedLanguage("");
    setLanguage("");
    setSelectedFormats([]);
    setFormats([]);
    setShowFilterScreen(false);
  };

  // Function for applying filters
  const handleApplyFilters = () => {
    setSelectedCategories(categories);
    setSelectedFormats(formats);
    setSelectedLanguage(language);

    setShowFilterScreen(false);
  };

  useEffect(() => {
    (() => {
      handleSetScreen("genre", MovieGenre);
      setShowScreen(false);
    })();
  }, []);

  return (
    <>
      <div
        onClick={() => setShowFilterScreen(true)}
        className={style.container}
      >
        <FilterIcon className={style.icon} size={15} />
        <span>Filter</span>
        <DownArrowIcon className={style.icon} size={15} />
      </div>
      <Activity mode={showFilterScreen ? "visible" : "hidden"}>
        <div className={style["filter-screen-container"]}>
          <div className={style["background"]}></div>
          <div className={style["filter-screen"]}>
            <div className={style["top-bar"]}>
              <span>Filter By</span>
              <div
                onClick={() => setShowFilterScreen(false)}
                className={style["icon-container"]}
              >
                <CloseIcon className={style.icon} strokeWidth={1.7} size={20} />
              </div>
            </div>
            <div className={style["filter-options"]}>
              <div
                className={showScreen ? style["hide-options"] : style.options}
              >
                <li
                  className={
                    ScreenDetails.title === "genre" ? style.active : ""
                  }
                  onClick={() => handleSetScreen("genre", MovieGenre)}
                >
                  Genre
                </li>
                <li
                  className={
                    ScreenDetails.title === "languages" ? style.active : ""
                  }
                  onClick={() => handleSetScreen("languages", MovieLanguage)}
                >
                  Languages
                </li>
                <li
                  className={
                    ScreenDetails.title === "formats" ? style.active : ""
                  }
                  onClick={() => handleSetScreen("formats", MovieFormats)}
                >
                  Formats
                </li>
              </div>
              <div className={showScreen ? style["show-filter"] : style.filter}>
                <FilterProvider
                  value={{
                    categories: categories,
                    setCategories: setCategories,
                    formats: formats,
                    setFormats: setFormats,
                    language: language,
                    setLanguage: setLanguage,
                  }}
                >
                  <ScreenDetails.Screen />
                </FilterProvider>
              </div>
            </div>
            <div className={style["button-container"]}>
              <Button
                className={
                  showScreen ? style["show-back-button"] : style["back-button"]
                }
                onClick={() => setShowScreen(false)}
              >
                <BackIcon size={20} strokeWidth={1.5} />
                <span>Back</span>
              </Button>
              <Button
                title="Clear Filters"
                onClick={() => handleClearAllFilteres()}
              />
              <Button
                title="Apply Filters"
                onClick={() => handleApplyFilters()}
              />
            </div>
          </div>
        </div>
      </Activity>
    </>
  );
};

export default MovieFilter;
