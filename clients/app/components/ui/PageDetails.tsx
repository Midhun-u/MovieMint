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
    <div className="flex w-full justify-start items-center gap-2.5 ">
      {backButton ? <BackIconUI /> : null}
      <div className="flex flex-col w-full">
        <h1 className="text-[1rem] font-semibold">{title}</h1>
        <p className="text-[0.9rem] w-full text-foreground-theme-color/50 max-w-[80%] md:max-w-[60%]">{about}</p>
      </div>
    </div>
  );
};

export default PageDetails;
