import style from '../../styles/theaterRequests/theaterRequestSkeleton.module.scss'

const TheaterRequestSkeleton = () => {

    return (

        <div className={style.container}>
            {
                Array(2).fill(null).map((_, index) => (

                    <div
                        className={style.details}
                        key={index}
                    >
                        <div className={style['image-ui']}></div>
                        <div className={style['title-ui']}></div>
                        <div className={style['other-details-ui']}>
                            <div className={style['detail-ui']}></div>
                            <div className={style['detail-ui']}></div>
                            <div className={style['detail-ui']}></div>
                        </div>
                    </div>

                ))
            }
        </div>

    )

}

export default TheaterRequestSkeleton