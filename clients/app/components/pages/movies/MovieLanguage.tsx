import { useContext, useEffect, useState } from "react";
import Radio from "../../ui/Radio";
import { movieLanguages } from "@/utils/movieLanguages";
import { FilterProvider } from "@/components/context/providers/FilterContext";

const MovieLanguage = () => {
  const filterContext = useContext(FilterProvider);
  const checkedValues = filterContext?.language || "";
  const radioValues = movieLanguages.map((language: string) => {
    return { title: language, value: language };
  });
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    (() => {
      setRender(true);
    })();
    return () => setRender(false);
  }, []);

  return render ? (
    <Radio
      values={radioValues}
      selectedValue={checkedValues}
      className="flex-col p-5 gap-1.25"
      setValue={filterContext?.setLanguage? filterContext.setLanguage: null}
    />
  ) : (
    <></>
  );
};

export default MovieLanguage;
