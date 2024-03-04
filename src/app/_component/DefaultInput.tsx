'use client'
import './DefaultInput.scss'
import Image from "next/image";
import {ChangeEvent, MouseEventHandler, useState} from "react";

interface DefaultInputProps {
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

const DefaultInput = (
    {
        type = 'text',
        image = '',
        style,
        button = '',
        max_length = 0,
        text_area = false,
        placeholder = 'place holder',
        onChangeValue,
        onChangeEvent,
        onChangeTextAreaEvent,
        imageClick,
        value
    }: DefaultInputProps) => {

    const inputClassName = `default__input ${style} `
    const imageClassName = `input__image ${style} `
    const buttonClassName = `input__button__layout ${style} `
    const maxLengthClassName = `max__length__layout ${style} `
    const textAreaClassName = `default__input text__area__layout ${style} `

    const [inputLength, setInputLength] = useState(0)
    const onChangeInputLength = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLength(e.target.value.length)
        if (onChangeValue) {
            onChangeValue(e.target.value)
        }
        if (onChangeEvent) {
            onChangeEvent(e)
        }
    }

    const onInputLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputLength(e.target.value.length)
        if (onChangeValue) {
            onChangeValue(e.target.value)
        }
        if (onChangeTextAreaEvent) {
            onChangeTextAreaEvent(e)
        }

    }

    return (
        <div className={'default__input__layout'}>
            {text_area ?
                <textarea
                    className={textAreaClassName}
                    onInput={onInputLength}
                    maxLength={max_length}
                    placeholder={placeholder}
                >

                </textarea>
                :
                <input type={type}
                       value={value}
                       placeholder={placeholder}
                       className={inputClassName}
                       onChange={onChangeInputLength}
                       maxLength={max_length === 0 ? 100 : max_length}
                />
            }

            {image !== '' ? <Image src={image} alt={'x'}
                                   onClick={imageClick}
                                   className={imageClassName}
                                   width={24}
                                   height={24}
            /> : ''
            }
            {button !== '' ?
                <div className={buttonClassName}>
                    <div className={'input__button'}>
                        {button}
                    </div>
                </div> : ''
            }
            {
                max_length !== 0 ?
                    <div className={maxLengthClassName}>
                        {inputLength}/{max_length}
                    </div> : ''
            }
        </div>
    )
}

export default DefaultInput