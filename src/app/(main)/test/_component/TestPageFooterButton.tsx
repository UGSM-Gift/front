import DefaultButton from "@/app/_component/DefaultButton";
import './testPageFooterButtonProps.scss'

interface TestPageFooterButtonProps {
    clickFooterButton: (item: string) => void
    leftButtonTitle: string
    rightButtonTitle: string
    state: boolean
}
const TestPageFooterButton = (
    {clickFooterButton, leftButtonTitle = '이전', rightButtonTitle = '다음', state = false}: TestPageFooterButtonProps
) => {




    return (
        <div>
            { state ?
                <section className={'test_page__footer'}>
                    <div className={'test_page__footer__inner__button'}>
                        <div className={'test_page__footer__inner__button_box'}>
                            <DefaultButton
                                label={leftButtonTitle}
                                type={'medium_primary_border'}
                                buttonClick={() => clickFooterButton('이전')}/>
                        </div>
                        <div className={'test_page__footer__inner__button_box'}>
                            <DefaultButton
                                label={rightButtonTitle}
                                type={'medium_primary'}
                                buttonClick={() => clickFooterButton('다음')}
                                />
                        </div>
                    </div>
                </section>
                :
                <section className={'test_page__footer'}>
                    <div className={'test_page__footer__inner__button'}>
                        <div className={'test_page__footer__inner__button_box'}>
                            <DefaultButton
                                label={leftButtonTitle}
                                type={'medium_primary_border'}
                                buttonClick={() => clickFooterButton('이전')}/>
                        </div>
                        <div className={'test_page__footer__inner__button_box'}>
                            <DefaultButton
                                label={rightButtonTitle}
                                type={'medium_gray'}
                                />
                        </div>
                    </div>
                </section>
            }
        </div>

    )
}

export default TestPageFooterButton