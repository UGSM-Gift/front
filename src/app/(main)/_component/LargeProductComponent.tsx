import './largeProductComponent.scss'
import Image from "next/image";


interface LargeProductComponentProps {
    title: string
    price: string
    heartHide?: boolean
}
const LargeProductComponent = ({title, price, heartHide = false}: LargeProductComponentProps) => {

    const ellipsisText = title.length > 16 ? `${title.slice(0, 16)}...` : title;

    return (
        <article className={'large__product__layout'}>
            <div className={'large__product__layout__image'}>
            </div>
            <section className={'large__product__layout__text pr_3'}>
                <p className={'text__font gray__color__80'}>{ellipsisText}</p>
                <p className={'bold__caption__font gray__color__50 pt_6'}>최저 {price}원</p>
            </section>
            {
                heartHide ? <div className={'pr_40'}></div> :
                    <div className={'pr_16'}>
                        <Image src={'/heart_icon.svg'} alt={'x'} width={24} height={24}/>
                    </div>
            }

        </article>
    )
}

export default LargeProductComponent