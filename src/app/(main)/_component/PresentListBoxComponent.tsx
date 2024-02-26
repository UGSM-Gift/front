import './presentListBoxComponent.scss'
import Image from "next/image";
import {MouseEventHandler} from "react";

interface PresentListBoxComponentProps {
    clickPresentListBox?: MouseEventHandler<HTMLDivElement>
}

const PresentListBoxComponent = ({clickPresentListBox}: PresentListBoxComponentProps) => {


    return (
        <section className={'box__layout'} onClick={clickPresentListBox}>
            <article>
                <p className={'bold__caption__font gray__color__50 mt_3'}>
                    23.10.16~10.25
                </p>
                <h4 className={'gray__color__100 mt_8'}>
                    [생일] 선물 리스트
                </h4>
                <section className={'box__layout__left__content mt_22'}>
                    <div className={'box__layout__left__content__box mr_16'}>
                        <Image src={'/blue_present_icon.svg'} alt={'x'} width={24} height={24}/>
                        <p className={'text__font gray__color__80'}>
                            15 개
                        </p>
                    </div>
                    <div className={'box__layout__left__content__box'}>
                        <Image src={'/present_box_heart_icon.svg'} alt={'x'} width={24} height={24}/>
                        <p className={'text__font gray__color__80'}>
                            0 개
                        </p>
                    </div>
                </section>
            </article>
            <article className={'mt_6'}>
                <Image src={'/cake.png'} alt={'x'} width={92} height={92}/>
            </article>
        </section>
    )
}

export default PresentListBoxComponent