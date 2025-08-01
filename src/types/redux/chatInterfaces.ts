export interface Chat {
    _id?:string,
    sender:{
        _id:string
        firstName:string,
        lastName:string,
        profilePicture:string
    },
    group?:string,
    message:string,
    createdAt:string

}