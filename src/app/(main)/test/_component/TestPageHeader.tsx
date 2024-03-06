import NavLayout from "@/app/(main)/_component/NavLayout";
import './testPageHeader.scss'

interface TestPageHeaderProps {
    navText: string
    title: string
    subTitle: string
    content: string
    progressWidth: string
}

const TestPageHeader = (
    {navText, title, subTitle, progressWidth, content} : TestPageHeaderProps
) => {


    return (
        <div>
            <div>
                <NavLayout
                    centerText={navText}
                />
            </div>
            <article className={'test_page__layout__progress'}>
                <div className={'test_page__layout__progress_bar'}>
                    <div className={'test_page__layout__progress_bar__inner'}
                         style={{width: progressWidth}}
                    >
                    </div>
                </div>
            </article>
            <section className={'mb_4 p_14'}>
                <h2 className={'gray__color__100 mb_3'}>
                    {title}
                </h2>
                <h2 className={'gray__color__100 mb_14 '}>
                    {subTitle}
                </h2>
                <h5 className={'gray__color__60'}>
                    {content}
                </h5>
            </section>
        </div>
    )
}

export default TestPageHeader