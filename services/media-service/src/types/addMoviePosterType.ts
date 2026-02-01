import type { ContentType } from "./imageType.js"

export type AddMoviePosterType = {
    movieId: string,
    imageUrl: string,
    imagePath?: string,
    imageFullPath?: string,
    imageType?: ContentType
}