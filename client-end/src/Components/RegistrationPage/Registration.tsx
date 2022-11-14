import { SetStateAction, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Validation } from './Validation';

import './Registration.css'
import { createUser } from '../../AxiosCommands/AxiosCommands';

function Registration(){

    type UserGeneric = {
        email: string, 
        firstName: string, 
        lastName: string,
        password: string
    }

    const UserDefined: UserGeneric = {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    } 


    type UserErrors = {
        emailError: string, 
        firstNameError: string, 
        lastNameError: string, 
        passwordError: string
    }

    const UserErrorsDefined: UserErrors = {
        emailError: "",
        firstNameError: "",
        lastNameError: "",
        passwordError: ""
    }

    const[user, setUser] = useState(UserDefined); // Initalise the state with null
    const[error, setError] = useState(UserErrorsDefined);

    function handleChange <P extends keyof UserGeneric>(prop: P, value: UserGeneric[P] ){

        setUser({ ...user, [prop]: value });
    }



   async function handleSumbit(event: React.FormEvent<HTMLFormElement>){

        // Set up our validation inside of here...

        event.preventDefault();

        const ErrorsObj: UserErrors = Validation(user, UserErrorsDefined)


        if (ErrorsObj.emailError === '' && ErrorsObj.firstNameError === '' && ErrorsObj.lastNameError === '' && ErrorsObj.passwordError === ''){

            // Now we store the data in the backend and and then procced to navigate the user forward.. 

            console.log("succedding")

            await createUser(user)

        }

        else{            
            setError(ErrorsObj)
        }



    }

    return(

        <div>
            
        <h3 className = "text-center mt-3">Registration Form</h3>


            <Form className='d-flex flex-column p-5' onSubmit = {handleSumbit}>

                <Form.Group className = "mb-3" controlId = "emailForm">

                    <Form.Label>Email Address</Form.Label>
                    <Form.Control className = "form-input" type = "email" placeholder = "Please Provide A Valid Email" size = "lg" onChange = {(e) => {handleChange("email", e.target.value)}}></Form.Control>
                    <Form.Text className = "text-muted">

                        {error?.emailError ? error.emailError : ""}
                    
                    </Form.Text>

                </Form.Group>

                
                <Form.Group className = "mb-3" controlId = "firstNameForm">

                    <Form.Label>First Name</Form.Label>
                    <Form.Control className = "form-input" type = "text" placeholder = "Please Provide Your First Name" size = "lg" onChange = {(e) => {handleChange("firstName", e.target.value)}}></Form.Control>

                    <Form.Text className = "text-muted">

                        {error?.firstNameError ? error.firstNameError : ""}
                    
                    </Form.Text>

                                    
                </Form.Group>

                
                <Form.Group className = "mb-3" controlId = "lastNameForm">

                    <Form.Label>Last Name</Form.Label>
                    <Form.Control className = "form-input" type = "text" placeholder = "Please Provide Your Last Name" size = "lg" onChange = {(e) => {handleChange("lastName", e.target.value)}}></Form.Control>

                    <Form.Text className = "text-muted">

                        {error?.lastNameError ? error.lastNameError : ""}
                    
                    </Form.Text>
                                    
                </Form.Group>


                
                <Form.Group className = "mb-3" controlId = "passwordForm">

                    <Form.Label>Password</Form.Label>
                    <Form.Control className = "form-input" type = "password" placeholder = "Please Provide A Password" size = "lg" onChange = {(e) => {handleChange("password", e.target.value)}}></Form.Control>
                    <Form.Text className = "text-muted">
                    {error?.passwordError? error.passwordError : ""}
                    </Form.Text>
                                    
                </Form.Group>


                <Button type = "submit"> Register To Team Space Interactive!</Button>



            </Form>

        
        </div>


           
    )



}


export default Registration;