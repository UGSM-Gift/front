import './letterBoxComponent.scss'
import Image from "next/image";
import {MouseEventHandler} from "react";

interface LetterBoxComponentProps {
    userName?: string
    date?: string
    clickLetterBox?: MouseEventHandler<HTMLDivElement>
}

const LetterBoxComponent = ({userName = '', date = '', clickLetterBox}: LetterBoxComponentProps) => {

    return (
        <div className={'letter__box__layout'} onClick={clickLetterBox}>
            <div className={'letter__box__layout__image'}>
                <Image src={'/gift_list_main_image.svg'} alt={'x'} width={400} height={230}/>
            </div>
            <article className={'letter__box__layout__text'}>
                <div className={'letter__box__layout__text__left'}>
                    <Image src={'/default_user_icon.svg'} alt={'x'} width={30} height={30}/>
                    <p className={'bold__text__font gray__color__80 ml_6'}>{userName}</p>
                </div>
                <p className={'bold__caption__font gray__color__50 mr_4'}>{date}</p>
            </article>
        </div>
    )
}

export default LetterBoxComponent



