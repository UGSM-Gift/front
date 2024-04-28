'use client'
import IframeContent from "@/app/_component/IframeContent";
import {useGoodsDetail, useUserSelectGoods} from "@/app/zustand/goodsStore";
import './selectGoodsDetail.scss'
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";


const SelectGoodsDetail = () => {

    const buyingUrl = useGoodsDetail(state => state.buyingUrl); // 상태 구독

    const router = useRouter()



    const testing = () => {
    }

    const clickClose = () => {
        router.replace('/selectGoods')
    }

    const clickSelect = () => {

    }

    return (
        <div>
            <div className={'iframe__cover'}>
                <IframeContent/>

                <div className={'select__goods__detail__footer'}>
                    <div className={'select__goods__detail__footer__button'}>
                        <DefaultButton label={'닫기'} type={'large_primary_border'}
                                       buttonClick={clickClose}
                        />
                    </div>
                    <div className={'select__goods__detail__footer__button'}>
                        <DefaultButton label={'선택하기'} type={'large_primary'}
                                       buttonClick={clickSelect}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SelectGoodsDetail