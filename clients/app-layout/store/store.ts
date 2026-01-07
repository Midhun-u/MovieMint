import {configureStore} from '@reduxjs/toolkit'

export const store = () => {

    return configureStore({
        reducer: {}
    })

}

export type Appstore = ReturnType<typeof store>
export type RootState = ReturnType<Appstore['getState']>
export type AppDispatch = Appstore['dispatch']