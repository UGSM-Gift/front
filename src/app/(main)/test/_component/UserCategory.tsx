'use client'
import './userCategory.scss'
import Image from "next/image";
import {getCategoryList} from "@/app/api/UGTest";
import {useEffect, useState} from "react";
import {useCategoryStore, usePostTestResultDataStore} from "@/app/zustand/testStore";
import CategoryDialog from "@/app/(main)/test/_component/CategoryDialog";

const UserCategory = () => {

    const [categoryArr, setCategoryArr] = useState([
        {
            id: 1,
            name: '',
        },
        {
            id: 2,
            name: '',
        },
        {
            id: 3,
            name: '',
        }, {
            id: 4,
            name: '',
        },
        {
            id: 5,
            name: '',
        },
        {
            id: 6,
            name: '',
        },
        {
            id: 7,
            name: '',
        },
        {
            id: 8,
            name: '',
        },
        {
            id: 9,
            name: '',
        },
    ])


    const categoryId = useCategoryStore(state => state.categoryId)

    const getCategory = async () => {
        console.log('tsx dptj 실행하는거 ')
        try {
            const list = await getCategoryList(categoryId)
            await setCategoryArr(list.data)
            await useCategoryStore.setState({loading: true})
        } catch (err) {
            console.log('err dodhd')
        }
    }

    useEffect(()=> {
        getCategory()
    }, [])


    interface CategoryItem {
        id: number
        name: string
    }


    const [selectedCategory, setSelectedCategory] = useState<number[]>([])

    const clickCategory = (item: CategoryItem) => {



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
            const categoryDuplicate = prev.filter((ele)=> {
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

    const categoryDialog = useCategoryStore(state => state.categoryDialog)



    const clickAddCategory = () => {
        useCategoryStore.setState({categoryDialog: true})
    }


    return (
        <div>
            <article className={'user_category__layout mt_12'}>
                <div className={'user_category__layout__content'}
                     onClick={clickAllCategory}
                >
                    <div className={'user_category__layout__content__image'}>
                        <Image src={'/gift_list_main_image.svg'} alt={'x'} width={150} height={110}/>
                    </div>

                    <h5 className={'user_category__layout__content__text gray__color__100 mt_12'} >전체</h5>
                </div>
                {categoryArr.map((item, index) => (
                    <div key={index} className={'user_category__layout__content'}
                        onClick={() => clickCategory(item)}
                    >
                        <div className={selectedCategory.includes(item.id) ? 'user_category__layout__content__image image_border' : 'user_category__layout__content__image' }>
                            <Image src={'/gift_list_main_image.svg'} alt={'x'} width={150} height={110}/>
                        </div>
                        {
                            selectedCategory.includes(item.id) &&
                            <div className={'user_category__layout__content__check_image'}>
                                <Image src={'/select_left_icon_true.svg'} alt={'x'} width={24} height={24}/>
                            </div>
                        }
                        <h5
                            className={item.name === '' ? 'gray__color__100 user_category__layout__content__text_loading mt_12' : selectedCategory.includes(item.id) ? 'user_category__layout__content__text primary__color__400 mt_12' : 'user_category__layout__content__text gray__color__100 mt_12' }>
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
                className={categoryDialog ? 'user_category__dialog_up': 'user_category__dialog_down'}>
                {/*className={'user_category__dialog_down'}>*/}
                <CategoryDialog/>
            </div>


        </div>
    )
}

export default UserCategory

