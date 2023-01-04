
    export type User = {
        email: string, 
        firstName: string, 
        lastName: string,
        password: string,
        loggedIn: boolean
        cover_background: string,
        profile_background: string
    }

    export type UserContext = {
        email: string, 
        firstName: string, 
        lastName: string,
        loggedIn: boolean
        cover_background: string, 
        profile_background: string

    }

    export type UserLogin = {
        email: string, 
        password: string,
        cover_background: string, 
        profile_background: string
        
    }

    export type UserErrors = {
        emailError: string, 
        firstNameError: string, 
        lastNameError: string, 
        passwordError: string, 
        validationSuccess: boolean
    }


    export type TypeProfileChanges = {
        firstName: string, 
        lastName: string
        email: string 
        loggedIn: boolean 
        cover_background: string 
        profile_background: string
        

    }


    export type TypeChangePassword = {
        oldPassword: string, 
        newPassword:string,
        password:string
        email: string
    }


    export type profilePageError = {
        firstNameError: string
        lastNameError: string
        validationSuccess: boolean
    }


