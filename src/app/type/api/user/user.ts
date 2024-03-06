import {number} from "prop-types";

export interface EventListState {
    id: number
    name: string
    date: string
    imageUrl: string
}

export interface UserJobProps {
    id: number
    name: string
    hasOtherName?: boolean
}

export interface UserChoiceProps {
    id: number
    content: string
}

export interface IdCollectorProps {
    category: number
    question: number
    answer: number
}

export interface UserHobbyProps {
    id: number
    name: string
    hasOtherName?: boolean
}


export interface AnsweredCategories {
    id: number
    otherName: string | null
}
export interface QuestionsWithAnswers {
    questionId: number
    answerId: number
    otherAnswer: string | null
}

export interface TestResultData {
    anniversaryId: number
    answeredCategories: AnsweredCategories[]
    questionsWithAnswers: QuestionsWithAnswers[]
}

