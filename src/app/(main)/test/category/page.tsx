'use client'
import './category.scss'
import Image from "next/image";
import {getCategoryList, postAddCategoryList} from "@/app/api/UGTest";
import {useEffect, useState} from "react";
import {useAddCategoryList, useCategoryStore, usePostTestResultDataStore} from "@/app/zustand/testStore";
import CategoryDialog from "@/app/(main)/test/_component/CategoryDialog";
import TestPageHeader from "@/app/(main)/test/_component/TestPageHeader";
import DefaultButton from "@/app/_component/DefaultButton";
import {useRouter} from "next/navigation";

const UserCategory = () => {

    const [categoryLoading, setCategoryLoading] = useState(false)
    const [categoryDialog, setCategoryDialog] = useState(false)

    const selectCategory = useCategoryStore(state => state.selectCategory)

    const router = useRouter()


    const addCategoryList = useAddCategoryList(state => state.addCategory)




    const postAddCategory = async () => {
        try {
            const addList = await postAddCategoryList(categoryId, selectCategory)

            console.log(addList)
            setCategoryDialog(false)


        } catch (err) {
            console.log(err)
        }
    }


    const clickFooterButton = async (value: string) => {
        console.log(addCategoryList)
        // 모달창 올라와있을때
        if (categoryDialog) {
            setCategoryDialog(false)
        }

        // 내려가있을때
        if (!categoryDialog) {

            if (value === '이전') {
                router.replace('/test/')
            } else {
                const postAddCategoryData = await postAddCategory()
                console.log(postAddCategoryData)
                router.replace('/test/complete')
            }
        }
    }


    const [categoryArr, setCategoryArr] = useState([
        {
            id: 1,
            name: '',
            imageUrl: '/gift_list_main_image.svg'
        },
        {
            id: 2,
            name: '',
            imageUrl: '/gift_list_main_image.svg'
        },
        {
            id: 3,
            name: '',
            imageUrl: '/gift_list_main_image.svg'
        }, {
            id: 4,
            name: '',
            imageUrl: '/gift_list_main_image.svg'
        },
        {
            id: 5,
            name: '',
            imageUrl: '/gift_list_main_image.svg'
        },
        {
            id: 6,
            name: '',
            imageUrl: '/gift_list_main_image.svg'
        },
        {
            id: 7,
            name: '',
            imageUrl: '/gift_list_main_image.svg'
        },
        {
            id: 8,
            name: '',
            imageUrl: '/gift_list_main_image.svg'
        },
        {
            id: 9,
            name: '',
            imageUrl: '/gift_list_main_image.svg'
        },
    ])


    const categoryId = useCategoryStore(state => state.categoryId)

    const getCategory = async () => {
        console.log('tsx dptj 실행하는거 ')
        try {
            const list = await getCategoryList(categoryId)
            await setCategoryArr(list.data)
            await setCategoryLoading(true)
        } catch (err) {
            console.log('err dodhd')
        }
    }

    useEffect(() => {
        getCategory()
    }, [])


    interface CategoryItem {
        id: number
        name: string
        imageUrl: string
    }


    const [selectedCategory, setSelectedCategory] = useState<number[]>([])

    const clickCategory = (item: CategoryItem) => {

        console.log(item, ' check item list ')

        useCategoryStore.setState((prevState) => {
            let updatedSelectCategory = [...prevState.selectCategory];

            if (updatedSelectCategory.includes(item.id)) {
                updatedSelectCategory = updatedSelectCategory.filter((value) => value !== item.id);
            } else {
                updatedSelectCategory.push(item.id);
            }

            return {
                selectCategory: updatedSelectCategory
            };
        });


        setSelectedCategory((prev: number[]) => {

            // 겹치는게 있으면 그 값은 뺸 배열
            let check = false
            const categoryDuplicate = prev.filter((ele) => {
                if (ele !== item.id) {
                    return ele
                } else {
                    check = true
                }
            })
            console.log(categoryDuplicate, prev, 'check prev data ', check, item.id)

            if (check) {
                return [...categoryDuplicate]
            } else {
                return [...categoryDuplicate, item.id]
            }
        })
    }

    const clickAllCategory = () => {
        console.log(selectedCategory, ' finish')
        console.log(categoryArr)
    }


    const clickAddCategory = () => {
        setCategoryDialog(true)
    }

    const renderFooterButton = () => {
        if (categoryDialog) {
            return <div className={'test_page__footer__inner__button'}>
                <div className={'add_list_page__full__button'}>
                    <DefaultButton label={`${addCategoryList.length}개 추가`} type={'large_primary'}
                                   buttonClick={() => clickFooterButton('추가')}/>
                </div>
            </div>
        } else {
            return <div className={'test_page__footer__inner__button'}>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={'이전'} type={'medium_primary_border'}
                                   buttonClick={() => clickFooterButton('이전')}/>
                </div>
                <div className={'test_page__footer__inner__button_box'}>
                    <DefaultButton label={`${selectedCategory.length}개 확인`} type={'medium_primary'}
                                   buttonClick={() => clickFooterButton('확인')}/>
                </div>
            </div>
        }
    }


    const onClickCloseDialog = () => {
        setCategoryDialog(false)
    }

    function text() {

    }
    const testing = () => {
        console.log(addCategoryList)
    }
    return (
        <div>
            <div onClick={testing}>
                testing
            </div>
            <TestPageHeader
                navText={'은근테스트'}
                title={'username 님에게 맞는'}
                subTitle={'카테고리를 추천해드려요'}
                content={'1개 이상 15개 이하 선택'}
                progressWidth={'300px'}
            />
            <section className={'p_14'}>
                <div>
                    <article className={'user_category__layout mt_12'}>
                        <div className={'user_category__layout__content'}
                             onClick={clickAllCategory}
                        >
                            <div className={'user_category__layout__content__image'}>
                                <Image src={'/gift_list_main_image.svg'} alt={'x'} width={150} height={110}/>
                            </div>

                            <h5 className={'user_category__layout__content__text gray__color__100 mt_12'}>전체</h5>
                        </div>
                        {categoryArr.map((item, index) => (
                            <div key={index} className={'user_category__layout__content'}
                                 onClick={() => clickCategory(item)}
                            >
                                <div
                                    className={selectedCategory.includes(item.id) ? 'user_category__layout__content__image image_border' : 'user_category__layout__content__image'}>
                                    <Image src={item.imageUrl === null ? '/gift_list_main_image.svg' : item.imageUrl}
                                           alt={'x'}
                                           width={106}
                                           height={106}/>
                                </div>
                                {
                                    selectedCategory.includes(item.id) &&
                                    <div className={'user_category__layout__content__check_image'}>
                                        <Image src={'/select_left_icon_true.svg'} alt={'x'} width={24} height={24}/>
                                    </div>
                                }
                                <h5
                                    className={item.name === '' ? 'gray__color__100 user_category__layout__content__text_loading mt_12' : selectedCategory.includes(item.id) ? 'user_category__layout__content__text primary__color__400 mt_12' : 'user_category__layout__content__text gray__color__100 mt_12'}>
                                    {item.name}
                                </h5>
                            </div>
                        ))}

                        <div className={'user_category__layout__content'}
                             onClick={clickAddCategory}
                        >
                            <div className={'user_category__layout__content__image'}>
                                <Image src={'/gift_list_main_image.svg'} alt={'x'} width={150} height={110}/>
                            </div>

                            <h5 className={'user_category__layout__content__text gray__color__100 mt_12'}>더보기</h5>
                        </div>
                    </article>
                    <div className={'dim'}>

                    </div>

                    <div
                        className={categoryDialog ? 'user_category__dialog_up' : 'user_category__dialog_down'}>
                        {/*className={'user_category__dialog_down'}>*/}
                        <CategoryDialog closeDialog={onClickCloseDialog}/>
                    </div>


                </div>

            </section>


            <section className={'test_page__footer'}>
                {renderFooterButton()}
            </section>

            <div className={categoryLoading ? '' : 'test_page__layout__dim'}>

            </div>

            <div
                className={categoryLoading ? 'test_page__layout__none' : 'test_page__layout__dim__image'}>
                <Image src={'/loading_icon.svg'} alt={'x'} width={80} height={80}/>
                <div
                    className={categoryLoading ? 'test_page__layout__none' : 'test_page__layout__dim__text'}>
                    상품 카테고리 도출 중
                </div>
            </div>


        </div>
    )
}

export default UserCategory

