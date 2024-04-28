import './topFilteringComponent.scss'
import Image from "next/image";
import {MouseEventHandler} from "react";

interface TopFilteringComponentProps {
    number?: number
    filter?: string
    clickFilter?: MouseEventHandler<HTMLDivElement>;
}

const TopFilteringComponent = (
    {
        number = 0,
        filter = '최신 순',
        clickFilter
    }: TopFilteringComponentProps) => {



    return (
        <article className={'top_filter__layout mb_20'}>
            <p className={'text__font gray__color__60'}>총 N개</p>
            <div className={'top_filter__layout__filter'} onClick={clickFilter}>
                <p className={'text__font gray__color__80 ml_4'}>최신 순</p>
                <Image src={'/bottom_arrow_icon.svg'} alt={'x'} width={24} height={24}/>
            </div>
        </article>
    )
}

export default TopFilteringComponent