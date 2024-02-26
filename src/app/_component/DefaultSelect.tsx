import Image from "next/image";
import './defaultSelect.scss'
import {MouseEventHandler} from "react";

interface DefaultSelectProps {
    imageUrl?: string
    type: string
    clickSelect: (item: string) => void
    title: string
    leftImage?: string
    leftImageSize?: number
}
const DefaultSelect = ({imageUrl = '', type, clickSelect, title, leftImage, leftImageSize = 40}: DefaultSelectProps) => {

    const selectClassName = `default_select__layout ${type}`

    return (
        <div className={selectClassName} onClick={() => clickSelect(title)}>
            <div className={'default_select__layout__left'}>
                {
                    leftImage && <Image src={leftImage} alt={'x'} width={leftImageSize} height={leftImageSize} className={'mr_4'}/>
                }
                <p className={'text__font'}>{title}</p>
            </div>
            {
                imageUrl && <Image src={imageUrl} alt={'o'} width={24} height={24}/>
            }
        </div>
    )
}

export default DefaultSelect