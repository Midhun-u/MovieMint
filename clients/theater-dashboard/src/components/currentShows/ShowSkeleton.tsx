import style from '../../styles/currentShows/showSkeleton.module.scss'

const ShowSkeleton = () => {

    return (

        <>
            {
                Array(3).fill("").map((_, index) => (

                    <div key={index} className={style.container}>
                        <div className={style['image-ui']}></div>
                        <div className={style['details-ui']}>
                            <div className={style['text-ui']}></div>
                            <div className={style['text-ui']}></div>
                            <div className={style['text-ui']}></div>
                            <div className={style['text-ui']}></div>
                            <div className={style['text-ui']}></div>
                        </div>
                    </div>
                ))
            }
        </>

    )

}

export default ShowSkeleton