import type { LucideReactIconType } from "../../types/lucideReactType"
import style from '../../styles/dashboard/dashboardLogsCard.module.scss'

interface DashboardLogCardProps{
    title: string,
    data: string | number,
    Icon: LucideReactIconType
}

const DashboardLogCard = ({title, Icon, data}: DashboardLogCardProps) => {

    return (
        <div className={style.container}>
           <div className={style['icon-container']}>
                <Icon
                    size={22}
                    strokeWidth={1.5}
                    className={style.icon}
                />
           </div>
           <h3 className={style.title}>{title}</h3>
           <h1 className={style.data}>{data}</h1>
        </div>
    )

}

export default DashboardLogCard