'use client'
import Image from "next/image";
import DefaultButton from "@/app/_component/DefaultButton";
import './login.scss'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


const Login = () => {


    const [loginHistory, setLoginHistory] = useState('')


    const [loginHistoryLabel, setLoginHistoryLabel] = useState('')
    const [loginHistoryImage, setLoginHistoryImage] = useState('')

    const changeLoginHistoryLabel = () => {

        switch (loginHistory) {
            case "kakao":
                setLoginHistoryLabel('카카오로 로그인 한 적이 있어요!')
                setLoginHistoryImage('/kakao_small_icon.svg')
                break;
            case 'naver':
                setLoginHistoryLabel('네이버로 로그인 한 적이 있어요!')
                setLoginHistoryImage('/naver_small_icon.svg')
                break;
            case "google":
                setLoginHistoryLabel('구글로 로그인 한 적이 있어요!')
                setLoginHistoryImage('/google_small_icon.svg')
                break;
        }
    }

    const router = useRouter()
    useEffect(()=> {
        changeLoginHistoryLabel()
    },[])

    const onClickLogin = (value: string) => {
        // router.push(`https://www.ugsm.co.kr/api/login/oauth2/authorization/${value}`)
        router.push('/signup')

        // switch (value) {
        //     case 'kakao':
        //         break;
        //     case 'naver':
        //         break;
        //     case 'google':
        //         break;
        //
        // }
        // router.replace('/signup')
    }


    return (
        <div>
            <section className={'text__section'}>
                <h1 className={'gray__color__70'}>나도 몰랐던</h1>
                <div className={'row flex-center'}>
                    <h1 className={'gray__color__70'}>받고 싶은 <span className={'gray__color__100'}>선물</span>이 뭘까?</h1>
                </div>
                <p className={'bold__text__font text__section__content'}>은근슨물에서 은근테스트로 알아보자!</p>
                <Image src={'/present.svg'} alt={'x'} width={160} height={160} className={'text__section__image'}/>
            </section>

            {
                loginHistory === '' ?
                    <div className={'none__history'}></div> :
                    <section className={'history__button__section'}>
                        <DefaultButton
                            label={loginHistoryLabel}
                            type={'history_button'}
                            image={loginHistoryImage}
                        />
                    </section>
            }


            <section className={'button__section'}>
                <div className={'mb_16'}>
                    <DefaultButton
                        label={'카카오로 시작'}
                        type={'kakao_login'}
                        image={'/kakao_icon.svg'}
                        override={{background: '#FEE500', color: '#000'}}
                        buttonClick={() => onClickLogin('kakao')}
                    />
                </div>
                <div className={'mb_16'}>
                    <DefaultButton
                        label={'네이버로 시작'}
                        type={'naver_login'}
                        image={'/naver_icon.svg'}
                        override={{background: '#03C75A', color: '#fff'}}
                        buttonClick={() => onClickLogin('naver')}
                    />
                </div>
                <div>
                    <DefaultButton
                        label={'구글로 시작'}
                        type={'google_login'}
                        image={'/google_icon.svg'}
                        buttonClick={() => onClickLogin('google')}
                    />
                </div>
            </section>
            <footer className={'gray__color__50 caption__font login__footer'}>
                <p style={{margin: 0 }}>
                    로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는것을 의미하며,
                </p>
                <p className={'login__footer__text'}>
                    서비스 이용을 위해 이메일과 이름, 성별, 위치를 수집합니다.
                </p>
            </footer>
        </div>

    )
}

export default Login