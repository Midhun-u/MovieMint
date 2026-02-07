import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { otpReducer } from './otpSlice'
import { themeReducer } from './themeSlice'
import { theaterReducer } from './theaterSlice'

export const store = () => {

    return configureStore({
        reducer: {
            auth: authReducer,
            otp: otpReducer,
            theme: themeReducer,
            theater: theaterReducer
        }
    })

}

export type Appstore = ReturnType<typeof store>
export type RootState = ReturnType<Appstore['getState']>
export type AppDispatch = Appstore['dispatch']