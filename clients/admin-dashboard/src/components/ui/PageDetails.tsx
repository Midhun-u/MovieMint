import style from '../../styles/ui/pageDetails.module.scss'
import BackIconUI from './BackIcon'

interface PageDetailsProps {
    title: string
    about: string
    backButton: boolean
    navigationUrl?: string
}

const PageDetails = ({ title, about, backButton, navigationUrl }: PageDetailsProps) => {

    return (

        <div className={style.container}>
            {
                backButton && navigationUrl
                    ?
                    <BackIconUI
                        navigationUrl={navigationUrl}
                    />
                    :
                    null
            }
            <div className={style.details}>
                <h1>{title}</h1>
                <p>{about}</p>
            </div>
        </div>

    )

}

export default PageDetails