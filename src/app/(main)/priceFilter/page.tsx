'use client'
import'./priceFilter.scss';
import NavLayout_default from '../../_component/NavLayout_default';
import Image from "next/image";
import DefaultButton from '@/app/_component/DefaultButton';
import {useRouter} from "next/navigation";

const PriceFilter = () => {


    const clickBack = () => {
    }

    return(
        <div className={"price_filter__layout"}>

            {/* shadow가 없는 Nav가 필요해서 하나 만들었어요 */}
            <NavLayout_default
                    centerText={'가격대 선택'}
                    rightIconArr={['close']}
                    clickBack={clickBack}
            />

            <div className={"price_filter_content__layout"}>
                {/* 선택한 radio */}
                <div className={"price_content__checked"}>
                    <Image src={'/radio_checked _Icon.svg'} alt={'+'} width={24} height={24}/>
                    <span className={"gray__color__80 ml_8"}>3만원 이하</span>
                </div>

                <div className={"divider_1px"}></div>

                {/* default radio */}
                <div className={"price_content__default"}>
                    <Image src={'/radio_default _Icon.svg'} alt={'+'} width={24} height={24}/>
                    <span className={"gray__color__100 ml_8"}>5만원 이하</span>
                </div>
            </div>

            <div className={'price_filter__layout__footer'}>
                    <DefaultButton label={'확인'} type={'large_primary'}/>
            </div>

            
        </div>

    )
}



export default PriceFilter