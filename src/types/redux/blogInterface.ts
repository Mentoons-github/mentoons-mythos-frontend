export interface Blog {
    file?:string,
    writerId?:string,
    writer?:string,
    title?:string,
    description:string
}

export interface CreateBlogResponse {
    message:string
}