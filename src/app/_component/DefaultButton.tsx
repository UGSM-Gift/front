'use client'
import './DefaultButton.scss'
import {MouseEventHandler, useState} from "react";
import Image from "next/image";
import {DefaultButtonProps} from "@/app/type";

const DefaultButton = ({label, type, image = '', override, buttonClick}: DefaultButtonProps) => {


    const buttonClassName = `default__button__layout ${type} `;


    return (
        <div className={buttonClassName} onClick={buttonClick}>
            {image !== '' ?
                    <Image
                        src={image} alt={'x'}
                        className={'button__image'}
                        width={16}
                        height={16}
                    />

                : ''
            }
            <div className={'label__text'}>
                {label}
            </div>
        </div>
    )
}

export default DefaultButton