'use client'

import { getAllNotificationsApi } from "@/api/notification"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { notificationFailed, notificationRequest, notificationSuccess } from "@/store/notificationSlice"
import { useCallback, useEffect, useState } from "react"

const NotificationList = () => {

    const {pagination} = useAppSelector(state => state.notification)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    // Function for fetching notifications
    const handleFetchNotifications = useCallback(async () => {

        const authToken = localStorage.getItem("authToken")
        if(!authToken) return

        dispatch(notificationRequest())
        const result = await getAllNotificationsApi(pagination.page, pagination.limit, authToken)
        if(result.success){
            dispatch(notificationSuccess({notifications: result.notifications}))
        }else{
            dispatch(notificationFailed({errorMessage: result.error}))
        }

    }, [dispatch, pagination.page, pagination.limit])

    useEffect(() => {
        (() => {
            handleFetchNotifications()
        })()
    }, [handleFetchNotifications])

    return (

        <div>
            Hello world
        </div>

    )

}

export default NotificationList