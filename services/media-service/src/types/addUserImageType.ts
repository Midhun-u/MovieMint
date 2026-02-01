import type { ContentType } from "./imageType.js"

export type AddUserImageType = {
    userId: string,
    imageUrl: string,
    imagePath?: string,
    imageFullPath?: string,
    imageType?: ContentType
}