import './mediumProductComponent.scss'
import Image from "next/image";
import DefaultButton from "@/app/_component/DefaultButton";


interface MediumProductComponentProps {
    text?: string
    update?: boolean

}
const MediumProductComponent = ({text = '', update = false}: MediumProductComponentProps) => {

    const ellipsisText = text.length > 25 ? `${text.slice(0, 25)}...` : text;


    return (
        <div className={'medium_product__layout'}>
            <div className={'medium_product__layout__image mb_14'}>
                <Image src={'/gift_list_main_image.svg'} alt={'x'} width={305} height={165}/>
            </div>
            <h5 className={'gray__color__100 mb_4'}>
                50,000원
            </h5>
            <p className={'small__product__font gray__color__60 mb_14'}>
                {ellipsisText}
            </p>
            {update ? <div className={'mt_10'}>
                    <DefaultButton label={'삭제'} type={'medium_product_button'}/>
                </div>
                : ''
            }
        </div>
    )
}

export default MediumProductComponent