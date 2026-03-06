'use client'

import { getBannersApi } from "@/api/movie"
import { bannerFailed, bannerRequest, bannerSuccess } from "@/store/bannerSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Image from "next/image"
import { useCallback, useEffect, Fragment } from "react"

const Banners = () => {

    const dispatch = useAppDispatch()
    const { banners } = useAppSelector(state => state.banner)

    // Function for fetching banners
    const handleFetchBanners = useCallback(async () => {

        dispatch(bannerRequest())

        const result = await getBannersApi()
        if (result.success) {
            dispatch(bannerSuccess({ banners: result.banners }))
        } else {
            dispatch(bannerFailed({ errorMessage: result.errorMessage }))
        }

    }, [dispatch])

    useEffect(() => {
        handleFetchBanners()
    }, [handleFetchBanners])

    return (

        <div className="mt-10 overflow-auto flex gap-1 w-full">
            {
                banners.map((banner) => (
                    <div className="shrink-0 w-full relative" key={banner._id}>
                        <Image
                            src={banner?.movie?.banner?.image_url}
                            alt="Movie banner image"
                            width={1000}
                            height={500}
                            className="w-full aspect-4/2 rounded-[5px]"
                            loading="eager"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                            <h1 className="text-green-500">Hello world</h1>
                        </div>
                    </div>
                ))
            }
        </div>

    )

}

export default Banners