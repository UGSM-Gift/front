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

interface UserWorryArr {
    id: number
    name: string
    hasOtherName?: boolean
}

const UserWorry = () => {


    const testResultData = usePostTestResultDataStore.getState()

    const postQuestionResult = async () => {
        try {
            await postTestResult(testResultData)
        } catch (err) {
            console.log(err,' err dodhd')
        }
    }


    const router = useRouter()
    const clickFooterButton = async (value:string) => {
        if (value === '이전') {
            router.back()
        } else {

            console.log(testResultData, 'tjdrhd')

            const postData = await postQuestionResult()

            console.log(postData)


            await router.push('/test/userWorryDetail')
        }
    }




    const [selected, setSelected] = useState<number[]>([])
    const [worryArr, setWorryArr] = useState<UserWorryArr[]>([
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
            console.log(list, 'check worry list')
        } catch (err) {
            console.log(err, 'err worry list ')
        }

    }

    useEffect(()=> {
        getWorryArr()
    }, [])


    const onClickAddEvent = (item: UserWorryArr) => {
        console.log(item)

        const delArr: number[] = []

        if (selected.includes(item.id)) {
            selected.forEach((ele)=> {
                if (item.id !== ele) {
                    delArr.push(ele)
                }
            })

            interface userHobbyProps {
                id: number
                name: string
                hasOtherName?: boolean
            }

            useTestStore.setState((prevState) => {
                const delWorryArr: userHobbyProps[] = []
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
            console.log('false')
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

        console.log(selected, delArr)

    }

    const [buttonActive, setButtonActive] = useState(false)

    useEffect(() => {
        if (selected.length === 0) {
            setButtonActive(false)
        } else {
            setButtonActive(true)
        }
    }, [selected])


    return (
        <div>
            <TestPageHeader
                navText={'은근테스트'}
                title={'username 님의 현재 고민은'}
                subTitle={'무엇인가요?'}
                content={'3개 이상 선택'}
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