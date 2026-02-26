import { youtubeEmbedUrlRegex } from "../../utils/youtubeEmbedUrlRegex";
import style from "../../styles/addMovies/showTrailer.module.scss";
import { useEffect, useState } from "react";

interface ShowTrailerProps {
  trailerUrl: string | null | undefined;
}

const ShowTrailer = ({ trailerUrl }: ShowTrailerProps) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (!trailerUrl) return;
    if (!youtubeEmbedUrlRegex.test(trailerUrl)) return;

    (() => {
      setUrl(trailerUrl);
    })();
  }, [trailerUrl]);

  return url ? (
    <div className={style.container}>
      <iframe src={url} />
    </div>
  ) : null;
};

export default ShowTrailer;
