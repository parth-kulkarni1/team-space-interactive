        
export function Validation(user: any, UserErrors: any){
    
        const ErrorsObj: typeof UserErrors = { emailError: "",
        firstNameError: "",
        lastNameError: "",
        passwordError: ""}

        if(user.email.length === 0){
            ErrorsObj.emailError = 'Email not provided!'
        }

        else if (user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) == null){
            ErrorsObj.emailError = 'Email Formatting is incorrect'
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


        return ErrorsObj

    }