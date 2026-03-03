import style from "../../styles/layout/tabBar.module.scss";
import type React from "react";
import type { SetStateAction } from "react";

interface TabBarValues {
  values: { title: string; value: string }[];
  setValue: React.Dispatch<SetStateAction<string>>;
  activeValue?: string;
}

const TabBar = ({ values, activeValue = "", setValue }: TabBarValues) => {

  return (
    <div className={style.container}>
      {values.map((value, index) => (
        <p
          onClick={() => {
            setValue(value.value);
          }}
          key={index}
          className={activeValue === value.value? style['active']: ""}
        >
          {value.title}
        </p>
      ))}
    </div>
  );
};

export default TabBar;
