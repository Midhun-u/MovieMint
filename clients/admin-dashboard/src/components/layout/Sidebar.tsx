import { NavLink, useLocation } from 'react-router'
import style from '../../styles/layout/sidebar.module.scss'
import { sidebarNavs } from '../../utils/sidebar'
import { useEffect, useState } from 'react'

const Sidebar = () => {

    const pathname = useLocation().pathname
    const [currentPathname, setCurrentPathname] = useState<string>(pathname)

    // Function for checking if current link is active
    const isLinkActive = (route: string) => {

        if(route === currentPathname){
            return true
        }else{
            return false
        }

    }

    useEffect(() => {
        setCurrentPathname(pathname)
    }, [pathname])

    return (

        <aside className={style.container}>
            {
                sidebarNavs.map((sidebarNav, index) => (

                    <NavLink
                        to={sidebarNav.route}
                        key={index}
                        className={isLinkActive(sidebarNav.route)? style['active-nav-link']: style['nav-link']}
                    >
                        <sidebarNav.Icon
                            size={23}
                            strokeWidth={1.6}
                        />
                        <span>{sidebarNav.title}</span>
                    </NavLink>

                ))
            }
        </aside>

    )

}

export default Sidebar