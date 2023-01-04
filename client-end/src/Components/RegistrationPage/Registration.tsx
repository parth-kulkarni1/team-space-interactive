import {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Validation } from './Validation';

import './Registration.css'
import { createUser} from '../../AxiosCommands/AxiosCommands';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import {User, UserErrors} from "../Types/UserTypes";
import {toast} from "react-toastify"

function Registration(){


    const UserDefined: User = {
        email: "",
        firstName: "",
        lastName: "" ,
        password: "", 
        loggedIn: false,
        cover_background: "",
        profile_background: ""
    } 


    const UserErrorsDefined: UserErrors = {
        emailError: "",
        firstNameError: "",
        lastNameError: "",
        passwordError: "",
        validationSuccess: false
    } 



    const[user, setUser] = useState(UserDefined); // Initalise the state with null
    const[error, setError] = useState(UserErrorsDefined);
    const navigate: NavigateFunction = useNavigate();
    const userContext = useContext(UserContext);


    useEffect(() => {


        async function handleNavigation() {
    
    
        if (error.validationSuccess === true){    

                const response = await toast.promise(createUser(user), {
                    pending: 'Signing you up...',
                    success: 'You have signed up successfully', 
                    error: 'Something has gone wrong..'

                }); 

                if('errors' in response){ // Ensure if there is an error in the backend it does not navigate the user forward..(Security Implementation)
                    return
                }

                userContext.setUser({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    loggedIn: true,
                    cover_background: response.cover_background,
                    profile_background: response.profile_background
                })

                navigate("/Profile")

        }

        }

        handleNavigation();

    }, [error])




    function handleChange <P extends keyof User>(prop: P, value: User[P] ){

        setUser({ ...user, [prop]: value });
    }


   async function handleSumbit(event: React.FormEvent<HTMLFormElement>){

        // Set up our validation inside of here...

        event.preventDefault();

        const ErrorsObj = await Validation(user)

        setError(ErrorsObj)

    }

    return(


        <div>
            
        <h3 className = "text-center mt-3">Registration Form</h3>


            <Form noValidate className='d-flex flex-column p-5' onSubmit = {handleSumbit}>

                <Form.Group className = "mb-3" controlId = "emailForm">

                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        className = "form-input" 
                        type = "email" 
                        placeholder = "Please Provide A Valid Email" 
                        size = "lg" 
                        onChange = {(e) => {handleChange("email", e.target.value)}}
                        isInvalid = {!!error.emailError}
                        isValid = {!error.emailError && error.emailError !== ''}>

                    </Form.Control>

                    
                    <Form.Control.Feedback type = "invalid">{error.emailError}</Form.Control.Feedback>
                    <Form.Control.Feedback type = "valid">Looks good</Form.Control.Feedback>

                </Form.Group>

                
                <Form.Group className = "mb-3" controlId = "firstNameForm">

                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        className = "form-input" 
                        type = "text" 
                        placeholder = "Please Provide Your First Name" 
                        size = "lg" 
                        onChange = {(e) => {handleChange("firstName", e.target.value)}}
                        isInvalid = {!!error.firstNameError}
                        isValid = {!error.firstNameError && error.firstNameError !== ''}>

                    </Form.Control>
                    
                    <Form.Control.Feedback type = "invalid">{error.firstNameError}</Form.Control.Feedback>
                    <Form.Control.Feedback type = "valid">Looks good</Form.Control.Feedback>

                </Form.Group>

                
                <Form.Group className = "mb-3" controlId = "lastNameForm">

                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        className = "form-input" 
                        type = "text" 
                        placeholder = "Please Provide Your Last Name777" 
                        size = "lg" 
                        onChange = {(e) => {handleChange("lastName", e.target.value)}}
                        isInvalid = {!!error.lastNameError}
                        isValid = {!error.lastNameError && error.lastNameError !== ''}>
                    </Form.Control>

                    <Form.Control.Feedback type = "invalid"> {error.lastNameError}</Form.Control.Feedback>
                    <Form.Control.Feedback type = "valid">Looks good</Form.Control.Feedback>
                    
                </Form.Group>


                
                <Form.Group className = "mb-3" controlId = "passwordForm">

                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        className = "form-input" 
                        type = "password" 
                        placeholder = "Please Provide A Password" 
                        size = "lg" 
                        onChange = {(e) => {handleChange("password", e.target.value)}}
                        isInvalid = {!!error.passwordError}
                        isValid = {!error.passwordError && error.passwordError !== ''}>

                    </Form.Control>

                    <Form.Control.Feedback type = "invalid">{error.passwordError}</Form.Control.Feedback>
                    <Form.Control.Feedback type = "valid">Looks good</Form.Control.Feedback>

                                    
                </Form.Group>


                <Button type = "submit"> Register To Team Space Interactive!</Button>



            </Form>

        
        </div>


           
    )



}


export default Registration;