import './userHobbyDetail.scss'
import DefaultButton from "@/app/_component/DefaultButton";
import DefaultSelect from "@/app/_component/DefaultSelect";
const UserHobbyDetail = () => {

    const hobbyDetailArr = [
        {
            mainTitle: '청소/세탁',
            text: '집 청소할 때 어디를 가장 신경 많이 쓰나요?',
            list: [
                '거실, 방',
                '거실, 방',
                '거실, 방',
                '거실, 방',
            ]
        },
        {
            mainTitle: 'OTT',
            text: 'OTT는 어디서 많이 보나요',
            list: [
                '거실, 방',
                '카페',
                '헬스장',
                '거실, 방',
            ]
        },
        {
            mainTitle: '마지막',
            text: '집 청소할 때 어디를 가장 신경 많이 쓰나요?',
            list: [
                '거실, 방',
                '거실, 방',
                '거실, 방',
                '거실, 방',
            ]
        },
    ]

    const clickSelect = () => {

    }
    return (
        <div>
            UserHobbyDetail
            {
                hobbyDetailArr.map((item)=> (
                    <div key={item.mainTitle} >
                        <div className={'user_hobby_detail__layout__main_title'}>
                            <DefaultSelect
                                leftImage={'/select_left_icon_true.svg'}
                                leftImageSize={16}
                                type={'circle_select_primary_half'}
                                clickSelect={clickSelect}
                                title={item.mainTitle}
                            />
                        </div>
                        <h6>{item.text}</h6>
                        <article  className={'user_hobby_detail__layout'}>
                            {item.list.map((items)=> (
                                <div key={items}>
                                    <DefaultSelect
                                        type={'select_gray_border_half'}
                                        clickSelect={clickSelect}
                                        title={items}
                                    />
                                </div>
                            ))}
                        </article>
                    </div>
                ))
            }
        </div>
    )
}

export default UserHobbyDetail