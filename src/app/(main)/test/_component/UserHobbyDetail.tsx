'use client'
import './userHobbyDetail.scss'
import DefaultButton from "@/app/_component/DefaultButton";
import DefaultSelect from "@/app/_component/DefaultSelect";
import {getQuestionList} from "@/app/api/UGTest";
import {useTestStore} from "@/app/zustand/testStore";
import {number} from "prop-types";
import {useEffect, useState} from "react";
const UserHobbyDetail = () => {


    const {userHobby, userInterest} = useTestStore.getState();


    const getHobbyDetail = async () => {
        let idList: number[] = []

        try {
            await userHobby.forEach((ele)=> {
                idList.push(ele.id)
            })
            await userInterest.forEach((ele)=> {
                idList.push(ele.id)
            })


            const list = await getQuestionList(idList.join(','))

            console.log(list.data)
            setHobbyDetailArr(list.data)
        } catch (err) {

        }
    }
    const [hobbyDetailArr, setHobbyDetailArr] = useState([
        {
            "category": {
                "id": 1,
                "name": "독서",
                "hasOtherName": false
            },
            "questions": [
                {
                    "id": 1,
                    "content": "독서하면서 주로 마시는 음료가 있나요?",
                    "hasMultipleChoices": true,
                    "choices": [
                        {
                            "id": 1,
                            "content": "커피"
                        },
                        {
                            "id": 2,
                            "content": "차류"
                        },
                        {
                            "id": 3,
                            "content": "음료"
                        },
                        {
                            "id": 4,
                            "content": "없음"
                        }
                    ]
                }
            ]
        },
        {
            "category": {
                "id": 2,
                "name": "음악",
                "hasOtherName": false
            },
            "questions": [
                {
                    "id": 2,
                    "content": "어느 상황에서 음악을 많이 듣나요?",
                    "hasMultipleChoices": true,
                    "choices": [
                        {
                            "id": 5,
                            "content": "출/퇴근"
                        },
                        {
                            "id": 6,
                            "content": "공부"
                        },
                        {
                            "id": 7,
                            "content": "여행"
                        },
                        {
                            "id": 8,
                            "content": "샤워"
                        },
                        {
                            "id": 9,
                            "content": "산책"
                        }
                    ]
                }
            ]
        },
    ])

    useEffect(()=> {
        getHobbyDetail()
    }, [])


    const [selected, setSelected] = useState([])

    const clickSelect = () => {
    }


    const testing = () => {
        console.log(useTestStore.getState())
    }

    return (
        <div className={'user_hobby_detail__layout'}>
            <div onClick={testing}>checkdsfasd</div>
            {
                hobbyDetailArr.map((item)=> (
                    <div key={item.category.id} >
                        <div className={'user_hobby_detail__layout__main_title mb_14'}>
                            <DefaultSelect
                                leftImage={'/select_left_icon_true.svg'}
                                leftImageSize={16}
                                type={'circle_select_primary_half'}
                                clickSelect={clickSelect}
                                title={item.category.name}
                            />
                        </div>
                        <article>
                            {item.questions.map((items)=> (
                                <div key={items.id}>
                                    <h6 className={'mb_10'}>{items.content}</h6>
                                    <div className={'user_hobby_detail__layout__select mb_20'}>
                                        {items.choices.map((choice)=> (
                                            <div key={choice.id} className={''}>
                                                <DefaultSelect
                                                    type={'select_gray_border_half'}
                                                    clickSelect={clickSelect}
                                                    title={choice.content}
                                                    item={choice}
                                                />
                                            </div>
                                        ))}
                                    </div>
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