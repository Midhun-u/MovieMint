'use client'

import { deleteNotificationApi, getAllNotificationsApi } from "@/api/notification"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { incrementPage, notificationFailed, notificationRequest, notificationSuccess } from "@/store/notificationSlice"
import { Activity, useCallback, useContext, useEffect, useState } from "react"
import NotificationCard from "./NotificationCard"
import NoResult from "@/components/ui/NoResult"
import useObserver from "@/components/hooks/useObserver"
import { ToastProvider } from "@/components/context/providers/ToastProvider"
import NotificationSkeleton from "./NotificationSkeleton"

const NotificationList = () => {

    const { pagination, notifications, loading } = useAppSelector(state => state.notification)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })
    const [isRendered, setIsRendered] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const toastContext = useContext(ToastProvider)

    // Function for fetching notifications
    const handleFetchNotifications = useCallback(async () => {

        const authToken = localStorage.getItem("authToken")
        if (!authToken) return

        dispatch(notificationRequest())
        const result = await getAllNotificationsApi(pagination.page, pagination.limit, authToken)
        if (result.success) {
            if (result.notifications?.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
            dispatch(notificationSuccess({ notifications: result.notifications }))
        } else {
            dispatch(notificationFailed({ errorMessage: result.error }))
        }

    }, [dispatch, pagination.page, pagination.limit])

    // Function for deleting notification
    const handleDeleteNotification = async (id: string) => {

        const authToken = localStorage.getItem("authToken")
        if (!authToken) return

        dispatch(notificationRequest())
        const result = await deleteNotificationApi(id, authToken)
        if (result.success) {
            const filteredNotifications = notifications.filter((notification) => notification.id !== id)
            dispatch(notificationSuccess({ notifications: filteredNotifications }))
            toastContext?.triggerToastMessage("Notification is deleted", "SUCCESS")
        } else {
            dispatch(notificationFailed({ errorMessage: result.error }))
            toastContext?.triggerToastMessage("Notification couldn't delete", "ERROR")
        }

    }

    useEffect(() => {
        (() => {
            setIsRendered(true)
            if (isRendered) {
                handleFetchNotifications()
            }
        })()
    }, [handleFetchNotifications, pagination.page, isRendered])

    useEffect(() => {
        if (!isIntersecting || loading || !hasMore) return;

        dispatch(incrementPage())

    }, [isIntersecting, hasMore, loading, dispatch]);

    return (

        notifications?.length || loading
            ?
            <div className="max-[600px]:w-full flex flex-col gap-2.5 w-125">
                {
                    notifications.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            id={notification.id}
                            success={notification.success}
                            title={notification.title}
                            message={notification.message}
                            isRead={notification.is_read}
                            metadata={notification.metadata}
                            createdAt={notification.createdAt}
                            onClickOnDelete={handleDeleteNotification}
                        />
                    ))
                }
                <Activity mode={loading ? "visible" : "hidden"}>
                    {
                        Array(3).fill("").map((_, index) => (
                            <NotificationSkeleton
                                key={index}
                            />
                        ))
                    }
                </Activity>
                <Activity mode={hasMore && notifications.length && !loading ? "visible" : "hidden"}>
                    <div ref={ref}></div>
                </Activity>
            </div>
            :
            <NoResult
            />
    )

}

export default NotificationList