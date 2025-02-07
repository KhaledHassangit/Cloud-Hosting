export type Articles = {
    id :number;
    userId:number;
    title:string;
    description:string;
}


export type CreatedArticleDto = {
    title:string;
    description:string;

}
export type UpdatedArticleDto = {
    title?:string;
    description?:string;

}

export type SignUp = {
    username:string;
    email:string;
    password:string;
}

export type SignIn = {
    email:string;
    password:string;
}


export type JWTPayload = {
    id:number;
    username:string;
    isAdmin:boolean;
}