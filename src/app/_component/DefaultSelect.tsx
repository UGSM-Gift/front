import Image from "next/image";
import './defaultSelect.scss'
import {MouseEventHandler} from "react";


interface EventListState {
    id: number
    name: string
    date: string
    imageUrl: string
}

interface UserJobProps {
    id: number
    name: string
    hasOtherName?: boolean
}

interface UserChoiceProps {
    id: number
    content: string
}

interface IdCollectorProps {
    category: number
    question: number
    answer: number
}

interface DefaultSelectProps {
    imageUrl?: string
    type: string
    clickSelect?: (item: EventListState | UserJobProps | UserChoiceProps) => void
    clickSelectText?: (item: string) => void
    title: string
    leftImage?: string
    leftImageSize?: number
    item?: EventListState | UserJobProps | UserChoiceProps
    // idCollector?: IdCollectorProps[]
    // clickSelectIdCollector?: (item: IdCollectorProps[]) => void
}
const DefaultSelect = ({imageUrl = '', type, clickSelect, clickSelectText, title, leftImage, leftImageSize = 40, item}: DefaultSelectProps) => {

    const selectClassName = `default_select__layout ${type}`

    const checkClickType = () => {



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