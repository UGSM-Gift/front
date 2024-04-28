'use client'
import './finishPackaging.scss'
import TestPageFooterButton from "@/app/(main)/test/_component/TestPageFooterButton";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
import NavLayout from "@/app/_component/NavLayout";

const FinishPackaging = () => {


    const clickFooterButton = (value: string) => {
        if (value === '이전') {

        } else {

        }
    }
    const clickBack = () => {

    }

    return(
        <div>
            <NavLayout
                        rightIconArr={['close']}
                        clickBack={clickBack}
                        shadow={false}
                />
            
            <div className={"finish_packaging__layout"}>
                <div className={"packaging_img__selected mt_84"}>
                    <Image src={'/packaging_img_selected.svg'} alt={'축하'} width={343} height={172}/>          
                </div>

                <div className={'finish_packaging_content mt_24'}>
                    <h2 className={'gray__color__100'}>포장 완료&#127873;</h2>
                    <div className={'share_period gray__color__60 text__font mt_12'}>기간 : 23.10.16~10.25 까지</div>
                    <div className={'products_number gray__color__60 text__font'}>상품 수 : 15개</div>
                </div>
            </div>

            {/* 링크 복사 시 토스트 */}
            {/*<div className={"toast__layout white__color text__font"}>*/}
            {/*    링크가 복사되었습니다*/}
            {/*</div>*/}

            <TestPageFooterButton
                clickFooterButton={clickFooterButton}
                leftButtonTitle={'내 선물 리스트 확인'}
                rightButtonTitle={'링크 복사'}
                state={true}
            />
        </div>
    )
}

export default FinishPackaging