import TestPageHeader from "@/app/_component/TestPageHeader";
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";
import CategorySelectBox from "@/app/_component/CategorySelectBox";
import './selectGift.scss'

const SelectGift = () => {



    return (
        <div>
            <TestPageHeader
                navText={'선물리스트'}
                title={'user님의'}
                subTitle={'선물리스트에서 선물하세요!'}
                content={'리스트 확인 기간 : 23.10.16~10.25'}
                progressWidth={'343px'}
            />
            <section className={'mt_40'}>
                <article>
                    <div className={'bold__button__font row'}>
                        <p className={'mb_4'}>복수선택</p>
                        <p className={'ml_4 mr_4'} style={{color: '#E63A3A'}}>*</p>
                        <p className={'primary__color__800'}> 3 </p>
                    </div>
                    <div className={'bold__caption__font gray__color__50 mb_20'}>
                        여러 상품 중 하나를 골라 선물해보세요
                    </div>
                    <div>
                        <CategorySelectBox
                            text={'카테고리'}
                            checked={true}
                        />
                    </div>
                </article>
                <div className={'divider_8px'}>
                </div>
                <article>
                    <div className={'bold__button__font row '}>
                        <p className={'mb_4'}> 단일 선택</p>
                        <p className={'primary__color__800 ml_10 '}> 3 </p>
                    </div>
                    <div className={'bold__caption__font gray__color__50 mb_20'}>
                        상품 하나를 선물해보세요
                    </div>
                    <div>
                        <SmallProductComponent
                            price={20000}
                            text={'adsf'}
                        />
                    </div>

                </article>
            </section>
        </div>
    )
}

export default SelectGift