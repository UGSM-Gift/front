'use client'
import './getGiftList.scss';
import DefaultButton from "@/app/_component/DefaultButton";
import Image from "next/image";
import NavLayout from "@/app/_component/NavLayout";
import {useRouter} from "next/navigation";

const GetGiftList = () => {
    const router = useRouter()
    const clickViewGiftList = () => {
        router.replace('getGiftList/chooseGift')
    }
    return(
        <div>
            <NavLayout
                    centerText={'선물리스트'}
                    shadow={false}
            />


            <div className={'getGiftList_contents__layout'}>
                {/* title */}
                <div className={'mt_16 mb_16'}>
                    <h2 className={'gray__color__100'}> <span className={'userName'}>민지</span>님의</h2>
                    <h2 className={'gray__color__100'}>선물리스트에서 선물하세요!</h2>
                    <h5 className={'mt_12 gray__color__60'}>
                        <span className={'userName'}> 김민지</span>의 선물 리스트</h5>
                </div>

                {/* contents */}
                <div className={''}>
                    <div className={"packaging_img__selected mt_16 mb_32"}>
                            <Image src={'/packaging_img_selected.svg'} alt={'축하'}  width={343} height={172}/>          
                    </div>

                    <h6 className={'mb_12'}>이벤트 명</h6>
    {/* global.scss gray__color에 색상 추가함 */}
                    <div className={'input__layout'}>
                        생일
                    </div>

                    <h6 className={'mt_16 mb_12'}>이벤트 기간</h6>
                    <div className={'input__layout'}>
                        <span>24.00.00</span> ~ <span>24.00.00</span>
                    </div>
                        
                </div> 
            </div>
            <div className={'getgiftlist__layout__footer'}>
                    <DefaultButton label={'선물 리스트 보러가기'} type={'large_primary'} buttonClick={clickViewGiftList}/>
            </div>
        </div>
    ) // return END

} // END

export default GetGiftList
