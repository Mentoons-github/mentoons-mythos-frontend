export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  dateOfBirth?: Date;
  timeOfBirth?: string;
  country?: string;
  about?: string;
  isGoogleUser: boolean;
  profilePicture?: string | null;
  latitude?: number;
  longitude?: number;
}
