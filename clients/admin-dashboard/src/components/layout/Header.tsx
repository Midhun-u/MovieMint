import { assets } from '../../assets/assets'
import style from '../../styles/layout/header.module.scss'
import {
    Moon as DarkThemeIcon
} from 'lucide-react'
import NullProfilePic from '../ui/NullProfilePic'

const Header = () => {

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
                <NullProfilePic
                />
            </nav>
        </header>

    )

}

export default Header