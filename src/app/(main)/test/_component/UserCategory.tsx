import './userCategory.scss'
import Image from "next/image";

const UserCategory = () => {

    const categoryArr = [
        {
            id: 1,
            title: 'dmlwk',
            image: '/gift_list_main_image.svg'
        },
        {
            id: 2,
            title: 'dmlwk2',
            image: '/gift_list_main_image.svg'
        },
        {
            id: 3,
            title: 'dmlwk3',
            image: '/gift_list_main_image.svg'
        }, {
            id: 4,
            title: 'dmlwk4',
            image: '/gift_list_main_image.svg'
        },
        {
            id: 5,
            title: 'dmlwk5',
            image: '/gift_list_main_image.svg'
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
                        <div className={'user_category__layout__content__image'}>
                            <Image src={item.image} alt={'x'} width={150} height={110}/>
                        </div>
                        <h5 className={'user_category__layout__content__text'}>{item.title}</h5>
                    </div>
                ))}
            </article>
        </div>
    )
}

export default UserCategory

