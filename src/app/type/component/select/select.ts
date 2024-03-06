import {EventListState, UserJobProps, UserChoiceProps, IdCollectorProps} from "@/app/type";

export interface DialogCategoryChildrenProps extends UserChoiceProps{
    children: null | DialogCategoryChildrenProps[]
    parentId: number
}

export type ClickSelectProps = EventListState | UserJobProps | UserChoiceProps | DialogCategoryChildrenProps;


export interface DefaultSelectProps {
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