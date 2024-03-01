import Image from "next/image";
import './comlete.scss'

const TestCompletePage = () => {

    return (
        <div>
            <section className={'test_complete__layout'}>
                <Image src={'/test_complete_icon.svg'} alt={'x'} width={300} height={300}/>
                <div>
                    <h2 className={'gray__color__100 mb_10'}>UGSM 테스트 마무리</h2>
                    <h5 className={'gray__color__60'}>참여해 주셔서 감사합니다</h5>
                </div>
            </section>


        </div>
    )
}

export default TestCompletePage