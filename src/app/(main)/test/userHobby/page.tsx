'use client'
import TestPageHeader from "@/app/(main)/test/_component/TestPageHeader";
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";
import './userHobby.scss'
import {useEffect, useState} from "react";
import {getHobbyList, getInterestList} from "@/app/api/UGTest";
import {useTestStore, useUserTestInfoStore} from "@/app/zustand/testStore";
import DefaultSelect from "@/app/_component/DefaultSelect";
import {UserHobbyProps} from "@/app/type";
import TestPageFooterButton from "@/app/(main)/test/_component/TestPageFooterButton";



const UserHobby = () => {

    const router = useRouter()

    const clickFooterButton = (value: string) => {
        if (value === '이전') {
            router.back()
        } else {
            router.push('/test/userInterest')
        }
    }


    // userHobby 를 그대로 쓰기엔 forEach 를 한 번 돌린 후 id 체크를 해야해서 별개로 유저에게 보여주는 view 부분 관리를 따로 함.
    const [selected, setSelected] = useState<number[]>([])

    // select 렌더링 데이터
    const [hobbyArr, setHobbyArr] = useState([
        {
            id: 11,
            name: '독서',
            hasOtherName: false
        },
        {
            id: 12,
            name: '음악',
            hasOtherName: false
        },
        {
            id: 13,
            name: '요리/베이킹',
            hasOtherName: false
        },
        {
            id: 14,
            name: '게임',
            hasOtherName: false
        },
        {
            id: 15,
            name: '운동/스포츠',
            hasOtherName: false
        },
        {
            id: 16,
            name: '캠핑',
            hasOtherName: false
        },
        {
            id: 17,
            name: '청소/세탁',
            hasOtherName: false
        },
        {
            id: 18,
            name: 'OTT',
            hasOtherName: false
        },
    ])


    const userHobby = useTestStore(state => state.userHobby); // 상태 구독


    const getUserHobby = async () => {
        try {
            const list = await getHobbyList()
            if (list.data) {
                setHobbyArr(list.data);

                // 다른 페이지를 방문한 후에 돌아왔을경우 store 에 있는 데이터를 통해ㅓ
                // select box 활성화 시켜놓기
                userHobby.forEach((ele)=> {
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
                const delHobbyArr: UserHobbyProps[] = []
                prevState.userHobby.forEach((ele) => {
                    if (ele.id !== item.id) {
                        delHobbyArr.push(ele)
                    }
                })
                return {
                    ...prevState,
                    userHobby: delHobbyArr
                };
            });

            const {userHobby} = useTestStore.getState()
            console.log(userHobby, 'check user hobby', selected)

        } else {
            setSelected((prev) => {
                return [...prev, item.id];
            })

            useTestStore.setState((prevState) => {
                return {
                    ...prevState,
                    userHobby: [...prevState.userHobby, item]
                };
            });
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


    useEffect(() => {
        getUserHobby()
    }, [])


    return (
        <div>
            <TestPageHeader
                navText={'은근테스트'}
                title={'username님만의 취미를'}
                subTitle={'알려주세요'}
                content={'복수선택 가능'}
                progressWidth={'120px'}
            />

            <section className={'p_14 user_hobby__layout'}>
                {
                    hobbyArr.map((item: UserHobbyProps) => (
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

export default UserHobby