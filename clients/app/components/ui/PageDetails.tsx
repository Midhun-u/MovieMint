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
    <div className={"container"}>
      {backButton ? <BackIconUI /> : null}
      <div className={"details"}>
        <h1>{title}</h1>
        <p>{about}</p>
      </div>
    </div>
  );
};

export default PageDetails;
