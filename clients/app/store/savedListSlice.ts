import { SavedItem } from "@/types/savedItem";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    loading: boolean
    errorMessage: string
    savedItem: SavedItem | null
    savedList: Array<SavedItem>
    pagination: {
        page: number
        limit: number
    }
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    savedItem: null,
    savedList: [],
    pagination: {
        page: 1,
        limit: 10
    }
}


const savedListSlice = createSlice({
    name: "savedList",
    initialState: initialState,
    reducers: {

        savedListRequest: (state) => {
            state.loading = true
            state.errorMessage = ""
        },

        savedListSuccess: (state, action) => {
            state.loading = false
            state.savedItem = action.payload?.savedItem ? action.payload.savedItem : null
            if (action.payload.filter && action.payload.savedList) {
                state.savedList = action.payload.savedList
            }

            if (state.savedList.length <= 0 || state.pagination.page === 1) {
                state.savedList = action.payload.savedList?.length ? action.payload.savedList : []
            } else if (action.payload.savedList) {
                state.savedList = [...state.savedList, ...action.payload.savedList]
            }
        },

        incrementPage: (state) => {
            state.pagination.page = state.pagination.page + 1
        },

        savedListFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload.errorMessage
            state.savedItem = null
        }

    }
})

export const savedListReducer = savedListSlice.reducer
export const { savedListFailed, savedListRequest, savedListSuccess, incrementPage } = savedListSlice.actions