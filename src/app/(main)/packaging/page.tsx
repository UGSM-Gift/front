'use client'
import'./packaging.scss';
import DefaultSelect from "@/app/_component/DefaultSelect";
import DefaultButton from '@/app/_component/DefaultButton';
import Image from "next/image";
import {useEventList, useTestStore} from "@/app/zustand/testStore";
import {useRouter} from "next/navigation";
import {useState} from "react";
import NavLayout from "@/app/(main)/_component/NavLayout";


const PackagePage  = () => {

    const clickBack = () => {

    }
    const onClickAddEvent = () => {

    }
    return(
        <div className={"select_goods_packaging__layout"}>
            <NavLayout
                    leftIcon={'back'}
                    centerText={'포장하기'}
                    clickBack={clickBack}
            />

            <div className={'select_goods_packaging__contents'}>
                <div className={'mt_16 mb_44'}>
                    <h2 className={'gray__color__100'}>선물 리스트를</h2>
                    <h2 className={'gray__color__100'}>포장해주세요</h2>
                </div>

                {/* 포장 이미지 */}
                <div className={"select_img__layout"}>
                    <div className={"select_img_contents row"}>
                        <div className={"self_add_image flex-center"}>
                            <Image src={'/add_gray_70_Icon.svg'} alt={'+'} width={24} height={24}/>
                            <span className={"gray__color__60 caption__font"}>이미지 추가</span>
                        </div>
                        <div className={"provided_image"}>
                            <Image src={'/packaging_img_1.svg'} alt={'축하'}  width={80} height={80}/>
                            <Image src={'/check_box_default_tertiary_Icon.svg'} alt={'+'} width={20} height={20} className={"radio_btn"}/>
                        </div>
                        <div className={"checked_image"}>
                            <Image src={'/packaging_img_2.svg'} alt={'기록'}  width={80} height={80}/>
                            <Image src={'/check_box_checked_tertiary_Icon.svg'} alt={'+'} width={20} height={20} className={"radio_btn"}/>
                        </div>
                    </div>

                    {/* 이미지 미선택한 경우 */}
                    <div className={"packaging_img__default mt_16"}>
                        <p className={"caption__font gray__color__60"}>선물 리스트를 포장할</p>
                        <p className={"caption__font gray__color__60"}>이미지를 선택해주세요</p>                     
                    </div>

                    {/* 이미지 선택/ 추가한 경우 */}
                    <div className={"packaging_img__selected mt_16"}>
                        <Image src={'/packaging_img_selected.svg'} alt={'축하'}  width={343} height={172}/>          
                    </div>

                </div>

                <div className={"divider_1px mt_24"}></div>

                {/* 기간 선택 */}
                <div className={"veiw_event_day__layout"}>
                    <div className={'mt_24 mb_16'}>
                        <h4 className={'gray__color__100'}>친구들이 해당 리스트를</h4>
                        <h4 className={'gray__color__100'}>언제까지 확인할 수 있나요?</h4>
                    </div>
                    <div className={'mb_12'}>
                        <DefaultSelect
                            imageUrl={'/calendar_icon.svg'}
                            type={'select_gray_border'}
                            clickSelectText={onClickAddEvent}
                            title={'날짜 선택'}
                        />
                    </div>
                </div>
            </div>

            <div className={'packaging__layout__footer'}>
                    <DefaultButton label={'확인'} type={'large_primary'}/>
            </div>
            
        </div>
    )
}
export default PackagePage
