'use client'
import './addEvent.scss'
import Image from "next/image";
import DefaultInput from "@/app/_component/DefaultInput";
import {useState} from "react";
import {useTestStore} from "@/app/zustand/testStore";

const AddEvent = () => {

    const [eventText, setEventText] = useState('')
    const inputEventName = (text: string) => {
        useTestStore.setState({eventText: text})
        setEventText(text)
    }

    const ImageArr = [
        {imageUrl: '/add_event_gift_box.svg'},
        {imageUrl: '/add_event_fire.svg'},
        {imageUrl: '/add_event_heart.svg'},
        {imageUrl: '/add_event_flower.svg'},
        {imageUrl: '/add_event_balloon.svg'},
    ]
    return (
        <div className={'add_event__layout'}>
            <div>
                <h6 className={'mt_6 mb_10 ml_2'}>이미지 선택</h6>
                <div className={'add_event__layout__image'}>
                    {
                        ImageArr.map((item) => (
                            <div key={item.imageUrl} className={'mr_14'}>
                                <Image src={item.imageUrl} alt={'x'} width={66} height={66}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <h6 className={'mt_32 mb_10 ml_2'}>기념일 명</h6>
                <div>
                    <DefaultInput
                        style={'default'}
                        placeholder={'이벤트 명을 입력해주세요'}
                        onChangeValue={inputEventName}
                        value={eventText}
                        max_length={20}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddEvent