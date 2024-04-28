import './presentListBoxComponent.scss'
import Image from "next/image";
import {MouseEventHandler} from "react";

interface PresentListBoxComponentProps {
    clickPresentListBox?: MouseEventHandler<HTMLDivElement>
    clickPresentListBoxItem?: (item:any) => void
    image?: string
    availableAt?: string
    expiredAt?: string
    anniversaryTitle?: string
    selectedProductsNumber?: number
    receivedProductsNumber?: number
    item?: any

}

const PresentListBoxComponent = (
    {
        clickPresentListBox,
        clickPresentListBoxItem,
        image = '/cake.png',
        availableAt = "2024-04-20 23:08:14",
        expiredAt = "2024-04-21 23:59:59",
        anniversaryTitle = "생일",
        selectedProductsNumber = 0,
        receivedProductsNumber = 0,
        item

    }: PresentListBoxComponentProps) => {

    const availableDate = new Date(availableAt);
    const expiredDate = new Date(expiredAt);

    // 원하는 형식의 날짜 및 시간 문자열 생성
    const formatDateString = (date: Date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        // 원하는 형식으로 조합하여 문자열 반환
        return `${year}.${month}.${day}`;
    };

    const clickPresentLayout = () => {
        if (clickPresentListBox) {
            clickPresentListBox
        }

        if (clickPresentListBoxItem && item) {
            clickPresentListBoxItem(item)
        }
    }


    return (
        <section className={'box__layout'} onClick={clickPresentLayout}>
            <article>
                <p className={'bold__caption__font gray__color__50 mt_3'}>
                    {formatDateString(availableDate)}~{formatDateString(expiredDate)}
                </p>
                <h4 className={'gray__color__100 mt_8'}>
                    [생일] 선물 리스트
                </h4>
                <section className={'box__layout__left__content mt_22'}>
                    <div className={'box__layout__left__content__box mr_16'}>
                        <Image src={'/blue_present_icon.svg'} alt={'x'} width={24} height={24}/>
                        <p className={'text__font gray__color__80'}>
                            {selectedProductsNumber} 개
                        </p>
                    </div>
                    <div className={'box__layout__left__content__box'}>
                        <Image src={'/present_box_heart_icon.svg'} alt={'x'} width={24} height={24}/>
                        <p className={'text__font gray__color__80'}>
                            {receivedProductsNumber} 개
                        </p>
                    </div>
                </section>
            </article>
            <article className={'mt_6'}>
                <Image src={image} alt={'x'} width={92} height={92}/>
            </article>
        </section>
    )
}

export default PresentListBoxComponent