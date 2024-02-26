'use client'
import Image from "next/image";
import './footerLayout.scss'
import {useRouter} from "next/navigation";

interface FooterLayoutProps {
    currentPage: string
}


interface FooterLayoutArr {
    name: string
    image: string
    textColor: string
}

const FooterLayout = ({currentPage}: FooterLayoutProps) => {
    const getMenuItems = () => {
        switch (currentPage) {
            case 'home':
                return [
                    { name: '홈', image: '/footer_home_icon.svg', textColor: 'footer__font primary__color__800' },
                    { name: '리스트', image: '/footer_list_icon_off.svg', textColor: 'footer__font gray__color__50' },
                    { name: 'MY', image: '/footer_my_icon_off.svg', textColor: 'footer__font gray__color__50' }
                ];
            case 'list':
                return [
                    { name: '홈', image: '/footer_home_icon_off.svg', textColor: 'footer__font gray__color__50' },
                    { name: '리스트', image: '/footer_list_icon.svg', textColor: 'footer__font primary__color__800' },
                    { name: 'MY', image: '/footer_my_icon_off.svg', textColor: 'footer__font gray__color__50' }
                ];
            case 'my':
                return [
                    { name: '홈', image: '/footer_home_icon_off.svg', textColor: 'footer__font gray__color__50' },
                    { name: '리스트', image: '/footer_list_icon_off.svg', textColor: 'footer__font gray__color__50' },
                    { name: 'MY', image: '/footer_my_icon.svg', textColor: 'footer__font primary__color__800' }
                ];
            default:
                return [];
        }
    };

    const menuItems = getMenuItems();

    const router = useRouter()

    const onClickTap = (item: FooterLayoutArr) => {
        switch (item.name) {
            case '홈':
                router.push('/main')
                break;
            case '리스트':
                router.push('/list')
                break;
            case 'MY':
                router.push('/my')
                break;

        }
    }


    return (
        <section className={'footer__layout'}>
            {menuItems.map((item, index) => (
                <div className={'footer__layout__content'} key={item.name} onClick={() => onClickTap(item)}>
                    <Image src={item.image} alt={item.name} width={24} height={24}/>
                    <p className={item.textColor}>{item.name}</p>
                </div>
            ))}
            {/*<div className={'footer__layout__content '}>*/}
            {/*    <Image src={homeImageUrl} alt={'x'} width={24} height={24}/>*/}
            {/*    <p className={homeTextColor}>홈</p>*/}
            {/*</div>*/}
            {/*<div className={'footer__layout__content'}>*/}
            {/*    <Image src={listImageUrl} alt={'x'} width={24} height={24}/>*/}
            {/*    <p className={listTextColor}>리스트</p>*/}
            {/*</div>*/}
            {/*<div className={'footer__layout__content'}>*/}
            {/*    <Image src={myImageUrl} alt={'x'} width={24} height={24}/>*/}
            {/*    <p className={myTextColor}>MY</p>*/}
            {/*</div>*/}
        </section>
    )
}

export default FooterLayout