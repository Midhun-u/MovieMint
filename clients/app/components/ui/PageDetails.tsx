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
    <div className="flex justify-start items-center gap-2.5 ">
      {backButton ? <BackIconUI /> : null}
      <div className="flex flex-col">
        <h1 className="text-[1rem] font-semibold">{title}</h1>
        <p className="text-[0.9rem] text-foreground-theme-color/50 max-w-50">{about}</p>
      </div>
    </div>
  );
};

export default PageDetails;
