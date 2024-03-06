import Image from "next/image";
import './defaultSelect.scss'
import {MouseEventHandler} from "react";
import {DefaultSelectProps} from "@/app/type";


const DefaultSelect = (
    {
        idCollector,
        clickSelectIdCollector,
        imageUrl = '',
        type,
        clickSelect,
        clickSelectText,
        title,
        leftImage,
        leftImageSize = 40,
        item,
        textCenter = false,
    }: DefaultSelectProps) => {

    const selectClassName = `default_select__layout ${type} ${textCenter ? 'default_select__layout__text_center': ''}`

    const textClassName = `text__font `


    const checkClickType = () => {
        // console.log(idCollector, '자식임')

        if (idCollector && clickSelectIdCollector) {
            clickSelectIdCollector(idCollector)
        }

        if (clickSelect && item) {
            clickSelect(item)
        } else if (clickSelectText) {
            clickSelectText(title)
        }

    }

    return (
        <div className={selectClassName} onClick={checkClickType}>
            <div className={'default_select__layout__left'}>
                {
                    leftImage && <Image src={leftImage}
                                        alt={'x'}
                                        width={leftImageSize}
                                        height={leftImageSize}
                                        className={'mr_4'}/>
                }
                <p className={textClassName}>
                    {title}
                </p>
            </div>
            {
                imageUrl && <Image src={imageUrl} alt={'o'} width={24} height={24}/>
            }
        </div>
    )
}

export default DefaultSelect