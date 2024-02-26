import { create } from 'zustand';


interface TestState {
    eventType: number;
    eventText: string;
    testStage: number
    eventDay: number
    userJob: string
}


export const useTestStore = create<TestState>((set) => ({
    testStage: 1,
    eventType: 0,
    eventText: '',
    eventDay: 0,
    userJob: ''
}));


interface EventListState {
    id: number
    title: string
    image: string
    type: string
    userImage: string
}


// 초기 상태 정의
const eventListInitialState = [{
    id: 1,
    title: '정서윤 생일 (02.14)',
    image: '/circle_input_icon_false.svg',
    type: 'select_gray_border',
    userImage: '/add_event_heart.svg'
}];


// Zustand 스토어 생성
export const useEventList = create((set) => ({
    eventList: eventListInitialState, // 초기 상태 설정

    // 이벤트 목록 업데이트 함수
    updateEventList: (newEventList: EventListState) => set({ eventList: newEventList }),
}));