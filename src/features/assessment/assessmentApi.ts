import apiClient from "../../services/axiosInstance"
import { Assessment, AssessmentQuestion } from "../../types/redux/assessmentInterface"

export const assessmentSubmitApi = (details:Assessment) => {
    return apiClient.post('/assessment/submit',details)
}

export const assessmentQuestionApi = (data:AssessmentQuestion) => {
    return apiClient.post("/assessment/new-question", data)
}

export const assessmentFetchApi = (name:string) => {
    return apiClient.get(`/assessment/fetch/${name}`)
}

export const fetchAllSubmissionApi = () => {
    return apiClient.get('assessment/getall')
}

export const fetchSingleSubmissionApi = (submissionId:string) => {
    return apiClient.get(`/assessment/getSingle/${submissionId}`)
}