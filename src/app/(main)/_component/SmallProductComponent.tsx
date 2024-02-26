import Image from "next/image";
import './smallProductComponent.scss'
import DefaultButton from "@/app/_component/DefaultButton";
import {MouseEventHandler} from "react";
interface SmallProductComponentProps {
    price?: string
    text?: string
    update?: boolean
    multi?: boolean
    clickSmallProduct?: MouseEventHandler<HTMLDivElement>;
}

const SmallProductComponent = ({price, text = '', update = false, multi = false, clickSmallProduct}: SmallProductComponentProps) => {

    const ellipsisText = text.length > 15 ? `${text.slice(0, 15)}...` : text;


    return (
        <article className={'small__product__layout'}>
            <div className={'small__product__layout__image_wrapper mb_14'}>
                <Image src={'/gift_list_main_image.svg'} alt={'x'} width={160} height={120}/>
            </div>
            <h5 className={'gray__color__100 mb_4'}>
                50,000원
            </h5>
            {
                multi ? <p className={'secondary__color__800 small__product__font'}>전부 선물</p> :
                    <p className={'small__product__font gray__color__60 '}>
                        {ellipsisText}
                    </p>
            }

            {update ? <div className={'mt_10'}>
                    <DefaultButton label={'삭제'} type={'small_product_button'}/>
                </div>
                : ''
            }


        </article>
    )
}

export default SmallProductComponent