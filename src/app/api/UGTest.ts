import instance from './axios';


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
