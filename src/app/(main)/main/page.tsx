'use client'
import PresentListBoxComponent from "@/app/(main)/_component/PresentListBoxComponent";
import NavLayout from "@/app/(main)/_component/NavLayout";
import './main.scss'
import DefaultButton from "@/app/_component/DefaultButton";
import Image from "next/image";
import LargeProductComponent from "@/app/(main)/_component/LargeProductComponent";
import {MouseEventHandler, useRef, useState} from "react";
import FooterLayout from "@/app/(main)/_component/FooterLayout";
import {useRouter} from "next/navigation";

const Main = () => {

    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setStartX(event.clientX);
        setIsMouseDown(true);
        setScrollLeft(event.currentTarget.scrollLeft);
    };

    const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isMouseDown) return;
        const touchX = event.clientX;
        const deltaX = startX - touchX;
        event.currentTarget.scrollLeft = scrollLeft + deltaX;
    };

    const onMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        const move = event.deltaY
        event.currentTarget.scrollLeft += move
    };

    const eventList = [
        {id: 1},
        {id: 2},
    ]
    //
    let presentWrapperClassName = `w_311`
    if (eventList.length > 1) {
        presentWrapperClassName = `w_278  mr_50`
    }

    const router = useRouter()

    const onClickHeartIcon = () => {
        router.push('/main/heart')
    }

    const clickPresentListBox = () => {
        router.push('/giftList')
    }
    const clickLetterBox = () => {
        router.push('/main/letter')
    }

    return (
        <div className={'col main__layout'}>
            <NavLayout
                leftIcon={'back'}
                centerText={'main page'}
                rightIconArr={['heart', 'alert']}
                clickHeart={onClickHeartIcon}
            />

            <article className={'pr_16 pl_16 pt_16 main__layout__info'}>
                <section className={'main__layout__banner'}>
                </section>
                <h6 className={'mt_20 mb_10'}>진행중인 리스트</h6>
                <section className={'main__layout__product__price_button'}
                         onWheel={handleWheel}
                         onMouseDown={onMouseDown}
                         onMouseMove={onMouseMove}
                         onMouseUp={onMouseUp}
                         onMouseLeave={onMouseUp}>
                    {eventList.map((item) => (
                        <div className={presentWrapperClassName} key={item.id}>
                            <PresentListBoxComponent clickPresentListBox={clickPresentListBox}/>
                        </div>
                    ))}
                </section>
                <div className={'mt_16'}>
                    <DefaultButton label={'선물 리스트 만들기'} type={'large_primary'}/>
                </div>
                <section className={'col mt_24'}>
                    <h6>내 편지함</h6>
                    <article className={'mt_8'} onClick={clickLetterBox}>
                        <div className={'main__layout__letter'}>
                            <div className={'main__layout__letter__text ml_16'}>
                                <Image src={'/letter_icon.svg'} alt={'x'} width={32} height={32}/>
                                <p className={'bold__text__font gray__color__100 ml_6 mt_4'}>
                                    받은 편지
                                </p>
                            </div>
                            <div className={'mr_16 mt_4'}>
                                <Image src={'/right_arrow_icon.svg'} alt={'x'} width={24} height={24}/>
                            </div>
                        </div>
                    </article>
                </section>
            </article>

            <article className={'main__layout__product'}>

                <h6 className={'gray__color__80 mb_10'}>
                    userNickName님, 이런 상품은 어때요?
                </h6>
                <section className={'main__layout__product__price_button'}
                         onWheel={handleWheel}
                         onMouseDown={onMouseDown}
                         onMouseMove={onMouseMove}
                         onMouseUp={onMouseUp}
                         onMouseLeave={onMouseUp}
                >
                    <div className={'main__layout__product__price_button__wrapper'}>
                        <DefaultButton label={'1만원 미만'} type={'price_button'}/>
                    </div>
                    <div className={'main__layout__product__price_button__wrapper'}>
                        <DefaultButton label={'1-2만원 대'} type={'price_button_border'}/>
                    </div>
                    <div className={'main__layout__product__price_button__wrapper'}>
                        <DefaultButton label={'3-4만원 대'} type={'price_button_border'}/>
                    </div>
                    <div className={'main__layout__product__price_button__wrapper'}>
                        <DefaultButton label={'5만원 미만'} type={'price_button_border'}/>
                    </div>
                    <div className={'main__layout__product__price_button__wrapper'}>
                        <DefaultButton label={'5만원 미만'} type={'price_button_border'}/>
                    </div>
                    <div className={'main__layout__product__price_button__wrapper'}>
                        <DefaultButton label={'5만원 미만'} type={'price_button_border'}/>
                    </div>
                </section>
                <section className={'main__layout__product__content'}>
                    <div className={'main__layout__product__content__wrapper'}>
                        <LargeProductComponent
                            title={'디올뷰티 어딕트 립 맥시마이저 어쩌고저쩌고'}
                            price={'1,880'}
                        />
                    </div>
                    <div className={'main__layout__product__content__wrapper'}>
                        <LargeProductComponent
                            title={'디올뷰티 어딕트 립 맥시마이저 어쩌고저쩌고'}
                            price={'1,880'}
                        />
                    </div>
                    <div className={'main__layout__product__content__wrapper'}>
                        <LargeProductComponent
                            title={'디올뷰티 어딕트 립 맥시마이저 어쩌고저쩌고'}
                            price={'1,880'}
                        />
                    </div>
                </section>

            </article>
            <FooterLayout currentPage={'home'}/>
        </div>
    )
}

export default Main