import './receivePresent.scss'
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";



// interface ReceivePresent {
//     myList?: boolean
// }
const ReceivePresent = () => {
    const smallArr =[
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 10},
    ]


    return (
        <div>
            {
                smallArr ?
                    <section className={'receive_present__layout'}>
                        <article className={'receive_present__layout__content'}>
                            {
                                smallArr.map((item)=> (
                                    <div className={''} key={item.id}>
                                        <SmallProductComponent text={'암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용암튼상품내용'}

                                        />
                                    </div>
                                ))
                            }

                        </article>
                    </section>
                    :
                    <div className={'receive_present__layout__null'}>
                        <p className={'bold__text__font gray__color__50'}>앗! 아직 리스트를 만들지 않았어요</p>
                        <p  className={'bold__text__font gray__color__50'}>테스트로 받고 싶은 선물 리스트를 만들어보세요</p>
                    </div>
            }
        </div>
    )
}

export default ReceivePresent