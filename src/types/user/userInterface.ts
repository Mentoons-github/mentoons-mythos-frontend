export interface IUser extends ZodiacDetails {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  about?: string;
  country?: string;
  isGoogleUser?: boolean;
  profilePicture?: string | null;
  astrologyDetail?: IAstrologyDetail;
  role?: string;
  isBlocked: boolean;
}

export interface IAstrologyDetail {
  moonSign?: string;
  sunSign?: string;
  report?: any;
}

export interface UserResponse {
  success: boolean;
  user: IUser;
}

export interface AllUserResponse {
  success: boolean;
  users: IUser[];
}

export interface ZodiacDetails {
  dateOfBirth?: Date;
  timeOfBirth: string;
  longitude: string;
  latitude: string;
}
