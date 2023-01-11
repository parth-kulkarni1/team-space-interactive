import './Home.css'
import { cld } from '../../utils/Cloudinary'
import { AdvancedImage } from '@cloudinary/react'
import { UserContext } from '../UserContext/UserContext'
import React, {useReducer, useContext, useState, useEffect} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import MDEditor from '@uiw/react-md-editor'
import { createPost, getAllPosts } from '../../AxiosCommands/Post/AxiosPostCommands'
import { toast } from 'react-toastify'
import { reducer, initalState } from '../../Reducers/PostReducer'
import { postValidation } from '../../utils/Validation'

function Home(){

    const user = useContext(UserContext);

    const [state, dispatch] = useReducer(reducer,initalState)


    useEffect(() =>{
        async function findAllPosts(){
            const {posts} = await getAllPosts();

            console.log(posts)


        }

        findAllPosts();


    }, [])


    function handleClose(){
        
        /* Here we are resetting the error state and the post state if the user does not end up sumbitting a post,
        but closes the modaal window, 
        so if they reopen it their old inputs are not displayed and cleared accordingly.. */
        
        dispatch({type: "resetPost", payload: ""})

        dispatch({type:"errors", payload: {title: "", body: ""}})

        dispatch({type:false, payload: false})

    }


    async function handleSumbit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const error = postValidation(state.post)

        if (!error.validationSuccess){
            dispatch({type: "errors", payload: error})

            return
        }

        state.post.userId = user.user?.id as number // Storing the User ID (Primary Key) within here..


        const {created} = await toast.promise(createPost(state.post), {

            pending: "Your posting is uploading...",
            success: "Your post has been uploaded", 
            error: "Something has gone wrong..."


        })


        dispatch({type: false, payload: false}) // Hide the modal after user has sumbitted the post
        dispatch({type: 'add', payload: ''}) // Reset the body in markdown editor by resetting its state

        // Add axios commands here..

    }

    return(

        <div className="page-container">

        <div className='d-flex'>

        <div className="list-user">
            this section is in development...
        </div>

        <div className="post-user">

            <div className='d-flex align-items-center user-make-a-post'>
                <div className='d-flex align-items-center p-3 profile-pic'>

                    <AdvancedImage cldImg={cld.image(user.user?.profile_background as string)} className = "post-profile-pic"></AdvancedImage>
                </div>

                <div className='modal-launch'>

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

                            <MDEditor value={state.post.body} 
                                    onChange = {(value) => dispatch({type:'add', payload: value as string})}
                                    preview = "edit"
                                    ></MDEditor>

                            {state.errors.body &&
                              
                              <div>
                              <br></br>
                              <p className='text-danger'> {state.errors.body}</p>
                              </div>

                            
                            }
                        
                            <br></br>

                            <div className='d-flex justify-content-between'>
                                <Button>Add Images To Your Post..</Button>

                                <Button type = "submit">Sumbit Post</Button>

                            </div>

                            </Form>




                        </Modal.Body>

                    </Modal>

                </div>

            </div>

        </div>

        <div className="network-user">
            this section is in development...
        </div>

        </div>




        </div>



    )
}


export default Home