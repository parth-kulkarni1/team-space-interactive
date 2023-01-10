import {findUser } from '../../AxiosCommands/AxiosCommands';
import { passwordChange } from '../../AxiosCommands/AxiosTypes';
import { errorsType, profilePageError, TypeProfileChanges, User, UserErrors } from '../Types/UserTypes';


export async function Validation(user: User): Promise<UserErrors>{


       const ErrorsObj: UserErrors = { emailError: "",
                        firstNameError: "",
                        lastNameError: "",
                        passwordError: "",
                        validationSuccess: false}

    

        if(user.email.length === 0){
            ErrorsObj.emailError = 'Email not provided!'
        }

        else if (user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) == null){
            ErrorsObj.emailError = 'Email Formatting is incorrect'
        }

        else{
            const results = await findUser(user.email);

            if (results !== null){
                ErrorsObj.emailError = 'This Email Already Exists'
            }
        }


        if (user.firstName.length === 0){
            ErrorsObj.firstNameError = 'First name not provided!'
        }

        else if (user.firstName.match(/^[a-zA-Z]+$/) == null){
            ErrorsObj.firstNameError = 'First name cannot contain symbols or numbers'
        }

        if (user.lastName.length === 0){
            ErrorsObj.lastNameError = 'Last name not provided!'
        }

        else if (user.lastName.match(/^[a-zA-Z]+$/) == null){
            ErrorsObj.lastNameError = 'Last name cannot contain symbols or numbers'
        }


        if (user.password.length === 0){
            ErrorsObj.passwordError = 'Password not provided!'
        }

        else if (user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/) ==  null){
            ErrorsObj.passwordError = 'Passwords should contain 8 to 15 characters, one uppercase letter, one numeric digit and one special character'
        }


        if ((ErrorsObj).emailError === '' && (ErrorsObj).firstNameError === '' && (ErrorsObj).lastNameError === '' 
        && (ErrorsObj).passwordError === ''){ 

            ErrorsObj.validationSuccess = true;

        }

        console.log(ErrorsObj, "before retunting")


        return ErrorsObj

    }



export function profileValidation(user: TypeProfileChanges): profilePageError{
      const ErrorsObj: profilePageError = {
                        firstNameError: "",
                        lastNameError: "",
                        validationSuccess: false}

    
        if (user.firstName.length === 0){
            ErrorsObj.firstNameError = 'First name not provided!'
        }

        else if (user.firstName.match(/^[a-zA-Z]+$/) == null){
            ErrorsObj.firstNameError = 'First name cannot contain symbols or numbers'
        }

        if (user.lastName.length === 0){
            ErrorsObj.lastNameError = 'Last name not provided!'
        }

        else if (user.lastName.match(/^[a-zA-Z]+$/) == null){
            ErrorsObj.lastNameError = 'Last name cannot contain symbols or numbers'
        }



        if ((ErrorsObj).firstNameError === '' && (ErrorsObj).lastNameError === '' ){ 

            ErrorsObj.validationSuccess = true;

        }

        console.log(ErrorsObj, "before retunting")


        return ErrorsObj


}



export function ChangePasswordValidation(passwords: passwordChange): errorsType{

    const errrors: errorsType = {
        oldPassword: "",
        newPassword: "",
        password: "",
        validationSuccess: false
    }


    
    if((passwords.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/) == null) && (passwords.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/) == null)){
        errrors.newPassword = "Passwords should contain 8 to 15 characters, one uppercase letter, one numeric digit and one special character"

    }

    if (passwords.oldPassword.length === 0){
        errrors.oldPassword = "Please provided a password"

    }

    if (passwords.newPassword.length === 0){
        errrors.newPassword = "Please provide a password"
    }

    if(passwords.password.length === 0){
        errrors.password = "Please provide a password"
    }

    if (passwords.newPassword !== passwords.password){
        errrors.password = "Passwords dont match!"
    }

    if ((passwords.oldPassword.length > 0) && (passwords.oldPassword.length > 0) && (passwords.newPassword.length > 0) && (passwords.newPassword === passwords.password)){
        errrors.validationSuccess = true

    }

    return errrors


}

