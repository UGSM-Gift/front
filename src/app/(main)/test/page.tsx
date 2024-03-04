'use client'
import NavLayout from "@/app/(main)/_component/NavLayout";
import './test.scss'
import EventType from "@/app/(main)/test/_component/EventType";
import DefaultButton from "@/app/_component/DefaultButton";
import {
    useAddCategoryList,
    useCategoryStore,
    useEventList,
    usePostTestResultDataStore,
    useTestStore
} from "@/app/zustand/testStore";
import {useEffect, useState} from "react";
import Calendar from "@/app/(main)/_component/Calendar";
import UserJob from "@/app/(main)/test/_component/UserJob";
import UserHobby from "@/app/(main)/test/_component/UserHobby";
import AddEvent from "@/app/(main)/_component/AddEvent";
import UserHobbyDetail from "@/app/(main)/test/_component/UserHobbyDetail";
import UserCategory from "@/app/(main)/test/_component/UserCategory";
import {getAnniversaryList, postAnniversary} from "@/app/api/anniversary";
import {getHobbyList, postAddCategoryList, postTestResult} from "@/app/api/UGTest";
import Image from "next/image";
import {useRouter} from "next/navigation";





interface EventListState {
    id: number
    title: string
    image: string
    type: string
    userImage: string
}

type EventListHookReturnType = {
    eventList: EventListState[];
    updateEventList: (newEventList: EventListState[]) => void;
};




