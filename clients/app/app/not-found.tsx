import Header from "@/components/layout/Header"
import { assets } from "@/public/assets/assets"
import Image from "next/image"
import Link from "next/link"

const NotFound = () => {

    return (

        <div className="w-full">
            <Header
            />
            <div className="mt-35 px-3 min-h-[60dvh] flex flex-col justify-center items-center">
                <Image
                    src={assets.notFound}
                    alt="Not found image"
                    className="max-[500px]:w-60 w-80"
                />
                <span className="mt-5 text-md font-medium">Not Found</span>
                <p className="text-sm text-foreground-theme-color/50 text-center">
                    We couldn&apos;t find the page you were looking for.
                </p>
                <Link
                    className="mt-5 w-75 flex justify-center items-center bg-primary-color hover:bg-primary-accent-color text-md rounded-[5px] py-1 max-[500px]:w-full"
                    href={"/"}
                >
                    <>Home</>
                </Link>
            </div>
        </div>

    )
}

export default NotFound