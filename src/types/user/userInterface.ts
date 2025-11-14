import { Blog } from "../redux/blogInterface";

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
  astrologyReports?: IAstrologyReports;
  blogs?: Blog[];
  role?: string;
  isBlocked: boolean;
  createdAt?: string;
  takeInitialAssessment?: boolean;
  intelligenceTypes: string[];
  designation: string;
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
  total: number;
  page: number;
  totalPage: number;
}

export interface ZodiacDetails {
  dateOfBirth?: Date;
  timeOfBirth: string;
  longitude: string;
  latitude: string;
}

export interface IAstrologyReports {
  moon?: AstrologyReportsDetails;
  sun?: AstrologyReportsDetails;
}

export interface AstrologyReportsDetails {
  report: {
    deity: string;
    ganam: string;
    symbol: string;
    animal_sign: string;
    nadi: string;
    color: string;
    best_direction: string;
    syllables: string;
    birth_stone: string;
    gender: string;
    planet: string;
    enemy_yoni: string;
  };
  nakshatra: {
    id: number;
    name: string;
    pada: number;
  };
  zodiac: string;
  rasi: {
    id: number;
    name: string;
    lord: {
      id: number;
      name: string;
      vedic_name: string;
    };
  };
  lastGenerated: Date;
}
