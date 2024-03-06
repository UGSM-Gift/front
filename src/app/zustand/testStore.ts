import { create } from 'zustand';
import {getAnniversaryList} from "@/app/api/anniversary";
import {number} from "prop-types";
import instance, {headers} from "@/app/api/axios";

interface userHobbyProps {
    id: number
    name: string
    hasOtherName?: boolean
}


interface TestState {
    eventType: number;
    eventText: string;
    eventDay: string
    userJob: string
    userInterest: userHobbyProps[]
    userHobby: userHobbyProps[]
    userWorry: userHobbyProps[]
    eventImageId: number
    userJobId: number
}

export const useTestStore = create<TestState>((set) => ({
    eventType: 0,
    eventText: '',
    eventDay: '',
    userJob: '',
    userJobId: 0,
    userInterest: [],
    userHobby: [],
    eventImageId: 0,
    userWorry: []
}));


export const useUserTestInfoStore = create<TestState>((set) => ({
    eventType: 0,
    eventText: '',
    eventDay: '',
    userJob: '',
    userJobId: 0,
    userInterest: [],
    userHobby: [],
    eventImageId: 0,
    userWorry: []
}));


interface EventListState {
    id: number
    name: string
    date: string
    imageUrl: string
}


const eventListInitialState = [{
    id: 1,
    name: '',
    date: '',
    imageUrl: ''
}];


// Zustand 스토어 생성
export const useEventList = create((set) => ({
    eventList: eventListInitialState, // 초기 상태 설정
    // 이벤트 목록 업데이트 함수
    updateEventList: (newEventList: EventListState) => set({ eventList: newEventList }),
}));



interface AnsweredCategories {
    id: number
    otherName: string | null
}
interface QuestionsWithAnswers {
    questionId: number
    answerId: number
    otherAnswer: string | null
}

interface TestResultData {
    anniversaryId: number
    answeredCategories: AnsweredCategories[]
    questionsWithAnswers: QuestionsWithAnswers[]
}

export const usePostTestResultDataStore = create<TestResultData>((set) => ({
    anniversaryId: 0,
    answeredCategories: [],
    questionsWithAnswers: []
}));


interface CategoryStoreProps {
    categoryId: number
    loading: boolean
    categoryDialog: boolean
    selectCategory: number[]
}

export const useCategoryStore = create<CategoryStoreProps>((set) => ({
    categoryId: 0,
    loading: false,
    categoryDialog: false,
    selectCategory: []
}))


interface UseAddCategoryListChildrenProps {
    id: number
    name: string
}

interface UseAddCategoryListProps {
    addCategory: UseAddCategoryListChildrenProps[]
}
export const useAddCategoryList = create<UseAddCategoryListProps>((set) => ({
    addCategory: [],
    liteArr: []
}))



