'use client'
import './myList.scss'
import PresentListBoxComponent from "@/app/(main)/_component/PresentListBoxComponent";
import {useRouter} from "next/navigation";


const MyList = () => {

    const presentArr = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
    ]

    const router = useRouter()
    const clickPresentListBox = () => {
        router.push('/giftList')
    }

    return (
        <div className={'my_list__layout'}>
            {
                presentArr ?
                    <article className={'my_list__layout__content mb_14'}>
                        {
                            presentArr.map((item)=> (
                                <div key={item.id} className={'mb_14'}>
                                    <PresentListBoxComponent clickPresentListBox={clickPresentListBox}/>
                                </div>
                            ))
                        }
                    </article>
                    :
                    <div className={'my_list__layout__null'}>
                        <p className={'bold__text__font gray__color__50'}>앗! 아직 리스트를 만들지 않았어요</p>
                        <p  className={'bold__text__font gray__color__50'}>테스트로 받고 싶은 선물 리스트를 만들어보세요</p>
                    </div>
            }
        </div>
    )
}

export default MyList
