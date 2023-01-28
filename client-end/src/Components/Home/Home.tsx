import './Home.css'
import { UserContext } from '../Contexts/UserContext'
import React, {useContext, useState} from 'react'
import { createPost, getAllPosts } from '../AxiosCommands/Post/AxiosPostCommands'
import { postValidation } from '../utils/Validation'
import { PostContext } from '../Contexts/PostContext'
import PostList from './Posts'
import { Image } from './Image'

import { cld } from '../utils/Cloudinary'
import { AdvancedImage } from '@cloudinary/react'
import { Button, Modal, Form } from 'react-bootstrap'
import MDEditor from '@uiw/react-md-editor'
import { toast } from 'react-toastify'

function Home(){

    const user = useContext(UserContext);

    const {state, dispatch}  = useContext(PostContext)

    const [isSubmitting, setSumbitting] = useState<boolean>(false)


    function handleClose(){
        
        /* Here we are resetting the error state and the post state if the user does not end up sumbitting a post,
        but closes the modaal window, 
        so if they reopen it their old inputs are not displayed and cleared accordingly.. */
        


        dispatch({type: "resetPost", payload: ""})

        dispatch({type:"errors", payload: {title: "", body: ""}})

        dispatch({type:false, payload: false})

        dispatch({type: 'title', payload: ''})

        dispatch({type: 'image', payload: []})

        dispatch({type: 'upload', payload: ''})

        setSumbitting(false)


    }
    

    async function handleSumbit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const error = postValidation(state.ownPost)

        if (!error.validationSuccess){
            dispatch({type: "errors", payload: error})

            return
        }

        setSumbitting(true)

        state.ownPost.userId = user.user?.id as number // Storing the User ID (Primary Key) within here..


        await toast.promise(createPost(state.ownPost), {

            pending: "Your posting is uploading...",
            success: "Your post has been uploaded",  
            error: "Something has gone wrong..."


        }).catch(err => console.log(err))

        dispatch({type: 'upload', payload: 'done'})
    

        handleClose()


    }





    return(

        <div className="d-flex flex-column align-items-center page-container">

            <div className="d-flex align-items-center justify-content-around p-2 user-make-a-post">

                    <div className='d-flex align-items-center p-3 profile-pic'>

                        <AdvancedImage cldImg={cld.image(user.user?.profile_background as string)} className = "post-profile-pic"></AdvancedImage>
                    </div>

                    <div className='d-flex modal-launch'>

                        <Button type = "button" className='button-post' onClick={() => dispatch({type:true, payload: true})}>Make a new post, {user.user?.firstName}</Button>

                        <Modal show = {state.show} centered = {true} onHide = {handleClose}>

                            <Modal.Header closeButton>
                                <Modal.Title>Make a post</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>

                                <Form noValidate onSubmit={handleSumbit}>

                                    <Form.Control type = "input" 
                                                placeholder='Write a title for your post...'
                                                onChange = {(event) => dispatch({type: 'title', payload: event.target.value})}
                                                isInvalid = {!!state.errors.title}
                                                ></Form.Control>

                                    <Form.Control.Feedback type = "invalid">{state.errors.title}</Form.Control.Feedback>

                                <br></br>

                                <MDEditor value={state.ownPost.body} 
                                        onChange = {(value) =>dispatch({type:'body', payload: value as string})}
                                        preview = "edit"
                                        ></MDEditor>

                                {state.errors.body &&
                                
                                <div>
                                <br></br>
                                <p className='text-danger'> {state.errors.body}</p>
                                </div>

                                
                                }
                            
                                <br></br>

                                <div className='d-flex flex-column post-buttons'>

                                    <Image />

                                    <Button type = "submit" disabled = {isSubmitting}>Sumbit Post</Button>
    

                                </div>


                                </Form>




                            </Modal.Body>

                        </Modal>



                    </div>


            </div>

 
                    
                    <PostList /> 
                





        </div>

       




    )
}



export default Home