'use client'
import'./completeSendGift.scss';
import DefaultButton from '@/app/_component/DefaultButton';
import Image from "next/image";
import {useRouter} from "next/navigation";
import NavLayout from "@/app/_component/NavLayout";


const CompleteSendGift=()=>{

    const router = useRouter()

    const clickBack = () => {
        router.back()
    }

    return(
        <div>
            <NavLayout
                    rightIconArr={['back']}
                    clickBack={clickBack}
                />
            
            <div className='send_giftGoods__layout'>
                <div className={'send_giftGoods_img'}>
                    <Image src={'/present_goods_img.png'} alt={'선물한 상품'} width={160} height={160}/>
                </div>
                <div className={'going_to_pay mt_24'}>
                    <h2 className={'gray__color__100'}>선택한 상품 사이트에서</h2>
                    <h2 className={'gray__color__100'}>결제를 완료해주세요!</h2>
                    <div className={'text__font gray__color__60 mt_12 goods_name'}>
                        알데르도 꽃다발 가나다라마바사아자차카타파하 가나다라마바사아자차카타파하 </div>
                    <div className={'text__font gray__color__60 mt_4'}>
                        <span className={'goods_price'}>23,000</span>원</div>
                </div>
            </div>
            <div className={'move__layout__footer'}>
                <DefaultButton
                    label={'이동하기'} type={'large_primary'}
                />
            </div>
        </div>
    ) // return END

} // End

export default CompleteSendGift