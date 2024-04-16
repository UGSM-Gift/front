'use client'
import'./showGiftList.scss';
import TestPageHeader from "@/app/_component/TestPageHeader";


const ShowGiftList=()=>{

    return(
        <div>
            <TestPageHeader
                navText={'상품 고르기'}
                title={'user님의 선물 리스트를'}
                subTitle={'최종 확인해주세요'}
                content={'총 선택 상품 15개'}
                progressWidth={'343px'}
            />
            <div>

            </div>
        </div>
    ) // return END
} // END
export default ShowGiftList