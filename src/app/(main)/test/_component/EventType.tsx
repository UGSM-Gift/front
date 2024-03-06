'use client'
import './eventType.scss'
import DefaultSelect from "@/app/_component/DefaultSelect";
import {MouseEventHandler, useEffect, useState} from "react";
import DefaultInput from "@/app/_component/DefaultInput";
import {useEventList, useTestStore} from "@/app/zustand/testStore";
import {getAnniversaryList} from "@/app/api/anniversary";

interface EventTypeProps {
    // clickAddEvent?: MouseEventHandler<HTMLDivElement>;
    clickAddEvent?: (item: string) => void;
}


interface EventListState {
    id: number
    name: string
    date: string
    imageUrl: string
}

type EventListHookReturnType = {
    eventList: EventListState[];
    updateEventList: (newEventList: EventListState[]) => void;
};

const EventType = ({clickAddEvent}: EventTypeProps) => {

    const {eventType} = useTestStore.getState();
    const eventText = useTestStore(state => state.eventText); // 상태 구독

    const {eventList, updateEventList} = useEventList() as EventListHookReturnType;


    const [selectEvent, setSelectEvent] = useState(0)


    const inputEventName = (item: string) => {
        useTestStore.setState({eventText: item})
    }

    interface UserJobProps {
        id: number
        name: string
        hasOtherName?: boolean

    }


    interface UserChoiceProps {
        id: number
        content: string
    }


    const clickSelect = (item: EventListState | UserJobProps | UserChoiceProps) => {

        if ('name' in item) {
            useTestStore.setState({eventText: item.name})
        }

        if ('date' in item) {
            useTestStore.setState({eventDay: item.date})
        }
        useTestStore.setState({eventType: item.id})

        setSelectEvent(item.id)
    }


    const onClickAddEvent = (text: string) => {
        useTestStore.setState({eventType: 0})

        if (clickAddEvent) {
            clickAddEvent(text)
        }
    }


    return (
        <div className={'event_type__layout'}> 
            <section>
                {
                    eventList.map((item: EventListState) => (
                        <div key={item.id} className={'event_type__layout__button_wrapper mb_12'}>
                            <DefaultSelect
                                item={item}
                                leftImage={item.imageUrl}
                                imageUrl={selectEvent === item.id ? '/circle_input_icon_true.svg' : '/circle_input_icon_false.svg'}
                                type={selectEvent === item.id ? 'select_primary' : 'select_gray_border'}
                                clickSelect={clickSelect}
                                title={`${item.name.slice(0, 10)} ${item.date.slice(1,3)}`}
                            />
                        </div>
                    ))
                }
                <div>
                    <DefaultSelect
                        imageUrl={'/add_event_plus.svg'}
                        type={'select_gray_border'}
                        clickSelectText={onClickAddEvent}
                        title={'이벤트 추가'}
                    />
                </div>
            </section>
            <div></div>
            <section className={'pb_50'}>
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