import type { ContentType } from "./imageType.js"

export type AddImageType = {
    userId: string,
    imageUrl: string,
    imagePath?: string,
    imageFullPath?: string,
    imageType?: ContentType
}