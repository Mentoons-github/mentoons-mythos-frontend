
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
    user:{
        accessToken:string,
        _id:string
    }
}

export interface LoginPayload {
    email:string,
    password:string
}

export interface SendOtpResponse {
    message:string,
}

export interface SendOtpPayload {
    email:string
}

export interface VerifyOtpResponse {
    message:string,
}

export interface VerifyOtpPayload {
    email:string,
    otp:string
}