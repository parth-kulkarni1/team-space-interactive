
    export type User = {
        email: string, 
        firstName: string, 
        lastName: string,
        password: string,
        loggedIn: boolean
    }

    export type UserContext = {
        email: string, 
        firstName: string, 
        lastName: string,
        loggedIn: boolean

    }

    export type UserLogin = {
        email: string, 
        password: string
    }

    export type UserErrors = {
        emailError: string, 
        firstNameError: string, 
        lastNameError: string, 
        passwordError: string, 
        validationSuccess: boolean
    }


