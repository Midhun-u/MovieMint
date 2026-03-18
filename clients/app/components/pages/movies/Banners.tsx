'use client'

import { getBannersApi } from "@/api/movie"
import { Button } from "@/components/ui/button"
import { bannerFailed, bannerRequest, bannerSuccess, clearState } from "@/store/bannerSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import {
    ChevronLeft as BackIcon,
    ChevronRight as ForwardIcon
} from 'lucide-react'
import { useRouter } from "next/navigation"

const Banners = () => {

    const dispatch = useAppDispatch()
    const { banners } = useAppSelector(state => state.banner)
    const [selectedBannerIndex, setSelectedBannerIndex] = useState<number>(0)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const router = useRouter()

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

    // Function for forwarding banner
    const handleForwardBanner = () => {

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        setSelectedBannerIndex((preIndex) => {
            if (preIndex === banners.length - 1) {
                return 0
            } else {
                return preIndex + 1
            }
        })

        if (scrollRef.current) {
            if ((selectedBannerIndex + 1) < banners.length) {
                scrollRef.current.scrollTo({
                    left: scrollRef.current.clientWidth * (selectedBannerIndex + 1),
                    behavior: "smooth"
                })
            } else {
                scrollRef.current.scrollTo({
                    left: -scrollRef.current.clientWidth * (selectedBannerIndex + 1),
                    behavior: "smooth"
                })
            }
        }

    }

    // Function for backwarding banner
    const handleBackwardBanner = () => {

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        setSelectedBannerIndex(preIndex => {
            if (preIndex === 0) {
                return banners.length - 1
            } else {
                return preIndex - 1
            }
        })

        if (scrollRef.current) {
            if ((selectedBannerIndex) === 0) {
                scrollRef.current.scrollTo({
                    left: scrollRef.current.clientWidth * banners.length,
                    behavior: "smooth"
                })
            } else {
                scrollRef.current.scrollTo({
                    left: scrollRef.current.clientWidth * (selectedBannerIndex - 1),
                    behavior: "smooth"
                })
            }
        }
    }

    useEffect(() => {
        handleFetchBanners()
        return () => {
            dispatch(clearState())
        }
    }, [handleFetchBanners, dispatch])

    useEffect(() => {

        intervalRef.current = setInterval(() => {
            setSelectedBannerIndex(preIndex => {
                if (preIndex === banners.length - 1) {
                    return 0
                } else {
                    return preIndex + 1
                }
            })

            if (scrollRef.current) {
                if ((selectedBannerIndex + 1) < banners.length) {
                    scrollRef.current.scrollTo({
                        left: scrollRef.current.clientWidth * (selectedBannerIndex + 1),
                        behavior: "smooth"
                    })
                } else {
                    scrollRef.current.scrollTo({
                        left: -scrollRef.current.clientWidth * (selectedBannerIndex + 1),
                        behavior: "smooth"
                    })
                }
            }

        }, 10000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }

    }, [banners.length, selectedBannerIndex])

    return (

        <div
            className="w-full relative top-0 h-auto bottom-100 z-5 min-w-75 flex items-center justify-center"
        >
            <BackIcon
                className="z-4 size-6 sm:size-9 self-center rounded-full flex items-center justify-center hover:bg-white/20 stroke-white absolute left-2 sm:left-5 cursor-pointer"
                onClick={handleBackwardBanner}
            />
            <div
                ref={scrollRef}
                className="w-full h-full flex overflow-hidden"
            >
                {
                    banners.map((banner) => (
                        <div
                            onClick={() => {
                                router.push(`/movies/details/${banner.movie._id}`)
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                })
                            }}
                            className="shrink-0 w-full cursor-pointer relative"
                            key={banner._id}
                        >
                            <Image
                                src={banner?.movie?.banner?.image_url}
                                alt="Movie banner image"
                                width={1000}
                                height={500}
                                className="w-full aspect-4/2"
                                loading="eager"
                            />
                            <div className="absolute top-0 left-0 w-full h-full p-5 px-10 sm:p-10 sm:px-20">
                                {/* Background */}
                                <div className="absolute z-0 opacity-40 bg-black w-full h-full left-0 top-0"></div>
                                {/* Movie details */}
                                <div className="w-full h-full flex flex-col justify-end pb-4 gap-1 sm:gap-2">
                                    <h1 className="text-white z-10 text-md sm:text-xl font-bold">{banner.movie.title}</h1>
                                    <p className="hidden min-[400px]:block text-white/85 max-h-10 sm:max-h-15 sm:h-auto overflow-hidden z-10 text-xs max-w-120 sm:text-sm font-medium">{banner.movie.sub_heading}</p>
                                    <span className="text-white/85 z-10 text-xs max-h-4 sm:max-h-10 sm:text-sm font-semibold max-w-120 overflow-hidden">{banner.movie.categories.join(", ")} - {banner.movie.duration.hour + "h"} {banner.movie.duration.minutes + "m"}</span>
                                    {
                                        banner.movie.status === "PENDING"
                                            ?
                                            <p className="p-[0.5px] px-2 bg-success-background-color text-success-foreground-color w-max text-[0.7rem] font-medium rounded-[3px]">Coming Soon</p>
                                            :
                                            <Button
                                                className="hidden min-[400px]:block w-20 sm:max-w-30 z-10"
                                            >
                                                <>Book</>
                                            </Button>

                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* Banner notation */}
            <div className="absolute bottom-5 gap-1 z-10 flex self-center">
                {
                    Array(banners.length).fill("").map((_, index) => (
                        <div
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 border ${selectedBannerIndex === index ? "border-none w-5 sm:w-6 bg-primary-color transition-all duration-300" : ""} rounded-full transition-all duration-300`}
                            key={index}
                        ></div>
                    ))
                }
            </div>
            <ForwardIcon
                className="z-10 size-6 sm:size-9 self-center rounded-full flex items-center justify-center hover:bg-white/20 stroke-white absolute right-2 sm:right-5 cursor-pointer"
                size={35}
                onClick={handleForwardBanner}
            />
        </div>

    )

}

export default Banners