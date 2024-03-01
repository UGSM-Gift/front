'use client'
import './userHobby.scss'
import DefaultSelect from "@/app/_component/DefaultSelect";
import {useTestStore} from "@/app/zustand/testStore";
import {useEffect, useState} from "react";
import {getHobbyList, getInterestList} from "@/app/api/UGTest";

interface UserHobbyArr {
    id: number
    name: string
    hasOtherName?: boolean
}

interface UserHobbyProps {
    type: string
}


const UserHobby = ({type}: UserHobbyProps) => {

    const [selected, setSelected] = useState<number[]>([])

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

    useEffect(()=> {
        if (type === 'hobby') {
            getUserHobby()
        } else {
            getUserInterest()
        }
    }, [type])

    const getUserHobby = async () => {
        try {
            const list = await getHobbyList()
            if (list.data) {
                setHobbyArr(list.data);
            } else {
                console.error("No data received from the server.");
            }
        } catch (err) {

        }
    }

    const getUserInterest = async () => {
        try {
            const list = await getInterestList()
            if (list.data) {
                console.log(list.data, 'interest')
                setInterestArr(list.data);
            } else {
                console.error("No data received from the server.");
            }
        } catch (err) {

        }
    }




    const onClickAddEvent = (item: UserHobbyArr) => {

        console.log(selected)

        if (selected.includes(item.id)) {

            const delArr: number[] = []

            selected.forEach((ele)=> {
                if (item.id !== ele) {
                    delArr.push(ele)
                }
            })

            console.log(delArr, 'check del arr')

            setSelected(delArr)
            interface userHobbyProps {
                id: number
                name: string
                hasOtherName?: boolean
            }


            if (type === 'hobby') {

                useTestStore.setState((prevState) => {
                    const delHobbyArr: userHobbyProps[] = []
                    prevState.userHobby.forEach((ele)=> {
                        if (ele.id !== item.id) {
                            delHobbyArr.push(ele)
                        }
                    })
                    return {
                        ...prevState,
                        userHobby: delHobbyArr
                    };
                });

            } else if (type === 'interest') {
                useTestStore.setState((prevState) => {
                    const delInterestArr: userHobbyProps[] = []
                    prevState.userInterest.forEach((ele)=> {
                        if (ele.id !== item.id) {
                            delInterestArr.push(ele)
                        }
                    })
                    return {
                        ...prevState,
                        userInterest: delInterestArr
                    };
                });
            }

            const { userHobby } = useTestStore.getState()
            console.log(userHobby, 'check user hobby', selected)

        } else {
            setSelected((prev) => {
                return [...prev, item.id];
            })

            if (type === 'hobby') {
                useTestStore.setState((prevState) => {
                    return {
                        ...prevState,
                        userHobby: [...prevState.userHobby, item]
                    };
                });

            } else if (type === 'interest') {
                useTestStore.setState((prevState) => {
                    return {
                        ...prevState,
                        userInterest: [...prevState.userInterest, item]
                    };
                });
            }
        }


    }
    useEffect(()=> {
        useTestStore.setState((prevState)=> {
            return {
                ...prevState,
                userInterest: [],
                userHobby: []
            }
        })
    }, [])


    const changeArr = () => {
        if (type === 'hobby') {
            return hobbyArr.map((item: UserHobbyArr) => (
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
        return interestArr.map((item: UserHobbyArr) => (
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
    return (
        <div className={'user_hobby__layout'}>
            {changeArr()}
        </div>
    )
}

export default UserHobby