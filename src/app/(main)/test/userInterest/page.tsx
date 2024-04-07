'use client'
import TestPageHeader from "@/app/(main)/test/_component/TestPageHeader";
import DefaultSelect from "@/app/_component/DefaultSelect";
import DefaultButton from "@/app/_component/DefaultButton";
import {useEffect, useState} from "react";
import {getInterestList} from "@/app/api/UGTest";
import {useTestStore} from "@/app/zustand/testStore";
import './userInterest.scss'
import {useRouter} from "next/navigation";
import {UserHobbyProps} from "@/app/type";
import TestPageFooterButton from "@/app/(main)/test/_component/TestPageFooterButton";

const UserInterest = () => {

    const [selected, setSelected] = useState<number[]>([])
    const router = useRouter()

    const clickFooterButton = (value: string) => {
        if (value === '이전') {
            router.replace('/test/userHobby')
        } else {
            router.replace('/test/userHobbyDetail')
        }
    }

    const [interestArr, setInterestArr] = useState([
        {
            id: 11,
            name: '관심사',
        },
        {
            id: 12,
            name: '관심사',
        },
        {
            id: 13,
            name: '요리/베이킹',
        },
        {
            id: 14,
            name: '게임',
        },
        {
            id: 15,
            name: '운동/스포츠',
        },
        {
            id: 16,
            name: '캠핑',
        },
        {
            id: 17,
            name: '청소/세탁',
        },
        {
            id: 18,
            name: 'OTT',
        },
    ])


    const userInterest = useTestStore(state => state.userInterest); // 상태 구독


    const getUserInterest = async () => {
        try {
            const list = await getInterestList()
            if (list.data) {
                setInterestArr(list.data);

                // 다른페이지 다녀왔을때 매핑
                userInterest.forEach((ele)=> {
                    setSelected((prev)=> {
                        return [...prev, ele.id]
                    })
                })

            } else {
                console.error("No data received from the server.");
            }
        } catch (err) {

        }
    }


    const onClickAddEvent = (item: UserHobbyProps) => {


        if (selected.includes(item.id)) {
            const delArr: number[] = []

            selected.forEach((ele) => {
                if (item.id !== ele) {
                    delArr.push(ele)
                }
            })

            setSelected(delArr)

            useTestStore.setState((prevState) => {
                const delInterestArr: UserHobbyProps[] = []
                prevState.userInterest.forEach((ele) => {
                    if (ele.id !== item.id) {
                        delInterestArr.push(ele)
                    }
                })
                return {
                    ...prevState,
                    userInterest: delInterestArr
                };
            });

        } else {
            setSelected((prev) => {
                return [...prev, item.id];
            })


            useTestStore.setState((prevState) => {
                return {
                    ...prevState,
                    userInterest: [...prevState.userInterest, item]
                };
            });
        }


    }
    useEffect(() => {
        getUserInterest()

    })


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
                title={'username 님은 평소 어디에'}
                subTitle={'관심이 있나요?'}
                content={'복수선택 가능'}
                progressWidth={'160px'}
            />

            <section className={'p_14 user_hobby__layout'}>
                {
                    interestArr.map((item: UserHobbyProps) => (
                        <div key={item.id} className={'user_hobby__layout__select_box'}>
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

export default UserInterest