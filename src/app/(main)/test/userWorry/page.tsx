'use client'
import DefaultSelect from "@/app/_component/DefaultSelect";
import './userWorry.scss'
import {useEffect, useState} from "react";
import {getWorryList, postTestResult} from "@/app/api/UGTest";
import {usePostTestResultDataStore, useTestStore} from "@/app/zustand/testStore";
import TestPageHeader from "@/app/(main)/test/_component/TestPageHeader";
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";
import TestPageFooterButton from "@/app/(main)/test/_component/TestPageFooterButton";
import {UserHobbyProps} from "@/app/type";

const UserWorry = () => {


    const testResultData = usePostTestResultDataStore.getState()
    const router = useRouter()

    const postQuestionResult = async () => {
        try {
            await postTestResult(testResultData)
        } catch (err) {
            console.log(err,' err dodhd')
        }
    }

    const clickFooterButton = async (value:string) => {
        if (value === '이전') {
            router.replace('/test/userHobbyDetail')
        } else {
            await postQuestionResult()

            await router.replace('/test/userWorryDetail')
        }
    }


    const userWorry = useTestStore(state => state.userWorry); // 상태 구독


    const [selected, setSelected] = useState<number[]>([])

    const [worryArr, setWorryArr] = useState<UserHobbyProps[]>([
        {
            id: 1,
            name: '고민거리 mok',
            hasOtherName: false
        }
    ])

    const getWorryArr = async () => {
        try {
            const list = await getWorryList()
            await setWorryArr(list.data)

            userWorry.forEach((ele)=> {
                setSelected((prev)=> {
                    return [...prev, ele.id]
                })
            })
        } catch (err) {
            console.log('fail get worry list ')
        }

    }


    const onClickAddEvent = (item: UserHobbyProps) => {

        const delArr: number[] = []

        if (selected.length < 3) {
            if (selected.includes(item.id)) {
                selected.forEach((ele)=> {
                    if (item.id !== ele) {
                        delArr.push(ele)
                    }
                })

                useTestStore.setState((prevState) => {
                    const delWorryArr: UserHobbyProps[] = []
                    prevState.userWorry.forEach((ele)=> {
                        if (ele.id !== item.id) {
                            delWorryArr.push(ele)
                        }
                    })
                    return {
                        ...prevState,
                        userWorry: delWorryArr
                    };
                });

                setSelected(delArr)

            } else {
                setSelected((prev) => {
                    return [...prev, item.id];
                })

                useTestStore.setState((prevState) => {
                    return {
                        ...prevState,
                        userWorry: [...prevState.userWorry, item]
                    };
                });
            }
        } else {

            selected.forEach((ele)=> {
                if (item.id !== ele) {
                    delArr.push(ele)
                }
            })

            useTestStore.setState((prevState) => {
                const delWorryArr: UserHobbyProps[] = []
                prevState.userWorry.forEach((ele)=> {
                    if (ele.id !== item.id) {
                        delWorryArr.push(ele)
                    }
                })
                return {
                    ...prevState,
                    userWorry: delWorryArr
                };
            });

            setSelected(delArr)
        }



    }

    const [buttonActive, setButtonActive] = useState(false)

    useEffect(() => {
        if (selected.length === 0) {
            setButtonActive(false)
        } else {
            setButtonActive(true)
        }
    }, [selected])


    useEffect(()=> {
        getWorryArr()
    }, [])



    return (
        <div>
            <TestPageHeader
                navText={'은근테스트'}
                title={'username 님의 현재 고민은'}
                subTitle={'무엇인가요?'}
                content={'최대 3개까지 선택 가능'}
                progressWidth={'240px'}
            />

            <section className={'p_14'}>

                <div className={'user_worry__layout'}>
                    {
                        worryArr.map((item) => (
                            <div key={item.id} className={'user_worry__layout__select_box'}>
                                <DefaultSelect
                                    leftImage={selected.includes(item.id) ? '/select_left_icon_true.svg' : '/select_left_icon_false.svg'}
                                    type={selected.includes(item.id) ? 'circle_select_primary_border_half' : 'circle_select_gray_border_half'}
                                    clickSelect={() => onClickAddEvent(item)}
                                    title={item.name}
                                    leftImageSize={16}
                                    item={item}
                                />
                            </div>
                        ))
                    }
                </div>
            </section>

            <TestPageFooterButton
                clickFooterButton={clickFooterButton}
                leftButtonTitle={'이전'}
                rightButtonTitle={'다음'}
                state={buttonActive}
            />
        </div>
    )
}


export default UserWorry