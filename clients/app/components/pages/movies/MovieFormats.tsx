import { useContext, useEffect, useState } from "react";
import { FilterProvider } from "@/components/context/providers/FilterContext";
import { movieFormats } from "@/utils/movieFormats";
import CheckBoxList from "@/components/ui/CheckBoxList";

const MovieFormats = () => {
  const filterContext = useContext(FilterProvider);
  const checkedValues = filterContext?.formats || [];
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    (() => {
      setRender(true);
    })();

    return () => setRender(false);
  }, []);

  return render ? (
    <CheckBoxList
      checkedValues={checkedValues}
      values={movieFormats}
      selectedLimit={null}
      setValues={filterContext?.setFormats ? filterContext.setFormats : null}
      className="flex-col p-5 gap-1.25"
    />
  ) : (
    <></>
  );
};

export default MovieFormats;
