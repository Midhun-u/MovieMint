import { SavedList } from "../schemas/savedList.schema"

// Saved list model
export const SavedListModel = {

    addMovie: async (movieId: string, userId: string) => {

        const newSavedItem = await SavedList.create({
            movie_id: movieId,
            user_id: userId
        })

        return newSavedItem

    },

    getSavedItemByMovieIdAndUserId: async (movieId: string, userId: string) => {

        const savedItem = await SavedList.findOne({
            movie_id: movieId,
            user_id: userId
        }).lean()

        return savedItem

    },

    getSavedItemById: async (id: string) => {

        const savedItem = await SavedList.findById(id).lean()
        return savedItem

    },

    deleteSavedItemById: async (id: string) => {

        const deleteItem = await SavedList.findByIdAndDelete(id)
        return deleteItem

    }

}