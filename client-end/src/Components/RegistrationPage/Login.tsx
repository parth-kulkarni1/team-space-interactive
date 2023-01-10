import { useState, useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { UserLogin } from '../Types/UserTypes';
import { verifyUser } from '../../AxiosCommands/AxiosCommands';
import {UserContext} from '../UserContext/UserContext';
import { toast } from 'react-toastify';


function Login(){

    const userContext = useContext(UserContext); // Consume the Context


    const UserDefined: UserLogin = {
        email: "",
        password: "",
        cover_background: "", 
        profile_background: ""
        
    } 


    const[user, setUser] = useState(UserDefined); // Initalise the state with null
    const[error, setError] = useState("");
    const navigate: NavigateFunction = useNavigate();

    function handleChange <P extends keyof UserLogin>(prop: P, value: UserLogin[P] ){

        setUser({ ...user, [prop]: value });
    }


   async function handleSumbit(event: React.FormEvent<HTMLFormElement>): Promise<void>{

        // Set up our validation inside of here...

        event.preventDefault();

        const data = await verifyUser(user.email, user.password)


        if(data === null){

            setError("Incorrect Username or Passsword")

        }

        else if (user.email === '' || user.password === ''){
            setError("Username or Password not Provided")
        }

        else{

            userContext.setUser({
                id: data.id,
                email: user.email,
                firstName: data.firstName,
                lastName: data.lastName, 
                loggedIn: true,
                profile_background: data.profile_background,
                cover_background: data.cover_background

            })

            toast.success("You have logged in successfully..")

            navigate('/Profile')
        }


    }


    return(

        <div>

        <h3 className = "text-center mb-3 p-5">Welcome Back! Login</h3>

        <Form className = "d-flex flex-column p-5 login-form" onSubmit={handleSumbit}>

            <Form.Group controlId = "emailForm">

                <Form.Label>Username(Email)</Form.Label>
                <Form.Control 
                    type = "text" 
                    size='lg' 
                    placeholder = "Please Enter Your Registered Email" 
                    onChange = {(e) => {handleChange("email", e.target.value)}}
                    isInvalid = {!!error}
                    isValid = {error.length > 0 && !error}>

                </Form.Control>

                <Form.Control.Feedback type = "invalid"> {error}</Form.Control.Feedback>
                <Form.Control.Feedback type = "valid">Looks good</Form.Control.Feedback>
                
            </Form.Group>

            <Form.Group controlId = "passwordForm">

                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type = "password" 
                    size = "lg" 
                    placeholder = "Please Enter Your Password" 
                    onChange = {(e) => {handleChange("password", e.target.value)}}
                    isInvalid = {!!error}
                    isValid = {error.length > 0 && !error}>

                </Form.Control>

                <Form.Control.Feedback type = "invalid">{error}</Form.Control.Feedback>
                
            </Form.Group>


            <Button type = "submit"> Login To Team Space Interactive</Button>




        </Form>

        </div>


        

        
    )


}


export default Login;