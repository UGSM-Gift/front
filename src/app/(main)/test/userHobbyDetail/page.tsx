'use client'
import './userHobbyDetail.scss'
import DefaultButton from "@/app/_component/DefaultButton";
import DefaultSelect from "@/app/_component/DefaultSelect";
import {getQuestionList} from "@/app/api/UGTest";
import {usePostTestResultDataStore, useTestStore} from "@/app/zustand/testStore";
import {useEffect, useState} from "react";
import TestPageHeader from "@/app/(main)/test/_component/TestPageHeader";
import {useRouter} from "next/navigation";
import {IdCollectorProps, TestResultData} from "@/app/type";


const UserHobbyDetail = () => {


    const router = useRouter()

    const clickFooterButton = (value: string) => {
        if (value === '이전') {
            router.back()
        } else {
            router.push('/test/userWorry')
        }
    }

    const userHobby = useTestStore(state => state.userHobby); // 상태 구독
    const userInterest = useTestStore(state => state.userInterest); // 상태 구독
    const userJobId = useTestStore(state => state.userJobId); // 상태 구독
    const userJob = useTestStore(state => state.userJob); // 상태 구독
    const eventType = useTestStore(state => state.eventType); // 상태 구독


    const getHobbyDetail = async () => {

        let idList: number[] = []

        try {
            await userHobby.forEach((ele)=> {
                idList.push(ele.id)
            })
            await userInterest.forEach((ele)=> {
                idList.push(ele.id)
            })

            // id list 를 보내면 리스트에 맞는 관심사 답변을 제공함
            const list = await getQuestionList(idList.join(','))

            setHobbyDetailArr(list.data)
        } catch (err) {
            console.log('fail get question list')
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


    const [testResultData, setTestResultData] = useState<TestResultData>({
        anniversaryId: eventType,
        answeredCategories: [
            // {
            //     id: 0,
            //     otherName: null
            // },
            {
                id: userJobId,
                otherName: userJob
            }
        ],
        questionsWithAnswers: [
            // {
            //     questionId: 0,
            //     answerId: 0,
            //     otherAnswer: null
            // }
        ]
    })


    const clickSelect = (item: IdCollectorProps) => {
        console.log(item, '부모임', item.question, testResultData)

        setTestResultData((prev)=> {

            const answerDuplicate = prev.answeredCategories.filter((ele)=> {
                console.log(ele.id, item.category)
                if (ele.id !== item.category) {
                    return ele
                }
            })

            const questionDuplicate = prev.questionsWithAnswers.filter((ele)=> {
                console.log(ele.questionId, item.category)
                if (ele.questionId !== item.question) {
                    return ele
                }
            })

            return {
                ...prev,
                answeredCategories: [...answerDuplicate, {id: item.category, otherName: null}],
                questionsWithAnswers: [
                    ...questionDuplicate,
                    {
                        questionId: item.question,
                        answerId: item.answer,
                        otherAnswer: null
                    }]
            }
        })

        usePostTestResultDataStore.setState(testResultData)
    }

    const renderSelectClassName = (items:number, choice: number) => {
        console.log(items, choice)

        let check = false
        testResultData.questionsWithAnswers.forEach((ele)=> {
            if (ele.questionId === items && ele.answerId === choice) {
                check = true
            }
        })

        if (check) {
            return 'radius_select_primary_half'
        } else {
            return 'radius_select_gray_border_half'
        }
    }



    useEffect(()=> {
        getHobbyDetail()
    }, [])


    const [questionLength, setQuestionLength] = useState(0)

    const testing = () => {

        let leng = 0
        hobbyDetailArr.forEach((ele)=> {
            leng += ele.questions.length
        })

        setQuestionLength(leng)
        console.log(questionLength, ' question length')
    }

    useEffect(()=> {

    }, [questionLength])

    return (
        <div>
            <div onClick={testing}>testing</div>
            <TestPageHeader
                navText={'은근테스트'}
                title={'선택하신 취미/관심사에 관한'}
                subTitle={'상세 질문에 답을 해주세요'}
                content={''}
                progressWidth={'180px'}
            />

            <section className={'p_14 user_hobby__layout'}>
                <div className={'user_hobby_detail__layout pl_16 mt_8 pb_50'}>
                    {
                        hobbyDetailArr.map((item)=> (
                            <div key={item.category.id}>
                                <div className={'user_hobby_detail__layout__main_title mb_22'}>
                                    <DefaultSelect
                                        leftImage={'/select_left_icon_true.svg'}
                                        leftImageSize={16}
                                        type={'circle_select_primary_half'}
                                        title={item.category.name}
                                    />
                                </div>
                                <article>
                                    {item.questions.map((items)=> (
                                        <div key={items.id}>
                                            <h6 className={'mb_10'}>{items.content}</h6>
                                            <div className={'user_hobby_detail__layout__select__box mb_20'}>
                                                {items.choices.map((choice)=> (
                                                    <div key={choice.id} className={'user_hobby_detail__layout__select'}>
                                                        <DefaultSelect
                                                            type={renderSelectClassName(items.id, choice.id)}
                                                            clickSelectIdCollector={clickSelect}
                                                            title={choice.content}
                                                            idCollector={{category: item.category.id, question: items.id, answer:choice.id}}
                                                            textCenter={true}
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
            </section>


            <section className={'test_page__footer'}>
                <div className={'test_page__footer__inner__button'}>
                    <div className={'test_page__footer__inner__button_box'}>
                        <DefaultButton label={'이전'} type={'medium_primary_border'}
                                       buttonClick={() => clickFooterButton('이전')}/>
                    </div>
                    <div className={'test_page__footer__inner__button_box'}>
                        <DefaultButton label={'다음'} type={'medium_primary'}
                                       buttonClick={() => clickFooterButton('다음')}/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UserHobbyDetail