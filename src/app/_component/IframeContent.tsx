
import './iframeContent.scss'
interface IframeContentProps {
    url?: string
}

const IframeContent = ({url = 'https://shopping.naver.com/logistics/products/5014886926?NaPm=ct%3Dluqu247b%7Cci%3Dshoppingvertical%7Ctr%3Davgtc%7Chk%3D6f8ec6a14ef43dc39d4eb24067a8cb3aea0b9838'}: IframeContentProps) => {

    return (
        <div>
            <div className={'iframe__layout'}>
                <iframe
                    src={url}
                    className={'iframe__content'}
                    width="100%"
                    height="100%"

                >
                </iframe>
            </div>

        </div>
    );
};

export default IframeContent;