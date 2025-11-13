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
    _id: string;
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
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    email: string;
  };
  assessmentName: string;
  assessmentType: string;
}

export interface singleSubmission {
  questionNumber: number;
  _id: string;
  answer: string;
  question: string;
  options: string[];
}

export interface InitialAssessmentSubmission {
  userId?: string;
  assessmentType: string;
  submissions: {
    assessmentName: string;
    question: string;
    answer: string;
    optionNo: number;
    options: string[];
  }[];
}

export interface InitialAssessmentDetails {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    email: string;
  };
  assessmentType: string;
  createdAt: string;
  submissions: {
    _id: string;
    questionNumber: number;
    answer: string;
    assessmentName: string;
    question: string;
    options: string[];
    optionNo: number;
  }[];
  intelligenceTypes: string[];
  scores?: Map<string, number>;
}
