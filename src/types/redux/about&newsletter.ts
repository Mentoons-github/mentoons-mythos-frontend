export interface IAboutComment {
  _id?: string;
  email: string;
  name: string;
  comment: string;
  createdAt?: string;
}

export interface INewsLetter {
  _id: string;
  email: string;
  createdAt: string;
}

export interface CareerGPSTypes {
  _id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
  whatsappNumber: number;
  age: number;
  gender: string;
  submittedBy: string;
}
