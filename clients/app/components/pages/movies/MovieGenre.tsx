import { movieCategories } from "../../../utils/movieCategories";
import { useContext, useEffect, useState } from "react";
import { FilterProvider } from "../../context/providers/FilterContext";
import CheckBoxList from "@/components/ui/CheckBoxList";

const MovieGenre = () => {
  const filterContext = useContext(FilterProvider);
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    (() => {
      setRender(true);
    })();

    return () => setRender(false);
  }, []);

  return render ? (
    <CheckBoxList
      checkedValues={filterContext?.categories ? filterContext.categories : []}
      values={movieCategories}
      selectedLimit={4}
      setValues={
        filterContext?.setCategories ? filterContext.setCategories : null
      }
      className="flex-col p-5 gap-1.25"
    />
  ) : (
    <></>
  );
};

export default MovieGenre;
