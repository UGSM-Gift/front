'use client'
import './DefaultBottomSheets.scss'
import {MouseEventHandler} from "react";

interface delReasonData {
    id?: number
    name?: string
}

interface bottomSheetDataProps {
    propsArr: delReasonData[]
    title: string
    clickMenu?: (item: delReasonData) => void;

}

const DefaultBottomSheets = ({propsArr, title, clickMenu}: bottomSheetDataProps) => {

    const onClickMenu = (item: delReasonData) => {
        if (clickMenu) {
            clickMenu(item)
        }
    }

    return (
        <div className={'sheets__layout'}>
            <h4 className={'bottomSheets__title'}>{title}</h4>
            <div className={'bottomSheets__select__buttons'}>
                {
                    propsArr.map((item: delReasonData) => (
                        <div key={item.id} onClick={()=> onClickMenu(item)}>
                            <p className={'bottomSheets__select text__font'}>{item.name}</p>
                            {
                                propsArr.length !== item.id ?
                                    <div className={'modal__layout__divider'}></div> : <div></div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DefaultBottomSheets