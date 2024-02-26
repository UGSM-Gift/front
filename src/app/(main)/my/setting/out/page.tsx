'use client'
import './mySettingOut.scss'
import NavLayout from "@/app/(main)/_component/NavLayout";
import DefaultInput from "@/app/_component/DefaultInput";
import {useState} from "react";
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";

const MySettingOut = () => {

    const [reason, setReason] = useState('')

    const inputReason = (value: string) => {
        setReason(value)
    }

    const router = useRouter()
    const clickBack = () => {
        router.back()
    }
    return (
        <div>
            <NavLayout
                leftIcon={'back'}
                centerText={'탈퇴하기'}
                clickBack={clickBack}
            />
            <section className={'my_setting_out__layout'}>
                <article className={'mt_10 mb_44'}>
                    <h2 className={'gray__color__100'}>userNickName님</h2>
                    <h2 className={'gray__color__100'}>정말로 탈퇴하시겠어요?</h2>
                    <h4 className={'gray__color__50 mt_12'}>은근슨물을 떠나는 이유를 남겨주세요</h4>
                </article>
                <div>
                    <DefaultInput
                        style={'default'}
                        placeholder={'탈퇴 사유를 선택해주세요'}
                        onChangeValue={inputReason}
                        value={reason}
                    />
                </div>
                <div className={'mt_14'}>
                    <DefaultInput
                        style={'default'}
                        text_area={true}
                        placeholder={'탈퇴 사유를 입력해주세요'}
                        onChangeValue={inputReason}
                        value={reason}
                    />
                </div>
            </section>
            <footer className={'my_setting_out__footer'}>
                <DefaultButton label={'탈퇴하기'} type={'large_primary'}/>
            </footer>
        </div>
    )
}

export default MySettingOut