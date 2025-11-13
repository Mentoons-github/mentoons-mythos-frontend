export interface EnquiryI {
  _id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  message: string;
  category: string;
  createdAt?: string;
}

export interface GetEnquiriesResponse {
  enquiryDetails: EnquiryI[];
  page: number;
  totalPages: number;
}

export interface WorkshopI {
  _id?:string
  age: string;
  amount: number | string;
  focus: string;
  img: string;
  activities: string[];
  enquiries?:string[];
  createdAt?:string
}

export interface GetWorkshopResponse {
  workshops: WorkshopI[];
  page: number;
  totalPages: number;
}

