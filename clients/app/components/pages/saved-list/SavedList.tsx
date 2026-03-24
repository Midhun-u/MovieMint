'use client'

import { deleteSavedItemApi, getSavedListApi } from "@/api/savedList"
import useObserver from "@/components/hooks/useObserver"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { incrementPage, savedListFailed, savedListRequest, savedListSuccess } from "@/store/savedListSlice"
import { Activity, useCallback, useContext, useEffect, useState } from "react"
import MovieCard from "../movies/MovieCard"
import MovieSkeleton from "../movies/MovieSkeleton"
import NoResult from "@/components/ui/NoResult"
import {
    Bookmark as SavedIcon
} from 'lucide-react'
import { ToastProvider } from "@/components/context/providers/ToastProvider"

const SavedList = () => {

    const dispatch = useAppDispatch()
    const { pagination, savedList, loading } = useAppSelector(state => state.savedList)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const { isIntersecting, ref } = useObserver<HTMLDivElement>({ threshold: 0.5 })
    const toastContext = useContext(ToastProvider)

    // Function for fetching saved list
    const handleFetchSavedList = useCallback(async () => {

        const authToken = localStorage.getItem("authToken")
        if (!authToken) return

        dispatch(savedListRequest())
        const result = await getSavedListApi(pagination.page, pagination.limit, authToken)
        if (result.success) {

            dispatch(savedListSuccess({ savedList: result.savedList }))

            if (result.savedList.length < pagination.limit) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

        } else {
            dispatch(savedListFailed({ errorMessage: result.error }))
        }

    }, [dispatch, pagination.limit, pagination.page])

    // Function for removing saved item
    const handleRemoveSavedItem = async (id: string) => {

        const authToken = localStorage.getItem("authToken")
        if(!authToken) return

        dispatch(savedListRequest())

        const result = await deleteSavedItemApi(id, authToken)
        if(result.success){
            const filteredSavedList = savedList.filter((savedItem) => savedItem._id !== id)
            dispatch(savedListSuccess({savedList: filteredSavedList, filter: true}))
            toastContext?.triggerToastMessage("Movie is removed from saved list", "SUCCESS")
        }else{
            toastContext?.triggerToastMessage("Couldn't remove movie", "ERROR")
            dispatch(savedListFailed({errorMessage: result.error}))
        }

    }

    useEffect(() => {
        (() => {
            handleFetchSavedList()
        })()
    }, [handleFetchSavedList, pagination.page])

    useEffect(() => {

        if (!isIntersecting || loading || !hasMore) return

        dispatch(incrementPage())

    }, [isIntersecting, loading, hasMore, dispatch])

    return (
        savedList.length || loading
            ?
            <div className="grid grid-cols-[repeat(3,auto)] justify-items-start justify-start gap-2.5 overflow-x-scroll">
                {
                    savedList.map((savedItem) => (
                        <div
                            key={savedItem._id}
                            className="relative"
                        >
                            <MovieCard
                                id={savedItem.movie._id}
                                title={savedItem.movie.title}
                                categories={savedItem.movie.categories}
                                language={savedItem.movie.language}
                                certificate={savedItem.movie.certificate}
                                poster={savedItem.movie.poster.image_url}
                            />
                            <div
                                className="absolute cursor-pointer z-1 top-2 right-2 flex justify-center items-center p-1 bg-foreground-color"
                                onClick={() => !loading? handleRemoveSavedItem(savedItem._id): null}
                            >
                                <SavedIcon
                                    strokeWidth={1.6}
                                    className="fill-foreground-theme-color"
                                />
                            </div>
                        </div>
                    ))
                }
                <Activity mode={loading ? "visible" : "hidden"}>
                    {
                        Array(3).fill("").map((_, index) => (
                            <MovieSkeleton
                                key={index}
                            />
                        ))
                    }
                </Activity>
                <Activity>
                    <div ref={ref}></div>
                </Activity>
            </div>
            :
            <NoResult
            />
    )

}

export default SavedList