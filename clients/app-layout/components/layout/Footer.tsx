import { footerNavs, socialMedias } from "@/utils/footer"
import Link from 'next/link'
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const Footer = () => {

    const footerTitleClass = "font-medium w-max text-sm relative before:w-full before:h-[1.5] before:absolute before:bg-primary-color before:bottom-0"

    return (

        <footer
            className="box-border bg-foreground-color w-screen h-auto pt-10 pb-20 mt-20 px-4 sm:px-7 flex md:justify-center flex-wrap gap-10 text-foreground-theme-color"
        >
            {/* About section */}
            <div className="w-100">
                <div className="w-max">
                    <h2
                        className={footerTitleClass}
                    >
                        About Us
                    </h2>
                </div>
                <p className="text-xs mt-3">
                    This platform helps users book movie tickets quickly and easily from the comfort of their home. Users can explore movies, choose theaters and showtimes, and book seats with ease. The application also provides dedicated dashboards for theater owners and administrators to manage shows, screens, and bookings efficiently, ensuring a smooth experience for everyone.
                </p>
            </div>
            {/* Quick links Section */}
            <div>
                <h2
                    className={footerTitleClass}
                >
                    Quick Links
                </h2>
                <ul className="flex flex-col mt-3 gap-2">
                    {
                        footerNavs.map((footerNav, index) => (

                            <Link
                                href={footerNav.route}
                                key={index}
                                className="text-xs hover:text-primary-color"
                            >
                                {footerNav.title}
                            </Link>

                        ))
                    }
                </ul>
            </div>
            {/* News letter Section */}
            <div className="w-full sm:w-auto">
                <h2
                    className={footerTitleClass}
                >
                    News Letter
                </h2>
                <div className="mt-3 flex w-full flex-col gap-2 sm:flex-row md:w-auto md:flex-row">
                    <Input
                        className="focus-visible:ring-1 text-sm focus-visible:ring-primary-color h-9 md:h-8 sm:w-100 md:w-70 border-disable-color/50 w-full"
                        placeholder="Enter your email"
                    />
                    <Button
                        className="md:h-8 h-9 bg-primary-color text-dark-foreground-color hover:bg-primary-accent-color"
                        size={"sm"}
                    >
                        <span>Subscribe</span>
                    </Button>
                </div>
            </div>
            {/* Connect Us With Section */}
            <div>
                <h2
                    className={footerTitleClass}
                >
                    Connect Us With
                </h2>
                <div className="mt-3 flex gap-2 flex-col text-xs">
                    {
                        socialMedias.map((socialMedia, index) => (

                            <Link
                                href={socialMedia.route}
                                key={index}
                                className="hover:text-primary-color"
                            >
                                {socialMedia.title}
                            </Link>

                        ))
                    }
                </div>
            </div>
            {/* Terms and condition section */}
            <div className="w-full flex flex-col items-center">
                <hr className="text-white w-full"/>
                <p className="text-xs mt-3 flex flex-wrap justify-center">
                    &copy;2026 MovieMint. All rights reserved. | 
                    <Link href={"/"} className="text-primary-color cursor-pointer ml-1 mr-1">Privacy Policy</Link> | 
                    <Link href={"/"} className="text-primary-color cursor-pointer ml-1">Terms of Service</Link>
                </p>
            </div>
        </footer>

    )
}

export default Footer