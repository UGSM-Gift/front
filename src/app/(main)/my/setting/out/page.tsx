'use client'
import './mySettingOut.scss'
import NavLayout from "@/app/_component/NavLayout";
import DefaultInput from "@/app/_component/DefaultInput";
import React, {ReactEventHandler, useEffect, useState} from "react";
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";
import DefaultBottomSheets from "@/app/_component/DefaultBottomSheets";
import DefaultSelect from "@/app/_component/DefaultSelect";
import {delUserData, getUserDeleteReason} from "@/app/api/userData";

const MySettingOut = () => {

    const [reasonTitle, setReasonTitle] = useState<string>('탈퇴 사유를 선택해주세요')
    const [reasonId, setReasonId] = useState(0)
    const [reason, setReason] = useState('')

    const [viewReasonModalClass, setViewReasonModalClass] = useState('my_setting_out__dialog')

    const inputReasonTitle = (value: string) => {
        setReasonTitle(value)
    }
    const inputReason = (event: string) => {
        setReason(event)
    }


    const onClickSelectButton = async () => {
        console.log(viewReasonModalClass)
        if (viewReasonModalClass === 'my_setting_out__dialog_up') {
            setViewReasonModalClass('my_setting_out__dialog_down')

        } else {
            setViewReasonModalClass('my_setting_out__dialog_up')
            getUserDelReason()
        }
    }


    const router = useRouter()
    const clickBack = () => {
        router.replace('/my/setting')
    }

    interface delReasonData {
        id?: number
        name?: string
    }


    const [delReason, setDelReason] = useState<delReasonData[]>([
        {
            id: 1,
            name: '기타'
        },
        {
            id: 2,
            name: '기타'
        },
        {
            id: 3,
            name: '기타'
        },
    ])

    const getUserDelReason = async () => {
        try {
            const data = await getUserDeleteReason()
            setDelReason(data.data)
        } catch (err) {
            console.log(err, 'fail get user del reason tsx')
        }
    }

    interface delReasonData {
        id?: number
        name?: string
    }


    const onClickDelMenu = (item: delReasonData) => {
        if (item.name) {
            setReasonTitle(item.name)
        }
        if (item.id) {
            setReasonId(item.id)
        }

        setViewReasonModalClass('my_setting_out__dialog_down')
        console.log('hello', item)
    }


    // 탈퇴버튼
    const clickDelButton = async () => {
        try {
            const delUser = await delUserData(
                {
                    deletionReasonId: reasonId,
                    details: reason
                }
            )

            console.log(delUser)

        } catch (err) {
            console.log(err, 'tsx err')
        }
        console.log(reasonTitle, reason === '기타')
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

                    <DefaultSelect
                        imageUrl={'/bottom_arrow_icon.svg'}
                        type={'select_gray_border'}
                        clickSelectText={onClickSelectButton}
                        title={reasonTitle}
                    />

                </div>
                {
                    reasonTitle === '기타' ?
                        <div className={'mt_14'}>
                            <DefaultInput
                                style={'default'}
                                text_area={true}
                                placeholder={'탈퇴 사유를 입력해주세요'}
                                onChangeValue={inputReason}
                                value={reason}
                            />
                        </div> : <div></div>
                }
                <div className={viewReasonModalClass}>
                    <DefaultBottomSheets
                        title={'탈퇴 사유'}
                        propsArr={delReason}
                        clickMenu={onClickDelMenu}
                    />
                </div>
            </section>
            <footer className={'my_setting_out__footer'}>
                <DefaultButton
                    label={'탈퇴하기'}
                    type={'large_primary'}
                    buttonClick={clickDelButton}

                />
            </footer>
        </div>
    )
}

export default MySettingOut