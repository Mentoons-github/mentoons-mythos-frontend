import apiClient from "../../services/axiosInstance"
import { BookDatas } from "../../types/bookCall/bookCall.type"

export const availbleSlotsApi = ({date, type}:{date:string, type:string}) => {
    return apiClient.get(`book-call/available-slots?date=${date}&type=${type}`)
}

export const bookSlotApi = (data:BookDatas) => {
    return apiClient.post("book-call/book", data)
}