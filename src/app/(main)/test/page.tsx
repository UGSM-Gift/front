'use client'
import NavLayout from "@/app/(main)/_component/NavLayout";
import './test.scss'
import EventType from "@/app/(main)/test/_component/EventType";
import DefaultButton from "@/app/_component/DefaultButton";
import {useEventList, useTestStore} from "@/app/zustand/testStore";
import {useState} from "react";
import DateDetail from "@/app/(main)/test/_component/dateDetail";
import Calendar from "@/app/(main)/_component/Calendar";
import UserJob from "@/app/(main)/test/_component/UserJob";
import UserHobby from "@/app/(main)/test/_component/UserHobby";
import AddEvent from "@/app/(main)/_component/AddEvent";
import UserHobbyDetail from "@/app/(main)/test/_component/UserHobbyDetail";
import UserCategory from "@/app/(main)/test/_component/UserCategory";





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




const TestPage = () => {

    const testStage = useTestStore(state => state.testStage);
    const eventType = useTestStore(state => state.eventType);
    const eventText = useTestStore(state => state.eventText);
    const eventDay = useTestStore(state => state.eventDay);
    const userJob = useTestStore(state => state.userJob);

    const testStageController = () => {
        switch (testStage) {
            case 1:
                if (eventType !== 0) {
                    return true
                }
                return false
            case 2:
                return
            case 3:
                return
            case 4:
                return
            case 5:
                return
            case 6:
                return
        }
    }

    const [footerContent, setFooterContent] = useState(0)



    const { eventList, updateEventList } = useEventList() as EventListHookReturnType;


    const testing = () => {
        console.log(visible, eventDay , 'vent' , eventText, eventDay, userJob)
    }

    // 푸터 버튼 클릭시
    const clickFooterButton = () => {
        console.log('outer')
        if (visible && eventDay !== 0 && footerContent === 0) {
            console.log('1deps')

            return setFooterContent(1)

        } else if (footerContent === 1) {
            console.log('2deps')

            if (eventText === '') {
                // 이전으로 돌아가기
                return setFooterContent(0)
            } else {
                const nextId = eventList.length + 1
                const updatedEventList = [...eventList, {
                    id: nextId,
                    title: eventText,
                    image: '/circle_input_icon_false.svg',
                    type: 'select_gray_border',
                    userImage: '/add_event_heart.svg'
                }];
                console.log('heellooo')
                clickAddEvent()
                return updateEventList(updatedEventList);
            }
        } else if (testStageController()) {
            useTestStore.setState((prevState) => ({
                testStage: prevState.testStage + 1
            }));
        }

    }




    const renderFooterButton = () => {

        if (footerContent === 1) {
            if (eventText !== '') {
                return <div className={'test_page__footer__inner__button'}>
                    <div className={'test_page__footer__inner__button_box'}>
                        <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButton}/>
                    </div>
                    <div className={'test_page__footer__inner__button_box'}>
                        <DefaultButton label={'다음'} type={'medium_primary'} buttonClick={clickFooterButton}/>
                    </div>
                </div>
            }
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButton}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'다음'} type={'medium_gray'} buttonClick={clickFooterButton}/>
                </div>
            </div>
        } else if (visible) {
            return <DefaultButton label={'다음'} type={'large_primary'} buttonClick={clickFooterButton}/>
        } else if (testStageController()) {
            return <DefaultButton label={'확인'} type={'large_primary'} buttonClick={clickFooterButton}/>
        }
        return <DefaultButton label={'확인'} type={'large_gray_border'} buttonClick={clickFooterButton}/>


        // switch (testStage) {
        //     case 1:
        //         if (eventType !== 0 && (eventType !== 4 || eventText !== '')) {
        //             return <DefaultButton label={'확인'} type={'large_primary'} buttonClick={clickFooterButton}/>
        //         } else {
        //             return <DefaultButton label={'확인'} type={'large_gray_border'} buttonClick={clickFooterButton}/>
        //         }
        //     // return ''
        //     // break;
        //     case 2:
        //         return
        //     case 3:
        //         return
        //     case 4:
        //         return
        //     case 5:
        //         return
        // }
    }

    const [progressWidth, setProgressWidth] = useState('24px')

    interface testStageSwitchReturnProps {
        val1: string | JSX.Element
        val2: string | JSX.Element
        val3: string | JSX.Element
        val4: string | JSX.Element
        val5: string | JSX.Element
        val6: string | JSX.Element
    }
    const testStageSwitchReturn = ({val1, val2, val3, val4, val5, val6} :testStageSwitchReturnProps) => {
        switch (testStage) {
            case 1:
                return val1
            case 2:
                return val2
            case 3:
                return val3
            case 4:
                return val4
            case 5:
                return val5
            case 6:
                return val5
        }
    }


    const clickAddEvent = () => {
        if (visible) {
            setVisible(false)
            setTestPageFooterClassName('test_page__calendar_down')
            setFooterClassName('test_page__footer')
        } else {
            setVisible(true)
            setTestPageFooterClassName('test_page__calendar_up')
            setFooterClassName('test_page__footer__none_border')
        }
    }
    const renderTestComponent = () => {
        return testStageSwitchReturn({
            val1: <EventType clickAddEvent={clickAddEvent}/>,
            val2: <UserCategory/>,
            val3: <UserJob/>,
            val4:<UserHobby/>,
            val5:<UserHobbyDetail/>,
            val6:<EventType/>
        })
    }

    const mainTitle = () => {
        return testStageSwitchReturn({
            val1: '어떤 이벤트로',
            val2: 'user님은 현재 어떤 직업을',
            val3: 'user님 만의 취미를',
            val4:'user님은 평소 어디에',
            val5:'선택하신 취미/관심사에 관한',
            val6:'user님에게 맞는'
        })
    }
    const subTitle = () => {
        return testStageSwitchReturn({
            val1: '선물 리스트를 꾸리시나요?',
            val2: '가지고 계신가요?',
            val3: '알려주세요',
            val4: '관심이 있나요?',
            val5: '상세 질문에 답을 해주세요',
            val6: '카테고리를 추천해드려요!'
        })
    }



    let [visible, setVisible] = useState(false)
    let [testPageFooterClassName, setTestPageFooterClassName] = useState('test_page__calendar_down')
    let [footerClassName, setFooterClassName] = useState('test_page__footer')

    const clickBack = () => {
        setFooterContent(0)
        useTestStore.setState({eventDay: 0});
        clickAddEvent()
    }


    return (
        <div>
            <NavLayout
                rightIconArr={['heart']}
            />
            <div onClick={testing}>testing</div>
            <article className={'test_page__layout__progress'}>
                <div className={'test_page__layout__progress_bar'}>
                    <div className={'test_page__layout__progress_bar__inner'}
                         style={{width: progressWidth}}
                    >
                    </div>
                </div>
            </article>
            <section className={'mb_30 p_14'}>
                <h2 className={'gray__color__100 mb_3'}>
                    {mainTitle()}
                </h2>
                <h2 className={'gray__color__100 '}>
                    {subTitle()}
                </h2>
            </section>

            <section className={'test_page__layout'}>
                {
                    renderTestComponent()
                }
            </section>

            {/*<div>*/}
            {/*    <Calendar/>*/}
            {/*</div>*/}

            <footer className={testPageFooterClassName}>
                <NavLayout
                    centerText={'이벤트 추가'}
                    clickClose={clickBack}
                    rightIconArr={['close']}
                />

                <div className={'test_page__footer__inner'}>
                    {
                        footerContent === 0 ?
                            <div><Calendar/></div>
                        : <div><AddEvent/></div>
                    }
                </div>
            </footer>
            <div className={footerClassName} >
                {renderFooterButton()}
            </div>
        </div>
    )
}

export default TestPage