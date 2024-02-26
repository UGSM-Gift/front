'use client'
import DefaultInput from "@/app/_component/DefaultInput";
import DefaultButton from "@/app/_component/DefaultButton";
import {MouseEventHandler, useState} from "react";
import Image from "next/image";
import './signup.scss'


interface SignupProps {
    children?: React.ReactNode
    title?: string
    subTitle?:string
    clickBackImage?: MouseEventHandler<HTMLDivElement>;
}

const Signup = ({
                    children, title = '', subTitle = '', clickBackImage
                }: SignupProps) => {








    return (
        <div className={'signup__layout'}>
            <article>
                <header className={'signup__layout__back'}>
                    <Image src={'/back_icon.svg'} alt={'<-'}
                           width={24}
                           height={24}
                           onClick={clickBackImage}
                    />
                </header>
                <section className={'signup__layout__title'}>
                    <h2>{title}</h2>
                    <h2 className={'signup__layout__title__sub'}>{subTitle}</h2>
                </section>
            </article>


            {children}

            {/*hello*/}

            {/*<div className={'gray__color__30 '}>*/}
            {/*    gkdl*/}
            {/*</div>*/}

            {/*<h5>*/}
            {/*    dsfadf*/}
            {/*</h5>*/}
            {/*<DefaultButton*/}
            {/*    label={'button label'}*/}
            {/*    type={'large_primary'}*/}
            {/*/>*/}
            {/*<div>sdfasdfsdf</div>*/}
            {/*<DefaultInput*/}
            {/*    type={'string'}*/}
            {/*    style={'text__area'}*/}
            {/*    image={'/cake.png'}*/}
            {/*    max_length={10}*/}
            {/*    text_area={true}*/}
            {/*/>*/}


        </div>
    )
}

export default Signup