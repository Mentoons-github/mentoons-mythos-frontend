export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: Date;
  timeOfBirth: string;
  about?: string;
  country?: string;
  isGoogleUser?: boolean;
  longitude: string;
  latitude: string;
  profilePicture?: string | null;
  astrologyDetail?: IAstrologyDetail;
}

export interface IAstrologyDetail {
  moonSign?: string;
  sunSign?: string;
}

export interface UserResponse {
  success: boolean;
  user: IUser;
}
