'use client'
import './eventType.scss'
import DefaultSelect from "@/app/_component/DefaultSelect";
import {MouseEventHandler, useState} from "react";
import DefaultInput from "@/app/_component/DefaultInput";
import {useEventList, useTestStore} from "@/app/zustand/testStore";

interface EventTypeProps {
    // clickAddEvent?: MouseEventHandler<HTMLDivElement>;
    clickAddEvent?: (item: string) => void;
}


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

const EventType = ({clickAddEvent}: EventTypeProps) => {

    const {eventType} = useTestStore.getState();
    const eventText = useTestStore(state => state.eventText); // 상태 구독독
    const testStage = useTestStore(state => state.testStage); // 상태 구독


    const {eventList, updateEventList} = useEventList() as EventListHookReturnType;

    const inputEventName = (item: string) => {
        useTestStore.setState({eventText: item})
    }

    const clickSelect = (item: string) => {
        console.log(eventType, testStage, item)

        useTestStore.setState({eventText: item})
        useTestStore.setState({eventType: 1})

        const updateEventMap = eventList.map((ele) => {
            if (ele.title === item) {
                console.log('hello?', ele)
                return {
                    ...ele,
                    image: '/circle_input_icon_true.svg',
                    type: 'select_primary',
                }
            }
            return {
                ...ele,
                image: '/circle_input_icon_false.svg',
                type: 'select_gray_border',
            }
        })

        updateEventList(updateEventMap)


        // switch (item) {
        //     case '생일':
        //         useTestStore.setState({eventText: '생일'})
        //         useTestStore.setState({eventType: 1})
        //
        //         // 업데이트 함수를 사용하여 이벤트 목록 업데이트
        //         updateEventList([{
        //             id: 1,
        //             title: '정서윤 생일 (02.14)',
        //             image: '/circle_input_icon_true.svg',
        //             type: 'select_primary',
        //             userImage: '/add_event_heart.svg'
        //         },]);
        //
        //         break;
        //     default:
        //         useTestStore.setState({eventText: '그 외'})
        //         useTestStore.setState({eventType: 1})
        //         updateEventList([
        //             {
        //                 id: 1,
        //                 title: '정서윤 생일 (02.14)',
        //                 image: '/circle_input_icon_true.svg',
        //                 type: 'select_gray_border',
        //                 userImage: '/add_event_heart.svg'
        //             },
        //         ]);
        //
        //
        //         break;
        // }
    }

    const onClickAddEvent = (text: string) => {
        useTestStore.setState({eventType: 0})
        updateEventList([
            {
                id: 1,
                title: '정서윤 생일 (02.14)',
                image: '/circle_input_icon_false.svg',
                type: 'select_gray_border',
                userImage: '/add_event_heart.svg'
            },
        ]);

        if (clickAddEvent) {
            clickAddEvent(text)
        }
    }

    return (
        <div>

            <section>
                {
                    eventList.map((item: EventListState) => (
                        <div key={item.id} className={'event_type__layout__button_wrapper mb_12'}>
                            <DefaultSelect
                                leftImage={item.userImage}
                                imageUrl={item.image}
                                type={item.type}
                                clickSelect={clickSelect}
                                title={item.title}
                            />
                        </div>
                    ))
                }
                <div>
                    <DefaultSelect
                        imageUrl={'/add_event_plus.svg'}
                        type={'select_gray_border'}
                        clickSelect={onClickAddEvent}
                        title={'이벤트 추가'}
                    />
                </div>
            </section>
            <div></div>
            <section>
                {

                    eventType === 4 ?
                        <div className={'pt_20'}>
                            <h6 className={'gray__color__100 pl_4 mb_8'}>이벤트명</h6>
                            <DefaultInput
                                style={'default'}
                                placeholder={'이벤트 명을 입력해주세요'}
                                onChangeValue={inputEventName}
                                value={eventText}
                                max_length={20}
                            />
                        </div> : ''
                }
            </section>
            <footer>

            </footer>

        </div>
    )
}

export default EventType