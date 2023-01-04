import { Button } from "react-bootstrap"
import {Form} from "react-bootstrap"

import './ChangePassword.css'


import {useContext, useState} from "react"
import { UserContext } from "../UserContext/UserContext"
import { TypeChangePassword } from "../Types/UserTypes"
import { updatePassword } from "../../AxiosCommands/AxiosCommands"
import {toast } from 'react-toastify';

function ChangePassword(){

    const userContext = useContext(UserContext);

    const PasswordsDefined: TypeChangePassword = {
        oldPassword: '',
        newPassword: '',
        password: '',
        email: userContext?.user?.email as string
    }

    type errorsType = {
        oldPassword: string, 
        newPassword: string,
        password: string
    }

    const [passwords, setPasswords] = useState(PasswordsDefined)

    const [errors, setErrors] = useState<errorsType | null>(null);


    
    function handleChange <P extends keyof TypeChangePassword>(prop: P, value:TypeChangePassword[P] ){

        setPasswords({ ...passwords, [prop]: value });
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){

        event.preventDefault();

        const errrors:any = {}

        

        if((passwords.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/) == null) && (passwords.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/) == null)){
            errrors.newPassword = "Passwords should contain 8 to 15 characters, one uppercase letter, one numeric digit and one special character"

        }


        if ((passwords.oldPassword.length > 0) && (passwords.oldPassword.length > 0) && (passwords.newPassword.length > 0) && (passwords.newPassword === passwords.password)){
                    
            await toast.promise(updatePassword(passwords), { 
                pending: "Changing passwords..",
                success: "Password has been changed successfully",
                error: "Something has gone wrong.." 

            }).catch(err => {

                errrors.oldPassword = "Your provided old password is incorrect.."
            })
            
        
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



        setErrors(errrors)

    }

    return(

        <div className="d-flex justify-content-center flex-column p-5">
        
        <div className="d-flex justify-content-around button-containers">

        <h3 >Change Password</h3>

        </div>

        <Form noValidate className="d-flex justify-content-center flex-column form-container-passwords" onSubmit={handleSubmit}>

            <Form.Group>
                <Form.Label>Old Password</Form.Label>
                <Form.Control 
                    type = "password" 
                    onChange={(e) => handleChange("oldPassword", e.target.value)}
                    isInvalid = {!!errors?.oldPassword} >     
                    </Form.Control>

                <Form.Control.Feedback type = "invalid">{errors?.oldPassword}</Form.Control.Feedback>    
                
            </Form.Group>

            
            <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control 
                    type = "password" 
                    onChange = {(e) => handleChange("newPassword", e.target.value)}
                    isInvalid = {!!errors?.newPassword}></Form.Control>
                
                <Form.Control.Feedback type = "invalid">{errors?.newPassword}</Form.Control.Feedback>
            
            </Form.Group>

            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type = "password" 
                    onChange = {(e) => handleChange("password", e.target.value)}
                    isInvalid = {!!errors?.password}></Form.Control>
                
                <Form.Control.Feedback type = "invalid">{errors?.password}</Form.Control.Feedback>

            </Form.Group>
        

            <div className = "d-flex justify-content-center button-containers-passsword">
            <Button> Return To Your Profile</Button>
            <Button type = "submit">Save Changes</Button>
            </div>
            
        


        </Form>

        


        </div>


        
    )


}


export default ChangePassword