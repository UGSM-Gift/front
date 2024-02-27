import { create } from 'zustand';
import {getAnniversaryList} from "@/app/api/anniversary";

interface userHobbyProps {
    id: number
    name: string
    hasOtherName?: boolean
}


interface TestState {
    eventType: number;
    eventText: string;
    testStage: number
    eventDay: string
    userJob: string
    userInterest: userHobbyProps[]
    userHobby: userHobbyProps[]
    eventImageId: number
}



export const useTestStore = create<TestState>((set) => ({
    testStage: 1,
    eventType: 0,
    eventText: '',
    eventDay: '',
    userJob: '',
    userInterest: [],
    userHobby: [],
    eventImageId: 0
}));




interface EventListState {
    id: number
    name: string
    date: string
    imageUrl: string
}


// 초기 상태 정의
// const eventListInitialState = [{
//     id: 1,
//     title: '정서윤 생일 (02.14)',
//     image: '/circle_input_icon_false.svg',
//     type: 'select_gray_border',
//     userImage: '/add_event_heart.svg'
// }];

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

