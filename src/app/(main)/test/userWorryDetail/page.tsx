'use client'
import './userWorryDetail.scss'
import DefaultSelect from "@/app/_component/DefaultSelect";
import {usePostTestResultDataStore, useTestStore} from "@/app/zustand/testStore";
import {number} from "prop-types";
import {getQuestionList} from "@/app/api/UGTest";
import {ChangeEvent, useEffect, useState} from "react";
import DefaultInput from "@/app/_component/DefaultInput";
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";
import TestPageHeader from "@/app/_component/TestPageHeader";

const UserWorryDetail = () => {


    const router = useRouter()
    const clickFooterButton = (value:string) => {
        if (value === '이전') {
            router.replace('/test/userWorry')
        } else {
            router.replace('/test/category')
        }
    }



    const userWorry = useTestStore(state => state.userWorry); // 상태 구독
    const userJobId = useTestStore(state => state.userJobId); // 상태 구독
    const userJob = useTestStore(state => state.userJob); // 상태 구독
    const eventType = useTestStore(state => state.eventType); // 상태 구독
    const answeredCategories = usePostTestResultDataStore(state => state.answeredCategories); // 상태 구독
    const questionsWithAnswers = usePostTestResultDataStore(state => state.questionsWithAnswers); // 상태 구독



    const [worryText, setWorryText] = useState<string | null>(null)

    const [worryTextData, setWorryTextData] = useState<TestResultData>({
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

    const inputWorryText = (value: string) => {
        setWorryText(value)
    }



    const getHobbyDetail = async () => {

        let idList: number[] = []

        try {
            await userWorry.forEach((ele) => {
                idList.push(ele.id)
            })


            console.log(idList, userWorry, 'check idlist and s')

            const list = await getQuestionList(idList.join(','))

            console.log(list.data)
            setWorryDetailArr(list.data)
        } catch (err) {

        }
    }
    const [worryDetailArr, setWorryDetailArr] = useState([
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

    useEffect(() => {
        getHobbyDetail()
    },[])


    interface AnsweredCategories {
        id: number
        otherName: string | null
    }

    interface QuestionsWithAnswers {
        questionId: number
        answerId: number
        otherAnswer: string | null
    }

    interface TestResultData {
        anniversaryId: number
        answeredCategories: AnsweredCategories[]
        questionsWithAnswers: QuestionsWithAnswers[]
    }


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

    interface IdCollectorProps {
        category: number
        question: number
        answer: number
    }



    const clickSelect = (item: IdCollectorProps) => {

        let check = false

        questionsWithAnswers.forEach((ele)=> {
            if (ele.questionId === item.question) {





            }
        })

        setTestResultData((prev) => {

            const answerDuplicate = prev.answeredCategories.filter((ele) => {
                console.log(ele.id, item.category)
                if (ele.id !== item.category) {
                    return ele
                }
            })

            const questionDuplicate = prev.questionsWithAnswers.filter((ele) => {
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
        console.log(item, '부모임', item.question, testResultData)

        usePostTestResultDataStore.setState((prev) => {
            return {
                ...prev,
                questionsWithAnswers: [
                    ...prev.questionsWithAnswers,
                    ...testResultData.questionsWithAnswers
                ],
                answeredCategories: [
                    ...prev.answeredCategories,
                    ...testResultData.answeredCategories
                ],
            }
        })



    }

    const renderSelectClassName = (items: number, choice: number) => {

        let check = false
        testResultData.questionsWithAnswers.forEach((ele) => {
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

    return (
        <div>
            <TestPageHeader
                navText={'은근테스트'}
                title={'현재 고민에 대한'}
                subTitle={'상세 질문에 답을 해주세요'}
                content={''}
                progressWidth={'240px'}
            />

            <section className={'p_14'}>
                <div className={'user_worry_detail__layout'}>
                    {
                        worryDetailArr.map((item) => (
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
                                    {item.questions.map((items) => (
                                        <div key={items.id}>
                                            <h6 className={'mb_10'}>{items.content}</h6>
                                            {
                                                items.content.includes('자유 작성')
                                                    ?
                                                    <div className={'mb_130'}>
                                                        <DefaultInput
                                                            style={'default'}
                                                            onChangeTextAreaEvent={(value) => inputWorryText(value)}
                                                            text_area={true}
                                                            placeholder={'고민 작성'}
                                                            max_length={36}
                                                        />
                                                    </div>
                                                    : ''
                                            }
                                            <div></div>
                                            <div className={'user_hobby_detail__layout__select__box mb_20'}>
                                                {items.choices.map((choice) => (
                                                    <div key={choice.id} className={'user_hobby_detail__layout__select'}>
                                                        <DefaultSelect
                                                            type={renderSelectClassName(items.id, choice.id)}
                                                            clickSelectIdCollector={clickSelect}
                                                            title={choice.content}
                                                            idCollector={{
                                                                category: item.category.id,
                                                                question: items.id,
                                                                answer: choice.id
                                                            }}
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
                        <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={() => clickFooterButton('이전')}/>
                    </div>
                    <div className={'test_page__footer__inner__button_box'}>
                        <DefaultButton label={'다음'} type={'medium_primary'} buttonClick={() => clickFooterButton('다음')}/>
                    </div>
                </div>
            </section>

        </div>

    )
}

export default UserWorryDetail