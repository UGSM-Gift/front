'use client'
import './chooseGift.scss';
import DefaultInput from '@/app/_component/DefaultInput';
import Image from "next/image";
import TestPageFooterButton from '../../test/_component/TestPageFooterButton';
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const ChooseGift = () => {

    const router = useRouter()
    const [buttonActive, setButtonActive] = useState(false)


    const [selected, setSelected] = useState<number[]>([])
// 해당 부분 userHobby 에서 가져왔는데 주석으로 뭐라 달아두셨길래 혹시나 하고 복붙 출처 가져왔어욤 ㅎ

    const clickFooterButton = (value: string) => {
        if (value === '넘어가기') {
            router.replace('/getGiftList/completeSendGift')
        } else {
            router.replace('/getGiftList')
        }
    }


    const inputText = (val:string) => {
        console.log(val)
    }


    useEffect(() => {
        if (selected.length === 0) {
            setButtonActive(false)
        } else {
            setButtonActive(true)
        }
    }, [selected])


    return (
        <div>
            {/* title */}
            <div className={'mt_48 mb_48 ml_16'}>
                <h2 className={'gray__color__100'}>친구에게 메세지를</h2>
                <h2 className={'gray__color__100'}>보내보세요</h2>
            </div>

            {/* contents - test/packaing 페이지와 동일한 classname */}
            <div className={"select_img__layout ml_16"}>
                <div className={"select_img_contents row"}>
                    <div className={"self_add_image "}>
                        <Image src={'/add_gray_70_Icon.svg'} alt={'+'} width={24} height={24}/>
                        <span className={"gray__color__60 caption__font"}>이미지 추가</span>
                    </div>
                    <div className={"provided_image"}>
                        <Image src={'/packaging_img_1.svg'} alt={'축하'} width={80} height={80}/>
                        <Image src={'/check_box_default_tertiary_Icon.svg'} alt={'+'} width={20} height={20}
                               className={"radio_btn"}/>
                    </div>
                    <div className={"checked_image"}>
                        <Image src={'/packaging_img_2.svg'} alt={'기록'} width={80} height={80}/>
                        <Image src={'/check_box_checked_tertiary_Icon.svg'} alt={'+'} width={20} height={20}
                               className={"radio_btn"}/>
                    </div>
                </div>

                {/* 이미지 미선택한 경우 */}
                <div className={"packaging_img__default mt_16"}>
                    <p className={"caption__font gray__color__60"}>메세지의 썸네일을</p>
                    <p className={"caption__font gray__color__60"}>선택해주세요</p>
                </div>

                {/* 이미지 선택/ 추가한 경우 */}
                <div className={"packaging_img__selected mt_16"}>
                    <Image src={'/packaging_img_selected.svg'} alt={'축하'} width={343} height={172}/>
                </div>

                <div className={"divider_1px mt_24 mb_24"}></div>

                <DefaultInput
                    style={'default'}
                    text_area={true}
                    placeholder={'메세지 입력'}
                    max_length={200}
                    onChangeValue={inputText}
                />
            </div>
            <TestPageFooterButton
                clickFooterButton={clickFooterButton}
                leftButtonTitle={'넘어가기'}
                rightButtonTitle={'확인'}
                state={buttonActive}
            />
        </div>
    )

} //End

export default ChooseGift