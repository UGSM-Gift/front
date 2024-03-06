import {MouseEventHandler} from "react";

export interface DefaultButtonProps {
    label: string,
    type: string,
    image?: string
    override?: object
    buttonClick?: MouseEventHandler<HTMLDivElement>;
}