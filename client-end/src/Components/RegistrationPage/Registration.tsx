import {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Validation } from './Validation';

import './Registration.css'
import { createUser} from '../../AxiosCommands/AxiosCommands';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

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
        lastName: "" ,
        password: ""
    } 

    type UserErrors = {
        emailError: string, 
        firstNameError: string, 
        lastNameError: string, 
        passwordError: string, 
        validationSuccess: boolean
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

                const response = await createUser(user); 

                if('errors' in response){ // Ensure if there is an error in the backend it does not navigate the user forward..(Security Implementation)
                    return
                }

                userContext?.setUser({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    loggedIn: true
                })

                navigate("/Profile")

        }

        }

        handleNavigation();

    }, [error])




    function handleChange <P extends keyof UserGeneric>(prop: P, value: UserGeneric[P] ){

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


            <Form className='d-flex flex-column p-5' onSubmit = {handleSumbit}>

                <Form.Group className = "mb-3" controlId = "emailForm">

                    <Form.Label>Email Address</Form.Label>
                    <Form.Control className = "form-input" type = "email" placeholder = "Please Provide A Valid Email" size = "lg" onChange = {(e) => {handleChange("email", e.target.value)}}></Form.Control>

                    <Form.Text className = "text-danger">

                        {error.emailError}
                    
                    </Form.Text>

                </Form.Group>

                
                <Form.Group className = "mb-3" controlId = "firstNameForm">

                    <Form.Label>First Name</Form.Label>
                    <Form.Control className = "form-input" type = "text" placeholder = "Please Provide Your First Name" size = "lg" onChange = {(e) => {handleChange("firstName", e.target.value)}}></Form.Control>

                    <Form.Text className = "text-danger">

                        {error.firstNameError}
                    
                    </Form.Text>

                                    
                </Form.Group>

                
                <Form.Group className = "mb-3" controlId = "lastNameForm">

                    <Form.Label>Last Name</Form.Label>
                    <Form.Control className = "form-input" type = "text" placeholder = "Please Provide Your Last Name" size = "lg" onChange = {(e) => {handleChange("lastName", e.target.value)}}></Form.Control>

                    <Form.Text className = "text-danger">

                        {error.lastNameError}
                    
                    </Form.Text>
                                    
                </Form.Group>


                
                <Form.Group className = "mb-3" controlId = "passwordForm">

                    <Form.Label>Password</Form.Label>
                    <Form.Control className = "form-input" type = "password" placeholder = "Please Provide A Password" size = "lg" onChange = {(e) => {handleChange("password", e.target.value)}}></Form.Control>
                    <Form.Text className = "text-danger">
                    {error.passwordError}
                    </Form.Text>
                                    
                </Form.Group>


                <Button type = "submit"> Register To Team Space Interactive!</Button>



            </Form>

        
        </div>


           
    )



}


export default Registration;