import './giftListCheck.scss'
import MediumProductComponent from "@/app/(main)/_component/MediumProductComponent";
import NavLayout from "@/app/(main)/_component/NavLayout";
import DefaultButton from "@/app/_component/DefaultButton";
import Image from "next/image";

const GiftListCheck = () => {

    const mdArr = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
    ]

    const updateMode = false


    return (
        <div className={''}>
            <NavLayout
                leftIcon={'back'}
                centerText={'디퓨저'}
            />
            <section className={'pt_16 pr_16 pl_16'}>
                <h6 className={'mb_10'}>선택한 상품 (N)</h6>
                <article className={'gift_check__layout__content'}>
                {
                    mdArr.map((item)=> (
                        <div key={item.id}>
                            <MediumProductComponent
                                text={'암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보암튼상품정보'}
                                update={updateMode}
                            />
                        </div>
                    ))
                }
                </article>
            </section>
            <footer className={'gift_check__layout__footer'}>
                <div className={'row mt_2 mb_8'}>
                    <h5 className={'gray__color__100 pr_2'}>선택한 상품을 어떻게 받고 싶은가요?</h5>
                    <p className={'small__product__font '} style={{color: "red"}}>*</p>
                </div>
                <div className={'gift_check__layout__footer__input mb_14'}>
                    <div className={'pr_6'}>
                        <Image src={'/circle_input_icon_true.svg'} alt={'o'} width={24} height={24}/>
                    </div>
                    <p className={'text__font gray__color__100'}>선택한 상품 모두 선물받기</p>
                </div>
                <div className={'gift_check__layout__footer__input mb_22'}>
                    <div className={'pr_6'}>
                        <Image src={'/circle_input_icon_false.svg'} alt={'o'} width={24} height={24}/>
                    </div>
                    <p className={'text__font gray__color__100'}>선택한 상품 중 하나만 선물 받기(친구가 선택)</p>
                </div>


                <DefaultButton label={'확인'} type={'large_primary'}/>
            </footer>
        </div>
    )
}

export default GiftListCheck