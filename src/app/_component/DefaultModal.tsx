import './DefaultModal.scss'

const DefaultModal = () => {

    return (
        <div className={'modal__base'}>
            <h4 className={'modal__title'}>modal title</h4>
            <p className={'modal__contents text__font'}>modal contents</p>

            <div className={'modal__button_default'}>
                <div className={'modal__layout__divider'}></div>
                <div className={'modal__button_primary '}>
                    테스트하기
                </div>
            </div>

            <div className={'modal__button_default'}>
                <div className={'modal__layout__divider'}></div>
                <div className={'modal__button_primary'}>
                    <div className={'modal__button_half'}>
                        네
                    </div>
                    <div className={'modal__button_half'}>
                        아니오
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DefaultModal