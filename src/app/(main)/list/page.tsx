'use client'
import './list.scss'
import NavLayout from "@/app/_component/NavLayout";
import TopNavTabComponent from "@/app/(main)/_component/TopNavTabComponent";
import MyList from "@/app/(main)/list/my/page";
import FooterLayout from "@/app/(main)/_component/FooterLayout";
import TopFilteringComponent from "@/app/(main)/_component/TopFilteringComponent";
import {MouseEventHandler, useState} from "react";
import GivePresent from "@/app/(main)/list/givePresent/page";
import ReceivePresent from "@/app/(main)/list/receivePresent/page";



interface TopNavTabComponentRenderNavProps {
    name: string
    textColor: string
    border: boolean
    id: number
}



const List = () => {


    let [renderNav, setRenderNav] = useState([
        {id: 1, name: '내 리스트', textColor: 'button__font primary__color__400', border: true},
        {id: 2, name: '받은 선물', textColor: 'button__font gray__color__80', border: false},
        {id: 3, name: '내가 준 선물', textColor: 'button__font gray__color__80', border: false}
    ])

    const [currentComponent, setCurrentComponent] = useState(1);

    const onClickTab = (item: TopNavTabComponentRenderNavProps) => {
        switch(item.id) {
            case 1:
                setRenderNav([
                    {id: 1, name: '내 리스트', textColor: 'button__font primary__color__400 mb_4', border: true},
                    {id: 2, name: '받은 선물', textColor: 'button__font gray__color__80 mb_4', border: false},
                    {id: 3, name: '내가 준 선물', textColor: 'button__font gray__color__80 mb_4', border: false}
                ])
                setCurrentComponent(1)
                break;
            case 2:
                setRenderNav([
                    {id: 1, name: '내 리스트', textColor: 'button__font gray__color__80 mb_4' , border: false},
                    {id: 2, name: '받은 선물', textColor: 'button__font primary__color__400 mb_4', border: true},
                    {id: 3, name: '내가 준 선물', textColor: 'button__font gray__color__80 mb_4', border: false}
                ])
                setCurrentComponent(2)
                break;
            case 3:
                setRenderNav([
                    {id: 1, name: '내 리스트', textColor: 'button__font gray__color__80 mb_4', border: false},
                    {id: 2, name: '받은 선물', textColor: 'button__font gray__color__80 mb_4', border: false},
                    {id: 3, name: '내가 준 선물', textColor: 'button__font primary__color__400 mb_4', border: true}
                ])
                setCurrentComponent(3)
                break;
        }
    }

    return (
        <div>
            <NavLayout
                rightIconArr={['heart']}
            />
            <TopNavTabComponent renderNav={renderNav} onClickTab={onClickTab}/>
            <div className={'list__layout__content'}>
                <TopFilteringComponent/>
                {currentComponent === 1 && <MyList />}
                {currentComponent === 2 && <GivePresent />}
                {currentComponent === 3 && <ReceivePresent />}
            </div>
            <FooterLayout currentPage={'list'}/>
        </div>
    )
}

export default List
