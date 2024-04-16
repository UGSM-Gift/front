'use client'
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";
import './userJob.scss'
import DefaultSelect from "@/app/_component/DefaultSelect";
import DefaultInput from "@/app/_component/DefaultInput";
import {useEffect, useState} from "react";
import {useTestStore} from "@/app/zustand/testStore";
import {getJobList} from "@/app/api/UGTest";
import TestPageFooterButton from "@/app/(main)/test/_component/TestPageFooterButton";
import {EventListState, UserChoiceProps, UserJobProps} from "@/app/type";
import TestPageHeader from "@/app/_component/TestPageHeader";




const UserJob = () => {

    const router = useRouter()
    const clickFooterButton = (value:string) => {
        if (value === '이전') {
            router.replace('/test')
        } else {
            router.replace('/test/userHobby')
        }
    }

    const [visibleInput, setVisibleInput] = useState(false)
    const [buttonActive, setButtonActive] = useState(false)


    // user job 은 store 에서 그냥 관리하는걸로 사용
    const userJob = useTestStore(state => state.userJob);
    const userJobId = useTestStore(state => state.userJobId); // 상태 구독



    // 렌더링 안될때 mokData
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


    const getUserJob = async () => {
        try {
            const list = await getJobList();
            if (list.data) {
                await setJobArr(list.data);

                if (userJob !== '') {
                    await setButtonActive(true)
                }

                // 타 페이지에서 되돌아왔을때 store 의 값 매핑
                if (userJobId === 35) {
                    await setVisibleInput(true)
                }
            } else {
                console.error("err getJobList ");
            }
        } catch (error) {
            console.error("Error fetching job list:", error);
        }
    };


    const clickSelect = (item: EventListState | UserJobProps | UserChoiceProps) => {
        if ('name' in item ) {
            useTestStore.setState({userJobId: item.id});

            if (item.name === '기타') {
                useTestStore.setState({userJob: ''});
                setVisibleInput(true)
                setButtonActive(false)
            } else {
                useTestStore.setState({userJob: item.name});
                setVisibleInput(false)
                setButtonActive(true)

            }
        }
    }

    const inputUserJob = (text: string) => {
        useTestStore.setState({userJob: text});
        setButtonActive(true)
    }

    useEffect(()=> {
        getUserJob()
    },[])


    return (
        <div>
            <TestPageHeader
                navText={'은근테스트'}
                title={'username 님은 현재 어떤'} subTitle={'직업을 가지고 계신가요?'} content={''} progressWidth={'80px'}
            />
            <section className={'p_14'}>
                <article className={'user_job__layout mb_34'}>
                    {
                        jobArr.map((item) => (
                            <div key={item.id} >
                                <DefaultSelect
                                    imageUrl={userJobId === item.id ? '/circle_input_icon_true.svg' : '/circle_input_icon_false.svg'}
                                    type={userJobId === item.id ? 'select_primary_half' : 'select_gray_border_half'}
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

export default UserJob