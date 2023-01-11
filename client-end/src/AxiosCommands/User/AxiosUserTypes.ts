

/* Defining the Types */

export type CreateUser = {
    email: string, 
    firstName: string, 
    lastName: string, 
    password: string,
    cover_background: string,
    profile_background: string

}


export type CreateUserResponse = {
    id: number
    email: string, 
    firstName: string, 
    lastName: string, 
    password: string,
    cover_background: string,
    profile_background: string

}



export type getUserDetails = {
    id: number
    lastName: string,
    firstName: string,
    cover_background: string,
    profile_background: string
}


export type CookieResponse = {
    id: number
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
    id: number,
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

export type cloudinaryResponse = {
    background: string
}
