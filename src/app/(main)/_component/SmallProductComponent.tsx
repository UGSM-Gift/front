'use client'
import Image from "next/image";
import './smallProductComponent.scss'
import DefaultButton from "@/app/_component/DefaultButton";
import {MouseEventHandler, useState} from "react";
import {object} from "prop-types";
interface SmallProductComponentProps {
    price?: string | number
    text?: string
    update?: boolean
    multi?: boolean
    clickSmallProduct?: MouseEventHandler<HTMLDivElement>;
    clickSmallProductItem?: (item: object) => void;
    bottomButtonLabel?:string,
    clickImage?: MouseEventHandler<HTMLDivElement>;
    clickImageItem?: (item:object) => void;
    item?: object
    style?: string
    checked?: boolean
}

const SmallProductComponent = (
    {
        price,
        item,
        text = '',
        update = false,
        multi = false,
        clickSmallProduct,
        bottomButtonLabel = '삭제',
        clickImage,
        clickImageItem,
        style = 'default',
        checked = false
    }: SmallProductComponentProps) => {

    const ellipsisText = text.length > 15 ? `${text.slice(0, 15)}...` : text;

    const clickImageButton = () => {
        console.log('dlrjsehla ')
        if (clickImageItem && item) {
            console.log('hello?')
            clickImageItem(item)
        }
        if (clickImage) {
            console.log('bye')

            clickImage
        }
    }



    return (
        <article className={'small__product__layout'}>
            {
                checked ?
                    <div className={'small__product__checked_icon'}>
                        <Image src={'/select_left_icon_true.svg'} alt={'x'} width={25} height={25}/>
                    </div> : <div></div>
            }
            <div className={'small__product__layout__image_wrapper mb_14'} onClick={clickImageButton}
                style={checked ? {border: '2px solid #FF2882'} : {border: '2px solid #FFF'}}
            >

                <Image src={'/gift_list_main_image.svg'} alt={'x'} width={160} height={120}/>
            </div>
            {
                price ? <h5 className={'gray__color__100 mb_4'}>
                    {String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                </h5> : ''
            }

            {
                multi ? <p className={'secondary__color__800 small__product__font'}>전부 선물</p> :
                    <p className={'small__product__font gray__color__60 '}>
                        {ellipsisText}
                    </p>
            }

            {update ? <div className={'mt_10'}>
                    <DefaultButton label={bottomButtonLabel}
                                   type={checked ? 'small_product_button__checked' : 'small_product_button'}
                        buttonClick={clickSmallProduct}
                    />
                </div>
                : ''
            }


        </article>
    )
}

export default SmallProductComponent