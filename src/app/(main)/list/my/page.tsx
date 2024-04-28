'use client'
import './myList.scss'
import PresentListBoxComponent from "@/app/(main)/_component/PresentListBoxComponent";
import {useRouter} from "next/navigation";
import {getGiftList} from "@/app/api/mainPage";
import {useEffect, useState} from "react";
import {useListPageStore} from "@/app/zustand/listPageStore";


const MyList = () => {

    const router = useRouter()

    const [presentArr, setPresentArr] = useState(
        [
            {
                listId: 1,
                createdAt: "2024-04-20 23:08:14",
                availableAt: "2024-04-20 23:08:14",
                expiredAt: "2024-04-21 23:59:59",
                anniversaryImageUrl: "https://cloudfront.ugsm.co.kr/anniversary/ic-party-popper.png",
                anniversaryTitle: "생일",
                selectedProductsNumber: 0,
                receivedProductsNumber: 0,
            },
        ]
    )

    const getMainGiftList = async () => {
        try {
            const data =  await getGiftList()
            console.log(data, ' get Gift List')
            setPresentArr(data.data)
            useListPageStore.setState((prevState) => {
                return {
                    ...prevState,
                    presentArr: data.data
                }
            })
        } catch (err) {
            console.log(err, 'fail get gift list ')
        }
    }

    useEffect(()=> {
        getMainGiftList()
    }, [])



    const clickPresentListBox = () => {
        router.replace('/giftList')
    }


    return (
        <div className={'my_list__layout'}>
            {
                presentArr ?
                    <article className={'my_list__layout__content mb_14'}>
                        {
                            presentArr.map((item)=> (
                                <div key={item.listId} className={'mb_14'}>
                                    <PresentListBoxComponent
                                        clickPresentListBox={clickPresentListBox}
                                        image={item.anniversaryImageUrl}
                                        availableAt={item.availableAt}
                                        expiredAt={item.expiredAt}
                                        anniversaryTitle={item.anniversaryTitle}
                                        selectedProductsNumber={item.selectedProductsNumber}
                                        receivedProductsNumber={item.receivedProductsNumber}
                                    />
                                </div>
                            ))
                        }
                    </article>
                    :
                    <div className={'my_list__layout__null'}>
                        <p className={'bold__text__font gray__color__50'}>앗! 아직 리스트를 만들지 않았어요</p>
                        <p  className={'bold__text__font gray__color__50'}>테스트로 받고 싶은 선물 리스트를 만들어보세요</p>
                    </div>
            }
        </div>
    )
}

export default MyList
