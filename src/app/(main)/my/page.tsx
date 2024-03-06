'use client'
import './myPage.scss'
import NavLayout from "@/app/(main)/_component/NavLayout";
import FooterLayout from "@/app/(main)/_component/FooterLayout";
import Image from "next/image";
import MenuComponent from "@/app/(main)/my/_component/MenuComponent";
import {useRouter} from "next/navigation";

const MyPage = () => {

    const menuArr = [
        {id: 1, title: '공지사항'},
        {id: 2, title: '고객센터'},
        {id: 3, title: 'FAQ'},
    ]

    const router = useRouter()
    const clickSetting = () => {
        router.replace('/my/setting')
    }


    const clickMenu = () => {

    }

    return (
        <div>
            <NavLayout
                clickSetting={clickSetting}
                rightIconArr={['setting']}

            />
            <section className={'my_page__layout'}>
                <article className={'my_page__layout__user mt_14 mb_14'}>
                    <div>
                        <Image src={'/default_user_icon.svg'} alt={'x'} width={84} height={84}/>
                    </div>
                    <h4 className={'gray__color__100 mt_10'}>별빛사탕123</h4>
                </article>

                <article  className={'my_page__layout__event  mb_14'}>
                    <div className={'my_page__layout__event_box'}>
                        <Image src={'/cake.png'} alt={'x'} width={80} height={80}/>
                        <p className={'bold__text__font gray__color__100 mt_8'}>99.00.00</p>
                    </div>
                    <div className={'my_page__layout__event_box'}>
                        <Image src={'/fire_craker_icon.svg'} alt={'x'} width={80} height={80}/>
                        <p className={'bold__text__font gray__color__100 mt_8'}>기념일 (0)</p>
                    </div>
                </article>
            </section>
            <div className={'my_page__layout__divider'}></div>
            <section className={'my_page__layout__menu'}>
                {
                    menuArr.map((item) => (
                        <div key={item.id}>
                            <MenuComponent title={item.title} clickMenu={clickMenu}/>
                            {
                                menuArr.length > item.id ?
                                    <div className={'my_page__layout__menu__divider'}></div>
                                    : ''
                            }
                        </div>

                    ))
                }
            </section>
            <FooterLayout currentPage={'my'}/>
        </div>
    )
}

export default MyPage