import React, {useState, useContext} from "react"
import { Button } from "react-bootstrap";
import {Form} from "react-bootstrap"
import { UserContext } from '../UserContext/UserContext';
import {User, UserErrors} from "../Types/UserTypes"

import './ProfilePage.css'

function ProfilePage(){



    const userContext = useContext(UserContext);


    return(
        <div className = "d-flex flex-column">


            <div className="image-containers">

            <img src="./cover-background.jpg" alt="Your Cover Background" className="cover-img"></img>

            <div className = "cover-img-button">
                <Button>Change Cover Image</Button>
            </div>

            <div className = "profile-pic-div ">
            <img src="./logo192.png" alt = "Your Profile Pic" className="profile-pic mb-5"></img>
            <h3 className="p-3">{userContext?.user?.firstName} {userContext?.user?.lastName}</h3>

            </div>


            <div className = "d-flex justify-content-end p-5 buttonsCancelSave">
                <Button>Cancel</Button>
                <Button>Save Changes</Button>
            </div>


            <Form>

                <Form.Group className = "d-flex justify-content-around p-5 firstNameLastName" controlId = "UserDetails">


                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" defaultValue={userContext?.user?.firstName} className = ""></Form.Control>


                    <Form.Label> Last Name</Form.Label>
                    <Form.Control type = "text" defaultValue = {userContext?.user?.lastName}></Form.Control>                  


                </Form.Group>

                <hr></hr>

                <Form.Group className = "d-flex justify-content-around p-5 flex-column">

                    <Form.Label>Email</Form.Label>
                    <Form.Control type = "email" value = {userContext?.user?.email}></Form.Control>

                </Form.Group>

                <hr></hr>


                       
                <img src="./logo192.png" alt = "" className = "p-5"></img> 

                <hr></hr>

                <Form.Group className = "d-flex flex-column p-5 mb-3">

                    <Form.Label>Role</Form.Label>
                    <Form.Control type = "text" placeholder="Enter Your Role Within The Organisation (Optional)"></Form.Control>

                </Form.Group>


                <hr></hr>

                <Form.Group className = "d-flex flex-column p-5 mb-3">

                <Form.Label>Bio</Form.Label>
                <Form.Control type = "text" placeholder="Enter Some Information About You (Optional)"></Form.Control>

                </Form.Group>







            

            </Form>




            </div>
            


        </div>
    )


}


export default ProfilePage;