'use client'
import './navLayout_default.scss'
import Image from "next/image";
import {MouseEventHandler, useState} from "react";

interface NavLayoutProps {
    centerText?: string
    rightText?: string
    leftIcon?: string
    rightIconArr?: string[]
    clickAlert?: MouseEventHandler<HTMLDivElement>;
    clickPencil?: MouseEventHandler<HTMLDivElement>;
    clickHeart?: MouseEventHandler<HTMLDivElement>;
    clickAdd?: MouseEventHandler<HTMLDivElement>;
    clickRightText?: MouseEventHandler<HTMLDivElement>;
    clickBack?: MouseEventHandler<HTMLDivElement>;
    clickSetting?: MouseEventHandler<HTMLDivElement>;
    clickClose?: MouseEventHandler<HTMLDivElement>;
}

const NavLayout = (
    {
        leftIcon = '',
        centerText = '', rightIconArr = [], rightText = '',
        clickAlert, clickPencil, clickHeart, clickAdd, clickRightText, clickBack, clickSetting, clickClose
    }: NavLayoutProps) => {

    const renderLeftIcon = () => {
        switch (leftIcon) {
            case 'back':
                return <div className={'icon_wrapper'} onClick={clickBack}>
                    <Image src={'/back_icon.svg'} alt={'<-'} width={24} height={24}/>
                </div>
            case 'close':
                return <div className={'icon_wrapper'}>
                    <Image src={'/nav_close_icon.svg'} alt={'x'} width={24} height={24}/>
                </div>
            default:
                return <div></div>
        }
    }

    const renderRightIcon = () => {
        const heart = <div className={'icon_wrapper'} key={'heart'} onClick={clickHeart}>
            <Image src={'/heart_icon.svg'} alt={'<-'} width={24} height={24}/>
        </div>
        const alert = <div className={'icon_wrapper'} key={'alert'} onClick={clickAlert}>
            <Image src={'/alert_icon.svg'} alt={'<-'} width={24} height={24}/>
        </div>

        const pencil = <div className={'icon_wrapper'} key={'pencil'} onClick={clickPencil}>
            <Image src={'/pencil_icon.svg'} alt={'<-'} width={24} height={24}/>
        </div>

        const add = <div className={'icon_wrapper'} key={'add'} onClick={clickAdd}>
            <Image src={'/add_icon.svg'} alt={'<-'} width={24} height={24}/>
        </div>

        const setting = <div className={'icon_wrapper'} key={'add'} onClick={clickSetting}>
            <Image src={'/setting_icon.svg'} alt={'<-'} width={24} height={24}/>
        </div>

        const close = <div className={'icon_wrapper'} key={'add'} onClick={clickClose}>
            <Image src={'/nav_close_icon.svg'} alt={'x'} width={24} height={24}/>
        </div>

        let renderArr: JSX.Element[] = []

        rightIconArr.forEach((ele => {
            switch (ele) {
                case 'heart':
                    renderArr.push(heart)
                    break;
                case 'alert':
                    renderArr.push(alert)
                    break;
                case 'pencil':
                    renderArr.push(pencil)
                    break;
                case 'add':
                    renderArr.push(add)
                    break;
                case 'setting':
                    renderArr.push(setting)
                    break;
                case 'close':
                    renderArr.push(close)
                    break;

            }
        }))

        return renderArr
    }


    return (
        <article className={'nav__layout'}>
            <section className={'nav__layout__left'}>
                {renderLeftIcon()}
            </section>
            <section className={'nav__layout__center'}>
                {centerText}
            </section>
            <section className={'nav__layout__right'}>
                {renderRightIcon()}
                {
                    rightText !== '' ?
                        <div onClick={clickRightText} className={'nav__layout__right button__font gray__color__100'}>
                            {rightText}
                        </div> : ''
                }
            </section>
        </article>
    )
}

export default NavLayout