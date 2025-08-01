export interface Assessment{
    userId?:string,
    assessmentType:string,
    assessmentName:string,
    submissions:{
        questionNumber:number,
        answer:string
    }[]
}