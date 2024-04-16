'use client'
import PresentListBoxComponent from "@/app/(main)/_component/PresentListBoxComponent";
import NavLayout from "@/app/_component/NavLayout";
import './main.scss'
import DefaultButton from "@/app/_component/DefaultButton";
import Image from "next/image";
import LargeProductComponent from "@/app/(main)/_component/LargeProductComponent";
import {MouseEventHandler, useEffect, useRef, useState} from "react";
import FooterLayout from "@/app/(main)/_component/FooterLayout";
import {useRouter} from "next/navigation";
import {getRecommendedProduct} from "@/app/api/mainPage";
import {getMainPageGiftList} from "@/app/api/giftList";
import {useTestStore} from "@/app/zustand/testStore";
import {UserHobbyProps} from "@/app/type";

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



    const router = useRouter()

    const onClickHeartIcon = () => {
        router.replace('/main/heart')
    }

    const clickPresentListBox = () => {
        router.replace('/giftList')
    }
    const clickLetterBox = () => {
        router.replace('/main/letter')
    }

    const onClickCreateGiftList = () => {
        router.replace('/test')
    }


    // goods list array
    // between10KTo30K
    // between30KTo50K
    // lessThan10K
    // moreThan50K

    interface GoodsListProps {
        buyingUrl: string
        dibbed: boolean
        id: number
        imageUrl: string
        name: string
        price: number
    }

    const [lessThan10K, setLessThan10K] = useState<GoodsListProps[]>([])
    const [between10KTo30K, setBetween10KTo30K] = useState<GoodsListProps[]>([])
    const [between30KTo50K, setBetween30KTo50K] = useState<GoodsListProps[]>([])
    const [moreThan50K, setMoreThan50K] = useState<GoodsListProps[]>([])

    const [viewGoodsState, setViewGoodsState] = useState(moreThan50K)


    const [buttonList, setButtonList] = useState([
        {
            value: 'lessThan10K',
            name: '1만원 미만',
            type: 'price_button'
        },
        {
            value: 'between10KTo30K',
            name: '1-3만원 대',
            type: 'price_button_border'
        },{
            value: 'between30KTo50K',
            name: '3-5만원 대',
            type: 'price_button_border'
        },{
            value: 'moreThan50K',
            name: '5만원 이상',
            type: 'price_button_border'
        },
    ])
    const onSwitchGoodsState = (value: string) => {

        switch (value) {
            case 'lessThan10K':
                setViewGoodsState(lessThan10K)
                setButtonList([
                    {
                        value: 'lessThan10K',
                        name: '1만원 미만',
                        type: 'price_button'
                    },
                    {
                        value: 'between10KTo30K',
                        name: '1-3만원 대',
                        type: 'price_button_border'
                    },{
                        value: 'between30KTo50K',
                        name: '3-5만원 대',
                        type: 'price_button_border'
                    },{
                        value: 'moreThan50K',
                        name: '5만원 이상',
                        type: 'price_button_border'
                    },
                ]);
                break;
            case 'between10KTo30K':
                setViewGoodsState(between10KTo30K)
                setButtonList([
                    {
                        value: 'lessThan10K',
                        name: '1만원 미만',
                        type: 'price_button_border'
                    },
                    {
                        value: 'between10KTo30K',
                        name: '1-3만원 대',
                        type: 'price_button'
                    },{
                        value: 'between30KTo50K',
                        name: '3-5만원 대',
                        type: 'price_button_border'
                    },{
                        value: 'moreThan50K',
                        name: '5만원 이상',
                        type: 'price_button_border'
                    },
                ]);
                break;
            case 'between30KTo50K':
                setViewGoodsState(between30KTo50K)
                setButtonList([
                    {
                        value: 'lessThan10K',
                        name: '1만원 미만',
                        type: 'price_button_border'
                    },
                    {
                        value: 'between10KTo30K',
                        name: '1-3만원 대',
                        type: 'price_button_border'
                    },{
                        value: 'between30KTo50K',
                        name: '3-5만원 대',
                        type: 'price_button'
                    },{
                        value: 'moreThan50K',
                        name: '5만원 이상',
                        type: 'price_button_border'
                    },
                ]);
                break;
            case 'moreThan50K':
                setViewGoodsState(moreThan50K)
                setButtonList([
                    {
                        value: 'lessThan10K',
                        name: '1만원 미만',
                        type: 'price_button_border'
                    },
                    {
                        value: 'between10KTo30K',
                        name: '1-3만원 대',
                        type: 'price_button_border'
                    },{
                        value: 'between30KTo50K',
                        name: '3-5만원 대',
                        type: 'price_button_border'
                    },{
                        value: 'moreThan50K',
                        name: '5만원 이상',
                        type: 'price_button'
                    },
                ]);
                break;

        }
        // setViewGoodsState()
    }
    const getProductList = async () => {
        try {
            const getList = await getRecommendedProduct()
            await setLessThan10K(getList.data.lessThan10K)
            await setBetween10KTo30K(getList.data.between10KTo30K)
            await setBetween30KTo50K(getList.data.between30KTo50K)
            await setMoreThan50K(getList.data.moreThan50K)

            await setViewGoodsState(lessThan10K)

            console.log(getList)
        } catch (err) {
            console.log(err, 'fail get product list tsx')
        }

        onSwitchGoodsState('lessThan10K')

    }






    const eventList = [
        {id: 1},
        {id: 2},
    ]
    //
    let presentWrapperClassName = `w_311`
    if (eventList.length > 1) {
        presentWrapperClassName = `w_278  mr_50`
    }


    const [giftList , setGiftList] = useState()

    // 진행중인 선물리스트 목록

    const getGiftArray = async () => {
        try {
            const data = await getMainPageGiftList()
            setGiftList(data.data)

        } catch (err) {

        }
    }



    useEffect(()=> {
        getProductList()
        getGiftArray()
    }, [])



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
                    <DefaultButton label={'선물 리스트 만들기'} type={'large_primary'} buttonClick={onClickCreateGiftList}/>
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

                    {
                        buttonList.map((item, index)=> (
                            <div className={'main__layout__product__price_button__wrapper'} key={index}>
                                <DefaultButton
                                    label={item.name} type={item.type}
                                    buttonClick={() => onSwitchGoodsState(item.value)}
                                />
                            </div>
                        ))

                    }
                </section>
                <section className={'main__layout__product__content'}>
                    {
                        viewGoodsState.map((item, index) => (
                            <div key={index}>
                                <div className={'main__layout__product__content__wrapper'}>
                                    <LargeProductComponent
                                        title={item.name}
                                        price={`${item.price}`}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </section>
            </article>
            <FooterLayout currentPage={'home'}/>
        </div>
    )
}

export default Main