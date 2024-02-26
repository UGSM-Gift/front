import './menuComponent.scss'
import {MouseEventHandler} from "react";

interface MenuComponentProps {
    title: string
    clickMenu: (title: string) => void;

}
const MenuComponent = ({title = '', clickMenu}: MenuComponentProps) => {


    return (
        <div className={'menu_component__layout'} onClick={() => clickMenu(title)}>
            <p className={'button__font gray__color__80'}>{title}</p>
        </div>
    )
}

export default MenuComponent