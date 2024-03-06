import {ChangeEvent, MouseEventHandler} from "react";

export interface DefaultInputProps {
    type?: string
    image?: string
    style: string
    button?: string
    max_length?: number
    text_area?: boolean
    placeholder?: string
    onChangeValue?: (value: string) => void;
    onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeTextAreaEvent?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    imageClick?: MouseEventHandler<HTMLDivElement>;
    value?: string
}


