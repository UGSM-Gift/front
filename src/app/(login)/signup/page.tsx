'use client'
import Signup from "@/app/(login)/_component/Signup";
import {useEffect, useState} from "react";
import DefaultInput from "@/app/_component/DefaultInput";
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";
import {checkNicknameDuplication, getRandomNickname, postPhoneAuth, putPhoneAuth} from "@/app/api/account";
import {PutUserData} from "@/app/api/userData";
import {atob} from "buffer";
import './signupPage.scss'

const SignupPage = () => {

    // 단계에 따라 갈아끼울예정
    const [stage, setStage] = useState(0)


    const onClickBackImage = () => {
        if (stage === 0) {
            // 로그인 방법 선택하는곳으로 리다이렉트
            router.replace('/')
        }
        return setStage(prevStage => prevStage - 1)
    }

    const onClickNextStage = () => {
        return setStage(prevStage => prevStage + 1)
    }


    const randomNickName = async () => {
        try {
            const nickname = await getRandomNickname()
            setUserNickName(nickname.data)
        } catch (err) {
            console.log('fail get random nickname ')
        }
    }


    const renderComponentStage = () => {
        switch (stage) {
            case 0:
                return <Signup title={'반가워요!'} subTitle={'이름이 어떻게 되시나요?'} clickBackImage={onClickBackImage}>
                    <article className={'signup__layout signup__layout__children'}>
                        <section className={'signup__layout__input'}>
                            <DefaultInput
                                style={'default'}
                                placeholder={'이름을 입력해주세요.'}
                                image={'/close_icon.svg'}
                                onChangeValue={inputUserName}
                                imageClick={onClickSetNameImage}
                                value={userName}
                            />
                        </section>
                        <section className={'signup__layout__button signup__layout__button__box'}>
                            {
                                userName.length >= 2 ?
                                    <DefaultButton label={'다음'} type={'large_primary'}
                                                   buttonClick={onClickSetName}
                                    />
                                    :
                                    <DefaultButton label={'다음'} type={'large_gray'}
                                                   buttonClick={onClickSetName}
                                    />
                            }
                        </section>
                    </article>
                </Signup>
            case 1:
                return <Signup title={'은근슨물에서는'} subTitle={'어떤 닉네임으로 부를까요?'} clickBackImage={onClickBackImage}>
                    <article className={'signup__layout signup__layout__children'}>
                        <section className={'signup__layout__input'}>
                            <DefaultInput
                                style={'default'}
                                placeholder={'이름을 입력해주세요.'}
                                image={'/close_icon.svg'}
                                onChangeValue={inputUserNickName}
                                imageClick={onClickSetNickNameImage}
                                value={userNickName}
                            />
                            <p className={'bold__caption__font gray__color__60 signup__layout__nickname_label'}>
                                * 2~16자의 한글, 영문으로만 사용해주세요</p>
                        </section>
                        <section className={'signup__layout__button signup__layout__button__box'}>
                            {
                                userNickName.length >= 2 ?
                                    <DefaultButton label={'다음'} type={'large_primary'}
                                                   buttonClick={onClickSetNickName}
                                    />
                                    :
                                    <DefaultButton label={'다음'} type={'large_gray'}
                                                   buttonClick={onClickSetNickName}
                                    />
                            }
                        </section>
                    </article>
                </Signup>
            case 2:
                // birthday , gender select page
                return <Signup title={'userNickName님의'} subTitle={'생일과 성별을 확인해주세요'} clickBackImage={onClickBackImage}>
                    <article className={'signup__layout signup__layout__children'}>
                        <section className={'signup__layout__input'}>
                            <h6 className={'mb_8'}>생년월일</h6>
                            <DefaultInput
                                style={'default'}
                                placeholder={'YY.MM.DD'}
                                image={'/close_icon.svg'}
                                onChangeValue={inputUserBirthDay}
                                imageClick={onClickSetBirthDayImage}
                                value={birthDay}
                            />
                            <p className={'bold__caption__font gray__color__60 signup__layout__nickname_label'}>
                                생년월일 6자리 숫자만 입력해주세요</p>
                            <h6 className={'mt_28 mb_10'}>성별</h6>
                            <article className={'row w100 '}>
                                <div className={'w100 '}>
                                    {
                                        userGender === '1' ?
                                            <DefaultButton label={'남'} type={'sub_large_primary'}
                                                           buttonClick={() => setUserGender('1')}
                                            />
                                            :
                                            <DefaultButton label={'남'} type={'sub_large_gray_border'}
                                                           buttonClick={() => setUserGender('1')}
                                            />
                                    }
                                </div>
                                <div className={'w100'}>
                                    {
                                        userGender === '2' ?
                                            <DefaultButton label={'여'} type={'sub_large_primary'}
                                                           buttonClick={() => setUserGender('2')}
                                            />
                                            :
                                            <DefaultButton label={'여'} type={'sub_large_gray_border'}
                                                           buttonClick={() => setUserGender('2')}
                                            />
                                    }
                                </div>
                            </article>
                        </section>
                        <section className={'signup__layout__button signup__layout__button__box'}>
                            {
                                birthDay.length === 8 && userGender !== '0' ?
                                    <DefaultButton label={'다음'} type={'large_primary'}
                                                   buttonClick={onClickSetBirthDay}
                                    />
                                    :
                                    <DefaultButton label={'다음'} type={'large_gray'}
                                                   buttonClick={onClickSetBirthDay}
                                    />
                            }
                        </section>
                    </article>
                </Signup>
            // user phone number
            case 3:
                return <Signup title={'사용하고 있는'} subTitle={'전화번호를 알려주세요'} clickBackImage={onClickBackImage}>
                    <article className={'signup__layout signup__layout__children'}>
                        <section className={'signup__layout__input'}>
                            <DefaultInput
                                style={'default'}
                                placeholder={'숫자만 입력해주세요.'}
                                image={'/close_icon.svg'}
                                onChangeValue={inputUserPhoneNumber}
                                imageClick={onClickSetPhoneNumberImage}
                                value={userPhoneNumber}
                            />
                        </section>
                        <section className={'signup__layout__button signup__layout__button__box'}>
                            {
                                userNickName.length >= 2 ?
                                    <DefaultButton label={'다음'} type={'large_primary'}
                                                   buttonClick={onClickSetPhoneNumber}
                                    />
                                    :
                                    <DefaultButton label={'다음'} type={'large_gray'}
                                                   buttonClick={onClickSetPhoneNumber}
                                    />
                            }
                        </section>
                    </article>
                </Signup>
            case 4:
                return <Signup title={'방금 보내드린'} subTitle={'인증번호를 입력해주세요'} clickBackImage={onClickBackImage}>
                    <article className={'signup__layout signup__layout__children'}>
                        <section className={'signup__layout__input'}>
                            <DefaultInput
                                style={'default'}
                                placeholder={`${userPhoneNumber}로 보내드렸어요`}
                                image={'/close_icon.svg'}
                                onChangeValue={inputUserAuthNumber}
                                imageClick={onClickSetAuthNumberImage}
                                value={authNumber}
                            />
                            {
                                authNumber.length !== 6 ?
                                    <div className={'mt_6'}>
                                        <p className={'error__color bold__caption__font'}>
                                            * 인증번호가 다릅니다. 다시 입력해주세요
                                        </p>
                                    </div> : ''
                            }

                            <div className={'row  mt_16 flex-center'}>
                                <p className={'button__font gray__color__70 mr_12'}>인증 문자가 오지 않나요?</p>
                                <p className={'button__font gray__color__50 auth_text'}
                                   onClick={phoneAuth}
                                >재전송</p>
                            </div>
                        </section>
                        <section className={'signup__layout__button signup__layout__button__box'}>
                            <div className={'w100 row'}>
                                <div className={'w100'}>
                                    <DefaultButton label={'번호 재입력'} type={'medium_primary_border'}
                                                   buttonClick={onClickBackImage}
                                    />
                                </div>
                                <div className={'w100'}>
                                    {
                                        authNumber.length === 6 ?
                                            <DefaultButton label={'완료'} type={'medium_primary'}
                                                           buttonClick={onClickSetAuthNumber}
                                            />
                                            :
                                            <DefaultButton label={'완료'} type={'medium_gray'}
                                                           buttonClick={onClickSetAuthNumber}
                                            />
                                    }
                                </div>
                            </div>


                        </section>
                    </article>
                </Signup>
        }
    }


    useEffect(() => {
        const saveUserName = localStorage.getItem('userName') ?? ''
        const saveUserNickName = localStorage.getItem('userNickName') ?? ''
        const saveUserBirthDay = localStorage.getItem('userBirthDay') ?? ''
        const saveUserGender = localStorage.getItem('userGender') ?? ''
        const saveUserPhoneNumber = localStorage.getItem('userPhoneNumber') ?? ''


        randomNickName()

        setUserName(saveUserName);
        setUserNickName(saveUserNickName);
        setBirthDay(saveUserBirthDay);
        setUserGender(saveUserGender);
        setUserPhoneNumber(saveUserPhoneNumber);

    }, []);


    // stage 0 logic
    const [userName, setUserName] = useState('')

    const inputUserName = (value: string) => {
        setUserName(value)
    }


    const onClickSetName = () => {
        // 이름이 너무 짧은경우
        if (userName.length < 2) {
            console.log('& 유요하지않은 경우, 추가')
        } else {
            localStorage.setItem('userName', userName)
            onClickNextStage()
        }

        console.log('유효한지 체크 , 다음으로 넘기기 ', userName)
    }

    const onClickSetNameImage = () => {
        setUserName('')
    }

    // stage 1 logic

    const [userNickName, setUserNickName] = useState('')
    const inputUserNickName = async (value: string) => {
        setUserNickName(value)
        try {

        } catch (err) {
            console.log(err)
        }
    }

    const onClickSetNickName = async () => {
        const valid = await checkNicknameDuplication(userNickName)

        if (valid) {
            localStorage.setItem('userNickName', userNickName)
            onClickNextStage()
        } else {
            console.log('닉네임이 유효하지 않습니다.')
        }
    }

    const onClickSetNickNameImage = () => {
        setUserNickName('')
    }

    // stage 2 logic
    const [birthDay, setBirthDay] = useState('')

    // 유저 성별 0 선택되지않음 , 1 남자 , 2 여자
    const [userGender, setUserGender] = useState('')

    const inputUserBirthDay = (value: string) => {

        let input = value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
        input = input.slice(0, 6); // 생년월일은 6자리로 제한
        let formatted = "";

        if (input.length <= 2) {
            formatted = input;
        } else if (input.length <= 4) {
            formatted = `${input.slice(0, 2)}.${input.slice(2)}`;
        } else {
            formatted = `${input.slice(0, 2)}.${input.slice(2, 4)}.${input.slice(
                4,
                6
            )}`;
        }

        setBirthDay(formatted);
        console.log(birthDay)
    }


    interface PutUserDataProps {
        name: string
        nickname: string
        mobile: string,
        birthdate: string
        gender: string
        email: string
    }


    const onClickSetBirthDay = async () => {
        // 생일 길이 유효한경우 , 이거 에러핸들링 리팩토링 해야함
        if (birthDay.length === 8 && userGender !== '0') {
            console.log('유효한지 체크 , 다음으로 넘기기 ', birthDay)

            localStorage.setItem('userBirthDay', birthDay)
            localStorage.setItem('userGender', userGender)
            // test version에서는 생년월일 까지 체크한 후 바로 test 페이지로 이동
            // onClickNextStage()

            try {
                let localUserBirthDay = localStorage.getItem('userBirthDay') || ''
                const formattedBirthDay = localUserBirthDay.replace(/^(\d{2})\.(\d{2})\.(\d{2})$/, '19$1-$2-$3');

                const putUserData = {
                    name: localStorage.getItem('userName'),
                    nickname: localStorage.getItem('userNickName'),
                    mobile: "010-8899-8822",
                    birthdate: formattedBirthDay,
                    gender: 'MALE',
                    email: "37101@gmail.com"
                }

                const valid =  await PutUserData(putUserData)

                await router.replace('/test')

            } catch (err) {
                console.log(err)
            }
        } else {
            console.log('& 유요하지않은 경우, 추가', birthDay)
        }
    }

    const onClickSetBirthDayImage = () => {
        setBirthDay('')
    }


    // stage 3 logic
    const [userPhoneNumber, setUserPhoneNumber] = useState('')

    const inputUserPhoneNumber = (value: string) => {
        let input = value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
        input = input.slice(0, 11); // 핸드폰 번호는 11자리로 제한
        let formatted = "";

        if (input.length <= 3) {
            formatted = input;
        } else if (input.length <= 7) {
            formatted = `${input.slice(0, 3)}-${input.slice(3)}`;
        } else {
            formatted = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(
                7,
                11
            )}`;
        }
        setUserPhoneNumber(formatted);
    }


    const phoneAuth = async () => {
        const numbersOnly = userPhoneNumber.replace(/\D/g, '')
        try {
            await postPhoneAuth({phoneNumber: numbersOnly})

        } catch (err) {
            console.log('fail get phone auth')
        }
    }

    // 유저의 핸드폰 번호
    const onClickSetPhoneNumber = async () => {

        if (userPhoneNumber.length === 13) {
            await phoneAuth()
            localStorage.setItem('userPhoneNumber', userPhoneNumber)
            await onClickNextStage()
        } else {
            console.log('& 유요하지않은 경우', userPhoneNumber)
        }
    }

    const onClickSetPhoneNumberImage = () => {
        setUserPhoneNumber('')
    }

    // stage 5 logic

    const [authNumber, setAuthNumber] = useState('')

    const inputUserAuthNumber = (value: string) => {
        setAuthNumber(value)
    }


    const onClickSetAuthNumber = async () => {
        // 인증 성공 로직
        const numbersOnly = userPhoneNumber.replace(/\D/g, '')

        if (authNumber.length === 6) {

            console.log(numbersOnly)
            try {
                const putAuth = await putPhoneAuth(authNumber, {receiverPhoneNumber: numbersOnly})
                console.log(putAuth)
            } catch (err) {
                console.log('fail', err)
            }


            // router.replace('/main')
            console.log('유효한지 체크 , 다음으로 넘기기 ', authNumber)
        } else {
            console.log('& 유요하지않은 경우, 추가')
            router.replace('/main')
        }
    }

    const onClickSetAuthNumberImage = () => {
        setAuthNumber('')
    }

    const router = useRouter()

    return (
        <div>
            {renderComponentStage()}
        </div>

    )
}

export default SignupPage
