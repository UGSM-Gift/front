'use client'
import './userJob.scss'
import DefaultSelect from "@/app/_component/DefaultSelect";
import DefaultInput from "@/app/_component/DefaultInput";
import {useEffect, useState} from "react";
import {useTestStore} from "@/app/zustand/testStore";
import {getJobList} from "@/app/api/UGTest";


const UserJob = () => {

    const [jobArr, setJobArr] = useState([
        {
            id: 1,
            name: '학생',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },
        {
            id: 2,
            name: '직장인',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },
        {
            id: 3,
            name: '자영업자',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },{
            id: 4,
            name: '프리랜서',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },
        {
            id: 5,
            name: '무직',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },
        {
            id: 6,
            name: '기타',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },
    ])

    const [selectJob, setSelectJob] = useState(0)
    useEffect(()=> {
        getUserJob()
    }, [])

    const getUserJob = async () => {
        try {
            const list = await getJobList();
            if (list.data) {
                console.log('check')
                setJobArr(list.data);
            } else {
                console.error("No data received from the server.");
            }
        } catch (error) {
            console.error("Error fetching job list:", error);
        }
    };


    const [visibleInput, setVisibleInput] = useState(false)

    interface UserJobProps {
        id: number
        name: string
        hasOtherName?: boolean
    }



    interface UserChoiceProps {
        id: number
        content: string
    }
    interface EventListState {
        id: number
        name: string
        date: string
        imageUrl: string
    }


    const clickSelect = (item: EventListState | UserJobProps | UserChoiceProps) => {
        if ('name' in item ) {
            useTestStore.setState({userJob: item.name});
            setSelectJob(item.id)

            if (item.name === '기타') {
                setVisibleInput(true)
            } else {
                setVisibleInput(false)
            }
        }

    }

    const [userJob, setUserJob] = useState('')
    const inputUserJob = (text: string) => {
        setUserJob(text)

        useTestStore.setState({userJob: text});
    }


    return (
        <div>
            <article className={'user_job__layout mb_34'}>
                {
                    jobArr.map((item) => (
                        <div key={item.id} >
                            <DefaultSelect
                                imageUrl={selectJob === item.id ? '/circle_input_icon_true.svg' : '/circle_input_icon_false.svg'}
                                type={selectJob === item.id ? 'select_primary_half' : 'select_gray_border_half'}
                                clickSelect={clickSelect}
                                title={item.name}
                                item={item}
                            />
                        </div>
                    ))
                }
            </article>
            <article>
                {
                    visibleInput && <DefaultInput
                        style={'default'}
                        placeholder={'직업 종류를 입력해주세요'}
                        onChangeValue={inputUserJob}
                        value={userJob}
                        max_length={20}
                    />
                }
            </article>
        </div>
    )
}

export default UserJob