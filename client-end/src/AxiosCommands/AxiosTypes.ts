

/* Defining the Types */

export type CreateUser = {
    email: string, 
    firstName: string, 
    lastName: string, 
    password: string,
    cover_background: string,
    profile_background: string

}


export type VetifyUser = {
    email: string, 
    lastName: string,
    firstName: string,
}


export type getResponse = {
    lastName: string,
    firstName: string,
    cover_background: string,
    profile_background: string
    data: VetifyUser[]; 
}

export type getResponse1 = {
    data: CreateUser[];
}

export type CookieResponse = {
    loggedIn: boolean, 
    firstName: string,
    lastName: string, 
    email: string, 
    cover_background: string, 
    profile_background: string
}

export type UserChange = {
    axerror: string
}

export type userChange1 = {
    validation: string 
}

export type profile = {
    firstName:string,
    lastName:string,
    email:string,
    loggedIn:boolean
}


export type passwordChange = {
    oldPassword: string
    newPassword: string,
    password: string,
    email: string

}

export type encodedJSON = {
    imageStringBase64: string,
    imageType: string
    email: string
}

export type UserNameOnly = {
    email : string
}
