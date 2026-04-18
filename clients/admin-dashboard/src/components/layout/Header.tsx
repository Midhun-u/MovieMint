import { assets } from '../../assets/assets'
import style from '../../styles/layout/header.module.scss'
import {
    Moon as DarkThemeIcon,
    ChevronDown as DownArrowIcon,
    HomeIcon,
    MenuIcon,
    X as CloseMenuIcon,
    Sun as WhiteThemeIcon
} from 'lucide-react'
import NullProfilePic from '../ui/NullProfilePic'
import { Activity, useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { envVariables } from '../../utils/envVariables'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { switchTheme } from '../../store/themeSlice'
import { sidebarNavs } from '../../utils/sidebar'
import { isLinkActive } from '../../utils/isLinkActive'


const Header = () => {

    const [showOptionMenu, setShowOptionMenu] = useState<boolean>(false)
    const { theme } = useAppSelector(state => state.theme)
    const {admin} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    const pathname = useLocation().pathname

    // Function for switching theme
    const handleSwitchTheme = useCallback( () => {

        const root = document.documentElement

        if (theme === "dark") {
            root.classList.add("dark-theme")
        } else {
            root.classList.remove("dark-theme")
        }

    }, [theme])

    useEffect(() => {
        handleSwitchTheme()
    }, [handleSwitchTheme])

    return (

        <header className={style.container}>
            {/* Logo section */}
            <img src={assets.logo} className={style.logo} />
            {/* Other menus */}
            <nav className={style.navs}>
                <div
                    className={style['theme-icon-container']}
                    onClick={() => dispatch(switchTheme())}
                >
                    {
                        theme === "white"
                            ?
                            <DarkThemeIcon
                                strokeWidth={1.5}
                                size={23}
                            />
                            :
                            <WhiteThemeIcon
                                strokeWidth={1.5}
                                size={23}
                            />
                    }
                </div>
                {/* Menu icon and close menu icon*/}
                {
                    showSidebar
                        ?
                        <CloseMenuIcon
                            size={23}
                            strokeWidth={1.5}
                            className={style['menu-icon']}
                            onClick={() => setShowSidebar(false)}
                        />
                        :
                        <MenuIcon
                            size={23}
                            strokeWidth={1.5}
                            className={style['menu-icon']}
                            onClick={() => setShowSidebar(true)}
                        />
                }

                <div
                    className={style['option-menu-section']}
                    onClick={() => setShowOptionMenu(!showOptionMenu)}
                >
                    {
                        admin && admin.profile_image?.image_url
                        ?
                        <img
                            src={admin.profile_image.image_url}
                            className={style['admin-profile-pic']}
                            alt='Admin profile picture'
                        />
                        :
                        <NullProfilePic
                        />
                    }
                    <DownArrowIcon
                        strokeWidth={1.5}
                        size={23}
                        className={`${showOptionMenu ? style['rotate-arrow-icon'] : style['arrow-icon']}`}
                    />
                    {/* Option menu */}
                    <Activity mode={showOptionMenu ? "visible" : "hidden"}>
                        <div className={style['option-menu']}>
                            <Link
                                to={envVariables.APP_URL}
                                className={style['option-menu-link']}
                            >
                                <HomeIcon
                                    size={20}
                                    strokeWidth={1.5}
                                />
                                Home
                            </Link>
                        </div>
                    </Activity>
                </div>
            </nav>
            {/* Side bar */}
            <aside className={showSidebar ? style['active-sidebar'] : style.sidebar}>
                {
                    sidebarNavs.map((sidebarnav, index) => (

                        <NavLink
                            to={sidebarnav.route}
                            key={index}
                            className={isLinkActive(pathname, sidebarnav.route) ? style['sidebar-active-nav'] : style['sidebar-nav']}
                            onClick={() => setShowSidebar(false)}
                        >
                            {sidebarnav.title}
                        </NavLink>

                    ))
                }
                <NavLink
                    className={style['sidebar-nav']}
                    to={envVariables.APP_URL}
                >
                    Home
                </NavLink>
            </aside>
        </header>

    )

}

export default Header