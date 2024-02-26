'use client'
import './topNavTabComponent.scss'
import {MouseEventHandler} from "react";


interface TopNavTabComponentRenderNavProps {
    name: string
    textColor: string
    border: boolean
    id: number
}

interface TopNavTabComponentProps {
    renderNav: TopNavTabComponentRenderNavProps[]
    onClickTab: (item: TopNavTabComponentRenderNavProps) => void
}


const TopNavTabComponent = ({renderNav = [], onClickTab}: TopNavTabComponentProps) => {



    return (
        <article className={'top_nav_tab__layout'}>
            {
                renderNav.map((item) => (
                    <div key={item.name} onClick={() => onClickTab(item)}>
                        <div>
                            <p className={item.textColor}>
                                {item.name}
                            </p>
                            {
                                item.border ?
                                    <div className={'top_nav_tab__layout__nav_select'}></div>
                                    :
                                    ''
                            }
                        </div>
                    </div>
                ))
            }
        </article>
    )
}

export default TopNavTabComponent