'use client'

import './dateDetail.scss'
import DefaultInput from "@/app/_component/DefaultInput";
import {useTestStore} from "@/app/zustand/testStore";
import DefaultSelect from "@/app/_component/DefaultSelect";
import {useState} from "react";

const DateDetail = () => {


    const eventText = useTestStore(state => state.eventText);

    const inputEventName = () => {

    }

    const clickSelect = () => {

    }

    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        setIsVisible(false);
    };


    return (
        <div>
            <h6>이벤트 이름</h6>
            <div>
                <DefaultInput
                    style={'default'}
                    placeholder={eventText}
                    onChangeValue={inputEventName}
                    value={eventText}
                />
            </div>
            <h6>이벤트 기간 선택</h6>
            <div>
                <DefaultSelect imageUrl={'calendar_icon.svg'} type={'select_gray_border'}
                               clickSelect={clickSelect} title={'이벤트 기간을 선택해 주세요'}/>
            </div>
            {
                isVisible &&
                <div className={'hide'}>
                    sdfasdfasd
                </div>
            }

        </div>
    )
}

export default DateDetail