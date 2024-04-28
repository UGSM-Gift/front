'use client'
import './givePresent.scss'
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";
import {useEffect, useState} from "react";
import {getGiveGiftList} from "@/app/api/giftList";


// interface GivePresentProps {
//     myList?: boolean
// }

const GivePresent = () => {

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
            const data = await getGiveGiftList()
            setGiftList(data.data)
        } catch (err) {

        }
    }
    useEffect(() => {
        callGiftList()
    }, [])

    return (
        <div className={'my_list__layout'}>
            {
                giftList ?
                    <section className={'give_present__layout'}>
                        <article className={'give_present__layout__content'}>

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
                    <div className={'my_list__layout__null'}>
                        <p className={'bold__text__font gray__color__50'}>친구에게 선물 리스트받고,</p>
                        <p className={'bold__text__font gray__color__50'}>마음을 담아 선물해보세요!</p>
                    </div>
            }
        </div>
    )
}

export default GivePresent
