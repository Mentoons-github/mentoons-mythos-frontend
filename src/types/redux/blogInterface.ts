export interface Blog {
    _id?:string 
    file?:string,
    writerId?:string,
    writer?:string,
    title?:string,
    tags?:string[] | undefined
    description:string
    createdAt?:Date
    likes?: string[]
    comments?:string[]
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

