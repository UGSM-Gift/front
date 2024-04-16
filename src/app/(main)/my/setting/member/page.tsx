'use client'
import './mySettingMember.scss'
import NavLayout from "@/app/_component/NavLayout";
import Image from "next/image";
import DefaultInput from "@/app/_component/DefaultInput";
import {ChangeEvent, useEffect, useState} from "react";
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";
import {putUserInfo} from "@/app/api/account";
import {getUserData, postUserProfile, PutUserData} from "@/app/api/userData";

const MySettingMember = () => {

    const [userName, setUserName] = useState('')
    const [userNickName, setUserNickName] = useState('')
    const [userBirthDay, setUserBirthDay] = useState('')
    const [userMobile, setUserMobile] = useState('')
    const [userEmail, setUserEmail] = useState('')


    const [userGender, setUserGender] = useState(1)



    const [userProfileImage, setUserProfileImage] = useState('')


    const inputName = (value:string) => {
        setUserName(value)
    }

    const inputNickName = (value:string) => {
        setUserNickName(value)
    }

    const inputBirthDay = (value:string) => {
        let input = value.replace(/\D/g, ""); // 숫자 이외의 문자 제거
        input = input.slice(0, 8); // 생년월일은 6자리로 제한
        let formatted = "";

        if (input.length <= 4) {
            formatted = input;
        } else if (input.length <= 6) {
            formatted = `${input.slice(0, 4)}-${input.slice(4)}`;
        } else {
            formatted = `${input.slice(0, 4)}-${input.slice(4, 6)}-${input.slice(
                6,
                8
            )}`;
        }

        setUserBirthDay(formatted)
    }

    const inputMobile = (value:string) => {
        setUserMobile(value)
    }



    const initUserData = async () => {
        try {
            const getData = await getUserData()
            console.log(getData.data)
            setUserName(getData.data.name)
            setUserNickName(getData.data.nickname)
            setUserBirthDay(getData.data.birthdate)
            setUserMobile(getData.data.mobile)
            setUserEmail(getData.data.email)
            setUserProfileImage(getData.data.profileImageUrl)

        } catch (err) {
            console.log('fail get user data member page err')
        }
    }



    const router = useRouter()
    const clickBack = () => {
        router.replace('/my/setting')
    }


    const [image, setImage] = useState<File | null>(null);

    const clickUserImage = async (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files, event.target)
        if (event.target.files) {
            const selectedImage = event.target.files[0];
            setImage(selectedImage);
        }
    }


    const clickPutUserData = async () => {
        try {

            if (image) {

                // 유저 이미지 변경 있을때
                const userProfile = await postUserProfile(image)

                const putData = await putUserInfo({
                    name: userName,
                    nickname: userNickName,
                    mobile: userMobile,
                    birthdate: userBirthDay,
                    gender: userGender === 1 ? "MALE" : "FEMALE",
                    email: userEmail,
                    profileImageName: userProfile.data.fileName
                })
                console.log('11', putData)
            } else {
                // 유저 이미지 변경 없을때
                const putData = await putUserInfo({
                    name: userName,
                    nickname: userNickName,
                    mobile: userMobile,
                    birthdate: userBirthDay,
                    gender: userGender === 1 ? "MALE" : "FEMALE",
                    email: userEmail,
                    profileImageName: userProfileImage
                })
                console.log('h?d', putData)
            }






        } catch (err) {
            console.log('fail put userinfo tsx err')
        }
    }


    useEffect(()=> {
        initUserData()
    }, [])

    return (
        <div>
            <NavLayout
                leftIcon={'back'}
                centerText={'설정'}
                rightText={'수정'}
                clickBack={clickBack}
                clickRightText={clickPutUserData}
            />
            <section className={'my_setting_member__layout'}>
                <article className={'flex-center mb_18'}>
                    <label className={'my_setting_member__layout__user'} >
                        <input type="file" accept="image/*" style={{display: 'none'}} onChange={clickUserImage}/>
                        <Image src={'/default_user_icon.svg'} alt={'x'} width={84} height={84}/>
                        <div className={'update_icon'}>
                            <Image src={'/update_profile_icon.svg'} alt={'x'} width={30} height={30}/>
                        </div>
                    </label>
                </article>
                <article>
                    <div className={'mb_34'}>
                        <h6 className={'mb_10'}>이름</h6>
                        <DefaultInput
                            style={'default'}
                            placeholder={'이름'}
                            onChangeValue={inputName}
                            value={userName}
                        />
                    </div>
                    <div className={'mb_34'}>
                        <h6 className={'mb_10'}>닉네임</h6>
                        <DefaultInput
                            style={'default'}
                            placeholder={'닉네임'}
                            onChangeValue={inputNickName}
                            value={userNickName}
                        />
                    </div>
                    <div className={'mb_34'}>
                        <h6 className={'mb_10'}>생일</h6>
                        <DefaultInput
                            style={'default'}
                            placeholder={'생일'}
                            onChangeValue={inputBirthDay}
                            value={userBirthDay}
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
                            placeholder={'전화번호'}
                            onChangeValue={inputMobile}
                            value={userMobile}
                        />
                    </div>
                </article>
            </section>
        </div>
    )
}

export default MySettingMember