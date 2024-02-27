'use client'
import './addEvent.scss'
import Image from "next/image";
import DefaultInput from "@/app/_component/DefaultInput";
import {useEffect, useState} from "react";
import {useTestStore} from "@/app/zustand/testStore";
import {getAnniversaryImage} from "@/app/api/anniversary";


interface addEventImageProps {
    imageUrl: string
    id: number
}
const AddEvent = () => {

    const [eventText, setEventText] = useState('')
    const inputEventName = (text: string) => {
        useTestStore.setState({eventText: text})
        setEventText(text)
    }


    const [imageArr, setImageArr] = useState<addEventImageProps[]>([])

    useEffect(() => {
        getImageArr();
    }, []);

    const getImageArr = async () => {
        try {
            const imageArrData = await getAnniversaryImage();
            setImageArr(imageArrData.data);
        } catch (error) {
            console.error('Error fetching image array:', error);
        }
    };


    const [selectImage, setSelectImage] = useState(0)
    const clickImage = (item: addEventImageProps) => {
        console.log(item)
        setSelectImage(item.id)
        useTestStore.setState({eventImageId: item.id})
    }


    return (
        <div className={'add_event__layout'}>
            <div>
                <h6 className={'mt_6 mb_10 ml_2'}>이미지 선택</h6>
                <div className={'add_event__layout__image_box'}>
                    {
                        imageArr.map((item) => (
                            <div key={item.id}
                                 className={selectImage === item.id ?  'add_event__layout__image_true' : 'add_event__layout__image_false'}
                                 onClick={() => clickImage(item)}>
                                <Image src={item.imageUrl || 'fire_craker_icon.svg'} alt={'x'} width={48} height={48}/>
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