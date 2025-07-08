
export interface RegisterResponse {
  message:string
}

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    country: string;
    confirmPassword: string;
    about: string;
    terms: boolean;
}

export interface LoginResponse {
    message:string,
    token:string
}

export interface LoginPayload {
    email:string,
    password:string
}