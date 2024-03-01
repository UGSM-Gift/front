'use client'
import './categoryDialog.scss'
import DefaultSelect, {ClickSelectProps} from "@/app/_component/DefaultSelect";
import NavLayout from "@/app/(main)/_component/NavLayout";
import Image from "next/image";
import {getAddCategory} from "@/app/api/UGTest";
import {useAddCategoryList, useCategoryStore} from "@/app/zustand/testStore";
import {useEffect, useState} from "react";

const CategoryDialog = () => {
    const clickSelect = () => {

    }

    const categoryId = useCategoryStore(state => state.categoryId)

    const [categoryTitle, setCategoryTitle] = useState<DialogCategoryListProps[]>([])
    const [selectedId, setSelectedId] = useState(0)


    const addCategory = async () => {
        try {
            const list = await getAddCategory(categoryId)
            console.log(list, 'check dialog list data ')
            setCategoryTitle(list.data)
        } catch (err) {
            console.log(err)
        }
    }

    interface DialogCategoryChildrenProps {
        name: string
        id: number
        children: null | DialogCategoryChildrenProps[]
        parentId: number
    }
    interface DialogCategoryListProps {
        children: DialogCategoryChildrenProps[]
        name: string
        id: number
    }


    const clickSelectCategoryTitle = (item: DialogCategoryListProps) => {
        console.log(item)
        setSelectedId(item.id)
        console.log(selectedId)
    }


    interface selectedContentProps {
        [key: number]: number
        content: number[]
    }

    const [selectedContent, setSelectedContent] = useState<selectedContentProps>({
        content: []
    })
    const clickSelectAll = () => {
        setSelectedId(0)
    }


    interface EventListState {
        id: number
        name: string
        date: string
        imageUrl: string
    }

    interface UserJobProps {
        id: number
        name: string
        hasOtherName?: boolean
    }

    interface UserChoiceProps {
        id: number
        content: string
    }


    function isDialogCategoryProps(item: ClickSelectProps): item is DialogCategoryChildrenProps {
        return (item as DialogCategoryChildrenProps).parentId !== undefined;
    }


    const addCategoryList = useAddCategoryList(state => state.addCategory)


    const clickSelectContent = (item: EventListState | UserJobProps | UserChoiceProps | DialogCategoryChildrenProps) => {

        if (isDialogCategoryProps(item)) {
            useCategoryStore.setState((prevState) => {
                let updatedSelectCategory = [...prevState.selectCategory]; // 이전 상태를 복사하여 수정할 배열을 생성합니다.

                // 값이 배열에 이미 존재하는지 확인하여 해당 값이 있다면 제거하고, 없다면 추가합니다.
                if (updatedSelectCategory.includes(item.id)) {
                    updatedSelectCategory = updatedSelectCategory.filter((value) => value !== item.id);
                } else {
                    updatedSelectCategory.push(item.id);
                }

                // 업데이트된 배열을 상태로 설정합니다.
                return {
                    selectCategory: updatedSelectCategory
                };
            });

            const newContent = { ...selectedContent }

            if (newContent.content.includes(item.id)) {
                const checkIndex = newContent.content.indexOf(item.id)
                newContent.content.splice(checkIndex, 1)
                newContent[item.parentId] -= 1

                const newItem = { id: item.id, name: item.name };
                const updatedList = addCategoryList.filter(existingItem => existingItem.id !== newItem.id || existingItem.name !== newItem.name);

                useAddCategoryList.setState({ addCategory: updatedList });

            } else {

                useAddCategoryList.setState({ addCategory: [...addCategoryList, { id: item.id, name: item.name }] });

                newContent.content.push(item.id)
                if (selectedContent[item.parentId]) {
                    newContent[item.parentId] += 1
                } else {
                    newContent[item.parentId] = 1
                }
            }

            setSelectedContent(newContent)


        } else {

        }

    }

    useEffect(() => {
        addCategory()
    }, [])


    const categoryDialog = useCategoryStore(state => state.categoryDialog)
    const test = () => {
        useCategoryStore.setState({categoryDialog: false})
        console.log(categoryDialog)
        console.log(selectedContent,  addCategoryList)
    }
    return (
        <div className={"category_dialog__layout"}>
            <NavLayout
                rightIconArr={['close']}
                centerText='카테고리 추가 선택'
                clickClose={test}
            />

            <div className='category_dialog__layout__menu w100'>
                <div className={'category_dialog__layout__menu__select'}>

                    <DefaultSelect type={'circle_select_sub_half'}
                                   clickSelectText={clickSelectAll} title={'전체'}/>
                    {
                        selectedContent.content.length > 0 &&
                        <div className={'category_dialog__layout__menu__select__number'}>
                            {selectedContent.content.length}
                        </div>
                    }
                </div>
                {
                    categoryTitle.map((item, index) => (
                        <div className={'category_dialog__layout__menu__select'}
                             key={index}
                        >


                            <DefaultSelect type={selectedContent[item.id] > 0 ? 'circle_select_sub_border_half_selected': 'circle_select_sub_border_half'}
                                           clickSelect={() => clickSelectCategoryTitle(item)}
                                           title={item.name}
                                           item={item}
                            />
                            {
                                selectedContent[item.id] ?
                                <div className={'category_dialog__layout__menu__select__number'}>
                                    {selectedContent[item.id]}
                                </div> : <div className={'mb_20'}></div>
                            }
                        </div>
                    ))
                }


                <div className={'category_dialog__layout__menu__select'}>
                    <DefaultSelect type={'circle_select_sub_border_half'}
                                   clickSelect={clickSelect} title={'유아'}/>
                </div>
            </div>
            <div className='divider_8px'></div>

            <div className={'category_dialog__layout__box'}>
                {
                    categoryTitle.map((item, index) => (
                        <div key={index}>
                            {
                                item.id === selectedId ?
                                    <div className={'category_dialog__layout__content__select'}>
                                        {
                                            item.children.map((items, index) => (
                                                <div className={''} key={index}>
                                                    <DefaultSelect type={selectedContent.content.includes(items.id) ? 'select_primary_half' : 'select_gray_border_half'}
                                                                   clickSelect={clickSelectContent}
                                                                   item={items}
                                                                   title={items.name}
                                                                   textCenter={true}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    : selectedId === 0 ? <div className={'category_dialog__layout__content__select mb_8'}>
                                        {
                                            item.children.map((items, index) => (
                                                <div className={''} key={index}>
                                                    <DefaultSelect type={selectedContent.content.includes(items.id) ? 'select_primary_half' : 'select_gray_border_half'}
                                                                   clickSelect={clickSelectContent}
                                                                   item={items}
                                                                   title={items.name}
                                                                   textCenter={true}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div> : ''

                            }
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default CategoryDialog