
/* This file contains all type definitions used across the application for user based interactions

    E.g - Changing Passwords, Registering User, Login the user, Changing Details

    E.g - User Context..

*/


    export type User = {
        email: string, 
        firstName: string, 
        lastName: string,
        password: string,
        loggedIn: boolean
        cover_background: string,
        profile_background: string
    }

    export type aUserContext = {
        id: number,
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
        id: number
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

    export type errorsType = {
        oldPassword: string, 
        newPassword: string,
        password: string,
        validationSuccess: boolean
    }


