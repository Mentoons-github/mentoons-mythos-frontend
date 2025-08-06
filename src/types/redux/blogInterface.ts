export interface Blog {
    _id?:string 
    file?:string 
    writerId?:string
    writer?:string
    title?:string
    tags?:string[] | undefined
    description:string
    createdAt?:Date
    likes?: string[]
    commentCount?:number
    commentsOff?:boolean
}

export interface CreateBlogResponse {
    message:string,
    blog:Blog
}

export interface GetBlogResponse {
    message:string
    blogs:Blog[]
    total:number
    userId:string
}


export interface IReply {
  userId: string;
  username: string;
  profile?: string;
  replyText: string;
  createdAt:string
}

export interface Comments {
    _id:string
    comment:string
    blogId:string
    userId:string
    username:string
    profile:string
    createdAt:string
    reply:IReply[]
}

export interface SearchBlogResponses{
    data:Blog[]
    message:string
    success:boolean
    results:number
}

