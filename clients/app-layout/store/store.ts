import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { otpReducer } from './otpSlice'

export const store = () => {

    return configureStore({
        reducer: {
            auth: authReducer,
            otp: otpReducer
        }
    })

}

export type Appstore = ReturnType<typeof store>
export type RootState = ReturnType<Appstore['getState']>
export type AppDispatch = Appstore['dispatch']