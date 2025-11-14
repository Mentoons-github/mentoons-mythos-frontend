export interface Career {
  _id?: string;
  jobId?: string;
  name: string;
  email: string;
  mobileNumber: number;
  resume: string;
  position: string;
  cLocation: string;
  gender: string;
  coverNote?: string;
  createdAt?: string;
  status?:string
}

export interface IJobs {
  _id?: string;
  jobTitle: string;
  jobDescription: string;
  thumbnail: string;
  responsibilities: string[];
  requirements: string[];
  skillsRequired: string[];
  jobLocation: string;
  jobType: string;
  status: string;
  applications?: string[];
  endDescription?: string;
}

export interface GetApplicationsResponse {
  message: string;
  applications: Career[];
  total: number;
  page: number;
  totalPages: number;
}

export interface GetApplicationsParams {
  page: number;
  limit: number;
  genders?: string[];
  jobTitles?: string[];
  locations?: string[];
  status?:string[]
  sort?:string;
  search?:string
}

export interface GetJobResponse {
  jobs: IJobs[];
  page: number;
  totalPages: number;
}

export interface ApplicationFilters {
  genders?: string[];
  jobTitles?: string[];
  locations?: string[];
  status?:string[]
}

export interface AssignementSend {
  appDetails: Career[];
  jobTitle: string;
  dueDate: string;
  dueTime: string;
  fileUrl: string;
  link?: string;
}

export interface MentorTypes {
  userId?: string;
  mentorType: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
  whatsappNumber: number;
  resume: string;
  age: number;
  gender: string;
  status?: string;
  socialLinks: string[];
}
