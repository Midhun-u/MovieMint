import { assets } from '../../assets/assets'
import style from '../../styles/layout/header.module.scss'
import {
    Moon as DarkThemeIcon,
    ChevronDown as DownArrowIcon,
    HomeIcon
} from 'lucide-react'
import NullProfilePic from '../ui/NullProfilePic'
import { Activity, useState } from 'react'
import { Link } from 'react-router'
import { envVariables } from '../../utils/envVariables'

const Header = () => {

    const [showOptionMenu, setShowOptionMenu] = useState<boolean>(false)

    return (

        <header className={style.container}>
            {/* Logo section */}
            <img src={assets.logo} className={style.logo} />
            {/* Other menus */}
            <nav className={style.navs}>
                <div className={style['theme-icon-container']}>
                    <DarkThemeIcon
                        strokeWidth={1.5}
                        size={23}
                    />
                </div>
                <div
                    className={style['option-menu-button']}
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