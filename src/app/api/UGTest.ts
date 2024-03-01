import instance, {headers} from './axios';
import {number} from "prop-types";
import {useCategoryStore} from "@/app/zustand/testStore";


export const getJobList = async () => {
    try {
        const response = await instance.get(`/api/personal-category/occupation`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Nickname duplication check failed:', error);
    }
};


export const getHobbyList = async () => {
    try {
        const response = await instance.get(`/api/personal-category/hobby`);
        return response.data;
    } catch (error) {
        console.error('Nickname duplication check failed:', error);
    }
};



export const getInterestList = async () => {
    try {
        const response = await instance.get(`/api/personal-category/interest`);
        return response.data;
    } catch (error) {
        console.error('Nickname duplication check failed:', error);
    }
};



export const getWorryList = async () => {
    try {
        const response = await instance.get(`/api/personal-category/worry`);
        return response.data;
    } catch (error) {
        console.error('Nickname duplication check failed:', error);
    }
};



export const getQuestionList = async (categoryIds: string) => {
    try {
        const response = await instance.get(`/api/personal-category/${categoryIds}/question`);
        return response.data;
    } catch (error) {
        console.error('Nickname duplication check failed:', error);
    }
};


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



export const postTestResult = async (postData: TestResultData) => {
    try {
        const response = await instance.post(`/api/survey`, postData, {headers});
        console.log(response.data, ' post 할때 나오는 res. data ')
        useCategoryStore.setState({categoryId: response.data.data})

        return response.data;
    } catch (error) {
        console.error('Nickname duplication check failed:', error);
    }
};


export const getCategoryList = async (id:number) => {
    try {
        const res = await instance.get(`/api/survey/${id}/product-category/recommended`);
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log('dlrjsms?')
        console.error('err', err)
    }
}



export const getAddCategory = async (id:number) => {
    try {
        const res = await instance.get(`/api/product-category`);
        console.log(res.data)
        return res.data
    } catch (err) {
        console.error('err', err)
    }
}



export const postAddCategoryList = async (categoryIds: number, categoryList: number[]) => {
    try {
        const res = await instance.post(`/api/survey/${categoryIds}/product-category`, categoryList, {headers});
        console.log(res.data, 'post add category list ')
        return res.data;
    } catch (error) {
        console.error('Nickname duplication check failed:', error);
    }
};

