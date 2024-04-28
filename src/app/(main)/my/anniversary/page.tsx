'use client'
import './anniversary.scss'
import NavLayout from "@/app/_component/NavLayout";
import {useRouter} from "next/navigation";
import Calendar from "@/app/(main)/_component/Calendar";
import DefaultButton from "@/app/_component/DefaultButton";
import {useEffect, useState} from "react";
import AddEvent from "@/app/(main)/_component/AddEvent";
import {useEventList, useTestStore} from "@/app/zustand/testStore";
import {postAnniversary} from "@/app/api/userData";
import {delAnniversaryList, getAnniversaryList} from "@/app/api/anniversary";
import DefaultSelect from "@/app/_component/DefaultSelect";
import {useUserPostGoodsData} from "@/app/zustand/goodsStore";
import Image from "next/image";

const Anniversary = () => {

    const router = useRouter()
    const clickBack = () => {
        router.replace('/my')
    }

    const [selectDay, setSelectDay] = useState('')
    const [modalFlag, setModalFlag] = useState(false)


    const clickAddButton = async () => {
        try {
            if (selectDay !== '' && !modalFlag) {
                setModalFlag(true)
            }

            if (modalFlag && selectDay !== '') {

                const postData = await postAnniversary(
                    {
                        name: useTestStore.getState().eventText,
                        imageId: useTestStore.getState().eventImageId,
                        date: selectDay
                    }
                )


                console.log(postData)
            }
        } catch (err) {
            console.log('fail')
        }

    }

    const [anniversaryList, setAnniversaryList] = useState([])


    const callAnniversaryList = async () => {
        try {
            const getData = await getAnniversaryList('')
            console.log(getData)

            setAnniversaryList(getData.data)
        } catch (err) {
            console.log('fali call data')
        }
    }
    const clickDay = (item: any) => {
        setSelectDay(item)
        console.log(item)
    }

    useEffect(()=> {
        callAnniversaryList()
    },[])




    const [selectEvent, setSelectEvent] = useState(0)

    const clickSelect = (item: any) => {

        useUserPostGoodsData.setState({
            anniversaryId: item.id
        })

        if ('name' in item) {
            useTestStore.setState({eventText: item.name})
        }

        if ('date' in item) {
            useTestStore.setState({eventDay: item.date})
        }
        useTestStore.setState({eventType: item.id})

        setSelectEvent(item.id)
    }

    const formatDate = (dateString: string) => {
        // 날짜 문자열에서 연도, 월, 일을 추출하여 새로운 형식으로 조합
        return dateString.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$2.$3');
    };


    const clickAnniversarySetting = async (item: any) => {
        try {
            console.log(item)
            const delData = await delAnniversaryList(item.id)
            console.log(delData)
        }  catch (err) {
            console.log(err)
        }
    }




    return (
        <div className={'anniversary__layout'}>
            <NavLayout
                leftIcon={'back'}
                centerText={'기념일'}
                clickBack={clickBack}
            />
            <div style={{padding: '30px 0 0'}}>

            </div>
            <div className={'calendar__layout'}>
                <Calendar
                    clickDay={clickDay}
                />

                <div className={'anniversary__list__layout'}>
                    {
                        anniversaryList.map((item: any) => (
                            <article key={item.id} className={'anniversary__content'}>
                                <section className={'row flex-center'}>
                                    <div>
                                        <Image src={item.imageUrl} alt={'x'} width={40} height={40}/>
                                    </div>
                                    <h5 className={'anniversary__content_name gray__color__80'}>
                                        {item.name}
                                    </h5>
                                </section>
                                <section className={'row flex-center'}>
                                    <div className={'gray__color__40 text__font anniversary__content_date'}>
                                        {formatDate(item.date)}
                                    </div>
                                    <div onClick={() => clickAnniversarySetting(item)} className={'anniversary__content_delete'}>
                                        <Image src={'/del_icon.svg'} alt={'x'} width={24} height={24}/>
                                    </div>
                                </section>

                            </article>
                        ))
                    }
                </div>


            </div>


            <div className={modalFlag ? 'anniversary__dialog_up' : 'anniversary__dialog_down'}>
                <NavLayout
                    centerText={'이벤트'}
                />
                <div className={'anniversary__dialog_inner__layout'}>
                    <AddEvent/>
                </div>
            </div>
            <div className={'anniversary__layout__footer'}>
                <DefaultButton label={'추가'} type={selectDay === '' ? 'large_gray' : 'large_primary'}
                               buttonClick={clickAddButton}
                />
            </div>


        </div>
    )
}

export default Anniversary