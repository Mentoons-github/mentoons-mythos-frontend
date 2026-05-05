import { IUser } from "../user/userInterface";

export interface Blog {
  _id?: string;
  file?: string;
  writerId?: string;
  writer?: string;
  title?: string;
  tags?: string[] | undefined;
  description: string;
  createdAt?: Date;
  likes?: string[];
  commentCount?: number;
  commentsOff?: boolean;
  reportLength?: number;
}

export type MediaItem = {
  url?: string;
  type: "image" | "video";
  caption?: string;
};

export interface IBlogV2 {
  _id?: string;
  user?: IUser;
  postType: "image" | "video" | "event" | "article" | "text";
  content?: string;
  tags?: string[];
  media?: MediaItem[];
  event?: {
    title?: string;
    startDate?: string;
    endDate?: string;
    venue?: string;
    description?: string;
  };
  article?: {
    title?: string;
    body?: string;
  };
  likes?: string[];
  commentsOff?: boolean;
  commentCount?: number;
  createdAt?: Date;
}

export interface Reward {
  points: number;
  action: string;
  postId?: string;
}

export interface CreateBlogResponse {
  message: string;
  // blog: Blog;
  blog: IBlogV2;
  reward: Reward;
}

export interface GetBlogResponse {
  message: string;
  // blogs: Blog[];
  blogs: IBlogV2[];
  total: number;
  userId: string;
}

export interface IReply {
  _id?: string;
  commentId: string;
  userId: IUser;
  replyToUserId: IUser;
  replyText: string;
  createdAt?: string;
}

export interface Comments {
  _id: string;
  comment: string;
  blogId: string;
  userId: IUser;
  replyCount: number;
  reportLength?: number;
  createdAt: string;
}

export interface SearchBlogResponses {
  data: IBlogV2[];
  message: string;
  success: boolean;
  results: number;
}
