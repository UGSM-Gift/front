'use client'
import './myPageSetting.scss'
import NavLayout from "@/app/(main)/_component/NavLayout";
import MenuComponent from "@/app/(main)/my/_component/MenuComponent";
import FooterLayout from "@/app/(main)/_component/FooterLayout";
import {useRouter} from "next/navigation";

const MyPageSetting = () => {

    const menuArr = [
        {id: 1, title: '회원 정보 수정'},
        {id: 2, title: '알림 설정'},
    ]

    const subMenuArr = [
        {id: 1, title: '로그아웃'},
        {id: 2, title: '회원탈퇴'},
    ]

    const router = useRouter()

    const clickBack = () => {
        router.back()
    }

    const clickMenu = (title:string) => {
        if (title === '회원 정보 수정') {
            router.replace('/my/setting/member')
        } else if (title === '회원탈퇴') {
            router.replace('/my/setting/out')
        }
    }
    return (
        <div>
            <NavLayout
                leftIcon={'back'}
                centerText={'설정'}
                clickBack={clickBack}
            />
            <section className={'my_page_setting__layout'}>
                {
                    menuArr.map((item) => (
                        <div key={item.id}>
                            <MenuComponent title={item.title} clickMenu={clickMenu}/>
                            {
                                menuArr.length > item.id ?
                                    <div className={'my_page_setting__layout__menu__divider'}></div>
                                    : ''
                            }
                        </div>

                    ))
                }
            </section>
            <div className={'my_page_setting__layout__divider'}></div>
            <section className={'my_page_setting__layout'}>
                {
                    subMenuArr.map((item) => (
                        <div key={item.id}>
                            <MenuComponent title={item.title} clickMenu={clickMenu}/>
                            {
                                subMenuArr.length > item.id ?
                                    <div className={'my_page_setting__layout__menu__divider'}></div>
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

export default MyPageSetting