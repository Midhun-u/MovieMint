import * as zod from 'zod'
import { youtubeEmbedUrlRegex } from '../utils/youtubeEmbedUrlRegex'
import { MovieType } from '../types/movieType'

// Function for validating movie details
export const movieValidator = (data: MovieType) => {

    try {

        const validator = zod.object({
            title: zod.string().nonempty().min(3).max(20).trim(),
            subheading: zod.string().nonempty().min(5).max(50).trim(),
            synopsis: zod.string().nonempty().min(10).max(250).trim(),
            language: zod.string().nonempty().min(1).max(50).trim(),
            certificate: zod.string().nonempty().trim(),
            categories: zod.array(zod.string()).min(1).max(5),
            releaseDate: zod.date(),
            trailer: zod.string().nonempty().regex(youtubeEmbedUrlRegex).trim(),
            duration: zod.object({
                hour: zod.number().min(1),
                minutes: zod.number().min(1),
                seconds: zod.number().min(1)
            }),
            type: zod.enum(["LIVE_ACTION", "ANIMATED"]),
            actors: zod.array(zod.object({ name: zod.string() }))
        })

        const fields = validator.parse(validator)

        return fields

    } catch (error: any) {

        const zodError = JSON.parse(error)
        return { success: false, errorMessage: zodError[0].message }
        
    }

}