import { assets } from "@/public/assets/assets"
import { StaticImageData } from "next/image"
import { ReactNode } from "react"

type FooterNavs = Array<{
    title: string,
    route: string
}>

type SocialMedias = Array<{
    route: string,
    icon: StaticImageData,
    name: string
}>

export const footerNavs: FooterNavs = [
    {
        title: "Home",
        route: "/"
    },
    {
        title: "About",
        route: "/"
    },
    {
        title: "Contact Us",
        route: "/"
    }
]

export const socialMedias: SocialMedias = [
    {
        route: "/",
        icon: assets.facebookIcon,
        name: "facebook"
    },
    {
        route: "/",
        icon: assets.xIcon,
        name: "x"
    },
    {
        route: "/",
        icon: assets.instagramIcon,
        name: "instagram"
    },
    {
        route: "/",
        icon: assets.youtubeIcon,
        name: "youtube"
    },
    {
        route: "/",
        icon: assets.linkedinIcon,
        name: "linkedin"
    }
]