'use client'
import './userJob.scss'
import DefaultSelect from "@/app/_component/DefaultSelect";
import DefaultInput from "@/app/_component/DefaultInput";
import {useState} from "react";
import {useTestStore} from "@/app/zustand/testStore";


const UserJob = () => {

    const jobArr = [
        {
            id: 1,
            title: '학생',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },
        {
            id: 2,
            title: '직장인',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },
        {
            id: 3,
            title: '자영업자',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },{
            id: 4,
            title: '프리랜서',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },
        {
            id: 5,
            title: '무직',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },
        {
            id: 6,
            title: '기타',
            image: '/circle_input_icon_false.svg',
            type: 'select_gray_border_half',
        },

    ]


    const [visibleInput, setVisibleInput] = useState(false)

    const clickSelect = (text:string) => {
        console.log(text)

        useTestStore.setState({userJob: text});

        if (text === '기타') {
            setVisibleInput(true)
        } else {
            setVisibleInput(false)
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
                                imageUrl={item.image}
                                type={item.type}
                                clickSelect={clickSelect}
                                title={item.title}
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