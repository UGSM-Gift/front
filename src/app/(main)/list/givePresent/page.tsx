import './givePresent.scss'
import SmallProductComponent from "@/app/(main)/_component/SmallProductComponent";


// interface GivePresentProps {
//     myList?: boolean
// }

const GivePresent = () => {

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
        <div className={'my_list__layout'}>
            {
                smallArr ?
                    <section className={'give_present__layout'}>
                        <article className={'give_present__layout__content'}>

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
                    <div className={'my_list__layout__null'}>
                        <p className={'bold__text__font gray__color__50'}>친구에게 선물 리스트받고,</p>
                        <p  className={'bold__text__font gray__color__50'}>마음을 담아 선물해보세요!</p>
                    </div>
            }
        </div>
    )
}

export default GivePresent
