import { assets } from '../../assets/assets'
import style from '../../styles/layout/header.module.scss'
import {
    Moon as DarkThemeIcon,
    ChevronDown as DownArrowIcon,
    HomeIcon,
    MenuIcon,
    Sun as WhiteThemeIcon
} from 'lucide-react'
import NullProfilePic from '../ui/NullProfilePic'
import { Activity, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { envVariables } from '../../utils/envVariables'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { switchTheme } from '../../store/themeSlice'


const Header = () => {

    const [showOptionMenu, setShowOptionMenu] = useState<boolean>(false)
    const { theme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()

    // Function for switching theme
    const handleSwitchTheme = () => {

        const root = document.documentElement
        
        if(theme === "dark"){
            root.classList.add("dark-theme")
        }else{
            root.classList.remove("dark-theme")
        }
        
    }

    useEffect(() => {
        handleSwitchTheme()
    }, [theme])

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
                {/* Menu icon */}
                <MenuIcon
                    size={23}
                    strokeWidth={1.5}
                    className={style['menu-icon']}
                />
                <div
                    className={style['option-menu-section']}
                    onClick={() => setShowOptionMenu(!showOptionMenu)}
                >
                    <NullProfilePic
                    />
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
        </header>

    )

}

export default Header