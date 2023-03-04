import React, {useState, useContext} from "react"
import './Reply.css'
import { PostContext } from "../Contexts/PostContext"
import {createReplyToReply } from "../AxiosCommands/Post/AxiosPostCommands"
import { UserContext } from "../Contexts/UserContext"



import { AddAPhoto, AddBox } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { Tooltip } from "@mui/material"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"

function CommentReply(){

    const {state, dispatch} = useContext(PostContext)

    const {user} = useContext(UserContext)

    const [image, setImage] = useState<string>('')

    const [hover, setHover] = useState<boolean>(false)


    async function handleSubmitReply(event: React.FormEvent<HTMLButtonElement>){


        const replyObj = {reply: state.editReply, reply_id: state.currentReplyOwner?.id as number, image: image, user: user?.id as number}

        const result = await toast.promise(createReplyToReply(replyObj), {

            pending: "Your replying is uploading...", 
            success: "Your reply has been uploaded",
            error: "Something has gone wrong.."

        })


        if(state.currentReplyOwner?.parentComment){ // This means that we are replying to a post that is not a parent, and is a children

            dispatch({type: "addChildReply", payload: result})

        }

        else{ // This means that we are replying to a post that is a parent

            dispatch({type: 'addParentReply', payload: result})


        }

        
        setHover(false)

        setImage('')

        dispatch({type: 'replyOwner', payload: null})


    }

      

    function handleImageReply(event: React.ChangeEvent<HTMLInputElement>){

        if(!event.target.files){
            return
        }

        const uploaded_pic = event.target.files[0] // Select the first file that we want to preview 

        const reader = new FileReader()

        reader.readAsDataURL(uploaded_pic)

        reader.onloadend = () => {

            setImage(reader.result as string)
            
        }

    }

    return(
        <div className="d-flex flex-column text-area-container p-2">
            

            {!!state.currentReplyOwner && 

             <>



            <div className = "text-area-reply">


                <textarea className="form-control form-control-sm comment-text-area" 
                          placeholder= {"Write your reply to " + state.currentReplyOwner?.user?.firstName 
                                        + " " + state.currentReplyOwner?.user?.lastName}
                          value={state.editReply}
                          onChange={(e) => dispatch({type: 'editReply', payload: e.target.value})}
                          autoFocus
                          
                                                    
                ></textarea> 

            

            



                <div className="d-flex justify-content-between p-2">

                <p className="text-muted">Press Submit Button to upload your reply..</p>

                <p className="text-muted">{state.editReply.length} / {150}</p>

                </div>


            </div>



            
            <div className="d-flex justify-content-end p-2 text-area-images">


                <Tooltip title="Add Photos">
                        <IconButton disabled={image.length > 0} component="label">
                            <input hidden type='file'
                                accept='image/*'
                                onChange={handleImageReply}></input>

                            <AddAPhoto></AddAPhoto>

                        </IconButton>

                    
                </Tooltip>
                    
                    
                    <Tooltip title="Submit Post">
                            <span>
                                <IconButton onClick={handleSubmitReply} disabled = {state.editReply.length === 0 || state.editReply.length > 150 }>
                                    <AddBox></AddBox>
                                </IconButton>
                            </span>     
                    </Tooltip>



            </div>

                

            <div className="d-flex reply-post-image">

            {image.length > 0 && 

                    <div onMouseEnter={() => setHover(true)} onMouseLeave = {() => setHover(false)}>

                        <div>

                            <img src = {image} alt = '' width={200} className = 'previewImageReply'></img>
                            
                        </div>

                        <div>

                            
                            {hover &&

                                <Button className="deleteImageReply" onClick = {() => setImage('')}>Delete Image</Button>
                            
                            
                            }

                        </div>

                    </div>

                    }




               

            </div>

            </>

}

            



        </div>
    )





}

export default CommentReply