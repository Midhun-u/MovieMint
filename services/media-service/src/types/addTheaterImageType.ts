import type { ContentType } from "./imageType.js"

export type AddTheaterImageType = {
    theaterId: string,
    imageUrl: string,
    imagePath: string,
    imageFullPath: string,
    imageType: ContentType
}