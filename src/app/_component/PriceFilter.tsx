'use client'
import'./priceFilter.scss';
import Image from "next/image";
import DefaultButton from '@/app/_component/DefaultButton';
import {useRouter} from "next/navigation";
import NavLayout from "@/app/_component/NavLayout";
import {MouseEventHandler, useState} from "react";


interface PriceFilterProps {
    clickRadio: (item: string) => void;
    clickClose: MouseEventHandler<HTMLDivElement>
    clickSubmit: MouseEventHandler<HTMLDivElement>
}

const PriceFilter = ({clickRadio, clickClose, clickSubmit}:PriceFilterProps) => {


    interface radioListProps {
        title: string
    }


    const [radioList, setRadioList] = useState<radioListProps[]>(
        [
            {
                title: '3만원 이하'
            },
            {
                title: '5만원 이하'
            },
            {
                title: '7만원 이하'
            },
            {
                title: '10만원 이하'
            },
            {
                title: '20만원 이하'
            },
            {
                title: '20만원 초과'
            },
        ]
    )

    const [checkedRadio, setCheckedRadio] = useState('3만원 이하')

    const clickRadioButton = (item: radioListProps) => {
        setCheckedRadio(item.title)
        clickRadio(item.title)
    }





    return(
        <div className={"price_filter__layout"}>

            {/* shadow가 없는 Nav가 필요해서 하나 만들었어요 */}
            <NavLayout
                    centerText={'가격대 선택'}
                    rightIconArr={['close']}
                    clickClose={clickClose}
                    shadow={false}
            />

            <div className={"price_filter_content__layout"}>
                {/* 선택한 radio */}

                {
                    radioList.map((item, index)=> (
                        <div key={index}>
                            <div className={"price_content__checked"} onClick={() => clickRadioButton(item)}>
                                <Image src={`${checkedRadio === item.title ? '/radio_checked _Icon.svg': '/radio_default _Icon.svg'}`} alt={'+'} width={24} height={24}/>
                                <span className={"gray__color__80 ml_8"}>{item.title}</span>
                            </div>
                            <div className={"divider_1px"}></div>
                        </div>

                    ))
                }
            </div>

            <div className={'price_filter__layout__footer'}>
                    <DefaultButton label={'확인'} type={'large_primary'} buttonClick={clickSubmit}/>
            </div>

            
        </div>

    )
}



export default PriceFilter