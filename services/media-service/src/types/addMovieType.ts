import type { ContentType } from "./imageType.js"

export type AddMovieImageType = {
    movieId: string,
    imageUrl: string,
    imagePath?: string,
    imageFullPath?: string,
    imageType?: ContentType
}