'use client'
import NavLayout from "@/app/(main)/_component/NavLayout";
import Calendar from "@/app/(main)/_component/Calendar";
import AddEvent from "@/app/(main)/_component/AddEvent";
import Image from "next/image";
import EventType from "@/app/(main)/test/_component/EventType";
import {useEffect, useState} from "react";
import DefaultButton from "@/app/_component/DefaultButton";
import './addList.scss'
import {useEventList, useTestStore} from "@/app/zustand/testStore";
import {getAnniversaryList, postAnniversary} from "@/app/api/anniversary";
import {useRouter} from "next/navigation";
import TestPageHeader from "@/app/(main)/test/_component/TestPageHeader";


interface EventListState {
    id: number
    title: string
    image: string
    type: string
    userImage: string
}

type EventListHookReturnType = {
    eventList: EventListState[];
    updateEventList: (newEventList: EventListState[]) => void;
};




const AddList = () => {

    const router = useRouter()

    let [testPageFooterClassName, setTestPageFooterClassName] = useState('test_page__calendar')
    let [footerClassName, setFooterClassName] = useState('test_page__footer')
    const [footerContent, setFooterContent] = useState(0)


    const { eventList, updateEventList } = useEventList() as EventListHookReturnType;

    const eventText = useTestStore(state => state.eventText);
    const eventDay = useTestStore(state => state.eventDay);
    const eventImageId = useTestStore(state => state.eventImageId);


    // 이벤트 생성 클릭시
    const clickAddEvent = () => {
        if (footerContent === 0) {
            setFooterContent(1)
            setTestPageFooterClassName('test_page__calendar_up')
            setFooterClassName('test_page__footer__none_border')
        } else {
            setFooterContent(0)
            setTestPageFooterClassName('test_page__calendar_down')
            setFooterClassName('test_page__footer')
        }
    }



    // 이벤트 모달창 닫기 버튼
    const onClickCloseModal = () => {
        useTestStore.setState({eventDay: ''});
        clickAddEvent()
    }



    const postEventList = async () => {
        try {
            const formattedDate = String(eventDay).replace(/(\d{2})(\d{2})(\d{2})/, '20$1-$2-$3');

            const postData = {
                name: eventText,
                imageId: eventImageId,
                date: formattedDate,
            }

            const newArr = await postAnniversary(postData)

            console.log(newArr)
        } catch (err) {
            console.log(err)
        }
    }

    const initEventList = async () => {
        const initList = await getAnniversaryList('')
        updateEventList(initList.data)
    }



    // 다음으로 가는 버튼
    const clickFooterButton = async (value: string) => {
        switch (value) {
            case '확인':
                router.push('/test/userJob')
                break;
            case '다음':
                console.log(eventDay)
                setFooterContent(2)
                break;
            case '이전':
                setFooterContent(1)
                break;
            case '완료':
                await postEventList()
                await initEventList()
                clickAddEvent()
                break;
        }
    }


    const renderFooterContent = () => {
        switch (footerContent) {
            case 0:
                return <div></div>
            case 1:
                return <div>
                    <Calendar/>
                </div>
            case 2:
                return <div><AddEvent/></div>
        }
    }


    const renderFooterButton = () => {
        switch (footerContent) {
            case 0:
                return <div className={'add_list_page__full__button'}>
                    <DefaultButton label={'확인'} type={'large_primary'} buttonClick={() => clickFooterButton('확인')}/>
                </div>
            case 1:
                return <div className={'test_page__footer__inner__button pr_16 pl_16'}>
                    <div className={'add_list_page__full__button'}>
                        <DefaultButton label={'확인'} type={'large_primary'} buttonClick={() => clickFooterButton('다음')}/>
                    </div>
                </div>
            case 2:
                return <div className={'test_page__footer__inner__button pr_16 pl_16'}>
                    <div className={'test_page__footer__inner__button_box'}>
                        <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={() => clickFooterButton('이전')}/>
                    </div>
                    <div className={'test_page__footer__inner__button_box'}>
                        <DefaultButton label={'완료'} type={'medium_primary'} buttonClick={() => clickFooterButton('완료')}/>
                    </div>
                </div>
        }
    }



    useEffect(()=> {
        initEventList()
    }, [])


    const test = () => {

        console.log(
            eventImageId,
            eventList,
            eventText,
            eventDay,

            )
    }
    return (
        <div className={'borderRed'} onClick={test}>
            <TestPageHeader
                navText={'은근테스트'}
                title={'어떤 이벤트로'}
                subTitle={'선물 리스트를 꾸리시나요?'}
                content={''}
                progressWidth={'24px'}
            />


            <section className={'p_14'}>
                <EventType clickAddEvent={clickAddEvent}/>
            </section>


            <footer className={testPageFooterClassName}>
                <NavLayout
                    centerText={'이벤트 추가'}
                    clickClose={onClickCloseModal}
                    rightIconArr={['close']}
                />

                <div className={'test_page__footer__inner'}>
                    {renderFooterContent()}
                </div>
            </footer>
            <div className={footerClassName}>
                {renderFooterButton()}
            </div>

        </div>
    )
}

export default AddList