import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { otpReducer } from './otpSlice'
import { themeReducer } from './themeSlice'
import { theaterReducer } from './theaterSlice'
import { movieReducer } from './movieSlice'
import { bannerReducer } from './bannerSlice'
import { savedListReducer } from './savedListSlice'
import { rateReducer } from './rateSlice'
import { notificationReducer } from './notificationSlice'
import { showReducer } from './showSlice'
import { bookingsReducer } from './bookingsSlice'

export const store = () => {

    return configureStore({
        reducer: {
            auth: authReducer,
            otp: otpReducer,
            theme: themeReducer,
            theater: theaterReducer,
            movie: movieReducer,
            banner: bannerReducer,
            savedList: savedListReducer,
            rate: rateReducer,
            notification: notificationReducer,
            show: showReducer,
            bookings: bookingsReducer
        }
    })

}

export type Appstore = ReturnType<typeof store>
export type RootState = ReturnType<Appstore['getState']>
export type AppDispatch = Appstore['dispatch']