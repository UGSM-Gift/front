'use client'
import './mySettingMember.scss'
import NavLayout from "@/app/(main)/_component/NavLayout";
import Image from "next/image";
import DefaultInput from "@/app/_component/DefaultInput";
import {useState} from "react";
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";

const MySettingMember = () => {

    const [userName, setUserName] = useState('')
    const [userGender, setUserGender] = useState(1)
    const inputName = (value:string) => {
        console.log(value)
        setUserName(value)
    }

    const router = useRouter()
    const clickBack = () => {
        router.back()
    }
    return (
        <div>
            <NavLayout
                leftIcon={'back'}
                centerText={'설정'}
                rightText={'수정'}
                clickBack={clickBack}
            />
            <section className={'my_setting_member__layout'}>
                <article className={'flex-center mb_18'}>
                    <div className={'my_setting_member__layout__user'}>
                        <Image src={'/default_user_icon.svg'} alt={'x'} width={84} height={84}/>
                        <div className={'update_icon'}>
                            <Image src={'/update_profile_icon.svg'} alt={'x'} width={30} height={30}/>
                        </div>
                    </div>
                </article>
                <article>
                    <div className={'mb_34'}>
                        <h6 className={'mb_10'}>이름</h6>
                        <DefaultInput
                            style={'default'}
                            placeholder={'유저이름'}
                            onChangeValue={inputName}
                            value={userName}
                        />
                    </div>
                    <div className={'mb_34'}>
                        <h6 className={'mb_10'}>닉네임</h6>
                        <DefaultInput
                            style={'default'}
                            placeholder={'유저이름'}
                            onChangeValue={inputName}
                            value={userName}
                        />
                    </div>
                    <div className={'mb_34'}>
                        <h6 className={'mb_10'}>생일</h6>
                        <DefaultInput
                            style={'default'}
                            placeholder={'유저이름'}
                            onChangeValue={inputName}
                            value={userName}
                        />
                    </div>
                    <div className={'mb_34'}>
                        <h6 className={'mb_10'}>성별</h6>
                        <div className={'my_setting_member__layout__gender'}>
                            {
                                userGender === 1 ?
                                    <div className={'my_setting_member__layout__gender_box'}>
                                        <DefaultButton label={'남'} type={'sub_large_primary'}
                                                       buttonClick={() => setUserGender(1)}
                                        />
                                    </div>
                                    :
                                    <div className={'my_setting_member__layout__gender_box'}>
                                        <DefaultButton label={'남'} type={'sub_large_gray_border'}
                                                       buttonClick={() => setUserGender(1)}
                                        />
                                    </div>

                            }
                            {
                                userGender === 2 ?
                                    <div className={'my_setting_member__layout__gender_box'}>
                                        <DefaultButton label={'여'} type={'sub_large_primary'}
                                                       buttonClick={() => setUserGender(2)}
                                        />
                                    </div>
                                    :
                                    <div className={'my_setting_member__layout__gender_box'}>
                                        <DefaultButton label={'여'} type={'sub_large_gray_border'}
                                                       buttonClick={() => setUserGender(2)}
                                        />
                                    </div>

                            }
                        </div>

                    </div>
                    <div className={'mb_34'}>
                        <h6 className={'mb_10'}>전화번호</h6>
                        <DefaultInput
                            style={'default'}
                            placeholder={'유저이름'}
                            onChangeValue={inputName}
                            value={userName}
                        />
                    </div>
                </article>
            </section>
        </div>
    )
}

export default MySettingMember