const TestPage = () => {

    const testStage = useTestStore(state => state.testStage);
    const eventType = useTestStore(state => state.eventType);
    const eventText = useTestStore(state => state.eventText);
    const eventDay = useTestStore(state => state.eventDay);
    const userJob = useTestStore(state => state.userJob);
    const userJobId = useTestStore(state => state.userJobId);

    const userHobby = useTestStore(state => state.userHobby);
    const userInterest = useTestStore(state => state.userInterest);
    const eventImageId = useTestStore(state => state.eventImageId);


    const anniversaryId = usePostTestResultDataStore(state => state.anniversaryId);
    const answeredCategories = usePostTestResultDataStore(state => state.answeredCategories);
    const questionsWithAnswers = usePostTestResultDataStore(state => state.questionsWithAnswers);


    const testResultData = usePostTestResultDataStore.getState()

    const categoryLoading = useCategoryStore(state => state.loading)
    const categoryId = useCategoryStore(state => state.categoryId)

    const addCategoryList = useAddCategoryList(state => state.addCategory)

    const categoryDialog = useCategoryStore(state => state.categoryDialog)

    const selectCategory = useCategoryStore(state => state.selectCategory)


    const [footerContent, setFooterContent] = useState(0)



    const { eventList, updateEventList } = useEventList() as EventListHookReturnType;


    useEffect(()=> {
        initEventList()
    }, [])

    const initEventList = async () => {
        const initList = await getAnniversaryList('2024-02')
        updateEventList(initList.data)
    }


    const testing = () => {
        console.log(
            'visible', visible,
            'eventDay', eventDay ,
            'eventText' , eventText,
            'userJob', userJob,
            'userJobId', userJobId,
            'testStage', testStage,
            'userHobby', userHobby,
            'userInterest', userInterest,
            'eventList', eventList
            )
    }


    const postEventList = async () => {
        try {
            const formattedDate = String(eventDay).replace(/(\d{2})(\d{2})(\d{2})/, '20$1-$2-$3');

            const postData = {
                name: eventText,
                imageId: eventImageId,
                date: formattedDate,
            }

            const newArr = await postAnniversary(postData)

            console.log(newArr)
        } catch (err) {
            console.log(err)
        }
    }


    const postQuestionResult = async () => {
        try {
            await postTestResult(testResultData)
        } catch (err) {
            console.log(err,' err dodhd')
        }
    }

    const postAddCategory = async () => {
        try {
            const addList = await postAddCategoryList(categoryId, selectCategory)

            console.log(addList)
            useCategoryStore.setState({categoryDialog: false})


        }catch (err) {
            console.log(err)
        }
    }

    const router = useRouter()

    // 푸터 버튼 클릭시
    const clickFooterButton = async () => {
        console.log('outer')

        if (visible && eventDay !== '' && footerContent === 0) {
            console.log('1deps')

            return setFooterContent(1)

        } else if (footerContent === 1) {
            console.log('2deps')

            if (eventText === '') {
                // 이전으로 돌아가기
                return setFooterContent(0)
            } else {

                await postEventList()
                await initEventList()
                return clickAddEvent()
            }
        }



        if (testStage === 1 && eventText !== '') {
            useTestStore.setState((prevState) => ({
                testStage: prevState.testStage + 1
            }));
        }

        if (testStage === 2 && userJob !== '') {
            useTestStore.setState((prevState) => ({
                testStage: prevState.testStage + 1
            }));
        }

        if (testStage === 3 && userHobby.length !== 0) {
            useTestStore.setState((prevState) => ({
                testStage: prevState.testStage + 1
            }));
        }

        if (testStage === 4 && userInterest.length !== 0) {



            useTestStore.setState((prevState) => ({
                testStage: prevState.testStage + 1
            }));
        }

        // detail => category
        if (testStage === 5) {
            console.log(testResultData, 'tjdrhd')

            const postData = await postQuestionResult()

            console.log(postData)
            useTestStore.setState((prevState) => ({
                testStage: prevState.testStage + 1
            }));
        }


        // 모달창 올라와있을때
        if (testStage === 6 && categoryDialog) {
            useCategoryStore.setState({categoryDialog: false})
        }

        // 내려가있을때
        if (testStage === 6 && !categoryDialog) {
            const postAddCategoryData = await postAddCategory()
            console.log(postAddCategoryData)
            router.push('/test/complete')
        }
    }

    const clickFooterButtonBack = () => {
        if (testStage <= 6) {
            useTestStore.setState((prevState) => ({
                testStage: prevState.testStage - 1
            }));
        }
    }




    const renderFooterButton = () => {

        if (footerContent === 1) {
            if (eventText !== '') {
                return <div className={'test_page__footer__inner__button'}>
                    <div className={'test_page__footer__inner__button_box'}>
                        <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButton}/>
                    </div>
                    <div className={'test_page__footer__inner__button_box'}>
                        <DefaultButton label={'다음'} type={'medium_primary'} buttonClick={clickFooterButton}/>
                    </div>
                </div>
            }
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButton}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'다음'} type={'medium_gray'} buttonClick={clickFooterButton}/>
                </div>
            </div>
        } else if (visible) {
            return <DefaultButton label={'다음'} type={'large_primary'} buttonClick={clickFooterButton}/>
        }


        if (testStage === 1 && eventText !== '') {
            return <DefaultButton label={'확인'} type={'large_primary'} buttonClick={clickFooterButton}/>
        }

        if (testStage === 1 && eventText === '') {
            return <DefaultButton label={'확인'} type={'large_gray_border'} buttonClick={clickFooterButton}/>
        }

        if (testStage === 2 && userJob === '') {
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButtonBack}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'다음'} type={'medium_gray'} buttonClick={clickFooterButton}/>
                </div>
            </div>
        }

        if (testStage === 2 && userJob !== '') {
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButtonBack}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'다음'} type={'medium_primary'} buttonClick={clickFooterButton}/>
                </div>
            </div>
        }

        if (testStage === 3 && userHobby.length !== 0) {
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButtonBack}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'다음'} type={'medium_primary'} buttonClick={clickFooterButton}/>
                </div>
            </div>
        }

        if (testStage === 3 && userHobby.length === 0) {
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButtonBack}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'다음'} type={'medium_gray'} buttonClick={clickFooterButton}/>
                </div>
            </div>
        }

        if (testStage === 4 && userInterest.length !== 0) {
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButtonBack}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'다음'} type={'medium_primary'} buttonClick={clickFooterButton}/>
                </div>
            </div>
        }

        if (testStage === 4 && userInterest.length === 0) {
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButtonBack}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'다음'} type={'medium_gray'} buttonClick={clickFooterButton}/>
                </div>
            </div>
        }


        if (testStage === 5 ) {
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButtonBack}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'다음'} type={'medium_primary'} buttonClick={clickFooterButton}/>
                </div>
            </div>
        }




        if (testStage === 6 && categoryDialog) {
            return  <DefaultButton label={`${selectCategory.length}개 추가`} type={'large_primary'} buttonClick={clickFooterButton}/>
        }


        if (testStage === 6 ) {
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'} buttonClick={clickFooterButtonBack}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={`${selectCategory.length}개 확인`} type={'medium_primary'} buttonClick={clickFooterButton}/>
                </div>
            </div>
        }


        // return <DefaultButton label={'확인'} type={'large_gray_border'} buttonClick={clickFooterButton}/>


        // switch (testStage) {
        //     case 1:
        //         if (eventType !== 0 && (eventType !== 4 || eventText !== '')) {
        //             return <DefaultButton label={'확인'} type={'large_primary'} buttonClick={clickFooterButton}/>
        //         } else {
        //             return <DefaultButton label={'확인'} type={'large_gray_border'} buttonClick={clickFooterButton}/>
        //         }
        //     // return ''
        //     // break;
        //     case 2:
        //         return
        //     case 3:
        //         return
        //     case 4:
        //         return
        //     case 5:
        //         return
        // }
    }

    const [progressWidth, setProgressWidth] = useState('24px')

    interface testStageSwitchReturnProps {
        val1: string | JSX.Element
        val2: string | JSX.Element
        val3: string | JSX.Element
        val4: string | JSX.Element
        val5: string | JSX.Element
        val6: string | JSX.Element
    }


    const testStageSwitchReturn = ({val1, val2, val3, val4, val5, val6} :testStageSwitchReturnProps) => {
        switch (testStage) {
            case 1:
                return val1
            case 2:
                return val2
            case 3:
                return val3
            case 4:
                return val4
            case 5:
                return val5
            case 6:
                return val6
        }
    }


    const clickAddEvent = () => {
        if (visible) {
            setFooterContent(0)
            setVisible(false)
            setTestPageFooterClassName('test_page__calendar_down')
            setFooterClassName('test_page__footer')
        } else {
            setVisible(true)
            setTestPageFooterClassName('test_page__calendar_up')
            setFooterClassName('test_page__footer__none_border')
        }
    }





    const renderTestComponent = () => {
        return testStageSwitchReturn({
            val1: <EventType clickAddEvent={clickAddEvent}/>,
            val2: <UserJob/>,
            val3: <UserHobby type={'hobby'}/>,
            val4: <UserHobby type={'interest'}/>,
            val5: <UserHobbyDetail/>,
            val6: <UserCategory/>
        })
    }

    const mainTitle = () => {
        return testStageSwitchReturn({
            val1: '어떤 이벤트로',
            val2: 'user님은 현재 어떤 직업을',
            val3: 'user님 만의 취미를',
            val4:'user님은 평소 어디에',
            val5:'선택하신 취미/관심사에 관한',
            val6:'user님에게 맞는'
        })
    }
    const subTitle = () => {
        return testStageSwitchReturn({
            val1: '선물 리스트를 꾸리시나요?',
            val2: '가지고 계신가요?',
            val3: '알려주세요',
            val4: '관심이 있나요?',
            val5: '상세 질문에 답을 해주세요',
            val6: '카테고리를 추천해드려요!'
        })
    }



    let [visible, setVisible] = useState(false)
    let [testPageFooterClassName, setTestPageFooterClassName] = useState('test_page__calendar')
    let [footerClassName, setFooterClassName] = useState('test_page__footer')

    const clickBack = () => {
        setFooterContent(0)
        useTestStore.setState({eventDay: ''});
        clickAddEvent()
    }


    return (
        <div >
            <div onClick={testing}>
                <NavLayout
                    centerText={testStage === 6 ? '카테고리 선택' : '은근테스트'}
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
                    {mainTitle()}
                </h2>
                <h2 className={'gray__color__100 '}>
                    {subTitle()}
                </h2>
                {

                }
            </section>

            <section className={'test_page__layout'}>
                {
                    renderTestComponent()
                }
            </section>

            {/*<div>*/}
            {/*    <Calendar/>*/}
            {/*</div>*/}

            <footer className={testPageFooterClassName}>
                <NavLayout
                    centerText={'이벤트 추가'}
                    clickClose={clickBack}
                    rightIconArr={['close']}
                />

                <div className={'test_page__footer__inner'}>
                    {
                        footerContent === 0 ?
                            <div><Calendar/></div>
                        : <div><AddEvent/></div>
                    }
                </div>
            </footer>
            <div className={footerClassName} >
                {renderFooterButton()}
            </div>
            <div className={testStage === 6 ? categoryLoading ? '' : 'test_page__layout__dim' : ''}>

            </div>
            <div
                className={testStage === 6 ? categoryLoading ? 'test_page__layout__none' : 'test_page__layout__dim__image' : 'test_page__layout__none'}>
                <Image src={'/loading_icon.svg'} alt={'x'} width={80} height={80}/>
                <div className={testStage === 6 ? categoryLoading ? 'test_page__layout__none' : 'test_page__layout__dim__text' : 'test_page__layout__none'}>
                    상품 카테고리 도출 중</div>
            </div>
        </div>
    )
}

export default TestPage