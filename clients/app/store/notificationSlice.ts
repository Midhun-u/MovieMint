import { createSlice } from "@reduxjs/toolkit";
import { Notification } from '../types/notification'

type InitialState = {
    loading: boolean
    errorMessage: string
    notification: Notification | null
    notifications: Array<Notification>
    pagination: {
        page: number
        limit: number
    }
}

const initialState: InitialState = {
    loading: false,
    errorMessage: "",
    notification: null,
    notifications: [],
    pagination: {
        page: 1,
        limit: 10
    }
}

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {

        notificationRequest: (state) => {
            state.loading = true
            state.errorMessage = ""
        },

        notificationSuccess: (state, action) => {
            state.loading = false
            state.notification = action.payload?.notification ? action.payload.notification : null
            if (state.notifications.length <= 0 || state.pagination.page === 1) {
                state.notifications = action.payload.notifications?.length ? action.payload.notifications : []
            } else if (action.payload.notifications?.length) {
                state.notifications = [...state.notifications, ...action.payload.notifications]
            }
        },

        addNotification: (state, action) => {
            state.notifications.push(action.payload.notification)
        },

        notificationFailed: (state, action) => {
            state.loading = false
            state.errorMessage = action.payload?.errorMessage || ""
        },

        incrementPage: (state) => {
            state.pagination.page = state.pagination.page + 1
        },

        clearNotificationState: (state) => {
            state.loading = false
            state.errorMessage = ""
            state.notification = null
            state.notifications = []
            state.pagination = { ...state.pagination, page: 1 }
        }

    }
})

export const notificationReducer = notificationSlice.reducer
export const {
    notificationFailed,
    notificationRequest,
    notificationSuccess,
    clearNotificationState,
    incrementPage,
    addNotification
} = notificationSlice.actions