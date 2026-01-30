import { youtubeEmbedUrlRegex } from '../../utils/youtubeEmbedUrlRegex'
import style from '../../styles/addMovies/showTrailer.module.scss'

interface ShowTrailerProps{
    trailerUrl: string | null | undefined
}

const ShowTrailer = ({trailerUrl}: ShowTrailerProps) => {

    if(!trailerUrl) return
    if(!youtubeEmbedUrlRegex.test(trailerUrl)) return

    return (

        <div className={style.container}>
            <iframe
                src={trailerUrl}
            />
        </div>

    )

}

export default ShowTrailer