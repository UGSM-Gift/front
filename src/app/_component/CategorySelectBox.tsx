'use client'
import Image from "next/image";
import './categorySelectBox.scss'
import DefaultButton from "@/app/_component/DefaultButton";
import {MouseEventHandler, useState} from "react";
import {object} from "prop-types";
interface CategorySelectBoxComponentProps {
    text?: string
    clickSmallProduct?: MouseEventHandler<HTMLDivElement>;
    clickSmallProductItem?: (item: object) => void;
    bottomButtonLabel?:string,
    clickImage?: MouseEventHandler<HTMLDivElement>;
    clickImageItem?: (item:object) => void;
    item?: object
    style?: string
    checked?: boolean
    length?: number
}

const CategorySelectBox = (
    {
        item,
        text = '',
        clickSmallProduct,
        bottomButtonLabel = '삭제',
        length = 0,
        clickImage,
        clickImageItem,
        style = 'default',
        checked = false
    }: CategorySelectBoxComponentProps) => {


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

            <div className={'small__product__layout__image_wrapper mb_14'} onClick={clickImageButton}
                 style={{border: '2px solid #FFF'}}
            >

                <div className={'category__icon__cover'}>
                    <div className={'category__icon'}>
                        {
                            length
                        }
                    </div>
                </div>

                <Image src={'/gift_list_main_image.svg'} alt={'x'} width={160} height={120}/>
            </div>


            <h5 className={'gray__color__100 mb_4 category__text'}>
                {text}
            </h5>


        </article>
    )
}

export default CategorySelectBox