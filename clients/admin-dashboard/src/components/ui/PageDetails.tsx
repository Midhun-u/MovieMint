import style from "../../styles/ui/pageDetails.module.scss";
import BackIconUI from "./BackIcon";

interface PageDetailsProps {
  title: string;
  about: string;
  backButton: boolean;
}

const PageDetails = ({
  title,
  about,
  backButton,
}: PageDetailsProps) => {
  return (
    <div className={style.container}>
      {backButton ? <BackIconUI /> : null}
      <div className={style.details}>
        <h1>{title}</h1>
        <p>{about}</p>
      </div>
    </div>
  );
};

export default PageDetails;
