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

interface DialogCategoryChildrenProps extends UserChoiceProps{
    children: null | DialogCategoryChildrenProps[]
    parentId: number
}

export type ClickSelectProps = EventListState | UserJobProps | UserChoiceProps | DialogCategoryChildrenProps;


interface DefaultSelectProps {
    imageUrl?: string
    type: string
    clickSelect?: (item: ClickSelectProps ) => void
    clickSelectText?: (item: string) => void
    title: string
    leftImage?: string
    leftImageSize?: number
    item?: EventListState | UserJobProps | UserChoiceProps
    idCollector?: IdCollectorProps
    clickSelectIdCollector?: (item: IdCollectorProps) => void
    textCenter?: boolean
}
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