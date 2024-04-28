'use client'
import './receivePresent.scss'
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";
import {useEffect, useState} from "react";
import {getGiveGiftList, getSendGiftList} from "@/app/api/giftList";


// interface ReceivePresent {
//     myList?: boolean
// }
const ReceivePresent = () => {
    const smallArr = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 10},
    ]


    interface giftListProps {
        "productId": number,
        "productName": string,
        "productPrice": number,
        "confirmedStatus": string,
        "giverId": number,
        "giverNickname": string,
        "sentAt": string,
        "dibbed": null
    }

    const [giftList, setGiftList] = useState<giftListProps[]>();

    const callGiftList = async () => {
        try {
            const data = await getSendGiftList()
            setGiftList(data.data)
        } catch (err) {

        }
    }
    useEffect(() => {
        callGiftList()
    }, [])


    return (
        <div>
            {
                giftList ?
                    <section className={'receive_present__layout'}>
                        <article className={'receive_present__layout__content'}>
                            {
                                giftList.map((item, index) => (
                                    <div className={''} key={index}>
                                        <SmallProductComponent
                                            price={item.productPrice}
                                            text={item.productName}
                                        />
                                    </div>
                                ))
                            }

                        </article>
                    </section>
                    :
                    <div className={'receive_present__layout__null'}>
                        <p className={'bold__text__font gray__color__50'}>앗! 아직 리스트를 만들지 않았어요</p>
                        <p className={'bold__text__font gray__color__50'}>테스트로 받고 싶은 선물 리스트를 만들어보세요</p>
                    </div>
            }
        </div>
    )
}

export default ReceivePresent