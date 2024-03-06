'use client'
import './giftListLetter.scss'
import NavLayout from "@/app/(main)/_component/NavLayout";
import {useState} from "react";
import Image from "next/image";
import LetterBoxComponent from "@/app/(main)/_component/LetterBoxComponent";
import TopNavTabComponent from "@/app/(main)/_component/TopNavTabComponent";
import TopFilteringComponent from "@/app/(main)/_component/TopFilteringComponent";
import {useRouter} from "next/navigation";

interface GiftListLetterProps {
    selectTap?: string
}


interface TopNavTabComponentRenderNavProps {
    name: string
    textColor: string
    border: boolean
    id: number
}


const GiftListLetter = () => {



    let [renderNav, setRenderNav] = useState([
        {id: 1, name: '전체', textColor: 'button__font primary__color__400', border: true},
        {id: 2, name: '안읽은 편지', textColor: 'button__font gray__color__80', border: false},
        {id: 3, name: '읽은 편지', textColor: 'button__font gray__color__80', border: false}
    ])

    const [currentComponent, setCurrentComponent] = useState(1);

    const onClickTab = (item: TopNavTabComponentRenderNavProps) => {
        switch(item.id) {
            case 1:
                setRenderNav([
                    {id: 1, name: '전체', textColor: 'button__font primary__color__400 mb_4', border: true},
                    {id: 2, name: '안읽은 편지', textColor: 'button__font gray__color__80 mb_4', border: false},
                    {id: 3, name: '읽은 편지', textColor: 'button__font gray__color__80 mb_4', border: false}
                ])
                setCurrentComponent(1)
                break;
            case 2:
                setRenderNav([
                    {id: 1, name: '전체', textColor: 'button__font gray__color__80 mb_4' , border: false},
                    {id: 2, name: '안읽은 편지', textColor: 'button__font primary__color__400 mb_4', border: true},
                    {id: 3, name: '읽은 편지', textColor: 'button__font gray__color__80 mb_4', border: false}
                ])
                setCurrentComponent(2)
                break;
            case 3:
                setRenderNav([
                    {id: 1, name: '전체', textColor: 'button__font gray__color__80 mb_4', border: false},
                    {id: 2, name: '안읽은 편지', textColor: 'button__font gray__color__80 mb_4', border: false},
                    {id: 3, name: '읽은 편지', textColor: 'button__font primary__color__400 mb_4', border: true}
                ])
                setCurrentComponent(3)
                break;
        }
    }




    const letterBoxArr = [
        {user: '무지개하늘586', date: '23.10.28', id: 1},
        {user: '무지개하늘587', date: '23.10.23', id: 2},
        {user: '무지개하늘588', date: '23.10.24', id: 3},
        {user: '무지개하늘587896', date: '23.10.25', id: 4},
        {user: '무지개하늘58786', date: '23.10.26', id: 5},
        {user: '무지개하늘58766', date: '23.10.27', id: 6},
    ]

    const router = useRouter()

    const clickBack = () => {
        router.back()
    }

    const clickLetterBox = () => {
        router.replace('/main/letter/detail')
    }
    return (
        <div>
            <NavLayout
                leftIcon={'back'}
                centerText={'편지함'}
                clickBack={clickBack}
            />
            <TopNavTabComponent renderNav={renderNav} onClickTab={onClickTab}/>

            <section className={'gift_list_letter__layout'}>
                <TopFilteringComponent/>

                <article className={'gift_list_letter__layout__letter_box'}>
                    {
                        letterBoxArr.map((item)=> (
                            <div key={item.id} className={'mb_12 '}>
                                <LetterBoxComponent userName={item.user} date={item.date} clickLetterBox={clickLetterBox}/>
                            </div>
                        ))
                    }
                </article>
            </section>
        </div>
    )
}

export default GiftListLetter