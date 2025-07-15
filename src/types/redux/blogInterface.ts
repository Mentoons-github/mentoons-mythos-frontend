export interface Blog {
    file?:string,
    writerId?:string,
    writer?:string,
    title?:string,
    tags?:string[] | undefined
    description:string
    createdAt?:Date
}

export interface CreateBlogResponse {
    message:string,
    blog:Blog
}

export interface GetBlogResponse {
    message:string
    blogs:Blog[]
}

