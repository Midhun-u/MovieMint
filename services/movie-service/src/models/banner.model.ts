import { Banner } from "../schemas/banner.schema"

export const BannerModel = {

    addBanner: async (data: { movieId: string }) => {

        const newBanner = await Banner.create({
            movie_id: data.movieId
        })

        return newBanner

    },

    getBannerByMovieId: async (movieId: string) => {

        const banner = await Banner.findOne({ movie_id: movieId })
        return banner

    },

    getBannersCount: async () => {

        const totalBannersCount = await Banner.countDocuments()
        return totalBannersCount

    },

    getBannerById: async (id: string) => {

        const banner = await Banner.findById(id)
        return banner

    },

    deleteBannerById: async (id: string) => {

        const deletedBanner = await Banner.findByIdAndDelete(id)
        return deletedBanner

    },

    getBanners: async (limit: number, projection: object = {}) => {

        const banners = await Banner
        .find()
        .limit(limit)
        .populate({
            path: "movie_id",
            select: projection
        })
        .sort({createdAt: -1})
        .lean()

        return banners

    }

}