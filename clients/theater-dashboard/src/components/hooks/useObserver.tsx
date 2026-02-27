import { useEffect, useRef, useState } from "react"

const useObserver = <Type extends Element>(options?: IntersectionObserverInit) => {

    const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
    const ref = useRef<Type | null>(null)

    useEffect(() => {

        const node = ref.current
        if (!node) return

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {
                setIsIntersecting(entry.isIntersecting)
            })


        }, options)

        observer.observe(node)

        return () => observer.disconnect()

    }, [options])

    return {
        ref,
        isIntersecting,
    }

}

export default useObserver