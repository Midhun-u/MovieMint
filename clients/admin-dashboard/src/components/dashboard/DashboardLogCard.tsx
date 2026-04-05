import type { LucideReactIconType } from "../../types/lucideReactType"
import style from '../../styles/dashboard/dashboardLogCard.module.scss'
import { formatNumber } from "../../utils/formatNumber"

interface DashboardLogCardProps{
    title: string,
    data: number,
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
           <h1 className={style.data}>{formatNumber(data as number)}</h1>
        </div>
    )

}

export default DashboardLogCard