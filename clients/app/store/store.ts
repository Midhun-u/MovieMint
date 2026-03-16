import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { otpReducer } from './otpSlice'
import { themeReducer } from './themeSlice'
import { theaterReducer } from './theaterSlice'
import { movieReducer } from './movieSlice'
import { bannerReducer } from './bannerSlice'
import { savedListReducer } from './savedListSlice'

export const store = () => {

    return configureStore({
        reducer: {
            auth: authReducer,
            otp: otpReducer,
            theme: themeReducer,
            theater: theaterReducer,
            movie: movieReducer,
            banner: bannerReducer,
            savedList: savedListReducer
        }
    })

}

export type Appstore = ReturnType<typeof store>
export type RootState = ReturnType<Appstore['getState']>
export type AppDispatch = Appstore['dispatch']