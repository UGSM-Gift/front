import './largeProductComponent.scss'
import Image from "next/image";
import {inherits} from "util";


interface LargeProductComponentProps {
    title: string
    price: string
    heartHide?: boolean
    clickHeart?: (item: object) => void;
    item?: any
    itemId?: number
    image?: string
}
const LargeProductComponent = ({title, price, heartHide = false, clickHeart, item, itemId = 0, image = ''}: LargeProductComponentProps) => {

    const ellipsisText = title.length > 16 ? `${title.slice(0, 16)}...` : title;

    const onClickHeart = () => {
        if (clickHeart && item ) {
            clickHeart(item)
        }
    }

    return (
        <article className={'large__product__layout'}>
            <div className={'large__product__layout__image'}>
                <Image src={image} alt="x" width={80} height={80}/>

            </div>
            <section className={'large__product__layout__text pr_3'}>
                <p className={'text__font gray__color__80'}>{ellipsisText}</p>
                <p className={'bold__caption__font gray__color__50 pt_6'}>최저 {price}원</p>
            </section>
            {
                heartHide ? <div className={'pr_40'}></div> :
                    <div className={'pr_16'} onClick={clickHeart}>
                        {
                            item?.dibbed ? <Image src={'/heart_true_icon.svg'} alt={'x'} width={24} height={24}/>
                                : <Image src={'/heart_icon.svg'} alt={'x'} width={24} height={24}/>
                        }

                    </div>
            }

        </article>
    )
}

export default LargeProductComponent