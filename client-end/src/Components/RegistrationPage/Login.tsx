import { useState, useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { verifyUser } from '../../AxiosCommands/AxiosCommands';
import {UserContext} from '../UserContext/UserContext';

function Login(){

    const userContext = useContext(UserContext); // Consume the Context
    

    type UserGeneric = {
        email: string, 
        password: string
    }

    const UserDefined: UserGeneric = {
        email: "",
        password: ""
    } 


    const[user, setUser] = useState(UserDefined); // Initalise the state with null
    const[error, setError] = useState("");
    const navigate: NavigateFunction = useNavigate();

    function handleChange <P extends keyof UserGeneric>(prop: P, value: UserGeneric[P] ){

        setUser({ ...user, [prop]: value });
    }


   async function handleSumbit(event: React.FormEvent<HTMLFormElement>){

        // Set up our validation inside of here...

        event.preventDefault();

        const data = await verifyUser(user.email, user.password)

        console.log(data)



        if(data === null){

            setError("Incorrect Username or Passsword")

        }

        else if ('error' in data){
            setError("Username or Password not Provided")
        }

        else{

            userContext?.setUser({
                email: user.email,
                firstName: data.firstName,
                lastName: data.lastName, 
                loggedIn: true

            })

            navigate('/Profile')
        }


    }


    return(

        <div>

        <h3 className = "text-center mb-3 p-5">Welcome Back! Login</h3>

        <Form className = "d-flex flex-column p-5" onSubmit={handleSumbit}>

            <Form.Group controlId = "emailForm">

                <Form.Label>Username(Email)</Form.Label>
                <Form.Control type = "text" size='lg' placeholder = "Please Enter Your Registered Email" onChange = {(e) => {handleChange("email", e.target.value)}}></Form.Control>
                <Form.Text className = "text-danger">

                    {error}


                </Form.Text>

            </Form.Group>

            <Form.Group controlId = "passwordForm">

                <Form.Label>Password</Form.Label>
                <Form.Control type = "password" size = "lg" placeholder = "Please Enter Your Password" onChange = {(e) => {handleChange("password", e.target.value)}}></Form.Control>
                <Form.Text className = "text-danger">

                    {error}

                </Form.Text>

            </Form.Group>


            <Button type = "submit"> Login To Team Space Interactive</Button>




        </Form>

        </div>


        

        
    )


}


export default Login;