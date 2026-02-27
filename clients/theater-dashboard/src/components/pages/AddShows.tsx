import PageDetails from "../ui/PageDetails";
import style from "../../styles/pages/addShows.module.scss";
import MovieList from "../addShows/MovieList";

const AddShows = () => {

  return (
    <div className={style.container}>
      {/* Page details */}
      <PageDetails
        title="Add Show"
        about="You can add shows, so users can book the show"
        backButton={false}
      />
      {/* Movie list */}
      <MovieList />
    </div>
  );
};

export default AddShows;
