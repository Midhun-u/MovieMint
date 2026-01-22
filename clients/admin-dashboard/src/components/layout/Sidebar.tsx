import { NavLink, useLocation } from 'react-router'
import style from '../../styles/layout/sidebar.module.scss'
import { sidebarNavs } from '../../utils/sidebar'
import { isLinkActive } from '../../utils/isLinkActive'

const Sidebar = () => {

    const pathname = useLocation().pathname

    return (

        <aside className={style.container}>
            {
                sidebarNavs.map((sidebarNav, index) => (

                    <NavLink
                        to={sidebarNav.route}
                        key={index}
                        className={isLinkActive(pathname, sidebarNav.route)? style['active-nav-link']: style['nav-link']}
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