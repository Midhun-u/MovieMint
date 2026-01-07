import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './authSlice'

export const store = () => {

    return configureStore({
        reducer: {
            auth: authReducer
        }
    })

}

export type Appstore = ReturnType<typeof store>
export type RootState = ReturnType<Appstore['getState']>
export type AppDispatch = Appstore['dispatch']