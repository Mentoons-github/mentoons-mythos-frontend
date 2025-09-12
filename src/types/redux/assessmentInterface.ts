export interface Assessment {
  userId?: string;
  assessmentType: string;
  assessmentName: string;
  submissions: {
    questionNumber: number;
    answer: string;
  }[];
}

export interface FetchAssessment {
  type: string;
  name: string;
  questions: {
    _id:string
    question: string;
    options: string[];
  }[];
}


export interface AssessmentQuestion {
  type: string;
  name: string;
  question: string;
  options: string[];
}


export interface AllSubmissions {
  _id:string
  userId:{
    _id:string
    firstName:string
    lastName:string
    profilePicture:string
  }
  assessmentName:string
  assessmentType:string
}

export interface singleSubmission {
  questionNumber:number
  _id:string
  answer:string
  question:string
  options:string[]
}