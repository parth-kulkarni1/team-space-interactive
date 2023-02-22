import React, {useContext, useState} from 'react'
import { createPost, updatePost } from '../AxiosCommands/Post/AxiosPostCommands'
import { postValidation } from '../utils/Validation'
import { editReset, ownPostReset, PostContext} from '../Contexts/PostContext'
import { UserContext } from '../Contexts/UserContext'
import { Image } from './Image'

import { Button, Modal, Form } from 'react-bootstrap'
import MDEditor from '@uiw/react-md-editor'
import { toast } from 'react-toastify'

type Errors = {
    title: string, body: string, validationSuccess: boolean
}

function PostModal(){


    const user = useContext(UserContext);
    
    const {state, dispatch}  = useContext(PostContext)

    const [isSubmitting, setSumbitting] = useState<boolean>(false)

    const [errors, setErrors] = useState<Errors | null>({title: '', body: '', validationSuccess: false})



    function handleClose(){
        
        /* Here we are resetting the error state and the post state if the user does not end up sumbitting a post,
        but closes the modaal window, 
        so if they reopen it their old inputs are not displayed and cleared accordingly.. */

            dispatch({type:false, payload: false})

            dispatch({type: 'image', payload: []})

            dispatch({type: 'resetPost', payload: ownPostReset})

            dispatch({type: 'reset', payload: editReset})


            setErrors(null)
                    
            
            setSumbitting(false)


    }
    

    async function handleSumbit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();



        state.ownPost.userId = user.user?.id as number


        const error = postValidation(state.ownPost)

        if (!error.validationSuccess){
            setErrors(error)

            return
        }


        setSumbitting(true) // Ensure that the user does not press the sumbit button twice



        if(!state.edit.status){


            state.ownPost.userId = user.user?.id as number // Storing the User ID (Primary Key) within here..


            await toast.promise(createPost(state.ownPost), {

                pending: "Your post is uploading...",
                success: "Your post has been uploaded",  
                error: "Something has gone wrong..."


            }).then(results => dispatch({type: 'localPost', payload: results})).catch(err => console.log(err))


        }

        else{

            state.edit.post.body = state.ownPost.body

            state.edit.post.title = state.ownPost.title

            state.edit.imageHandling.localImages = state.ownPost.images


            const result = await toast.promise(updatePost(state.edit), {
                pending: "Your edited post is uploading...",
                success: "Your new post has been uploaded", 
                error: "Something has gone wrong"
            }).catch(err => console.log(err))


            dispatch({type: 'updateEdited', payload: result})


        }

            handleClose()


    }



    return(


        
        <div className='d-flex modal-launch'>


        <Modal show = {state.show} centered = {true} onHide = {handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>Make a post</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form noValidate onSubmit={handleSumbit}>

                    <Form.Control type = "input" 
                                placeholder='Write a title for your post...'
                                value = {state.ownPost.title}
                                onChange={(e) => {dispatch({type: 'title', payload: e.target.value})}}
                                isInvalid = {!!errors?.title}
                                ></Form.Control>

                    <Form.Control.Feedback type = "invalid">{errors?.title}</Form.Control.Feedback>

                <br></br>

                <MDEditor value={state.ownPost.body}
                         onChange= {(value) => {dispatch({type: 'body', payload: value as string })}}
                         preview = "edit"

                >

                </MDEditor>


                {errors?.body &&
                
                <div>
                    <br></br>
                    <p className='text-danger'> {errors.body}</p>
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

    )
}


export default PostModal