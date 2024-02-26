import './userHobby.scss'
import DefaultSelect from "@/app/_component/DefaultSelect";

const UserHobby = () => {

    const onClickAddEvent = () => {

    }

    const hobbyArr = [
        {
            id: 1,
            title: '독서',
            leftImage: '/select_left_icon_false.svg',
            type: 'circle_select_gray_border_half',
        },
        {
            id: 2,
            title: '음악',
            leftImage: '/select_left_icon_false.svg',
            type: 'circle_select_gray_border_half',
        },
        {
            id: 3,
            title: '요리/베이킹',
            leftImage: '/select_left_icon_false.svg',
            type: 'circle_select_gray_border_half',
        },
        {
            id: 4,
            title: '게임',
            leftImage: '/select_left_icon_false.svg',
            type: 'circle_select_gray_border_half',
        },
        {
            id: 5,
            title: '운동/스포츠',
            leftImage: '/select_left_icon_false.svg',
            type: 'circle_select_gray_border_half',
        },
        {
            id: 6,
            title: '캠핑',
            leftImage: '/select_left_icon_false.svg',
            type: 'circle_select_gray_border_half',
        },
        {
            id: 7,
            title: '청소/세탁',
            leftImage: '/select_left_icon_false.svg',
            type: 'circle_select_gray_border_half',
        },
        {
            id: 8,
            title: 'OTT',
            leftImage: '/select_left_icon_false.svg',
            type: 'circle_select_gray_border_half',
        },

    ]

    return (
        <div className={'user_hobby__layout'}>
            {
                hobbyArr.map((item) => (
                    <div key={item.id} className={'user_hobby__layout__select_box'}>
                        <DefaultSelect
                                       leftImage={item.leftImage}
                                       type={item.type}
                                       clickSelect={onClickAddEvent}
                                       title={item.title}
                                       leftImageSize={16}
                        />
                    </div>

                ))
            }
        </div>
    )
}

export default UserHobby