import './userCategory.scss'
import Image from "next/image";

const UserCategory = () => {

    const categoryArr = [
        {
            id: 1,
            title: 'dmlwk',
            image: '/gift_list_main_image.svg',
            imageClassName: 'user_category__layout__content__image',
            textClassName: 'user_category__layout__content__text',
            checkImage: false
        },
        {
            id: 2,
            title: 'dmlwk2',
            image: '/gift_list_main_image.svg',
            imageClassName: 'user_category__layout__content__image',
            textClassName: 'user_category__layout__content__text',
            checkImage: false
        },
        {
            id: 3,
            title: 'dmlwk3',
            image: '/gift_list_main_image.svg',
            imageClassName: 'user_category__layout__content__image',
            textClassName: 'user_category__layout__content__text',
            checkImage: false
        }, {
            id: 4,
            title: 'dmlwk4',
            image: '/gift_list_main_image.svg',
            imageClassName: 'user_category__layout__content__image',
            textClassName: 'user_category__layout__content__text',
            checkImage: false
        },
        {
            id: 5,
            title: 'dmlwk5',
            image: '/gift_list_main_image.svg',
            imageClassName: 'user_category__layout__content__image image_border',
            textClassName: 'user_category__layout__content__text primary__color__800',
            checkImage: true
        },
    ]


    const clickCategory = () => {

    }



    return (
        <div>
            UserCategory
            <article className={'user_category__layout'}>
                {categoryArr.map((item) => (
                    <div key={item.id} className={'user_category__layout__content'}
                        onClick={clickCategory}
                    >
                        <div className={item.imageClassName}>
                            <Image src={item.image} alt={'x'} width={150} height={110}/>
                        </div>
                        {
                            item.checkImage &&
                            <div className={'user_category__layout__content__check_image'}>
                                <Image src={'/select_left_icon_true.svg'} alt={'x'} width={24} height={24}/>
                            </div>
                        }
                        <h5 className={item.textClassName}>{item.title}</h5>
                    </div>
                ))}
            </article>
        </div>
    )
}

export default UserCategory

