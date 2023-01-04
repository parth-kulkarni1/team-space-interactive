import React, {useState, useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {Form} from "react-bootstrap"
import Modal from 'react-bootstrap/Modal';
import './ProfilePage.css'

import { UserContext } from '../UserContext/UserContext';
import {TypeProfileChanges, profilePageError} from "../Types/UserTypes"
import {updateUser, deleteAccount, logoutUser, uploadCoverImageCloudinary, findCookie} from "../../AxiosCommands/AxiosCommands";
import {AdvancedImage} from '@cloudinary/react';
import { cld } from "../../utils/Cloudinary";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import {toast } from 'react-toastify';
import { profileValidation } from "../RegistrationPage/Validation";

function ProfilePage(){

    const navigate = useNavigate();

    const userContext = useContext(UserContext);

    const ProfileErrors: profilePageError = { // So we dont have to declare this as null within state..
        firstNameError: "",
        lastNameError: "",
        validationSuccess: false
    }


    const [profile, setProfile] = useState<TypeProfileChanges | null>(userContext.user); 

    const [show, setShow] = useState<boolean | undefined>(false)

    const [previewImage, setPreviewImage] = useState< string | null>('')

    const [coverImage, setCoverImage] = useState<string>('')

    const [previewImageProfile, setPreviewImageProfile] = useState<string | null>('')

    const [profileImage, setProfileImage] = useState<string>('')

    const [errors, setErrors] = useState(ProfileErrors);


    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true)




    useEffect(() =>{ // On initial render we fetch the required image details..

        async function getUserDetails(){

            const data = await findCookie();


            setCoverImage(data.cover_background)

            setProfileImage(data.profile_background)
            
            console.log('damn')

        }

        getUserDetails();

        

    
    }) 




    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>){

        if(!e.target.files){
            return;
        }

        const file : File = e.target.files[0];

        if(e.target.name === "coverImage"){
                previewFile(file, e.target.name);
        }

        else{
            previewFile(file, e.target.name)
        }


    }

    function previewFile(file : File, type: string){
        const reader = new FileReader();
        reader.readAsDataURL(file);

        if(type === "coverImage"){

            reader.onloadend = () =>{
                setPreviewImage(reader.result as string)
            }

        }

        else{
            reader.onloadend = () =>{
                setPreviewImageProfile(reader.result as string)
            }
        }


    }

    function handleChange <P extends keyof TypeProfileChanges>(prop: P, value:TypeProfileChanges[P] ){

        if(profile){
            setProfile({ ...profile, [prop]: value });

        }
 
    }


    function handleSumbitFile(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();

        console.log(event.currentTarget.name, "button name")

        if(event.currentTarget.name === "coverImage"){        
            
            uploadImage(previewImage as string, event.currentTarget.name);

        }

        else{
            uploadImage(previewImageProfile as string, event.currentTarget.name)
        }

    }

    async function uploadImage (base64encodedImage : string, type: string) {
        console.log(base64encodedImage)

        const public_id = await toast.promise(uploadCoverImageCloudinary({imageStringBase64 : base64encodedImage, imageType: type, email: userContext?.user?.email as string}), {

            pending: 'Image is uploading',
            success: 'Image Sucessfully uploaded',
            error: 'Something has gone wrong..'

        }

        );

        
        if(!profile){
            return
        }
        

        if (type === "coverImage") { // Set which part of state needs to update accordingly..

 

            setProfile({...profile, cover_background: public_id.background})

            setCoverImage(public_id.background)

            setPreviewImage(null)



        } 
        
        else{

            setProfile({...profile, profile_background: public_id.background})
            
            setProfileImage(public_id.background)

            setPreviewImageProfile(null)

        }


        userContext.setUser(profile)




    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();


        if(!profile){
            return
        }

        const error:profilePageError = profileValidation(profile)

        setErrors(error)

        console.log(error)


        if(error.validationSuccess){
            await toast.promise(updateUser(profile), {
                pending: "Updating Details...",
                success: "Your Details have been updated",
                error: "Something has gone wrong.."
            })
            userContext.setUser(profile)
        }


    }

    async function handleDelete(){

        await deleteAccount(profile!.email); // Declaring since we know that its not nulll..

        await logoutUser();

        userContext.setUser(null)

        navigate('/')

    }

    return(


        <div className = "d-flex flex-column">


            <div className="image-containers">

                
                {previewImage && (
                    <img src = {previewImage} className = "cover-img" alt = "cover-background"></img>
                )}



                {(coverImage && !previewImage) && (
                    
                <AdvancedImage cldImg={cld.image(coverImage)} className = "cover-img" />


                )}

          

            <div className = "cover-img-button">

                {!previewImage && (

                <div>

                    <label className="form-label">Update Your Cover Background</label>
                    <input className = "form-control" type = "file" name = "coverImage" onChange={handleFileInputChange} title = "Update Profile Picture"></input>
    

                </div>
                
                )}

                {previewImage && (

                <div className="cancel-save-buttons">
                        
                    <Button onClick={() => {setPreviewImage(null)}}>Cancel Image </Button>

                    <Button name = "coverImage" onClick={handleSumbitFile}>Save Image</Button>

                </div>
                    
                )}

            </div>



            <div className = "profile-pic-div ">

                {!previewImageProfile ? (

                    <AdvancedImage cldImg={cld.image(profileImage)} alt = "Your Profile Pic" className = "profile-pic mb-5" />
                    ) :
                    <img src={previewImageProfile} alt="Your Profile Pic" className = "profile-pic mb-5"></img>

                }

                <h3 className="p-3">{userContext?.user?.firstName} {userContext?.user?.lastName}</h3>

            </div>


            <Form noValidate onSubmit = {handleSubmit}>

            
                <div className = "d-flex justify-content-end p-5 buttonsCancelSave">
                    <Button onClick = {() => navigate(-1)}>Cancel</Button>
                    <Button type = "submit">Save Changes</Button>
                    <Button onClick={handleShow}>Delete Account</Button>
                </div>

                <Modal show = {show} onHide = {handleClose} centered = {true}>

                    <Modal.Header closeButton>
                        <Modal.Title>Delete Account?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Are you sure you want to delete your account?</Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick = {handleClose}> Take me back!</Button>
                        <Button variant = "primary" onClick={handleDelete}>Confirm Deletion</Button>
                    </Modal.Footer>

                </Modal>

                <Form.Group className = "d-flex justify-content-around p-5 firstNameLastName" controlId = "UserDetails">


                    <Form.Label>First Name</Form.Label>
                    
                    <Form.Control 
                        type="text" 
                        defaultValue={userContext?.user?.firstName} 
                        onChange = {(e) => {handleChange("firstName", e.target.value || "")}} 
                        isInvalid={!!errors.firstNameError}
                    ></Form.Control>

                    <Form.Control.Feedback type = "invalid">{errors.firstNameError}</Form.Control.Feedback>

                    <Form.Label> Last Name</Form.Label>                    
                    <Form.Control 
                        type = "text" 
                        defaultValue = {userContext?.user?.lastName} 
                        onChange = {(e) => {handleChange("lastName", e.target.value || "")}}
                        isInvalid = {!!errors.lastNameError}
                    ></Form.Control> 
                    
                    <Form.Control.Feedback type = "invalid">{errors.lastNameError}</Form.Control.Feedback>



                </Form.Group>

                <hr></hr>

                <Form.Group className = "d-flex justify-content-around p-5 flex-column">

                    <Form.Label>Email</Form.Label>
                    <Form.Control type = "email" value = {userContext?.user?.email} disabled = {true}></Form.Control>

                </Form.Group>

                <hr></hr>

                <div className="button-container-password p-5">
                    <Button onClick={() => {navigate('/ChangePassword')}}> Change Password</Button>
                </div>


                <hr></hr>

                <div className = "p-5 profile-picture">

                <p className="text-bold"> Your Profile Picture</p>

                {!previewImageProfile && (

                    <div className="d-flex justify-content-between p-1"> 

                        <div className = "image-container">

                            <AdvancedImage cldImg={cld.image(profileImage).resize(thumbnail().width(150).height(150)).roundCorners(byRadius(50))} 
                                            alt = "Your Profile Pic" className = "mb-5" />
                    
                        </div>

                        <div>

                            <label className="form-label">Update your profile picture</label>
                            
                            <input className = "form-control" type = "file" name = "image" onChange={handleFileInputChange}></input>

                        </div>

                    </div>
                    
                    )}

                    {previewImageProfile && (    
                    <div>    

<img src = {previewImageProfile} className = "profile-pic" alt = ""></img>



                <button onClick={() => {setPreviewImageProfile(null)}}>Cancel Image </button>

                <button name = "profileImage" onClick={handleSumbitFile}>Save Image</button>

                </div>
                    
                )}

                </div>
                           

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